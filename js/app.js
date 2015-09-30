var example = angular.module("2gnats", ["ngStorage"]);


example.controller("2gantsController", function($scope, $localStorage) {
	var team = this;
	team.members = ["lilyzhou", "royluo", "yfshao"];

    $scope.add = function() {
        team.members.push($scope.yourAlias);
    }
    $scope.del = function(index) {
        team.members.splice(index, 1);
    }
    $scope.save = function() {
        $localStorage.message = "2gnats";
        $localStorage.alias = $scope.yourAlias;
        $localStorage.team = team.members;
    }
    $scope.load = function() {
        $scope.data = $localStorage.message;
        $scope.yourAlias = $localStorage.alias;
        team.members = $localStorage.team;
    }
    $scope.getTeam = function() {
    	$scope.teamName = "dev-owner == ";
	    for (var i = 0; i < team.members.length; i++) {
	    	if (i!=0) $scope.teamName += " | dev-owner == ";
	    	$scope.teamName = $scope.teamName + "\""+team.members[i]+"\"";
	    };
	    team.showTeam = !team.showTeam;
    }
    //(dev-owner == "yfshao" & state != "suspended" & state != "closed")
    //$scope.yourAlias = "dongdong";
    $scope.load();
    $scope.getTeam();
    team.showTeam = true;
});