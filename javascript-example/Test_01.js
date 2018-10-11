let text ;
console.log('if ... else');
for(let i = 1;  i <= 100; i++){
    text = "";
    if (i%3 == 0 ){
        text = 'Fizz';
    }
    if (i%5 == 0 ){
        text += 'Buzz';
    }
    /* if(text !== ''){
      console.log( i + ': ' + text);
      }
      */
}
console.log('condition ? Function 1 : Function2');
let i = 1;
while (i <= 100){
    text = "";
    i % 3 == 0 ? text = 'Fizz': '';
    i % 5 == 0 ? text += 'Buzz': '' ;
    if(text !== ''){
        console.log( i + ': ' + text);
    }
    i++;
}