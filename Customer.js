require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const config = require("./config");

let connection = mysql.createConnection({
  host: config.db_host,
  port: config.db_port,
  user: config.db_user,
  password: config.db_password,
  database: config.db_name
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

function displayProducts() {
  let query = "SELECT * FROM inventory";
  connection.query(query, function(err, res) {
    if (err) {
      throw err;
    } 
    else {
      console.log("\n\n" + "Welcome to Bamazon!" + "\n");
      console.table(res);
    }
    setTimeout(runSearch, 2000);
  });
}

displayProducts();

function runSearch() {
  inquirer
    .prompt({
      type: "input",
      name: "item",
      message:
        "\n\n" +
        "What is the Item_ID of the item that you would like to purchase?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    })
    .then(function(answer) {
      let item = answer.item;

      console.log(item);

      var query = "SELECT Item_Id, Stock_Quantity FROM inventory WHERE ?";

      connection.query(query, { Item_Id: item }, function(err, res) {
        let available = res[0].Stock_Quantity;

        buyItem(item, available);
      });
    });
}

function buyItem(item, available) {
  inquirer
    .prompt({
      type: "input",
      name: "count",
      message:
        "\n\n" +
        "How many would you like to purchase; we only have " +
        available +
        " in stock?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    })
    .then(function(answer) {
      console.log(answer.count);

      let purchasing = answer.count;

      let newQuantity = parseInt((available -= purchasing));

      var query = "UPDATE inventory SET Stock_Quantity =?   WHERE Item_Id=?";
      connection.query(query, [newQuantity, item], function(err, res) {
        console.log(
          "Your purchase was successful. Thanks for shopping Bamazon!"
        );
      });
      setTimeout(displayProducts, 3000);
    });
}
