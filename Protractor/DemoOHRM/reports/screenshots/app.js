var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "Username empty, password empty|OrangeHRM Login Page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2096,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://opensource-demo.orangehrmlive.com/ - [DOM] Found 2 elements with non-unique id #csrf_token: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1539270681215,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00b40012-00a7-0033-00dd-008600a3008d.png",
        "timestamp": 1539270677712,
        "duration": 4485
    },
    {
        "description": "Username empty, password pass|OrangeHRM Login Page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2096,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://opensource-demo.orangehrmlive.com/ - [DOM] Found 2 elements with non-unique id #csrf_token: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1539270685575,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00d60041-005d-0006-008c-008a007100df.png",
        "timestamp": 1539270685204,
        "duration": 681
    },
    {
        "description": "Username pass, password empty|OrangeHRM Login Page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2096,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://opensource-demo.orangehrmlive.com/ - [DOM] Found 2 elements with non-unique id #csrf_token: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1539270687134,
                "type": ""
            }
        ],
        "screenShotFile": "images\\008d001e-00ed-00c3-00ca-000400460006.png",
        "timestamp": 1539270686185,
        "duration": 1182
    },
    {
        "description": "Username wrong, password pass|OrangeHRM Login Page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2096,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://opensource-demo.orangehrmlive.com/ - [DOM] Found 2 elements with non-unique id #csrf_token: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1539270688261,
                "type": ""
            }
        ],
        "screenShotFile": "images\\007b00ed-002c-002b-00cf-00d1004500c6.png",
        "timestamp": 1539270687928,
        "duration": 998
    },
    {
        "description": "Username pass, password wrong|OrangeHRM Login Page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2096,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://opensource-demo.orangehrmlive.com/ - [DOM] Found 2 elements with non-unique id #csrf_token: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1539270689527,
                "type": ""
            }
        ],
        "screenShotFile": "images\\007600e4-00d9-003c-009b-007e008a00f1.png",
        "timestamp": 1539270689211,
        "duration": 1140
    },
    {
        "description": "Username wrong, password wrong|OrangeHRM Login Page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2096,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://opensource-demo.orangehrmlive.com/ - [DOM] Found 2 elements with non-unique id #csrf_token: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1539270691062,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00b9006a-009d-000f-009a-00ac00030054.png",
        "timestamp": 1539270690720,
        "duration": 933
    },
    {
        "description": "Username pass, password pass|OrangeHRM Login Page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2096,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://opensource-demo.orangehrmlive.com/ - [DOM] Found 2 elements with non-unique id #csrf_token: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1539270692335,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://opensource-demo.orangehrmlive.com/webres_5acde3dbd3adc6.90334155/js/jquery/jquery-1.7.2.min.js 3 Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.",
                "timestamp": 1539270694658,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00710093-004d-0022-00f1-003900af0092.png",
        "timestamp": 1539270691945,
        "duration": 4299
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
