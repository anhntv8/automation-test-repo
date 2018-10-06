var library = [
    {
        author: 'Bill Gates',
        title: 'The Road Ahead',
        readingStatus: true
    },
    {
        author: 'Steve Jobs',
        title: 'Walter Isaacson',
        readingStatus: true
    },
    {
        author: 'Suzanne Collins',
        title:  'Mockingjay: The Final Book of The Hunger Games',
        readingStatus: false
    }];
for(let i = 0; i < library.length; i++){
    console.log("Index = " + i);
    console.log("Book name : '" + library[i].title + "' \nauthor name : '" + library[i].author + "' \nreading status : '" + library[i].readingStatus + "'");
}