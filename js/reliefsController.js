angular.module('chromicRelief.controllers', []).
  controller('reliefsController', function($scope) {
      $scope.reliefList = [
        {
          id: "parse-xkcd",
          alt: "xkcd",
          src: "xkcd"
        },
        {
          id: "parse-explosm",
          alt: "Cyanide and Happiness",
          src: "explosm"
        },
        {
          id: "parse-poorly",
          alt: "Poorly Drawn Lines",
          src: "poorly_drawn_lines"
        },
        {
          id: "parse-dirk",
          alt: "Dirks Big Bunnies",
          src: "dirks"
        },
        {
          id: "parse-geekandpoke",
          alt: "Geek and Poke",
          src: "geekandpoke"
        },
        {
          id: "parse-awkwardzombie",
          alt: "Awkward Zombie",
          src: "awkwardzombie"
        },
        {
          id: "parse-smbc",
          alt: "Saturday Morning Breakfast Cereal",
          src: "smbc"
        },
        {
          id: "parse-incidental",
          alt: "Incidental Comics",
          src: "incidental"
        },
        {
          id: "parse-awkwardyeti",
          alt: "The Awkward Yeti",
          src: "awkwardyeti"
        },
        {
          id: "parse-doghouse",
          alt: "The Doghouse Diaries",
          src: "doghouse"
        },
        {
          id: "parse-dailykitten",
          alt: "The Daily Kitten",
          src: "dailykitten"
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
          title: "Show All"
        },
        {
          id: "filter-comics",
          title: "Web Comics"
        },
        {
          id: "filter-animals",
          title: "Animal GIFs"
        }
      ];
});