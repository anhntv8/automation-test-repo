var number = 123.12902345812;

console.log(typeof number);
// check function of precision
console.log(number.toPrecision(7));
// check function of fixed
console.log(number.toFixed(7));
// check value of => return old type
console.log(number.valueOf());
console.log(typeof number.valueOf());
// check value of => return string type
console.log(number.toString());
console.log(typeof number.toString());
