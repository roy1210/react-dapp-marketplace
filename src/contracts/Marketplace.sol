pragma solidity ^0.5.0;


contract Marketplace {
    // State var
    string public name;
    uint public productCount = 0;
    // key: id, value: Product
    mapping(uint => Product) public products;
    // Data structure
    struct Product{
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    // constructor: function run only one times when deploy
    constructor() public {
        name = "Decentralised Marketplace";
    }

    // `_`: convention to mention local ver, not state var
    // `memory`: local var, not in blockchain
    function createProduct(string memory _name, uint _price) public {
        // Require a valid name
        require(bytes(_name).length >0);
        // Require a valid price
        require(_price >0);
        // Add product
        productCount ++;
        // Create the product
        products[productCount] = Product({
            id: productCount,
            name: _name,
            price: _price,
            owner: msg.sender,
            purchased: false
        });
        // Triger an event
        emit ProductCreated({
            id: productCount,
            name: _name,
            price: _price,
            owner: msg.sender,
            purchased: false
        });
    }

    // pyable: allow to use `value`
    function purchaseProduct(uint _id) public payable {
        // Fetch the product
        Product memory _product = products[_id];
        // Fetch the owner
        address payable _seller = _product.owner;
        // Make sure the procut has valid id
        require(_product.id > 0 && _product.id <= productCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price);
        // Require that the product has not been purchased already
        require(!_product.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        _product.owner = msg.sender;
        // Mark as purchased
        _product.purchased = true;
        // Update the product
        products[_id] = _product;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        // Trigger an event
        emit ProductPurchased({
            id: productCount,
            name: _product.name,
            price: _product.price,
            owner: msg.sender,
            purchased: true
        });
    }
}
