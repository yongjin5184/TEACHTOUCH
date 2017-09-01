
$(document).ready(function() {
$("#btn_summit").click(function(){
	// 버튼 클릭시..폼 삽입
	
	console.log("btn_summit_click!!");
	completeLogIn();
	});
});

$(document).ready(function() {
	$("#btn_login").click(function(){
		// 버튼 클릭시..회원정보가져오기
		
		console.log("btn_login_click!!");
		mainLogIn();
		});
});

$(document).ready(function() {
	$("#btn_login_group_no").click(function(){
		// 버튼 클릭시..
		
		console.log("btn_login_click!!");
		getBymbNo();
		});
});

$(document).ready(function() {
	$("#btn_group_info").click(function(){
		// 버튼 클릭시..
		
		console.log("btn_login_click!!");
		selectGroup();
		});
});
//폼에서 로그인
function completeLogIn() {
	console.log("completeLogIn");
	
	var checkIn_id = $("#checkIn_id").val();
	var checkIn_password = $("#checkIn_password").val();
	var checkIn_name = $("#checkIn_name").val();
	var checkIn_password = $("#checkIn_job").val();
	var checkIn_email = $("#checkIn_email").val();
	var checkIn_phone = $("#checkIn_phone").val();
	var checkIn_addr = $("#checkIn_addr").val();
	
	var memberObj = {
		'mbId' : checkIn_id,
		'mbPassword' : checkIn_password,
		'mbName' : checkIn_name,
		'mbJob' : checkIn_password,
		'mbEmail' : checkIn_email,
		'mbPhone' : checkIn_phone,
		'mbAddr' : checkIn_addr
	};
	
	$.ajax({
		type : 'post',
		data : JSON.stringify(memberObj),
		dataType : 'text',
		contentType : 'application/json',
		url : "../insertMember.do",
		success : function(data) {
			console.log(data[0].mbId);
		},
		error : function(xhr) {
			alert("에러에러");
		}
	});
}
//처음 로그인 화면
function mainLogIn() {
	var login_id = $("#login_id").val();
	var login_password = $("#login_password").val();
	var memberObj = {
			'mbId' : login_id,
			'mbPassword' : login_password
	};
	
	$.ajax({
		type : "post",
		data : JSON.stringify(memberObj),
		dataType : 'json',
		contentType : 'application/json',
		url : "../getByIdMember.do",
		success : function(data) {
			console.log(data);
			console.log(data[0].mbId);
		},
		error : function(xhr) {
			alert("에러에러");
		}
	});
}
//로그인시 그룹넘버 가져오기
function getBymbNo() {
	console.log("getBymbNo");
	
	var login_id = $("#login_id").val();
	var login_password = $("#login_password").val();
	
	var memberObj = {
			'mbId' : login_id,
			'mbPassword' : login_password
	};
	
	$.ajax({
		type : "post",
		data : JSON.stringify(memberObj),
		dataType : 'json',
		contentType : 'application/json',
		url : "../getBymbNo.do",
		success : function(data) {
			console.log(data);
			console.log(data[0].groNo);
			console.log(data[0].joinDate);
			console.log(data[0].groMaster);
		},
		error : function(xhr) {
			alert("에러에러");
		}
	});
}

//그룹 넘버로 해당 그룹 가져오기
function selectGroup(){
console.log("selectGroup");
	
	var groupNo = $("#group_no").val();
	
	$.ajax({
		type : "post",
		data : "groupNo=" + groupNo,
		dataType : 'json',
		url : "../selectGroup.do",
		success : function(data) {
			console.log(data);
			console.log(data[0].groName);
			console.log(data[0].groDate);
		},
		error : function(xhr) {
			alert("에러에러");
		}
	});
}

