var chromicRelief = angular.module('chromicRelief', []);

chromicRelief.config([
  '$compileProvider',
  function ($compileProvider) {
      //  Default imgSrcSanitizationWhitelist: /^\s*((https?|ftp|file|blob):|data:image\/)/
      //  chrome-extension: will be added to the end of the expression
      $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/);
  }
]);

chromicRelief.controller('mainController', function($scope) {
      $scope.filters = { };

      $scope.reliefList = [
        {
          id: "parse-xkcd",
          alt: "xkcd",
          src: "xkcd",
          category: "comic"
        },
        {
          id: "parse-explosm",
          alt: "Cyanide and Happiness",
          src: "explosm",
          category: "comic"
        },
        {
          id: "parse-poorly",
          alt: "Poorly Drawn Lines",
          src: "poorly_drawn_lines",
          category: "comic"
        },
        {
          id: "parse-dirk",
          alt: "Dirks Big Bunnies",
          src: "dirks",
          category: "comic"
        },
        {
          id: "parse-geekandpoke",
          alt: "Geek and Poke",
          src: "geekandpoke",
          category: "comic"
        },
        {
          id: "parse-awkwardzombie",
          alt: "Awkward Zombie",
          src: "awkwardzombie",
          category: "comic"
        },
        {
          id: "parse-smbc",
          alt: "Saturday Morning Breakfast Cereal",
          src: "smbc",
          category: "comic"
        },
        {
          id: "parse-incidental",
          alt: "Incidental Comics",
          src: "incidental",
          category: "comic"
        },
        {
          id: "parse-awkwardyeti",
          alt: "The Awkward Yeti",
          src: "awkwardyeti",
          category: "comic"
        },
        {
          id: "parse-doghouse",
          alt: "The Doghouse Diaries",
          src: "doghouse",
          category: "comic"
        },
        {
          id: "parse-dailykitten",
          alt: "The Daily Kitten",
          src: "dailykitten",
          category: "animalgif"
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
});