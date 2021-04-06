"use strict";

angular.module("app").component("resultsList", {
  templateUrl: "app/components/results-list/results-list.template.html",
  controllerAs: "vm",
  transclude: true,
  bindings: {
    results: "<",
  },
});
