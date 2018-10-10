// conf.js

var HtmlReporter =  require('../../node_modules/protractor-beautiful-reporter');

exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['Test/superCalculatorTest.js'],
    onPrepare: function() {
        // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
        jasmine.getEnv().addReporter(new HtmlReporter({
           baseDirectory: 'reports/screenshots'
        }).getJasmine2Reporter());
     }
}