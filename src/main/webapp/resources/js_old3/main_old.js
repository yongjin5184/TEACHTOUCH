$(document).ready(function() {
	
	$("#login_button").click(function(){
		doLogin();
	});
	//회원 가입 폼 validation
	$("#checkIn_submit").click( function() {

		sexCheck($("#checkIn_gender").val());
		jobCheck($("#checkIn_job").val());

		if(admission_name_flag && admission_id_flag && admission_password_flag
					&& admission_phone1_flag && admission_phone2_flag && admission_phone3_flag
					&& admission_sex_flag && admission_job_flag && admission_email_flag) {
			
			idv = $("#checkIn_id").val();
			passwordv = $("#checkIn_pass").val();
			namev = $("#checkIn_name").val();
			addrv = $("#checkIn_addr").val();
			telv = $("#checkIn_phoneNum_first").val()
				+ $("#checkIn_phoneNum_mid").val()
				+ $("#checkIn_phoneNum_last").val();
			emailv = $("#checkIn_email").val();
			if($("select[name=hugeGender]").val() == "F"){
				sexv = "여자";
			}else{
				sexv = "남자";
			}
			if($("select[name=hugeJob]").val() == "S"){
				jobv = "학생";
			}else{
				jobv = "선생님";
			}
			console.log(sexv);
			console.log(jobv);
			var jsonObj = {
				'mbId' : idv,
				'mbPassword' : passwordv,
				'mbName' : namev,
				'mbJob' : jobv,
				'mbEmail' : emailv,
				'mbPhone' : telv,
				'mbAddr' : addrv,
				'mbSex' : sexv
			};

			$.ajax({
				type : 'post',
				data : JSON.stringify(jsonObj),
				url : '../insertMember.do',
				dataType : 'text', 
				contentType : 'application/json',
				success : function(data) {
					alert("성공적으로 가입하셨습니다.");
					$("#register").animate({
						"right": '100%'
					}, 1200);
				},
				error : function(data) {
					alert("가입에 실패하였습니다.");
				}
			});
		} else {
			alert("모든 항목을 정확히 입력해주시기 바랍니다.");
		}
		
	});

	loginValidation();
	//내 정보 보기 <-여기여기
	var mainTab_info = $(".main_tab_off");
	mainTab_info.on('click',function(){
		console.log("내정보!!!!!!!");
		console.log(ObjectStorage.getItem("login"));
		$("#my_page").append("<ul id='info_ul'></ul>");
		$("#info_ul").append("<li class='info_li'>" + ObjectStorage.getItem("login").mbId + "</li>");
		$("#info_ul").append("<li class='info_li'>" + ObjectStorage.getItem("login").mbName + "</li>");
		$("#info_ul").append("<li class='info_li'>" + ObjectStorage.getItem("login").mbJob + "</li>");
		$("#info_ul").append("<li class='info_li'>" + ObjectStorage.getItem("login").mbAddr + "</li>");
		$("#info_ul").append("<li class='info_li'>" + ObjectStorage.getItem("login").mbEmail + "</li>");
		$("#info_ul").append("<li class='info_li'>" + ObjectStorage.getItem("login").mbPhone + "</li>");
		$("#info_ul").append("<li class='info_li'>" + ObjectStorage.getItem("login").mbSex + "</li>");
	});
	
	/*
	*		Slide
	*/
    // 아이콘 선택 슬라이드
	//var $pptContainer = $("#ppt_container");
	var $pptSlideList = $("#ppt_slide_list");
	var $backgroundSlideList = $("#background_slide_list");
	// Slide 초기화
	$pptSlideList.append("<li>Slide</li>");
	$backgroundSlideList.append("<li>Slide</li>");
	
	var $pptSlideWidth = $pptSlideList.children().outerWidth();
	var $backgroundSlideWidth = $backgroundSlideList.children().outerWidth();
	console.log("$pptSlideWidth = " + $pptSlideWidth);
	var $pptSlideSize = $pptSlideList.children().length;
	var $backgroundSlideSize = $backgroundSlideList.children().length;

	//	icon 버튼
	var $pptArrowLeft = $("#icon_arrow_left");
	var $pptArrowRight = $("#icon_arrow_right");
	// background 버튼
	var $backgroundArrowLeft = $("#backgouund_arrow_left");
	var $backgroundArrowRight = $("#backgouund_arrow_right");
	
	var $pptResize = $(".ppt_container .ppt_resize");
	var curIcon = 0;
	var curBackground = 0;

	var bFullScreen = false;

	$pptSlideList.css("width", $pptSlideWidth * $pptSlideSize);
	$backgroundSlideList.css("width", $backgroundSlideWidth * $backgroundSlideSize);
	
	//아이콘 선택
	$pptArrowLeft.on('click', function() {
		if(curIcon > 0) {
			
			curIcon--;
			
			$pptSlideList.animate({"left": -(curIcon * $pptSlideWidth) + "px"}, "normal" );
		}
	});

	//배경 선택
	$backgroundArrowLeft.on('click', function() {
		if(curBackground > 0) {
			
			curBackground--;
			
			$backgroundSlideList.animate({"left": -(curBackground * $backgroundSlideWidth) + "px"}, "normal" );
		}
	});
	
	//아이콘 선택
	$pptArrowRight.on('click', function() {
		if(curIcon < ($pptSlideSize-1)) {
			curIcon++;

			$pptSlideList.animate({"left": -(curIcon * $pptSlideWidth) + "px"}, "normal" );
		}
	});
	
	//배경 선택
	$backgroundArrowRight.on('click', function() {
		if(curBackground < ($pptSlideSize-1)) {
			curBackground++;

			$backgroundSlideList.animate({"left": -(curBackground * $backgroundSlideWidth) + "px"}, "normal" );
		}
	});
	
	$pptResize.on('click', function() {
		bFullScreen = !bFullScreen
		if (bFullScreen) {
			$("#div_ppt").css({
				"position":"absolute",
				"left": 0,
				"right": 0,
				"top": 0,
				"bottom": 0,
				"width": "100%",
				"height": "100%",
				"z-index": "2000",
				"background-color":"white",
				"margin": "auto",
			});

			$("#div_ppt #ppt_container").css({
				"top": "25%"
			});

		} else {
			$("#div_ppt").css({
				"position":"",
				"left": "",
				"right": "",
				"top": "",
				"bottom": "",
				"width": "",
				"height": "",
				"z-index": "",
				"background-color":""
			});

			$("#div_ppt #ppt_container").css({
				"top": ""
			});

		}
	});
	
});

