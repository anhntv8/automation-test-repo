import { browser, by, element } from 'protractor';
export class HomePage{
    // create varibale
    welcome = element(by.id('welcome'));
    dashboardTab = element(by.xpath('//*[@id="menu_dashboard_index"]/b'));
    dashboardTitle = element(by.xpath('//*[@id="content"]//h1'));
    quickLaunchDashboard = element(by.id('panel_draggable_0_0'));
    employeeDBSDashboard = element(by.id('panel_resizable_1_0'));
    legendDashboard = element(by.id('panel_resizable_1_1'));
    pendingLRDashboard = element(by.id('panel_resizable_1_2'));

    //function
    getTextWelcome(){
        return this.welcome.getText();
    }

    getTitleContent(){
        return this.dashboardTitle.getText();
    }
    checkDashboardIsTab(){
        return this.dashboardTab.isDisplayed();
    }

    checkQuickLaunchIsDisplayed(){
        return this.quickLaunchDashboard.isDisplayed();
    }

    checkEmployeeDBSIsDisplayed(){
        return this.employeeDBSDashboard.isDisplayed();
    }

    checkLegendIsDisplayed(){
        return this.legendDashboard.isDisplayed();
    }

    checkPendingLRIsDisplayed(){
        return this.pendingLRDashboard.isDisplayed();
    }
}