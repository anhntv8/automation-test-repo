import { LoginPage } from '../po/orangeHRMLoginPage.po';
import { HomePage } from '../po/orangeHRMHomePage.po.';
import { loginData } from '../utils/constant';
describe('OrangeHRM Login Page', () => {
    let loginPage: LoginPage;
    beforeEach(() => {
        loginPage = new LoginPage();
        loginPage.goToLogin();
    });
  
    it('Username empty, password empty', () => {
        loginPage.loginOrangeHRM('', '');
        expect(loginPage.getSpanMessage()).toEqual(loginData.spanMessageUsernameEmpty);
    });
    it('Username empty, password pass', () => {
        loginPage.loginOrangeHRM('', loginData.validPassword);
        expect(loginPage.getSpanMessage()).toEqual(loginData.spanMessageUsernameEmpty);
    });

    it('Username pass, password empty', () => {
        loginPage.loginOrangeHRM(loginData.validUsername, '');
        expect(loginPage.getSpanMessage()).toEqual(loginData.spanMessagePasswordEmpty);
    });

    it('Username wrong, password pass', () => {
        loginPage.loginOrangeHRM(loginData.invalidUsername, loginData.validPassword);
        expect(loginPage.getSpanMessage()).toEqual(loginData.spanMessageUPWrong);
    });

    it('Username pass, password wrong', () => {
        loginPage.loginOrangeHRM(loginData.validUsername, loginData.invalidPassword);
        expect(loginPage.getSpanMessage()).toEqual(loginData.spanMessageUPWrong);
    });
    it('Username wrong, password wrong', () => {
        loginPage.loginOrangeHRM(loginData.invalidUsername, loginData.invalidPassword);
        expect(loginPage.getSpanMessage()).toEqual(loginData.spanMessageUPWrong);
    });

    it('Username pass, password pass', () => {
        loginPage.loginOrangeHRM(loginData.validUsername, loginData.validPassword);
        let homePage = new HomePage();
        expect(homePage.getTextWelcome()).toEqual(loginData.welcome + ' ' + loginData.validUsername);
        expect(homePage.checkDashboardIsTab()).toBeTruthy();
        expect(homePage.getTitleContent()).toEqual(loginData.dashboard);
        expect(homePage.checkQuickLaunchIsDisplayed()).toBeTruthy();
        expect(homePage.checkEmployeeDBSIsDisplayed()).toBeTruthy();
        expect(homePage.checkLegendIsDisplayed()).toBeTruthy();
        expect(homePage.checkPendingLRIsDisplayed()).toBeTruthy();
    });
  });