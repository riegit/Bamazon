# Bamazon
Node.js &amp; MySQL assignment

## Overview

Bamazon is an Amazon-like storefront using MySQL. This app will take in orders from customers and deplete stock from the store's inventory. 

## How To Use this App

### #1: Customer's View

Refer to the screenshots here
https://github.com/riegit/Bamazon/blob/master/ScreenShots/CustomersView.png

1. Running `bamazonCustomer.js`in terminal/bash should first display all of the items available for sale. Include the ids, names, prices of products for sale and stock quantity.

2. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

3. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, this app should log a message `Sorry, we do not have enough quantity!`, and then prevent the order from going through.

4. If the store _does_ have enough of the product, this app should fulfill the customer's order.
   * It should update the SQL database to reflect the remaining quantity.
   * Once the update goes through, it will show the customer the details of the purchase.
  
### #2: Manager's View

Refer to the screenshots here
https://github.com/riegit/Bamazon/blob/master/ScreenShots/ManagersView.png

1. Running `bamazonManager.js`in terminal/bash should first list a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

    * End Session

2.  If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

3. If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

4. If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

5. If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

6. If a manager selects `End Session`, it should display a message "Good Bye..." .
