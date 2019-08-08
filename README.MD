# react-dApp-marketplace

## Description

Marketplace dApp built with React, Truffle, and Ganach.

Be able to make transaction by Ether.

**_DEMO:_**

<img src="./src/img/190808Marketplace.jpg" width="80%">

## Feature

- Sell (add) products by Ether
- Purchase products by Ether
- Shows owner accounts of Metamask address

## Requirement

- npm
- Metamask
- Ganache

## Usage / Install

1. Run Ganache & Setup Metamask with Ganache

   Copy the RPC Server from Ganache. eg: [HTTP://127.0.0.1:7545] </br>
   Then choose the network as Custom RPC in Metamask, paste the above mentioned RPC Server into `New RPC URL` and save.</br>
   Choose this custom network in Metamask.

2. Run react application

   Clone repo, cd into folder and run:

   ```console
   $ npm install
   $ truffle test
   $ npm start
   ```

3. Get Ether (Kovan network)

   Get Ether (Kovan) by free at <a
                     href='https://faucet.kovan.network/'
                     target='_blank'
                     rel='noopener noreferrer'
                   > Kovan faucet</a>

## Tools

- Web3
- Truffle (To compile and migrate smart contract)
- Remix (To deploy smart contract)
- Infula (To delpoy on the Kovan test network)
- Chai
- React
- Bootstrap

## Licence

[MIT](./LICENSE.txt)

## Author

[Shoe Kure](https://github.com/roy1210)

## Ref

<a href='https://kovan.etherscan.io/tx/0x4d478730b46a97f2201e1518e7bc51a26758bc77d3d0687d00157cdbdbb985e8' target='_blank' rel='noopener noreferrer'>
Etherscan: Smart contract deploy details</a>
