// Copy all the code to other contracts, then change `Migrations`
const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
