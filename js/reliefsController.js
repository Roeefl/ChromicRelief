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
        }
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