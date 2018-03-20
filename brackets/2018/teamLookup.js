var teamLookup = {};
var officialMap = {};
var officialString = "";


$.ajax({ 
    url: 'http://g.espncdn.com/tournament-challenge-bracket/2018/en/ios/api/v4/games', 
    dataType: 'json', 
    async: false, 
    success: function(gamesData){ 

        var furthestRound = 1;
    	var games = gamesData.games;
    	for (i = 0; i <= 62; i++) { 
    		game = games[i];
        	teams = game.teams;
            
            if(typeof teams != "undefined") {
                
                var two = [0,1];
                two.forEach(function(t) {
                    if(typeof teams[t] != "undefined") {    
                        thisTeam = teams[t].team;
                        thisTeam.image = "http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/" + thisTeam.sportsTeamId + ".png&h=30&w=30";
                        if(thisTeam.teamID < 10) { thisTeam.teamID = "0" + thisTeam.teamID; }
                        thisTeam['furthestRound'] = furthestRound;
                        if (i > 31) { officialString += thisTeam.teamID + '|'; }
                        teamLookup[thisTeam.teamID] = thisTeam;            
                    } else {
                        officialString += '00|';
                    }   
                });
        	} else {
                officialString += '00|00|';
            }

            if(i == 62) {
                if(typeof game.winningTeamID != "undefined") {
                    officialString += game.winningTeamID;
                } else {
                    officialString += '00';
                }
            }
            if(i == 31 || i == 47 || i == 55 || i == 59 || i == 61 || i == 62 ) { furthestRound++; }
    	}

        var officialArray = officialString.split("|");

        officialMap = {
            2: officialArray.slice(0, 32),
            3: officialArray.slice(32, 48),
            4: officialArray.slice(48, 56),
            5: officialArray.slice(56, 60),
            6: officialArray.slice(60, 62),
            7: officialArray.slice(62, 63)
        }

    }

});

