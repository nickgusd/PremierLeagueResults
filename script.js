
$.getJSON("https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json", function (data) {

    let json = data
    let teams1 = []

    //code for generating Teams Array
    json.rounds.forEach((round, idx) => {

        round.matches.forEach((match, index) => {


            let i = 1;

            for (const [key, value] of Object.entries(match)) {

                if (key === 'team1') {
                    teams1.push(value)
                }

            }
        })

    })

    let teamList = teams1.slice(0, 20)

    teamList.push("Liverpool FC")


    //constructor function for generating team objects

    function Team(team, rank, wins, losses, draws, goalsFor, goalsAgainst, goalDifference, points) {

            this.team = team
            this.rank = rank
            this.wins = wins,
            this.losses = losses,
            this.draws = draws,
            this.goalsFor = goalsFor
            this.goalsAgainst = goalsAgainst,
            this.goalDifference = goalDifference,
            this.points = points

    }

    let teamObjects = {

    }

    teamList.forEach((team, idx) => {

        teamObjects[team] = new Team(team, 0, 0, 0, 0, 0, 0, 0, 0)

    })

    for (let i = 0; i < json.rounds.length; i++) {

        for (let j = 0; j < json.rounds[i].matches.length; j++) {

            let team1GoalsFor = json.rounds[i].matches[j].score.ft[0]
            let team2GoalsFor = json.rounds[i].matches[j].score.ft[1]
            let team1GoalsAgainst = json.rounds[i].matches[j].score.ft[1]
            let team2GoalsAgainst = json.rounds[i].matches[j].score.ft[0]



            let team1 = json.rounds[i].matches[j].team1
            let team2 = json.rounds[i].matches[j].team2

            teamObjects[team1].goalsFor += team1GoalsFor
            teamObjects[team2].goalsFor += team2GoalsFor
            teamObjects[team1].goalsAgainst += team1GoalsAgainst
            teamObjects[team2].goalsAgainst += team2GoalsAgainst


            //conditional for wins and losses
            if (json.rounds[i].matches[j].score.ft[0] > json.rounds[i].matches[j].score.ft[1]) {

                teamObjects[team1].wins++
                teamObjects[team2].losses++

            }
            //conditional for wins and losses
            if (json.rounds[i].matches[j].score.ft[1] > json.rounds[i].matches[j].score.ft[0]) {

                teamObjects[team2].wins++
                teamObjects[team1].losses++

            }

            //conditional for Draws

            if (json.rounds[i].matches[j].score.ft[0] === json.rounds[i].matches[j].score.ft[1]) {
                teamObjects[team1].draws++
                teamObjects[team2].draws++
            }

            //code for points 

            let team1Points = teamObjects[team1].wins * 3 + teamObjects[team1].draws * 1
            let team2Points = teamObjects[team2].wins * 3 + teamObjects[team2].draws * 1

            teamObjects[team1].points = team1Points
            teamObjects[team2].points = team2Points



            //code for goal Difference
            let team1GD = teamObjects[team1].goalsFor - teamObjects[team1].goalsAgainst
            let team2GD = teamObjects[team2].goalsFor - teamObjects[team2].goalsAgainst

            teamObjects[team1].goalDifference = team1GD
            teamObjects[team2].goalDifference = team2GD

        }

    }

    let list = []

    list = Object.keys(teamObjects).map((item, idx) => {

        return teamObjects[item]

    })

    //sorting final array for team standings

    let rank = list.sort((a, b) => {

        return b.points - a.points

    })

    //generating rank number based on sorting

    rank.forEach((item, index) => {

        rank[index].rank = index += 1

    })
 
    console.log(rank)
});   