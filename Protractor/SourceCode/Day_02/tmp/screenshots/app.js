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
        "description": "function add|Protractor Demo App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f55d74435d3b8ab9c811ec9923834b77",
        "instanceId": 8556,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://juliemr.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1539184144747,
                "type": ""
            }
        ],
        "screenShotFile": "00bb0060-00af-00ea-0039-00fe00f40074.png",
        "timestamp": 1539184142357,
        "duration": 5549
    },
    {
        "description": "function subtraction|Protractor Demo App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f55d74435d3b8ab9c811ec9923834b77",
        "instanceId": 8556,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00bb0039-003a-00e8-001b-00560077008d.png",
        "timestamp": 1539184148472,
        "duration": 3389
    },
    {
        "description": "function mult|Protractor Demo App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f55d74435d3b8ab9c811ec9923834b77",
        "instanceId": 8556,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "006a0097-00a9-00ca-009c-009400d500c6.png",
        "timestamp": 1539184152899,
        "duration": 2766
    },
    {
        "description": "function division|Protractor Demo App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f55d74435d3b8ab9c811ec9923834b77",
        "instanceId": 8556,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "009100b1-0046-00b1-0076-003d00830059.png",
        "timestamp": 1539184156015,
        "duration": 2856
    },
    {
        "description": "function modulo|Protractor Demo App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f55d74435d3b8ab9c811ec9923834b77",
        "instanceId": 8556,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "002c00ad-005f-0096-00b5-00ed0077003d.png",
        "timestamp": 1539184159327,
        "duration": 2960
    },
    {
        "description": "function add|Protractor Demo App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "306533d5ae673ee0b844d2dc878aee15",
        "instanceId": 11260,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://juliemr.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1539184962282,
                "type": ""
            }
        ],
        "screenShotFile": "006900d2-0015-0002-001f-00470086006d.png",
        "timestamp": 1539184960820,
        "duration": 4285
    },
    {
        "description": "function subtraction|Protractor Demo App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "306533d5ae673ee0b844d2dc878aee15",
        "instanceId": 11260,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "003e0049-004a-00d0-00ca-00ea004f002d.png",
        "timestamp": 1539184967135,
        "duration": 2921
    },
    {
        "description": "function mult|Protractor Demo App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "306533d5ae673ee0b844d2dc878aee15",
        "instanceId": 11260,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00c8007a-000e-0007-004f-000900f00074.png",
        "timestamp": 1539184970316,
        "duration": 2621
    },
    {
        "description": "function division|Protractor Demo App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "306533d5ae673ee0b844d2dc878aee15",
        "instanceId": 11260,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004f006d-00aa-00ff-0054-00de00f8009f.png",
        "timestamp": 1539184973228,
        "duration": 2649
    },
    {
        "description": "function modulo|Protractor Demo App",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "306533d5ae673ee0b844d2dc878aee15",
        "instanceId": 11260,
        "browser": {
            "name": "chrome",
            "version": "69.0.3497.100"
        },
        "message": [
            "Expected '2' to equal 10."
        ],
        "trace": [
            "Error: Failed expectation\n    at UserContext.<anonymous> (E:\\Training\\Protractor\\ProtractorDemo\\spec_1.js:94:40)\n    at C:\\Users\\Admin\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\Admin\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\Admin\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\Admin\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\Admin\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\Admin\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\Admin\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\Admin\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7"
        ],
        "browserLogs": [],
        "screenShotFile": "00e8007b-00e5-0075-00bd-00f100d6006b.png",
        "timestamp": 1539184976130,
        "duration": 2705
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
