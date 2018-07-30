var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "romeo",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    interface();
});


//Set up a prompt to ask what they want to do
function interface() {

    inquirer.prompt([

        {
            type: "list",
            message: "What would you like to do?",
            name: "startingPrompt",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product","End My Session"]
        }
    ])
        .then(function (response) {

            if (response.startingPrompt === "View Products for Sale") {
                viewProducts();
            }

            if (response.startingPrompt === "View Low Inventory") {
                lowInventory();
            }

            if (response.startingPrompt === "Add to Inventory") {
                
                addInventory();
            }

            if (response.startingPrompt === "Add New Product") {
                newItem();
            }
            if (response.startingPrompt === "End My Session") {
                connection.end();
            }

        })

};


//Set up function to see what products are for sale

function viewProducts() {
    console.log("All current products in inventory")
    connection.query("SELECT * from products", function (err, res) {
        if (err) throw err;
        console.table(res);
        interface();
    })

}
//function for lowinventory
function lowInventory() {
    console.log("Here is a list of low inventory items");
    connection.query("SELECT * FROM products WHERE stock < 25", function (err, res) {
        console.table(res);
        interface();
    })
};

//function for adding inventory
function addInventory() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);

    console.log("Add more to the inventory")

    inquirer.prompt([
        {
            type: "input",
            message: "What item number do you wish to add to?",
            name: "id"
        },
        {
            type: "input",
            message: "How many would you like to add?",
            name: "product"
        }
    ])
        .then(function (response) {

            var newInventory = connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock: parseInt(res[response.id - 1].stock) + parseInt(response.product)
                    },
                    {
                        id: response.id
                    }
                ]

            )
            interface();

        })
    })
}


//Set up function to add a new item

function newItem() {
    console.log("Add new item to inventory")

    inquirer.prompt([
        {
            type: "input",
            message: "What would you like to add?",
            name: "product"
        },
        {
            type: "input",
            message: "What department is it in?",
            name: "department"
        },
        {
            type: "input",
            message: "How much does it cost?",
            name: "price"
        },
        {
            type: "input",
            message: "How many are you adding?",
            name: "stock"
        }

    ])
        .then(function (answer) {

            var query = connection.query(
                "INSERT INTO products SET ?",
                {
                    product: answer.product,
                    department: answer.department,
                    price: answer.price,
                    stock: answer.stock
                }
            )
            //console.log(query.sql);
            interface(); 
        })
};
