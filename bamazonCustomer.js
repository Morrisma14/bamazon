var mysql = require("mysql");
var inquirer = require('inquirer');
var connection = mysql.createConnection ({
	host: "localhost",
	port: 3306,

	user: "root",

	password: "",
	database: "bamazon"
});


connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	afterConnection();
})


function afterConnection() {
	connection.query('SELECT id, product_name, price FROM products', (err, res) => {
		if (err) throw err;
		console.log(res);
		productSearch();
});	

}	

var productSearch = function() {
    console.log('\n  ');
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: " Enter the item_id of the product you want to purchase",

    }, {
        name: "quantity",
        type: "input",
        message: "Enter the stock_quantity you want to purchase",

    }]).then(function(userPurchase) {
        console.log("User Purchase", userPurchase)
        //connect to database to find stock_quantity in database. If user quantity input is greater than stock, decline purchase.
        var quantity = +userPurchase.quantity;
        connection.query("SELECT id, product_name, department_name, stock_quantity, price FROM products WHERE id=?", userPurchase.id, (err, res) => {
            console.log(JSON.stringify(res, null, 2))
            var item = res[0];
            if(err) throw err;            

            if (quantity > item.stock_quantity) {
                console.log("Insufecient Quantity");
                productSearch();

            } else {
                console.log("Item: " + item.product_name);
                console.log("Department: " + item.department_name);
                console.log("Price: " + item.price);
                console.log("Quantity: " + quantity);
                console.log("Total: " + item.price * quantity);

                var newStock = (item.stock_quantity - quantity);
                var purchaseId = (userPurchase.id);
                //console.log(newStock);
                confirmPrompt(newStock, purchaseId);
            }
        });
    });
}

function confirmPrompt(newStock, purchaseId) {

    inquirer.prompt([{

        type: "confirm",
        name: "confirmPurchase",
        message: "Are you sure you would like to purchase this item and quantity?",
        default: true

    }]).then(function(userConfirm) {
        if (userConfirm.confirmPurchase === true) {

            //if user confirms purchase, update mysql database with new stock quantity by subtracting user quantity purchased.

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newStock
            }, {
                item_id: purchaseId
            }], function(err, res) {});

            console.log("Transaction completed. Thank you.");
            productSearch();
        } else {
            console.log("Order Cancled");
            productSearch();
        }
    });
}