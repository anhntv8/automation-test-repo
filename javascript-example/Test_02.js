function SortString(text) {
    var array = Array.from (text);
    array.sort();
    var textSort = array[0];
    console.log(array);
    for(var i = 2; i < text.length ; i++){
        if(array[i] > array[i-1]){
            textSort+= array[i];
        }
    }
    return textSort;
}
console.log(SortString('agvdfbdfbnaAFDF'));