function loginValidation(){
//	$("#check_in").hide();
	
		$("#logIn_button_join").click(function(){
		console.log("버튼눌렀을때");
//		$("#login_div").hide();
//		$("#check_in").show();
		});
		
		
//		$("#logIn_button_submit").click(function(){
//		console.log("버튼눌렀을때");
//		var id = $("#logIn_id").val();
//		var password = $("#logIn_password").val();
//		});
		
	/*	$(".exit_all").click(function(){
			console.log("회원가입에서 취소!");
//			$("#login_div").show();
		});*/
		
		
		$("#checkIn_name").blur(function() {
			nameCheck($("#checkIn_name").val());
		});
		
		$("#checkIn_id").blur(function() {
			idCheck($("#checkIn_id").val());
		});
		
		$("#checkIn_pass").blur(function() {
			passwordCheck($("#checkIn_pass").val());
		});
		
		$("#checkIn_age").blur(function() {
			ageCheck($("#checkIn_age").val());
		});
		
		$("#checkIn_email").blur(function() {
			emailCheck($("#checkIn_email").val());
		});
		
		$("#checkIn_phoneNum_first").blur(function() {
			phoneCheck1($("#checkIn_phoneNum_first").val());
		});
		
		$("#checkIn_phoneNum_mid").blur(function() {
			phoneCheck2($("#checkIn_phoneNum_mid").val());
		});
		
		$("#checkIn_phoneNum_last").blur(function() {
			phoneCheck3($("#checkIn_phoneNum_last").val());
		});
		
};

//로그인 처리
function doLogin() {
	var login_id = $("#login_id").val();
	var login_password = $("#login_password").val();
	var memberObj = {
		'mbId' : login_id,
		'mbPassword' : login_password
	};

	$.ajax({
		type : "POST",
		data : JSON.stringify(memberObj),
		dataType:'json',
		contentType : 'application/json',
		url : "../getByIdMember.do",
		success : function(data) {
			console.log(data.mbName);
			ObjectStorage.setItem("login", data);//objectStorage에 데이터를 넣는다.
			//alert("로그인 성공!!!");
			getBymbNo();
			var $browserHeight = $(window).height();
			$("#login").animate({
				"right": '100%'
			}, 1200);
		},
		error : function(xhr) {
			alert("아이디를 다시 확인해주세요");
		}
	});
}

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
			//console.log(JSON.stringify(data));
			ObjectStorage.setItem("group",data);
			//console.log(JSON.stringify(data))
			show_room();
		},
		error : function(xhr) {
			alert("에러에러");
		}
	});
}

