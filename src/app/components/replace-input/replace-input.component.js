"use strict";

angular.module("app").component("replaceInput", {
  templateUrl: "app/components/replace-input/replace-input.template.html",
  controllerAs: "vm",
  transclude: true,
  bindings: {
    replace: "<",
    resultsLength: "<",
    handleReplace: "&",
    handleReplaceAll: "&",
  },
  controller: function ReplaceInputController($scope) {
    var vm = this;
    vm.onClickReplace = onClickReplace;
    vm.onClickReplaceAll = onClickReplaceAll;

    function onClickReplace() {
      typeof vm.handleReplace === "function" &&
        vm.handleReplace({ replacePhrase: vm.replace });
    }

    function onClickReplaceAll() {
      typeof vm.handleReplaceAll === "function" &&
        vm.handleReplaceAll({ replacePhrase: vm.replace });
    }
  },
});
