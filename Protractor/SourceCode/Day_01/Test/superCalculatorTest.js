describe('Protractor Demo App', function() {
    var firstNumber = element(by.model('first'));
    var secondNumber = element(by.model('second'));
    var goButton = element(by.id('gobutton'));
    var latestResult = element(by.binding('latest'));
    var history = element.all(by.repeater('result in memory'));
    var operator = element(by.model('operator'));
    var option = element.all(by.tagName('option'));

    function add(a, b) {
        selectedOperator(a, b,'+');
        browser.pause();
        let sum = a + b;
        expect(latestResult.getText()).toEqual(sum.toString());
        historySum(a, b, '+');
    }

    function subtraction(a, b) {
        selectedOperator(a, b,'-');
        browser.pause();
        let sub = a - b;
        expect(latestResult.getText()).toEqual(sub.toString());
        historySum(a, b, '-');
    }
    function division(a, b) {
        selectedOperator(a, b,'/');
        let div = a / b;
        expect(latestResult.getText()).toEqual(div.toString());
    }
    function modulo(a, b) {
        selectedOperator(a, b,'%');
        let div = a % b;
        expect(latestResult.getText()).toEqual(div.toString());
    }
    function mult(a, b) {
        selectedOperator(a, b,'*');
        let mul = a * b;
        expect(latestResult.getText()).toEqual(mul.toString());
    }
    function selectedOperator(a, b, text){
        firstNumber.sendKeys(a);
        let op = element(by.cssContainingText('option', text));
        op.click();
        secondNumber.sendKeys(b);
        goButton.click();
    }

    function historySum(a, b, c){
        let text = '' + a + ' ' + c + ' '+ b;
        let oper;
        switch(c){
            case '+' : oper = a + b;
                break;
            case '-' : oper = a - b;
                break;
            case '*' : oper = a * b;
                break;
            case '/' : oper = a / b;
                break;
            case '%' : oper = a % b;
                break;
        }
        console.log("text " + text);
        console.log("oper " + oper);
        expect(history.last().getText()).toContain(text);
        expect(history.last().getText()).toContain(oper.toString());
    }
    beforeEach(function() {
        browser.get('http://juliemr.github.io/protractor-demo/');
    });

    it('should have a history', function() {
      //  add(3, 4);
        subtraction(10, 2);

        //add(3, 4);
        // mult(9,0);
        // division(25,9);
        // modulo(6,4);

    });
});