function show_room(){
//	console.log(ObjectStorage.getItem("group")[0].groName);
//	console.log(ObjectStorage.getItem("group")[1].groName);
//	console.log(ObjectStorage.getItem("group")[2].groName);
    // append
	var roomObj = "<tr>";
	for(var i = 0; i < ObjectStorage.getItem("group").length; i ++){
	roomObj += "<td width='50%'>"+
					"<div class='div_group_cell room'>"+
						"<div class='room_bg'>"+
							"<input type='hidden' class='room_num' value='"+ i +"'/>"+
								"<span class='room_title'>"+
									"<span class='marquee'>"+
									 ObjectStorage.getItem("group")[i].groName + 
									"</span>" +
								"</span>" +
							"</div>" +
						"</div>" +
					"</td>"; 
		if( i % 2 == 0){
			continue; //짝수 개이면 다시 td를 만든다.
		}else{
			roomObj += "</tr>"; //홀수개이면 tr를 붙임.
		}
	}
    $("#room_table").append(roomObj);
    
    $(".room").on('click', function() {
    	//방이 눌렀을 때
		var room_num = eval($(this).find(".room_num").val()) + 1; //groupId 
		console.log(room_num);
		
		$("#room").animate({
			"left":0
		}, 500);
		//connect node server 
		get_question(room_num);
		console.log("node로 접속하자!!!!");
	});
    
    for(var i = 0; i < ObjectStorage.getItem("group").length; i ++){
    	//그룹에 해당하는 이미지 붙여주기
    	$(".room_bg").eq(i).css("background-image", "url(" + ObjectStorage.getItem("group")[i].groImg + ")");
    }
}

function createGroup(groColor, groImg){
	console.log("click!!!");
	console.log("insertGroup");
	var gro_master = $("#gro_master").val();
	var gro_name = $("#gro_name").val();
	var gro_subject = $("#gro_subject").val();
	var gro_grade = $("#gro_grade").val();
	
	var memberObj = {
			'groMaster' : gro_master,
			'groName' : gro_name,
			'groSubject' : gro_subject,
			'groGrade' : gro_grade,
			'groImg' : gro_img,
			'groColor' : groColor
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
	});
}

//회원 가입 폼 삽입
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
	var note_title = $("#note_title").val();
	var stars = $(this).next().find("input[name='score']").val();
	alert(stars);
	var note_importance = $("#note_importance").val();
	var note_lesson = $("#note_lesson").val();
	var note_subject = $("#note_subject").val();
	var note_not_known = $("#note_not_known").val();
	var note_date = $("#note_date").val();
	var note_favorite = $("#note_favorite").val();
	
	var noteObj = {
			'noteTitle' : note_title,
			'noteImportance' : note_importance,
			'noteLesson' : note_lesson,
			'noteSubject' : note_subject,
			'noteNotKnown' : note_not_known,
			'noteDate' : note_date,
			'noteFavorite' : note_favorite
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
			alert("에러에러");
			selectNote();
		}
	});
	
}

//노트 조회
function selectQuestion(){
	var element = "";
	$("#note_detail").append(element);
	console.log("selectQuestion function!!!!!!!");
	$.ajax({
	      type : "post",
	      url : "../selectNote.do",
	      dataType:"json", 
	      data : "mbNo=" + ObjectStorage.getItem("login").mbNo,
	      success : function(data){
	         console.log(eval(data[0]));
	         element = "";
	         for(var i = 0; i < data.length; i ++){
	        	 element += "<div class='note_detail_row'> "+
					"<div class='note_detail_title'>"+
					"<div class='checkbox'><label>" +
						"<input type='checkbox'></label>" +
					"</div><p></p>"+
					"<span class='note_detail_title_open'>"+
						"▼"+
					"</span>"+
					"</div>"+
					"<div class='note_detail_contents none'><p></p>"+
					"</div>"+
					"</div>"
	         }
	         console.log(element);
	         $("#note_detail").append(element);
	         $(".note_detail_title").children("p").text(data[0].noteTitle);
	         $(".note_detail_contents").children("p").text(data[0].noteContent);
	         console.log(data[0].noteContent);
	         $(".note_detail_title_open").on('click', function() {
	     		console.log("asdf");
	     		var $myNextDivContents = $(this).parent().next();

	     		if($myNextDivContents.hasClass("none") == true) {
	     			$(this).text("▲");
	     			$myNextDivContents.removeClass("none");
	     		} else {
	     			$(this).text("▼");
	     			$myNextDivContents.addClass("none");
	     		}
	     		
	     	});
	      },
	      error: function(xhr) {
	         alert("실패 실패!!!");
	      }
	   });
}

