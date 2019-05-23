/* Schema for SQL database/table.*/
DROP DATABASE IF EXISTS bamazon_DB;

/* Create database */
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

/* Create new table with a primary key that auto-increments.*/
CREATE TABLE inventory (
  Item_ID INT NOT NULL AUTO_INCREMENT,
  Product_Name VARCHAR(250) NOT NULL,
  Department_Name VARCHAR(250) NOT NULL,
  Price DECIMAL(5,2) NOT NULL,
  Stock_Quantity INT(3) NOT NULL,
  PRIMARY KEY (Item_ID)
);

/* Insert 5 Rows into your new table */
INSERT INTO inventory (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Boxed Baking Soda", "Grocery Non-Perishable", .75, 65);

INSERT INTO inventory (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Bag Frozen Meatballs 8oz Bag", "Grocery Perishable", 6.99, 20);

INSERT INTO inventory (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Iron", "Household Goods", 19.99, 40);

INSERT INTO inventory (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Skillet", "Household Goods", 7.00, 35);

INSERT INTO inventory (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Dawn Dish Soap", "Grocery Non-Perishable", 1.07, 47);
