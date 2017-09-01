//모듈을 변수에 저장
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var gcm = require('node-gcm');
var fs = require('fs');
var path = require('path');

/**
 *  Mysql Connection Setting
 */
var mysql = require('mysql');

function connDB() {
	var connection = mysql.createConnection({
		host : '127.0.0.1',
		user : 'root',
		password : '!zxasqw12',
		port: 3306,
		database: 'rtes'
	});
	return connection;
}


/**
 *  GCM Connection Setting
 */
var serverAPIKey = 'AIzaSyAKUM0shdB9GGvGDO9MYkWROCkuBtYg-2o';
var sender = new gcm.Sender(serverAPIKey); // 구글 프로젝트에 등록한 GCM 서비스에서 만든 server API key를 입력한다.
var registrationIds = [];

/**
 * room manage
 */

var room_manage = [];

//포트 설정 
app.set('port', 3000);
//favicon 설정 
app.use(express.favicon());
//POST body 읽기 
app.use(express.bodyParser());
//static 파일 경로 설정
app.use(express.static(path.join(__dirname, 'public')));

//App 실행
app.start = app.listen = app.aaa = function(){
	return server.listen.apply(server, arguments);
}
app.aaa(app.get('port'),function(){
	console.log("Server Start");
});

// 서비스 파일 include 함수 
function include(file_) {
	with (global) {
		eval(fs.readFileSync(file_) + '');
	};
};

// config 파일 추가
include(__dirname + "/config/include.js");
include(__dirname + "/config/date_format.js");

// // 서비스 파일 추가
for(var i = 0 ; i < servicefile.length ; i++){
	include(__dirname + "/service/" + servicefile[i] );
}

// 모든 http 요청 처리 
app.all('*', function(req, res, next){
	next();
});
 
 /* function */
function convertDate(c_date){
  //console.log("c_date = " + c_date);
    var querydate = "";
        for(var k = 0; k < c_date.length+1; k++){
          if(k == 4) querydate += "년";
          if(k == 6) querydate += "월";
          if(k == 8) querydate += "일";
          if(k == 10) querydate += "시";
          if(k == 12) querydate += "분";
          if(k == 14) querydate += "초";
          querydate += c_date.charAt(k);
       }
    return  querydate;
}