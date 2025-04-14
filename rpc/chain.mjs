import { mainnet, bsc, arbitrum, avalanche, optimism, base, polygon } from 'viem/chains'

export const GAS_VAULT_CHAIN = 4157

export const crossfi_testnet = {
    id: 4157,
    name: 'CrossFi Testnet',
    network: 'crossfi',
    nativeCurrency: { name: 'XFI', symbol: 'XFI', decimals: 18 },
    rpcUrls: {
      default: { http: [`https://crossfi-testnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`] }
    },
    blockExplorers: {
      default: { name: 'CrossFi Explorer', url: `https://test.xfiscan.com` }
    },
    testnet: true
}

export const SUPPORT_CHAINS = {
    4157: crossfi_testnet,
    [mainnet.id]: mainnet,
    [bsc.id]: bsc,
    [polygon.id]: polygon,
    [optimism.id]: optimism,
    [arbitrum.id]: arbitrum,
    [avalanche.id]: avalanche,
    [base.id]: base
}

export const SUPPORT_CHAIN_NAMES = {
    4157: 'CrossFi',
    [mainnet.id]: 'Ethereum',
    [bsc.id]: 'BNB SC',
    [polygon.id]: 'Polygon PoS',
    [optimism.id]: 'Optimism',
    [arbitrum.id]: 'Arbitrum',
    [avalanche.id]: 'Avalanche',
    [base.id]: 'Base'
}