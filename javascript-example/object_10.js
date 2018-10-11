var library = [
    {
        title: 'Bill Gates',
        author: 'The Road Ahead',
        libraryID: 1254
    },
    {
        title: 'Steve Jobs',
        author: 'Walter Isaacson',
        libraryID: 4264
    },
    {
        title: 'Mockingjay: The Final Book of The Hunger Games',
        author: 'Suzanne Collins',
        libraryID: 3245
    }];

function sortByID(arrayObj) {
    var tmp;
    for (let i = 1; i < arrayObj.length; i++) {
        if (arrayObj[i].libraryID < arrayObj[i - 1].libraryID) {
            tmp = arrayObj[i].libraryID;
            arrayObj[i].libraryID = arrayObj[i - 1].libraryID;
            arrayObj[i - 1].libraryID = tmp;
        }
    }
    return arrayObj.sort();
}
library = sortByID(library);

// function sortObject(obj) {
//     obj = Object.entries(obj);
//     return  obj.sort();
// }
//  library.forEach(function(value, index) {
//     library[index] = sortObject(value);
//  });
  console.log(library);