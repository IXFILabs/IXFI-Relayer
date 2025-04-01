import { createWalletClient, http, parseAbi, encodeFunctionData } from 'viem'
import { mnemonicToAccount } from 'viem/accounts'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import crossfi_testnet from './config.mjs'

// Load environment variables (optional)
import dotenv from 'dotenv'
dotenv.config()


// **Relayer Wallet**
const account = mnemonicToAccount(process.env.RELAYER_PRIVATE_KEY)
console.log(account.address)

// **Viem Wallet Client**
const walletClient = createWalletClient({
  account,
  chain: crossfi_testnet,
  transport: http(crossfi_testnet.rpcUrls.default.http[0])
})

// **Contract Details**
const metaTxContract = process.env.RELAYER_ADDRESS
const metaTxABI = parseAbi([
  'function executeMetaTransfer(address sender, bytes transferData, uint256 nonce, bytes signature) public'
])

// **Express App**
const app = express()

app.use(bodyParser.json())
app.use(cors({origin: 'http://192.168.131.59:3000'}));

// **Relayer API Endpoint**
app.post('/relay', async (req, res) => {
  const { sender, transferData, nonce, signature } = req.body
  try {
    // Encode function call
    const encodedData = encodeFunctionData({
      abi: metaTxABI,
      functionName: 'executeMetaTransfer',
      args: [sender, transferData, nonce, signature]
    })

    // Send transaction
    const txHash = await walletClient.sendTransaction({
      to: metaTxContract,
      data: encodedData,
      account
    })

    res.json({ success: true, transactionHash: txHash })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// **Start Relayer Server**
const HOST = '192.168.131.59'
const PORT = 5000
app.listen(PORT, HOST, () => {
  console.log(`Relayer Node is running on http://${HOST}:${PORT}`)
})
