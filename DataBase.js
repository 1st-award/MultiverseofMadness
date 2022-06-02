function getRankingBoard(skipRankingNumber) {
    loadJSON("https://211.114.29.234:8000/score_board/?skip=" + skipRankingNumber + "&limit=10", getData);
}

function getData(data) {
    if (data.score_list.length != 0) {
        rankingList = data.score_list;
    }
    else {
        loadJSON("https://211.114.29.234:8000/score_board/?skip=0&limit=10", getData);
        skipRankingCount = 0;
    }
}

function postRanking(nickname, score, time) {
    const rankingObject = {
        "nickname": nickname,
        "score": score,
        "time": time
    };
}
