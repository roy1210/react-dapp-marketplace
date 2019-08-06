import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Marketplace from '../abis/Marketplace.json';
import Navbar from './Navbar';
import Main from './Main';

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    // window.web3: Metamask
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    // Will get networks id, lather than hard code [5777].
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];

    if (networkData) {
      // address: Contract address
      const marketplace = web3.eth.Contract(
        Marketplace.abi,
        networkData.address
      );
      this.setState({ marketplace });
      this.setState({ loading: false });
      const productCount = await marketplace.methods.productCount().call();
      this.setState({ productCount });
      // Load products, i: index#
      for (let i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call();
        this.setState({
          products: [...this.state.products, product]
        });
      }
    } else {
      window.alert('Marketplace contract not deployed to network.');
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    };
    this.createProduct = this.createProduct.bind(this);
    this.purchaseProduct = this.purchaseProduct.bind(this);
  }

  async createProduct(name, price) {
    await this.setState({ loading: true });
    await this.state.marketplace.methods
      .createProduct(name, price)
      .send({ from: this.state.account })
      .then(this.setState({ loading: false }));
    // .once('receipt', receipt => {
    //   this.setState({ loading: false });
    // });
  }

  async purchaseProduct(id, price) {
    await this.setState({ loading: true });
    await this.state.marketplace.methods
      .purchaseProduct(id)
      .send({ from: this.state.account, value: price })
      // .then(this.setState({ loading: false }));
      .once('receipt', receipt => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className='container-fluid mt-5'>
          <div className='row'>
            <div className='col-lg-12 d-flex'>
              {this.state.loading ? (
                <div id='loader' className='text-center'>
                  <p className='text-center'>
                    Loading...Please re-flesh this page once Metamask informs
                    transaction confirmed{' '}
                  </p>
                </div>
              ) : (
                <Main
                  products={this.state.products}
                  createProduct={this.createProduct}
                  purchaseProduct={this.purchaseProduct}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
