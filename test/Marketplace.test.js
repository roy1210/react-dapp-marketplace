// Can make test.js as boiler code

// Same as migrations code
const Marketplace = artifacts.require('Marketplace');

// Special function of Chai. To use `should`
require('chai')
  .use(require('chai-as-promised'))
  .should();

// accounts: Address #1~3 generated by Ganache
contract('Marketplace', ([deployer, seller, buyer]) => {
  let marketplace;

  //just like checked in `truffle console`
  before(async () => {
    marketplace = await Marketplace.deployed();
  });

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await marketplace.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it('has a name', async () => {
      const name = await marketplace.name();
      assert.equal(name, 'Decentralised Marketplace');
    });
  });

  describe('products', async () => {
    let result, productCount;

    before(async () => {
      //{ from: seller }: Meta data
      result = await marketplace.createProduct(
        'iphone',
        web3.utils.toWei('1', 'Ether'),
        { from: seller }
      );
      productCount = await marketplace.productCount();
    });

    it('creates products', async () => {
      // SUCCESS
      assert.equal(productCount, 1);
      // console.log(result.logs);
      const event = result.logs[0].args;
      assert.equal(
        event.id.toNumber(),
        productCount.toNumber(),
        'id is correct'
      );
      assert.equal(event.name, 'iphone', 'name is correct');
      assert.equal(event.price, '1000000000000000000', ' price is correct');
      assert.equal(event.owner, seller, 'owner is correct');
      assert.equal(event.purchased, false, 'purchased is correct');

      // Fail: Product must has a name
      await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), {
        from: seller
      }).should.be.rejected;
      // Fail: Product must has a name
      await marketplace.createProduct('iphone', 0, {
        from: seller
      }).should.be.rejected;
    });

    it('lists products', async () => {
      const product = await marketplace.products(productCount);
      assert.equal(
        product.id.toNumber(),
        productCount.toNumber(),
        'id is correct'
      );
      assert.equal(product.name, 'iphone', 'name is correct');
      assert.equal(product.price, '1000000000000000000', ' price is correct');
      assert.equal(product.owner, seller, 'owner is correct');
      assert.equal(product.purchased, false, 'purchased is correct');
    });

    it('sells products', async () => {
      // SUCCESS: Buyer makes purchase
      result = await marketplace.purchaseProduct(productCount, {
        from: buyer,
        value: web3.utils.toWei('1', 'Ether')
      });
      // Check logs
      const event = result.logs[0].args;
      assert.equal(
        event.id.toNumber(),
        productCount.toNumber(),
        'id is correct'
      );
      assert.equal(event.name, 'iphone', 'name is correct');
      assert.equal(event.price, '1000000000000000000', ' price is correct');
      assert.equal(event.owner, buyer, 'owner is correct');
      assert.equal(event.purchased, true, 'purchased is correct');
    });
  });
});