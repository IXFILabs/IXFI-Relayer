
import dotenv from 'dotenv'
import { createPublicClient, createWalletClient, formatEther, parseUnits, http, encodeFunctionData } from 'viem'
import { GAS_ORACLE_CONTRACTS } from './contract.mjs'
import { SUPPORT_CHAINS } from './chain.mjs'
import { AGGREGATOR_ABI } from './abi.mjs'

dotenv.config()

export const account = mnemonicToAccount(process.env.RELAYER_PRIVATE_KEY)

const getTransport = chain => http(chain.rpcUrls?.default?.http[0])

export const getChain = chain_id => SUPPORT_CHAINS[chain_id]

export const getPublicClient = chain_id => createPublicClient({
    chain: SUPPORT_CHAINS[chain_id],
    transport: getTransport(chain)
})

export const getWalletClient = (chain_id) => createWalletClient({
    account,
    chain: SUPPORT_CHAINS[chain_id],
    transport: getTransport(chain)
})

export const sendTransaction = (chain_id, target, data) => {
    return getWalletClient(chain_id).sendTransaction({
      to: target,
      data: data,
      account,
    })
}

export const readContract = async (chain_id, address, abi, functionName, args) => {
    getPublicClient(chain_id).readContract({
        address,
        abi,
        functionName,
        args
    })
}

export const writeContract = async (chain_id, address, abi, functionName, args) => {
    return getWalletClient(chain_id).writeContract({
        address,
        abi,
        functionName,
        args
    })
}

export const waitForTransactionReceipt = (chain_id, txHash) => {
    return getPublicClient(chain_id).waitForTransactionReceipt({ hash: txHash })
}

export const getGasInfoForWriteContract = async (chain_id, to, abi, functionName, args) => {
    const client = getPublicClient(chain_id)

    // Encode function call
    const data = encodeFunctionData({
        abi,
        functionName,
        args
    })

    // Estimate gas for the transaction
    const gasUsed = await client.estimateGas({
        to,
        data
    })
  
    // Get the current gas price
    const gasPrice = await client.getGasPrice()

    return {gasUsed, gasPrice}
}

export const getFeeInUsd = async (chain_id, gasUsed, gasPrice) => {

    const result = await readContract(
        chain_id,
        GAS_ORACLE_CONTRACTS[chain.id], // Chainlink ETH/USD price feed address
        AGGREGATOR_ABI,
        'latestRoundData'
    )

    const fee = gasUsed * gasPrice
    const price = Number(result[1]) / 1e8 // ETH/USD price with 8 decimals
    const feeInEth = Number(formatEther(fee)) // Convert fee from wei to ETH

    const feeInUsd = price * feeInEth // Calculate fee in USD
    const feeInUsdWei = parseUnits(feeInUsd.toString(), 18) // Convert USD to wei

    console.log('ETH/USD Price:', price)
    console.log('Fee (ETH):', feeInEth)
    console.log('Fee (USD):', feeInUsd)
    console.log('Fee (USD in wei):', feeInUsdWei)

    return {fee, feeInEth, feeInUsd, feeInUsdWei}
}