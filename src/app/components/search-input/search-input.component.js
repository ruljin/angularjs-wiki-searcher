"use strict";

angular.module("app").component("searchInput", {
  templateUrl: "app/components/search-input/search-input.template.html",
  controllerAs: "vm",
  transclude: true,
  bindings: {
    search: "<",
    handleSearch: "&",
  },
  controller: function SearchInputController() {
    var vm = this;
    vm.onClick = onClick;

    function onClick() {
      typeof vm.handleSearch === "function" &&
        vm.handleSearch({ searchedPhrase: vm.search });
    }
  },
});
