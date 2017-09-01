//로그인시 그룹넘버 가져오기
function getBymbNo() {
	//localStorage 에서 가져오기.
	/*console.log(ObjectStorage.getItem("login").mbName);
	console.log(ObjectStorage.getItem("login").mbAddr);
	console.log(ObjectStorage.getItem("login").mbId);
	console.log(ObjectStorage.getItem("login").mbNo);*/
	console.log("mbNo");
	
	var memberObj = {
			'mbId' : ObjectStorage.getItem("login").mbId,
			'mbNo' : ObjectStorage.getItem("login").mbNo
	};
	
	$.ajax({
		type : "post",
		data : JSON.stringify(memberObj),
		dataType : 'json',
		contentType : 'application/json',
		url : "../getBymbNo.do",
		success : function(data) {
			console.log(data[0].groMaster);
		},
		error : function(xhr) {
			alert("에러에러");
		}
	});
}

function createGroup(){
	console.log("click!!!");
	console.log("insertGroup");
	/*var gro_master = $("#gro_master").val();
	var gro_name = $("#gro_name").val();
	var gro_subject = $("#gro_subject").val();
	var gro_grade = $("#gro_grade").val();
	
	var memberObj = {
			'groMaster' : gro_master,
			'groName' : gro_name,
			'groSubject' : gro_subject,
			'groGrade' : gro_grade
	};
	
	$.ajax({
		type : "post",
		data : JSON.stringify(memberObj),
		dataType : 'text',
		contentType : 'application/json',
		url : "../insertGroup.do",
		success : function(data) {
			console.log(data);
		},
		error : function(xhr) {
			alert("에러에러");
		}
	});*/
}

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
		type : "post",
		data : JSON.stringify(memberObj),
		dataType : 'text',
		contentType : 'application/json',
		url : "./insertMember.do",
		success : function(data) {
//			console.log(data[0].mbId);
		},
		error : function(xhr) {
			alert("에러에러");
		}
	});
}

//방들어 왔을 때 select 박스로 검색하기..
function search_card(){
	console.log("search!!!!!!!");
	var search_text = $("#search_text").val();
//	var gro_no = 1; // 그룹 넘버를 넣어서 조회
//	console.log("search_text = " + gro_no);
	var searchObj = {
//			'groNo' : gro_no,
			'searchText' : search_text
	};
	$.ajax({
		type: "POST",
	      data: JSON.stringify(searchObj),
	      dataType : 'json',
	      contentType : 'application/json',
	      url: "../searchQnA.do",
	      success: function(data){
//	    	  console.log(eval(data[0]));
	    	  for(var i = 0; i < data[0].requestVOList.length; i++){
	    		  console.log(data[0].requestVOList[i]);
	    		  for(var j = 0; j < data[0].responseVOList.length; j++){
	    			  console.log(data[0].responseVOList[i]);
	    		  }
	    	  }
	      }
	});
}

function insert_note(){
	console.log("insert_note!!!!!!!");
	var note_title = $("#note_title").val(); //타이틀
	var note_lesson = $("#note_lesson").val(); //단원
	var note_importance = $("#note_importance").val(); //중요도
	var note_subject = $("#note_subject").val();
	var note_not_known = $("#note_not_known").val();//몰랐던 이유
	
	var noteObj = {
			'mbNo': ObjectStorage.getItem("login").mbNo,
			'noteTitle' : note_title,
			'noteImportance' : note_importance,
			'noteLesson' : note_lesson,
			'noteSubject' : note_subject,
			'noteNotKnown' : note_not_known,
	};
	
	$.ajax({
		type : "post",
		data : JSON.stringify(noteObj),
		dataType : 'text',
		contentType : 'application/json',
		url : "../insertNote.do",
		success : function(data) {
			console.log("성공성공!!");
		},
		error : function(xhr) {
			console.log("에러에러");
		}
	});
}


