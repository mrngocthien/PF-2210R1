let a = +prompt("Enter a amount of loan");
let r = +prompt("Enter the loan interest rates");
let n = +prompt("Enter the years of loan");
let i = (a * r)/100;
let sum = a + (n * i);

document.write("The money you have to pay after first year: " + i);
document.write("</br>");
document.write("The money you have to pay after " + n + " year: " + sum);
