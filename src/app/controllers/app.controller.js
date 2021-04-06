"use strict";

angular.module("app").controller("AppController", AppController);

function AppController() {
  var vm = this;
  vm.handleSearch = handleSearch;
  vm.handleReplace = handleReplace;
  vm.handleReplaceAll = handleReplaceAll;
  vm.limit = 10;
  vm.loading = false;
  vm.replace = "";
  vm.results = [];
  vm.search = "";

  function handleSearch(searchedPhrase) {
    vm.search = searchedPhrase;
    vm.loading = true;
    var paramUrl = createParamsUrl();
    appService
      .getResults(paramUrl)
      .then(function (response) {
        vm.results = response.data.query.search;
        vm.loading = false;
      })
      .catch(function (error) {
        throw Error(error);
      });
  }

  function handleReplace(replacePhrase) {}

  function handleReplaceAll(replacePhrase) {}

  function createParamsUrl() {
    var params = {
      action: "query",
      list: "search",
      format: "json",
      srsearch: '"' + vm.search + '"',
      srLimit: vm.limit,
    };
    var paramsString = Object.keys(params)
      .map(function (key) {
        return key + "=" + params[key];
      })
      .join("&");
    return paramsString;
  }
}

angular.module("app").service("appService", appService);

function appService($http) {
  var vm = this;
  var APIUrl = "https://en.wikipedia.org/w/api.php?";

  vm.getResults = getResults;

  function getResults(paramUrl) {
    return $http({
      url: `${APIUrl}${paramUrl}`,
      method: "jsonp",
    });
  }
}
