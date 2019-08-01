// Can make test.js as boiler code

// Same as migrations code
const Marketplace = artifacts.require('Marketplace');

contract('Marketplace', accounts => {
  let marketplace;

  //just like checked in `truffle console`
  before(async () => {
    marketplace = await Marketplace.deployed();
  });

  describe('deplyment', async () => {
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
});
