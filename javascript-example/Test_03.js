var array = [3,2,2,2,2,3,4,2,2,2,3,4,2];
array = array.sort();
console.log(array);
var item = array[0];
var countMax = 1;
var count = 1;
for(let j = 1 ; j < array.length; j++){
    if(array[j] == array[j-1]){
        count ++;
    }else if(array[j] > array[j-1]){
        if(count > countMax){
            countMax = count;
            item = array[j - 1];
        }
        count = 0;
    }
}
console.log("item : " + item);
console.log("countMax = " + countMax);
