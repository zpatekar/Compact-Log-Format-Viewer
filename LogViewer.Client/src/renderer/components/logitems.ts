import angular from "angular";

angular.module("logViewerApp").component("logItems", {
    bindings: {
        logitems: "=",
        logOptions: "=",
        onPerformSearch: "&",
    },
    controllerAs: "vm",
    controller() {
        this.loadinglogs = false;

        // Functions
        this.search = search;
        this.findItem = findItem;
    },
    templateUrl: "components/log-items.html",
});

function search(logOptions) {
    // Reset pagenumber back to 1
    logOptions.pageNumber = 1;
    this.onPerformSearch();
}

function findItem(key, value) {
    this.logOptions.pageNumber = 1;
    if (isNaN(value)) {
        this.logOptions.filterExpression = key + "='" + value + "'";
    } else {
        this.logOptions.filterExpression = key + "=" + value;
    }

    this.onPerformSearch();
}
