<div align="center">
    <a href="https://ixfi.meta.com">
        <img alt="logo" src="https://github.com/IXFILabs/IXFI-Frontend/blob/main/public/images/logo.png" style="width: 240px;">
    </a>
    <h1 style="border-bottom: none">
        <b><a href="https://ixfi.meta.com">IXFI Protocol</a></b><br />
    </h1>
</div>

## IXFI Meta Transaction Relayer

This is only use case for Meta Transaction relayer.
First you create .env file and set this variable. 

```env
ALCHEMY_API_KEY=<YOUR_ALCHEMY_API_KEY>
RELAYER_PRIVATE_KEY=<YOUR_RELAYER_PRIVATE_KEY> // this address is deployed IXFIGateway contract address on crossfi testnet
```

```sh
npm install
npm start
```
