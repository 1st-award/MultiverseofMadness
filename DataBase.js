function getRankingBoard(skipRankingNumber) {
    /* json 형태로 랭킹을 불러오는 함수 */
    httpGet("https://211.114.29.234:8000/score_board/?skip=" + skipRankingNumber + "&limit=10", "json", getData, function () {
        // Get 실패시 임시 json을 만들어 연결 상태 불량 출력
        rankingList = [{"nickname": "Server", "score": "is", "time": "down"},
            {"nickname": "Please", "score": "try", "time": "later"}];
    });
}

function getData(data) {
    /* httpGet 성공 시 실행하는 함수 */
    if (data.score_list.length != 0) {
        // 가져온 데이터가 1개이상 일 때
        rankingList = data.score_list;
    } else {
        // 가져온 데이터가 없을 때 1 ~ 10등 데이터 Get 시도
        loadJSON("https://211.114.29.234:8000/score_board/?skip=0&limit=10", getData);
        skipRankingCount = 0;
    }
}

function postRanking(nickname, score, time, falseCount=0) {
    /* json 형태로 랭킹 등록하는 함수 */
    const rankingObject = {
        "nickname": nickname,
        "score": score,
        "time": time
    };
    httpPost("https://211.114.29.234:8000/score_board/", 'json', rankingObject, function () {
        // Post 성공시 true
        connectionStatus = true;
    }, function () {
        // Post 실패시 닉네임에 1을 추가하여 중복 회피
        falseCount += 1;
        connectionStatus = postRanking(nickname+falseCount, score, time, falseCount);
    });
}
