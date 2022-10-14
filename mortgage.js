/*The Below code showcase the calculations involved in the mortgage payments. The input to the commands will be entered by the user
 the output will be printed to the console as a table

--------------MORTGAGE CALCULATION------------
Fixed Monthly Mortgage Repayment Calculation = P * r * (1 + r)^n / [(1 + r)^n – 1]
where P = Outstanding loan amount,
r = Effective monthly interest rate,
n = Total number of periods / months

On the other hand, the outstanding loan balance after payment m months is derived by using the below formula,

Outstanding Loan Balance = P * [(1 + r)^n – (1 + r)^m] / [(1 + r)^n – 1]

SOURCE= https://www.wallstreetmojo.com/mortgage-formula/

Additionlly, We will get the different input to our program from the console.
There are many methods to get the user input but here I am going to use the prompt-sync module like in the browser. 
to get the promp to work you need to install the prompt-sync module using the comand : npm install promt-sync( assuming node is already installed)
*/
const prompt = require("prompt-sync")();

var loanAmount = prompt("1. HOW MUCH MONEY WOULD YOU LIKE TO BORROW FROM THE BANK?");// Assigning the prompt input to the variable that stores the loan amount.
console.log("------------------------------------------------------------------"+"\n");// adds some text beneath the prompt output.


// The below loops runs only as long as the answer entered is not a number
// the loop is used as a data validation tool. expected input is a number
while(isNaN(loanAmount)){
    console.log("Please enter a valid amount"+ "\n");// prints to the consoloe text that tells the user to enter a valid amount should they enter anything other than a valid number
    loanAmount = prompt("1. HOW MUCH MONEY WOULD YOU LIKE TO BORROW FROM THE BANK?");// Assigning the prompt input to the variable that stores the loan amount.
    console.log("------------------------------------------------------------"+"\n");// adds some text beneath the prompt output.
}


// prints feedback to the console that tells the user the amount they chosed to borrow and adds a new line.
console.log(`You have chosen to borrow ${loanAmount}USD from the bank`+"\n"+"\n"); 

// the variable below will store the the amount the toatl number od periods for the loan
var durationsOfLoan = prompt("2. IN HOW MANY YEARS ARE YOU GOING TO PAY BACK THE LOAN?");
console.log("------------------------------------------------------------"+"\n"); // adds some text beneath the prompt output.

// loops runs only until the answerer enetred is not a number
// the loop is used is a data validation tool. expected input is a number
while(isNaN(durationsOfLoan)){
    console.log("Please enter a valid amount")// prints feeabdack promting the user to enter a valid amount.
    durationsOfLoan = prompt("2. IN HOW MANY YEARS ARE YOU GOING TO PAY BACK THE LOAN?");
    console.log("------------------------------------------------------------"+"\n");
}


const interestRate = 0.05/12; // interest rate of the bank fixed at 5% or 0.05 for a full year.
const numberOfpymts = durationsOfLoan * 12; // the number of payments to be made for the duration of the loan.

// prints feedback to the console and tells the user the total number of periods
console.log(`Thank you for the feedback. Your loan will be paid back in ${durationsOfLoan * 12} mensualities.` + " At ABC BANK the annual INTEREST RATE for this type of loan is 5%"); 

console.log("\n"); // adds empty sapce in the console.

//monthlypymt variable calculates the fixed monthly payment as per the loan repayment formula.
var monthlyPymt = (loanAmount * interestRate * Math.pow((1 + interestRate), numberOfpymts))/(Math.pow((1 + interestRate), numberOfpymts) -1)

var interest = 0; // initialise the variable that will hold the interest to zero
var principal =0;// initialise the variable that will hold the principal amount to zero
var endingBalance =0; // initialise the variable that will hold the ending balance to zero
var beginningBalance = 0;// initialise the variable that will hold the ending balance to zero


var payments = []; // this variable is the array that will contains payment objects

//Creating the payment class and its constructor that will contain different data for each month.
function payment(month,beginningBalance, monthlyPymt, interest, principal, endingBalance, cumulativeInterest){
    this.month = month,
    this.beginningBalance = beginningBalance,
    this.monthlyPymt =monthlyPymt,
    this.interest =interest,
    this.principal = principal,
    this.endingBalance =endingBalance,
    this.cumulativeInterest = cumulativeInterest
}

//The number of iterations of the loop is determined by the number of payments in a particular month.
for(var month = 1; month <= numberOfpymts; month++){
    
    if(month == 1){
        beginningBalance = loanAmount //sets the beginining balance to the loan amount in the first month.
    }
    else{
        beginningBalance = endingBalance //sets the begining balance to theprevious ending balance.
    }
    
    interest = beginningBalance * interestRate; //calculates to 2sf the interest paid
    principal = monthlyPymt - interest; //calculates to 2sf the the principal amount o fthe loan for a particular month
    if(beginningBalance>monthlyPymt){
        endingBalance = beginningBalance - principal; //calculates the ending balance when the the begining balnce is more than the monthly payment.
    }
    else{
        endingBalance = 0; //sets the ending balance to zero when the beginning balance is less than the monthly payment. which means that the loan has been piad for in full.
    }
    
    if( month == 1){// checks if the this is the first payment.
        cumulativeInterest = interest// sets the cumilative interest to to the value of the interest in the first month
    }
    else{
        cumulativeInterest = cumulativeInterest + interest;// compounds the interests with that of previous months.
    }

   //pushes a payment object to the payments array for each iteration of the loop.
    payments.push(new payment(month, Number(beginningBalance).toFixed(2), Number(monthlyPymt).toFixed(2), Number(interest).toFixed(2), Number(principal).toFixed(2), Number(endingBalance).toFixed(2), Number(cumulativeInterest).toFixed(2)))
    
}

console.table(payments); // prints the content of payments array as a table to the console.

