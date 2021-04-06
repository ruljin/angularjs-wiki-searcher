"use strict";

angular.module("app").config(function ($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    "self",
    "https://en.wikipedia.org/**",
  ]);
});
