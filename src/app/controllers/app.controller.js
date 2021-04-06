"use strict";

angular.module("app").controller("AppController", AppController);

function AppController(appService) {
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

  function handleReplace(replacePhrase) {
    vm.replace = replacePhrase;
    var resultsCopy = JSON.parse(JSON.stringify(vm.results));
    var resultsWithReplacedWord = replaceFirstHighlightedWordOccurence(
      resultsCopy,
      replacePhrase
    );
    vm.results = resultsWithReplacedWord;
  }

  function handleReplaceAll(replacePhrase) {
    vm.replace = replacePhrase;
    var resultsCopy = JSON.parse(JSON.stringify(vm.results));
    var resultsWithReplacedWords = replaceAllHighlightedWordOccurence(
      resultsCopy,
      replacePhrase
    );
    vm.results = resultsWithReplacedWords;
  }

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

  function replaceFirstHighlightedWordOccurence(oldResults, replacePhrase) {
    var regExp = new RegExp("<s*span[^>]*>(.*?)<s*/s*span>");
    const searchedResult = oldResults.find((result) => {
      return result.snippet.includes(vm.search);
    });
    searchedResult &&
      (searchedResult.snippet = searchedResult.snippet.replace(
        regExp,
        replacePhrase
      ));
    return oldResults;
  }

  function replaceAllHighlightedWordOccurence(oldResults, replacePhrase) {
    var regExp = new RegExp("<s*span[^>]*>(.*?)<s*/s*span>", "g");
    vm.replace = replacePhrase;
    oldResults.forEach((result) => {
      result.snippet = result.snippet.replaceAll(regExp, vm.replace);
    });
    return oldResults;
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
