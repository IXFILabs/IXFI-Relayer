import { encodeFunctionData } from 'viem'
import { getFeeInUsd, writeContract, sendTransaction, waitForTransactionReceipt } from '../rpc/transaction.mjs'
import { GAS_VAULT_ABI, META_TX_ABI } from '../rpc/abi.mjs'
import { GAS_VAULT_CHAIN } from '../rpc/chain.mjs'
import { GAS_VAULT_CONTRACT, META_TX_CONTRACTS } from '../rpc/contract.mjs'

const router = express.Router()

const updateCredit = async (sender, feeInUsd) => {
  const txHash = await writeContract(
    GAS_VAULT_CHAIN,
    GAS_VAULT_CONTRACT,
    GAS_VAULT_ABI,
    'consume',
    [sender, feeInUsd],
  )

  const txReceipt = await waitForTransactionReceipt(GAS_VAULT_CHAIN, txHash)
}

router.post('/relay', async (req, res) => {
  const { sender, chain_id, transferData, nonce, signature } = req.body;
  try {
    // Step 1: Send transaction
    const txHash = await sendTransaction(
      chain_id,
      META_TX_CONTRACTS[chain_id],
      encodeFunctionData({
        abi: META_TX_ABI,
        functionName: 'executeMetaTransfer',
        args: [sender, transferData, nonce, signature],
      }),
    );

    // Step 2: Wait for confirmation & get receipt
    const txReceipt = await waitForTransactionReceipt(chain_id, txHash);
    
    const gasUsed = txReceipt.gasUsed;
    const gasPrice = txReceipt.effectiveGasPrice;
    const {fee, feeInUsdWei} = await getFeeInUsd(chain_id, gasUsed, gasPrice);

    console.log('Gas used:', gasUsed.toString());
    console.log('Gas fee (wei):', fee.toString());
    console.log('Fee in credits (wei):', feeInUsdWei.toString());

    updateCredit(sender, feeInUsdWei);

    res.json({
      success: true,
      transactionHash: txHash,
      gasUsed: gasUsed.toString(),
      gasFee: fee.toString(),
      feeInUsd: feeInUsd.toString()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router