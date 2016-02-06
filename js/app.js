var example = angular.module("2gnats", ["ngStorage"]);


example.controller("2gantsController", function($scope, $localStorage, $http) {
	var team = this;
	team.members = [];
    team.urls = [];

    $scope.add = function() {
        team.members.push($scope.yourAlias);
    }
    $scope.del = function(index) {
        team.members.splice(index, 1);
    }

    $scope.addLink = function() {
         team.urls.push({
          "linkName" : $scope.linkName,
          "linkUrl" : $scope.linkUrl
        });
    }
    $scope.delLink = function(index) {
        team.urls.splice(index, 1);
    }

    $scope.save = function() {
        $localStorage.message = "2gnats";
        $localStorage.alias = $scope.yourAlias;
        $localStorage.team = team.members;
        $localStorage.url = team.urls;
    }
    $scope.load = function() {
        $scope.data = $localStorage.message;
        $scope.yourAlias = $localStorage.alias;
        if ($localStorage.team) {
        	team.members = $localStorage.team;
        };
        if ($localStorage.url) {
            team.urls = $localStorage.url;
        };
    }
    $scope.getTeam = function() {
    	$scope.teamName = "dev-owner == ";
	    for (var i = 0; i < team.members.length; i++) {
	    	if (i!=0) $scope.teamName += " | dev-owner == ";
	    	$scope.teamName = $scope.teamName + "\""+team.members[i]+"\"";
	    };
	    team.showTeam = !team.showTeam;
    }
    //$scope.yourAlias = "dongdong";
    $scope.load();
    $scope.getTeam();
    team.showTeam = true;

    $http.get('pr.json').success(function(data) {
      $scope.prs = data;
      //alert($scope.prs.data[0].name);
    });
});
