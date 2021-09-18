// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword(); // need to make this function.
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Lines 18 -> 40  include functons that dispay confirm windows to the user and store their repsonse to see whcih types of characters theyd like to use. takes no inputs and returns a boolean shwing if they want this char type.

function askSpecial() {
  var isSpecial = false;
  isSpecial = window.confirm("Press OK to confirm including special characters.");
  return isSpecial;
}

function askNumeral() {
  var isNumeric;
  isNumeric = window.confirm("Press OK to confirm including numeric characters.");
  return isNumeric;
}

function askLower() {
  var isLower;
  isLower = window.confirm("Press OK to confirm including lower-case characters.");
  return isLower;
}

function askUpper() {
  var isUpper;
  isUpper = window.confirm("Press OK to confirm including upper-case characters.");
  return isUpper;
}

// this function takes in no inputs, and returns a number of characters to use for the password. also error checks to ensure the proper number range and to ensure the input is number.
function howManyChar() {
  var userInput = 0;

  while( userInput < 8 || userInput > 128 || isNaN(userInput)) {
    userInput = prompt("How many characters would you like your password to contain? (8-128)");

  }
  return userInput;
}
// function that takes an array and a string as inputs and returns a boolean showing if the array contains any characters from the string.
function checkInclusion(array1,string1) {
  var uncheckedPassword = string1.split("");
  var isVerified = false;

  for (var i = 0; i < uncheckedPassword.length; i++) {
    if ( array1.includes(uncheckedPassword[i])) {
      isVerified = true;
    }
  }

  return isVerified;
}

function generatePassword() {
  // made an empty passwordArray which i will use to concatinate with the other creatd arrays, based on the respnses form the user as to whcih characters to include.
  var passwordArray = [];
  var generatedPassword ="";
  var lowerArray = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  var upperArray =[];
  for (var i = 0; i < lowerArray.length; i++) {
    upperArray.push(lowerArray[i].toUpperCase());
  }
  var numberArray = ["1","2","3","4","5","6","7","8","9","0"];
  var specialArray = ["!","@","#","$","%","&","*","?"];

  var charNum = howManyChar(); 

  // puts boolean responses in local variables.

  var lower = askLower();
  var upper = askUpper();
  var special = askSpecial();
  var numeric = askNumeral();

  //error checks the user to ensure they select atleast one char type.
  while ( !lower && !upper && !special && !numeric) {
    window.alert("You need to include atleast one character type, try again!!");
    lower = askLower();
    upper = askUpper();
    special = askSpecial();
    numeric = askNumeral();
  }

  // logic to concatinate the passwordArray.
  if (lower === true){
    passwordArray = passwordArray.concat(lowerArray);
  } if ( upper === true) {
    passwordArray = passwordArray.concat(upperArray);
  } if (special === true) {
    passwordArray = passwordArray.concat(specialArray);
  } if ( numeric === true) {
    passwordArray = passwordArray.concat(numberArray);
  }

  // generates intial, unchecked password.
  for (var i = 0; i < charNum; i++) {
    var charSelection = passwordArray[Math.floor(Math.random() * passwordArray.length)];
    generatedPassword += charSelection;
  }
  //initializes these booleans as true.
  var verifiedLower = true;
  var verifiedUpper = true;
  var verifiedSpecial = true;
  var verifiedNumeric = true;

  // checks to see if any character types are missing from the password
  if (lower) {
    verifiedLower = checkInclusion(lowerArray, generatedPassword );
  } if (upper) {
    verifiedUpper = checkInclusion(upperArray, generatedPassword);
  } if (special) {
    verifiedSpecial = checkInclusion(specialArray, generatedPassword);
  } if (numeric) {
    verifiedNumeric = checkInclusion(numberArray, generatedPassword);
  }

  // if there is a character type missing, then remake the password & check until all conditions are met.
  while (!verifiedLower || !verifiedUpper || !verifiedSpecial || !verifiedNumeric) {
    generatedPassword = "";
    for (var i = 0; i < charNum; i++) {
      var charSelection = passwordArray[Math.floor(Math.random() * passwordArray.length)];
      generatedPassword += charSelection;
    }
    if (lower) {
      verifiedLower = checkInclusion(lowerArray, generatedPassword );
    } if (upper) {
      verifiedUpper = checkInclusion(upperArray, generatedPassword);
    } if (special) {
      verifiedSpecial = checkInclusion(specialArray, generatedPassword);
    } if (numeric) {
      verifiedNumeric = checkInclusion(numberArray, generatedPassword);
    }
  }

  // returns the final password to be presented!
  return generatedPassword;
}