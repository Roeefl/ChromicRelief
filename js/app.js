var chromicRelief = angular.module('chromicRelief', ['ngStorage']);

chromicRelief.config([
  '$compileProvider',
  function ($compileProvider) {
      //  Default imgSrcSanitizationWhitelist: /^\s*((https?|ftp|file|blob):|data:image\/)/
      //  chrome-extension: will be added to the end of the expression
      $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/);
  }
]);

chromicRelief.controller('mainController', function( $scope, $localStorage, $sessionStorage ) {

    $scope.$storage = $localStorage;

    $scope.displaySettings = { allowRandom: true };

    $scope.setAllowRandom = function setAllowRandom( allowRandom) {
      $scope.displaySettings.allowRandom = allowRandom;
    }

    $scope.filters = { };

    $scope.reliefList = [
      {
        id: "parse-xkcd",
        alt: "xkcd",
        src: "xkcd",
        category: "comic",
        allowRandom: true
      },
      {
        id: "parse-explosm",
        alt: "Cyanide and Happiness",
        src: "explosm",
        category: "comic",
        allowRandom: true
      },
      {
        id: "parse-poorly",
        alt: "Poorly Drawn Lines",
        src: "poorly_drawn_lines",
        category: "comic",
        allowRandom: true
      },
      {
        id: "parse-dirk",
        alt: "Dirks Big Bunnies",
        src: "dirks",
        category: "comic",
        allowRandom: false
      },
      {
        id: "parse-geekandpoke",
        alt: "Geek and Poke",
        src: "geekandpoke",
        category: "comic",
        allowRandom: false
      },
      {
        id: "parse-awkwardzombie",
        alt: "Awkward Zombie",
        src: "awkwardzombie",
        category: "comic",
        allowRandom: false
      },
      {
        id: "parse-smbc",
        alt: "Saturday Morning Breakfast Cereal",
        src: "smbc",
        category: "comic",
        allowRandom: true
      },
      {
        id: "parse-incidental",
        alt: "Incidental Comics",
        src: "incidental",
        category: "comic",
        allowRandom: false
      },
      {
        id: "parse-awkwardyeti",
        alt: "The Awkward Yeti",
        src: "awkwardyeti",
        category: "comic",
        allowRandom: true
      },
      {
        id: "parse-doghouse",
        alt: "The Doghouse Diaries",
        src: "doghouse",
        category: "comic",
        allowRandom: false
      },
      {
        id: "parse-dailykitten",
        alt: "The Daily Kitten",
        src: "dailykitten",
        category: "animalgif",
        allowRandom: false
      }
      // {
      //   id: "parse-abtrusegoose",
      //   alt: "Abtruse Goose",
      //   src: "abtrusegoose"
      // }
      /* {
        id: "parse-oatmeal",
        alt: "The Oatmeal",
        src: "oatmeal"
      } */
    ];

    $scope.filterList = [
      {
        id: "filter-all",
        title: "Show All",
        categories: ""
      },
      {
        id: "filter-comics",
        title: "Web Comics",
        categories: "comic"
      },
      {
        id: "filter-animals",
        title: "Animal GIFs",
        categories: "animalgif"
      }
    ];

    $scope.settingList = [
      {
        type: "checkbox",
        id: "cmn-toggle-1",
        class: "cmn-toggle cmn-toggle-round",
        title: "Get random comic instead of most recent (not fully implemented)",
        desc: "Get a random comic"
      }
    ];
});