// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
var HtmlReporter = require('protractor-beautiful-reporter');
const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  
  allScriptsTimeout: 11000,
  specs: [
    'spec/orangeHRMLoginTest.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'https://opensource-demo.orangehrmlive.com/index.php/auth/login',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    browser.driver.manage().window().maximize();
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: 'reports/screenshots',
      screenshotsSubfolder: 'images',
      jsonsSubfolder: 'jsons',
      docTitle: 'OrangeHRM Login Suite',
      preserveDirectory: false
   }).getJasmine2Reporter());
  }
  
};