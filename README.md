# Gadgets-Store
Gadgets-Store is an E-Commerce website where Electronic gadgets can be sold by vendor and brought by users

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
Before running the server on your local machine, following *npm packages* must be installed in the same directory where you have cloned the project.

*requirements*
* [nodejs](https://nodejs.org)
* npm
* [mysql](https://www.mysql.com)
* [mongodb](https://www.mongodb.com)

You can install them manually or run the following command
```
  npm install
```
*Database*
* sqlite - For storing Users, Vendors,etc tables.

## Database Usage
For sqlite, To create a database
```
  create database "Gadgets-Store";
  create user "gadgets" identified by "123456";
  use Gadgets-Store;
  GRANT ALL PRIVILEGES ON Gadgets-Store.* to "gadgets";
  FLUSH PRIVILEGES;
  
```
*Note: These are default credentials hardcoded inside Gadgets-Store/Web Application/database/sqlDatabase.js and can be changed. All the above commands must be executed as root user of mysql*

## Running The Server On Your Machine
```
  cd ./site
  node server.js
```
*Note: The default port, the website runs on is 7700 and can be changed in server.js"

## Screenshots
### Homepage
<img src="https://github.com/Sshashank18/Gadgets-Store/blob/master/Screenshots/Homepage.png"
     style="float: left; margin-right: 10px;"/>

### Signup
<img src="https://github.com/Sshashank18/Gadgets-Store/blob/master/Screenshots/Signup.png"
     style="float: left; margin-right: 10px;"/>
     

### Login
<img src="https://github.com/Sshashank18/Gadgets-Store/blob/master/Screenshots/Login.png"
     style="float: left; margin-right: 10px;"/>

### User Homepage
<img src="https://github.com/Bhaikko/GamerParadise/blob/master/Screenshots/UserHomepage.png"
     style="float: left; margin-right: 10px;"/>
     
### Products
<img src="https://github.com/Sshashank18/Gadgets-Store/blob/master/Screenshots/Products.png"
     style="float: left; margin-right: 10px;"/>
     
### Product Details
<img src="https://github.com/Sshashank18/Gadgets-Store/blob/master/Screenshots/ProductDetails.png"
     style="float: left; margin-right: 10px;"/>
     
### User Cart
<img src="https://github.com/Bhaikko/GamerParadise/blob/master/Screenshots/Cart.png"
     style="float: left; margin-right: 10px;"/>
     
### User Orders
<img src="https://github.com/Bhaikko/GamerParadise/blob/master/Screenshots/Orders.png"
     style="float: left; margin-right: 10px;"/>

### Vendor Dashboard
<img src="https://github.com/Bhaikko/GamerParadise/blob/master/Screenshots/VendorHomepage.png"
     style="float: left; margin-right: 10px;"/>
     
### Vendor Products
<img src="https://github.com/Bhaikko/GamerParadise/blob/master/Screenshots/VendorProducts.png"
     style="float: left; margin-right: 10px;"/>

### Vendor AddItem
<img src="https://github.com/Bhaikko/GamerParadise/blob/master/Screenshots/vendorAddItem.png"
     style="float: left; margin-right: 10px;"/>


