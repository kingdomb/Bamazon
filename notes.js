// As always, we grab the fs package to handle read/write.
var fs = require("fs");

// Next, we store the text given to us from the command line.
var text = process.argv[2];

// Next, we append the text into the "sample.txt" file.
// If the file didn't exist, then it gets created on the fly.
fs.appendFile("sample.txt", text, function(err) {

  // If an error was experienced we will log it.
  if (err) {
    console.log(err);
  }

  // If no error is experienced, we'll log the phrase "Content Added" to our node console.
  else {
    console.log("Content Added!");
  }

});
_________________________________________________________________

// Load the NPM Package inquirer
var inquirer = require("inquirer");

// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "What is your name?",
      name: "username"
    },
    // Here we create a basic password-protected text prompt.
    {
      type: "password",
      message: "Set your password",
      name: "password"
    },
    // Here we give the user a list to choose from.
    {
      type: "list",
      message: "Which Pokemon do you choose?",
      choices: ["Bulbasaur", "Squirtle", "Charmander"],
      name: "pokemon"
    },
    //Here we give the user checkbox list to choose from.
    {
      type: "checkbox",
      name: "carryingWhat",
      message: "What are you carrying in your hands??",
      choices: ["TV", "Slice of Toast", "Butter Knife"]
    },
    // Here we ask the user to confirm.
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    }
  ])
  .then(function(inquirerResponse) {
    console.log(JSON.stringify(inquirerResponse, null, 2));
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inquirerResponse.confirm) {
      console.log("\nWelcome " + inquirerResponse.username);
      console.log("Your " + inquirerResponse.pokemon + " is ready for battle!\n");
    }
    else {
      console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
    }
  });
  _________________________________________________________________

  var count = 0;

  var askQuestion = function() {
    // if statement to ensure that our questions are only asked five times
    if (count < 5) {
      // runs inquirer and asks the user a series of questions whose replies are
      // stored within the variable answers inside of the .then statement
      inquirer.prompt([
        {
          name: "name",
          message: "What is your name?"
        }, {
          name: "position",
          message: "What is your current position?"
        }, {
          name: "age",
          message: "How old are you?"
        }, {
          name: "language",
          message: "What is your favorite programming language?"
        }
      ]).then(function(answers) {
        // initializes the variable newProgrammer to be a programmer object which will take
        // in all of the user's answers to the questions above
        var newProgrammer = new Programmer(
          answers.name,
          answers.position,
          answers.age,
          answers.language);
        // printInfo method is run to show that the newProgrammer object was successfully created and filled
        newProgrammer.printInfo();
        // add one to count to increment our recursive loop by one
        count++;
        // run the askquestion function again so as to either end the loop or ask the questions again
        askQuestion();
      });
      // else statement which prints "all questions asked" to the console
      // when the code has been run five times
    }
    else {
      console.log("All questions asked");
    }
  };
  
  // call askquestion to run our code
  askQuestion();
  _________________________________________________________________

  