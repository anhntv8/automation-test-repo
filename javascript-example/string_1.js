var text = "a. ha noi mua nay dep lem em em oi.";
// get char with index
console.log(text.charAt(1));
console.log(text.charAt(30));

console.log(text.charCodeAt(0));
console.log(text.charCodeAt(22));
//get 2 xau
console.log(text.concat("nha :D"));
// indexOf
console.log(text.indexOf("ha",30));
console.log(text.indexOf("ha"));
// lastIndexOf
console.log(text.lastIndexOf("ha",30));
console.log(text.lastIndexOf("ha"));
// localeCompare
console.log(text.localeCompare("la em"));
console.log(text.localeCompare("1aaa"));
console.log(text.localeCompare(text));
// match
console.log(text.match("em"));
console.log(text.match("kieu"));
//search
console.log(text.search("em"));
console.log(text.search("huong"));
// slice
console.log(text.slice(5,-1));
console.log(text.slice(40,110));