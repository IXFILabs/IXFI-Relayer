import dotenv from 'dotenv'
dotenv.config()

const crossfi_testnet = {
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

export default crossfi_testnet