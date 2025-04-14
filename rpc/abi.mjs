export const GAS_VAULT_ABI = [{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "usdValue",
      "type": "uint256"
    }
  ],
  "name": "consume",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "creditCost",
      "type": "uint256"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
}]

export const META_TX_ABI = [{
  "inputs": [
    {
      "internalType": "address",
      "name": "sender",
      "type": "address"
    },
    {
      "internalType": "bytes",
      "name": "transferData",
      "type": "bytes"
    },
    {
      "internalType": "uint256",
      "name": "nonce",
      "type": "uint256"
    },
    {
      "internalType": "bytes",
      "name": "signature",
      "type": "bytes"
    }
  ],
  "name": "executeMetaTransfer",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}]

export const AGGREGATOR_ABI = [
  {
      inputs: [],
      name: "latestRoundData",
      outputs: [
          { internalType: "uint80", name: "roundId", type: "uint80" },
          { internalType: "int256", name: "answer", type: "int256" },
          { internalType: "uint256", name: "startedAt", type: "uint256" },
          { internalType: "uint256", name: "updatedAt", type: "uint256" },
          { internalType: "uint80", name: "answeredInRound", type: "uint80" }
      ],
      stateMutability: "view",
      type: "function"
  }
];