var mysql = require('mysql');//npm install mysql inquirer console.table --save
var inquirer = require('inquirer');
var cTable = require('console.table');

var config = {
    host: 'localhost',
    port: 3306,
    // Your username
    user: 'root',
    // Your password
    password: 'romeo',
    database: 'bamazon'
}

var connection = mysql.createConnection(config);

connection.connect(function (err) {
    if (err) throw err;
    //console.log('Welcome to Bamazon! You are Shopper #' + connection.threadId);
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.table(res);
        start(res);
    });
});
// function which prompts the user for what action they should take
function start(results) {
    inquirer
        .prompt([
            {
                name: 'productChoice',
                type: 'input',
                message: 'Welcome to Bamazon! You are shopper #' + connection.threadId + '. Choose the ID of the item you would like to purchase.'
            },
            {
                name: 'purchaseQuantity',
                type: 'input',
                message: 'Choose the quantity that you would like to purchase.'
            }
        ]).then(function (answer) {
            // based on their answer, either... or...
            // console.log(answer);
            var sel = results[answer.productChoice - 1];
            if (sel.stock < answer.purchaseQuantity) {
                console.log('Sorry we only have ' + sel.stock + ' of that item left in stock. Please try again.');
                connection.end();
            } else {
                var updatedQuantity = sel.stock - answer.purchaseQuantity;
                var query = 'UPDATE products SET ? WHERE ?';
                connection.query(query, [
                    {
                        stock: updatedQuantity
                    },
                    {
                        id: sel.id
                    }
                ], function (err, data) {
                    if (err) {
                        throw err;
                    } else {
                        var total = sel.price * answer.purchaseQuantity;
                        console.log('Your total is $' + parseFloat(total).toFixed(2) + '. Thank you for Shopping with Bamazon!');
                        connection.end();
                    }
                });
            }
        })
}