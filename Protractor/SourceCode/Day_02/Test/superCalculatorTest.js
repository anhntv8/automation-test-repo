var elements = require('../Page/superCalculatorPage');




describe('Protractor Demo App', function () {
    // var firstNumber = element(by.model('first'));
    // var secondNumber = element(by.model('second'));
    // var goButton = element(by.id('gobutton'));
    // var latestResult = element(by.binding('latest'));
    // var history = element.all(by.repeater('result in memory'));
    // var operator = element(by.model('operator'));
    // var option = element.all(by.tagName('option'));

    function add(a, b) {
        selectedOperator(a, b, '+');
        let sum = a + b;
        expect(elements.element.latestResult.getText()).toEqual(sum.toString());
        historySum(a, b, '+');
    }

    function subtraction(a, b) {
        selectedOperator(a, b, '-');
        //  browser.pause();
        let sub = a - b;
        expect(elements.element.latestResult.getText()).toEqual(sub.toString());
        historySum(a, b, '-');
    }

    function division(a, b) {
        selectedOperator(a, b, '/');
        let div = a / b;
        expect(elements.element.latestResult.getText()).toEqual(div.toString());
    }

    function modulo(a, b) {
        selectedOperator(a, b, '%');
        let div = a % b;
        expect(elements.element.latestResult.getText()).toEqual(div.toString());
    }

    function mult(a, b) {
        selectedOperator(a, b, '*');
        let mul = a * b;
        expect(elements.element.latestResult.getText()).toEqual(mul.toString());
    }

    function selectedOperator(a, b, text) {
        elements.element.firstNumber.sendKeys(a);
        let op = element(by.cssContainingText('option', text));
        op.click();
        elements.element.secondNumber.sendKeys(b);
        elements.element.goButton.click();
    }

    function historySum(a, b, c) {
        let text = '' + a + ' ' + c + ' ' + b;
        let oper;
        switch (c) {
            case '+' :
                oper = a + b;
                break;
            case '-' :
                oper = a - b;
                break;
            case '*' :
                oper = a * b;
                break;
            case '/' :
                oper = a / b;
                break;
            case '%' :
                oper = a % b;
                break;
        }
        console.log("text " + text);
        console.log("oper " + oper);
        expect(elements.element.history.first().getText()).toContain(text);
        expect(elements.element.history.first().getText()).toContain(oper.toString());
    }

    beforeEach(function () {
        browser.get('http://juliemr.github.io/protractor-demo/');
    });
    it('function add', function () {
        add(3, 4);
    });
    it('function subtraction', function () {
        subtraction(10, 2);
    });
    it('function mult', function () {
        mult(9, 0);
    });
    it('function division', function () {
        division(25, 9);
    });
    it('function modulo', function () {
        modulo(6, 4);
        expect(elements.element.latestResult.getText()).toEqual(10); // failed
    });
});