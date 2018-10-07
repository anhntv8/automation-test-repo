function apple1(type){
    this.color = "red";
    this.type = type;
}
// anti-pattern! keep reading...
function getAppleInfo() {
    return this.color + ' ' + this.type + ' apple';
}

var a = apple1("ssds");
console.log(a);