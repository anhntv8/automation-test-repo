import { browser, by, element } from 'protractor';
export class LoginPage{
    // create varibale
    userName = element(by.id('txtUsername'));
    password = element(by.id('txtPassword'));
    loginBtn = element(by.id('btnLogin'));
    spanMessage = element(by.id('spanMessage'));
    //create function
    goToLogin(){
        browser.waitForAngularEnabled(false);
       return browser.get('/');
    }
    loginOrangeHRM(userName, password){
        this.userName.sendKeys(userName);
        this.password.sendKeys(password);
        this.loginBtn.click();
    }

    getSpanMessage(){
       return this.spanMessage.getText();
    }

}