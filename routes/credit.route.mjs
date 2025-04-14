import { getFeeInUsd, getGasInfoForWriteContract, META_TX_CONTRACTS, SUPPORT_CHAINS } from '../rpc/transaction.mjs'
import { META_TX_ABI } from '../rpc/abi.mjs'

const router = express.Router()

router.post('/calc-credit', async (req, res) => {
  const { sender, chain_id, transferData, nonce, signature } = req.body;
  
  try {
    const {gasUsed, gasPrice} = await getGasInfoForWriteContract(
      chain_id, 
      META_TX_CONTRACTS[chain_id], 
      META_TX_ABI, 
      'executeMetaTransfer', 
      [sender, transferData, nonce, signature]
    )
    const {feeInEth, feeInUsd} = await getFeeInUsd(gasUsed, gasPrice)

    console.log('Estimated Gas:', gasUsed)
    console.log('Gas Price:', gasPrice)

    return res.json({
      fee: feeInEth,
      feeInUsd
    })
  } catch (error) {
    console.error('Error estimating gas:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router