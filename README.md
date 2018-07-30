# "Bamazon"
---


Bamazon is an Amazon like node.js storefront CLI application that will take in orders from customers and keep a running count of available stock from the store's inventory. 

>*To start the app, npm install all dependencies, head to your node terminal and enter,* **"Customer.js"** *for customer view and,* **"Manager.js"** *for manager view*

Customer View will return all items in the store inventory, as well as give the option to purchase an item and what quantity.  If there is not sufficient quantity in stock the Customer will be asked to try again.  If successful the customer will then be given a total cost for their order.

## Here is an example of the Customer View
---


![Customer View](customerviews.gif)

---
## Manager View
---
Manager View will prompy the user with 5 options to choose from, 

1. View Products for sale
    * This returns a table of all the available products and their quantities.

2. View Low Inventory
    * This returns all products with a quanity of <25.
3. Add to Inventory
    * This allows the manager to select a product ID and add quantities to it.
4. Add New Product
    * This allows manager to add a new product to the inventory database.
---
## Here is an example of the Manager View
---
![Manager View](managerView.gif)

---
