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
    var numberOfSearchedPhrases = countSearchedPhraseNumber(resultsCopy);
    replaceAllHighlightedWordOccurence(
      resultsCopy,
      replacePhrase,
      numberOfSearchedPhrases
    );
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
    var searchedResult = oldResults.find((result) => {
      return result.snippet.toLowerCase().includes(vm.search.toLowerCase());
    });
    var regExp = new RegExp(`<s*span[^>]*>(.*?)<s*/s*span>`);
    if (searchedResult) {
      var index = searchedResult.snippet
        .toLowerCase()
        .indexOf(vm.search.toLowerCase());
      var newText = replaceWordAtPosition(
        index,
        searchedResult.snippet,
        replacePhrase
      );
      searchedResult.snippet = newText.replace(
        regExp,
        newText.match(regExp)[1]
      );
    }
    return oldResults;
  }

  function replaceAllHighlightedWordOccurence(
    oldResults,
    replacePhrase,
    count
  ) {
    var newCounter = count;
    if (newCounter > 0) {
      var newResults = replaceFirstHighlightedWordOccurence(
        oldResults,
        replacePhrase
      );
      if (newResults.length) {
        replaceAllHighlightedWordOccurence(newResults, replacePhrase, --count);
      }
    } else {
      vm.results = oldResults;
    }
  }

  function replaceWordAtPosition(index, text, replacement) {
    return (
      text.substr(0, index) +
      replacement +
      text.substr(index + vm.search.length)
    );
  }

  function countSearchedPhraseNumber(collection) {
    var count = 0;
    var regExp = new RegExp("<s*span[^>]*>(.*?)<s*/s*span>", "g");
    collection.forEach((element) => {
      count += (element.snippet.match(regExp) || []).length;
    });
    return count;
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
