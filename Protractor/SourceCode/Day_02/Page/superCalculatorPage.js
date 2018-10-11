var firstNumber = element(by.model('first'));
var secondNumber = element(by.model('second'));
var goButton = element(by.id('gobutton'));
var latestResult = element(by.binding('latest'));
var history = element.all(by.repeater('result in memory'));
var operator = element(by.model('operator'));
var option = element.all(by.tagName('option'));

module.exports.element = {
    firstNumber,
    secondNumber,
    goButton,
    latestResult,
    history,
    operator,
    option
}