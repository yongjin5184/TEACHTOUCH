$(document).ready(function() {
	// Star Rating
	var oxStarRating = 0;
	$("#note_importance").raty({
		number:5,
		click: function(score, evt) {
			oxStarRating = score;
		}
	});
	
	//add_question();
	if(ObjectStorage.getItem("login") != null){
		console.log("세션이 연결되어 있음");
		$("#login").hide();
		getBymbNo();
	}else{
		$("#login_button").click(function(){
			console.log("세션이 연결되어 있지 않음");
			$("#login").show();
			doLogin();
		});
	}
	//회원 가입 폼 validation
	$("#checkIn_submit").click( function() {

		sexCheck($("#checkIn_gender").val());
		jobCheck($("#checkIn_job").val());

		if(admission_name_flag && admission_id_flag && admission_password_flag
					&& admission_phone1_flag && admission_sex_flag && admission_job_flag && admission_email_flag) {
			
			idv = $("#checkIn_id").val();
			passwordv = $("#checkIn_pass").val();
			namev = $("#checkIn_name").val();
			addrv = $("#checkIn_addr").val();
			telv = $("#checkIn_phoneNum_first").val();
//				+ $("#checkIn_phoneNum_mid").val()
//				+ $("#checkIn_phoneNum_last").val();
			emailv = $("#checkIn_email").val();
			if($("select[name=hugeGender]").val() == "F"){
				sexv = "여자";
				var picv = "img/card_woman.PNG";
			}else{
				sexv = "남자";
				var picv = "img/card_man.PNG";
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
				'mbSex' : sexv,
				'mbPicture' : picv
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
	//$mainTabMenu2 내 정보 보기 
	var $mainTabMenu2 = $("#main_tab_menu ul li:nth-of-type(2)");
	$mainTabMenu2.on('click',function(){
		console.log("내정보 클릭");
		//내 정보 탭에 있는 데이터를 지운다.
		$("#info_ul").remove();
		console.log(ObjectStorage.getItem("login"));
		$("#my_page").append("<ul id='info_ul'></ul>");
		$("#info_ul").append("<li class='info_li'>" + ObjectStorage.getItem("login").mbId + "<span class='info_edit_btn'>+</span></li>");
		$("#info_ul").append("<li class='info_li none'><input type='text' placeholder='아이디'/><button>저장</button></li>");
		$("#info_ul").append("<li class='info_li'>" + ObjectStorage.getItem("login").mbName + "<span class='info_edit_btn'>+</span></li>");
		$("#info_ul").append("<li class='info_li none'><input type='text' placeholder='이름'/><button>저장</button></li>");
		$("#info_ul").append("<li class='info_li'>" + ObjectStorage.getItem("login").mbJob + "<span class='info_edit_btn'>+</span></li>");
		$("#info_ul").append("<li class='info_li none'><input type='text' placeholder='직업'/><button>저장</button></li>");
		$("#info_ul").append("<li class='info_li'>" + ObjectStorage.getItem("login").mbAddr + "<span class='info_edit_btn'>+</span></li>");
		$("#info_ul").append("<li class='info_li none'><input type='text' placeholder='주소'/><button>저장</button></li>");
		$("#info_ul").append("<li class='info_li'>" + ObjectStorage.getItem("login").mbEmail + "<span class='info_edit_btn'>+</span></li>");
		$("#info_ul").append("<li class='info_li none'><input type='text' placeholder='이메일'/><button>저장</button></li>");
		$("#info_ul").append("<li class='info_li'>" + ObjectStorage.getItem("login").mbPhone + "<span class='info_edit_btn'>+</span></li>");
		$("#info_ul").append("<li class='info_li none'><input type='text' placeholder='전화번호'/><button>저장</button></li>");
		$("#info_ul").append("<li class='info_li'>" + ObjectStorage.getItem("login").mbSex + "<span class='info_edit_btn'>+</span></li>");
		$("#info_ul").append("<li class='info_li none'><input type='text' placeholder='성별'/><button>저장</button></li>");
	});
	
	function scrollEvent(flag) {
		switch (flag) {
		case 1:
			$("#room").bind('scroll', function() {
				if($(this).scrollTop() > 100) {
					$(".moveToRoomTop").show();
				} else {
					$(".moveToRoomTop").hide();
				}
		        if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
					get_question(grp_no);
		        }
			});
			break;
			
		case 2:
			$("#room").bind('scroll', function() {
		        	//alert('case 2');
			});
			break;
			
		case 4:
			$("#room").bind('scroll', function() {
		        if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
					mqcount = mqcount + 3;
		            getMyQnA(grp_no ,mqcount);
		        }
			});
			break;
			
		default:
			break;
		}
	}
	
	//$roomTabMenu1
	var $roomTabMenu1 = $("#room_tab_menu ul li:nth-of-type(1)");
	$roomTabMenu1.on('click',function(){
		
		scrollEvent(1);
	});
	
	//$roomTabMenu2
	var $roomTabMenu2 = $("#room_tab_menu ul li:nth-of-type(2)");
	$roomTabMenu2.on('click',function(){
		scrollEvent(2);
		$("#div_q").empty();
		$("#div_q").append($("#g_editor").html());
		doEditor();
	}); 
	
	//$roomTabMenu4
	var $roomTabMenu4 = $("#room_tab_menu ul li:nth-of-type(4)");
	$roomTabMenu4.on('click',function(){
		mqcount = 3;
		console.log("눌렀을 때 " + mqcount);
		scrollEvent(4);
		getMyQnA(room_num, mqcount);
	});
	/*
	*		Slide
	*/
    // 아이콘 선택 슬라이드
	//var $pptContainer = $("#ppt_container");
	var $pptSlideList = $("#ppt_slide_list");
	var $backgroundSlideList = $("#background_slide_list");
	
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
	
	//oxModal 등록 버튼 
	$("#oxModal").on('click', "#note_register",  function() {
		console.log("등록!!!!!!!!");
		insert_note(oxStarRating);
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
			console.log("group = " + JSON.stringify(data));
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
	console.log("방개수 = " + ObjectStorage.getItem("group").length);
	$("#room_table").empty();
	var roomObj = "<tr>" +
					"<td width='50%'>"+
						"<div class='div_group_cell note'></div>"+
					"</td>"+
					"<td width='50%'>"+
						"<div class='div_group_cell add'></div>"+
					"</td>"+
				"</tr>";
	roomObj += "<tr>";
	for(var i = 0; i < ObjectStorage.getItem("group").length; i ++){
	roomObj += "<td width='50%'>"+
					"<div class='div_group_cell room'>"+
						"<div class='room_bg'>"+
							"<input type='hidden' class='room_num' value='"+  ObjectStorage.getItem("group")[i].groNo +"'/>"+
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
		room_num = eval($(this).find(".room_num").val());
		var $roomTabMenu1 = $("#room_tab_menu ul li:nth-of-type(1)");
		//방 이 눌렀을 떄 무조건 첫 페이지부터
		$roomTabMenu1.trigger("click");
		console.log(room_num);
		enterRoom(room_num);
	});
    
    for(var i = 0; i < ObjectStorage.getItem("group").length; i ++){
    	//그룹에 해당하는 이미지 붙여주기
    	$(".room_bg").eq(i).css("background-image", "url(" + ObjectStorage.getItem("group")[i].groImg + ")");
    	$(".room_bg").eq(i).css("background-color", ObjectStorage.getItem("group")[i].groColor)
    }
}
function createGroup(select_img,select_color){
	
	var mb_no = ObjectStorage.getItem("login").mbNo;
	var gro_master = ObjectStorage.getItem("login").mbId;
	var gro_subject = $("#gro_subject").val();
	var gro_grade = $("#gro_grade").val();
	var gro_name = $("#gro_name").val();
	var gro_img = select_img;
	var gro_color = select_color;
	
	console.log(gro_img);
	console.log(gro_color);
	console.log(gro_subject);
	console.log(gro_grade);
	console.log(gro_img);
	console.log(gro_color);
	
	var GroupObj = {
			'mbNo' : mb_no,
			'groMaster' : gro_master,
			'groSubject' : gro_subject,
			'groGrade' : gro_grade,
			'groName' : gro_name,
			'groImg' : gro_img,
			'groColor' : gro_color
	};
	
	$.ajax({
		type : "post",
		data : JSON.stringify(GroupObj),
		dataType : 'json',
		contentType : 'application/json',
		url : "../insertGroup.do",
		success : function(data) {
			console.log(eval(data));
			enterRoom(data.groNo);
		},
		error : function(xhr) {
			//alert("에러에러");
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
//			alert("에러에러");
		}
	});
}

//카드 검색
function search_card(room_num, search_value, mcount ){
	var url = "http://"+window.location.hostname+":3000";
	console.log("search!!!!!!!");
	console.log("방에서 질문 찾기 = " + room_num);
	console.log(search_value);
	console.log("길이 = " + search_value.length);
	var gro_no = room_num; // 그룹 넘버를 넣어서 조회
	var count_fore = 0;
	console.log(gro_no);
	$.ajax({
		  url: url + "/searchQuestion",
		  type: "post",
	      data: {
	  			'roomNum' : gro_no,
				'searchText' : search_value,
				'count_fore' : count_fore,
				'count_back' : mcount
	      },
	      dataType : 'json',
	      contentType: "application/x-www-form-urlencoded; charset=UTF-8" ,
	      success: function(data){
	    	  $("#search_content").empty();
				//console.log(JSON.stringify(data));
				console.log(JSON.stringify(data));
				for(var i = 0; i < data.length; i++){
					//DB 에서 질문 내용 가져오기...
					//qaArray.push(data[i]);
//					console.log(data[i]);
					console.log("success!!!!!!!!!!");
					//질문 답변 세트로 질문에 대한 답변은 여러개 올 수 있으므로 배열에 넣어놓음.
					console.log("i=" + i);
					ele += "<div class='div_qna_list'>" +
					"<div class='question'>" +
					"<input type='hidden' name='qna1' value='" + data[i].req_results.query_req_no + "'/> " +
					"<input type='hidden' name='q_content' value='" + data[i].req_results.query_req_content + "'/>" +
					"<div class='question_logo'>"
					+ "Q" +
					"</div> " +
					"<table border='0' width='100%'> " +
					"<tr> " +
						"<td width='35%' align='center'>" +
							"<div class='question_namecard'>" +
								"<table style='border:1px solid rgb(222, 219, 4); border-radius:15px; background-color:rgb(253, 253, 191);'>" +
									"<tr>" + 
										"<td style='padding:0.5em; background-color:rgb(253, 253, 191);'>" +
											"<img id='mypic' width='100%' src='"+data[i].req_results.mb_picture+"'>" +
										"</td>" +
									"</tr>" +
									"<tr>" +
										"<td align='center' style='padding:0.5em; background-color:rgb(253, 253, 191);'>" +
										"<span style='display:inline-block; background-color:white; padding:0.2em; 0.5em; width:100%; max-width:100%;'>"+
											data[i].req_results.mb_id //MemberId
										+"</span></td>" +
									"</tr>" +
								"</table>" +
							"</div>" +
						"</td>" +
						"<td width='65%' style='position:relative;'>" +
							"<div class='question_func'>" +
								"<table width='100%' border='0' style='margin:0em auto; margin-bottom:0em;'>" +
									"<tr>" +
										"<td>" +
											"<span class='question_num'>" +
												data[i].req_results.query_req_no //requestNo
											+"</sapn>" +
										"</td>" +
										"<td width='40'>" +
											"<span class='answer_subject'>" +
												data[i].req_results.query_req_subject // subjects
											+"</span>" +
										"</td>" +
										"<td width='70'>" +
											"<span class='answer_three_light'>" +
												"<img border='0' width='100%' src='" + 
												"img/three_light_" + data[i].req_results.query_req_three_light +".PNG" // subjects
												+ "'>"+ 
											"</span>" +
										"</td>" +
										"<td width='40' align='center'>" +
											"<span class='answer_button' data-toggle='modal' data-target='#myModal'>" +
												"<img width='100%' border='0' src='img/answer.PNG'"
											+"</span>" +
										"</td>" +
									"</tr>" +
								"</table>" +
							"</div>" +
							"<div class='qna_title'>"+
								data[i].req_results.query_req_title //title
							+"</div>" +
								
							"<div class='qna_contents'>" +
								data[i].req_results.query_req_content
							+ "</div>" +
							"<div class='qna_detail'>" +
								"<table width='100%'>" +
									"<tr>" +
										"<td>" +
											"<span class='date'>" +
												data[i].req_results.query_req_date //date
											+"</span><br>" +
											"<span class='detail'>" +
											"<input type='hidden' name='q_no' value='" + data[i].req_results.query_req_no + "'/>" +
												"자세히보기" 
											+"</span>" +
										"</td>" +
									"</tr>" +
								"</table>" +
							"</div>" +
						"</td>" +
					"</tr>" +
				"</table>" +
			"</div>";
			
			if(data[i].res_results.length == 0){
				ele += "</div>";
			}
			
			for(var j = 0; j < data[i].res_results.length; j++){
				console.log("j=" + j);
				ele += "<div class='answer'>" +
							"<input type='hidden' name='qna2' value='answer_02'/>" +
						"<div class='answer_logo'>" +
							"A"
						+ "</div>" +
						"<table border='0' width='100%'>" +
							"<tr>" +
								"<td width='65%' style='position:relative;'>" +
									"<div class='answer_like_wrapper'>" +
										"<img border='0' src='img/like.png'>" +
										"<span class='answer_like'>123</span>" +
									"</div>" +
									"<div class='qna_title'>" +
										data[i].res_results[j].query_res_title //title
									+ "</div>" 
									+"<div class='qna_contents'>" +
										data[i].res_results[j].query_res_content
									+"</div>" +
									"<div class='.qna_detail'>" +
										"<table width='100%'>" +
											"<tr>" +
												"<td>" +
													"<span class='date'>" +
														data[i].res_results[j].query_res_date
													+ "</span><br>" +
													"<span class='detail'>" +
														"<input type='hidden' name='a_no' value='" + data[i].res_results[j].query_res_no + "'/>"+
														"자세히보기"
													+ "</span>" +
												"</td>" +
											"</tr>" +
										"</table>" +
									"</div>" +
								"</td>" +
								"<td width='35%' align='center'>" +
									"<div class='answer_namecard'>" +
										"<table style='border:1px solid rgb(13, 217, 200); border-radius:15px; background-color:rgb(253, 253, 191);'>" +
											"<tr>" +
												"<td style='padding:0.5em; background-color:rgb(197, 255, 240);'>" +
												"<img id='mypic' width='100%' src='"+data[i].res_results[j].mb_picture+"'>" +
												"</td>" +
											"</tr>" +
											"<tr>" +
											"<td align='center' style='padding:0.5em; background-color:rgb(197, 255, 240);'>" +
											"<span style='display:inline-block; background-color:white; padding:0.2em; 0.5em; width:100%; max-width:100%;'>"+
													data[i].res_results[j].mb_id
												+ "</span></td>" +
											"</tr>" +
										"</table>" +
									"</div>" +
								"</td>" +
							"</tr>" +
						"</table>" +
					"</div>";
				if(j == data[i].res_results.length - 1){
					ele += "</div>";
				}
			}
		}
		if(ele != ""){
			$("#search_content").append(ele);
	    }
//		display_question();
		//qaArray = [];
		count_back+=3;
		ele="";
				
        },error: function(xhr) {
//    	  alert("에러에러");
        }
	});
}

//오답노트 생성
function insert_note(oxStarRating){
	if($("#qcard").text() != null){
//		alert($("#qcard").text());
		var qcardTxt = $("#qcard").text();
		var str = qcardTxt.split(" ");
//		alert(str[0]);
		//질문 No
		var reqNo = str[0].replace(".","");
//		alert(reqNo);
	}
	console.log("insert_note!!!!!!!");
	
	var note_title = $("#note_title").val(); //제목
	var note_importance = oxStarRating //중요도
	var note_lesson = $("#note_lesson").val(); //단원
	var note_subject = $("#note_subject").val(); //과목
	var note_not_known = $("#note_not_known").text(); //몰랐던 이유
	
	/*var note_favorite = $("#note_favorite").val();
	console.log(note_favorite);*/
	//삽입 ajax
	var noteObj = {
			'mbNo' : ObjectStorage.getItem("login").mbNo,
			'noteTitle' : note_title,
			'noteImportance' : note_importance,
			'noteLesson' : note_lesson,
			'noteSubject' : note_subject,
			'noteNotKnown' : note_not_known,
			'queryReqNo' : reqNo
//			'noteFavorite' : note_favorite
	};
	
	$.ajax({
		type : "post",
		data : JSON.stringify(noteObj),
		dataType : 'text',
		contentType : 'application/json',
		url : "../insertNote.do",
		success : function(data) {
			console.log("성공성공!!");
			selectNote(note_subject);
		},
		error : function(xhr) {
		}
	});
}

//노트 조회
function selectNote(note_value){
	var element = "";
	$(".note_content").empty();
	console.log("selectNote function!!!!!!!");
//	alert(note_value);
	var noteObj = {
		mbNo : ObjectStorage.getItem("login").mbNo,
		noteSubject : note_value
	};
	$.ajax({
	      type : "post",
	      url : "../selectNote.do",
	      dataType:"json", 
	      data : JSON.stringify(noteObj),
	      contentType : 'application/json',
	      success : function(data){
	    	 console.log(eval(data));
	         element = "";
	         for(var i = 0; i < data.length; i ++){
	        	 console.log(eval(data[i]));
	        	 element += "<div class='note_detail_row'> "+
					"<div class='note_detail_title'>"+
						"<input type='checkbox' name='cname' value='"+ data[i].noteNo +"'>" +
						data[i].noteTitle +
					"<span class='note_detail_title_open'>"+
						"▼"+
					"</span>"+
					"</div>"+
					"<div class='note_detail_contents none'>"+ data[i].noteNotKnown +
					"</div>"+
					"</div>"
	        	 	console.log(data[i].noteTitle);
	         }
	         $(".note_content").append(element);
	         $(".note_detail_title_open").on('click', function() {
	     		console.log("asdf");
	     		var $myDivContents = $(this).parent();
	     		var $myNextDivContents = $(this).parent().next();

	     		if($myNextDivContents.hasClass("none") == true) {
	     			$(this).text("▲");
	     			$myDivContents.css("border-bottom", "0px solid black");
	     			$myNextDivContents.removeClass("none");
	     		} else {
	     			$(this).text("▼");
	     			$myDivContents.css("border-bottom", "1px solid black");
	     			$myNextDivContents.addClass("none");
	     		}
	     	});
	      },
	      error: function(xhr) {
	         alert("실패 실패!!!");
	      }
	   });
}

//질문과 답변 조회
function getQnA(note_value){
	var url = "http://"+window.location.hostname+":3000";
	var subject = note_value;
	console.log("과목 = " + subject);
	var mbNo = ObjectStorage.getItem("login").mbNo;
	
	$.ajax({
		type: "POST",
		 data: {
			'mbNo' : mbNo,
			'queryReqSubject' : subject
		},
		dataType : 'json',
	    contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	    url: url + "/getOneQnA",
	    success: function(data){
	    	console.log(data.length);
	    	var ele = "";
	    	console.log(JSON.stringify(data));
	    	for(var i = 0; i < data.length; i++){
				ele += "<span class='get_q_title'>"+ data[i].query_req_no  + ". " + data[i].query_req_title
						+ "<input type='hidden' value=' "+ data[i].query_req_no +"'/>"
						+ "<button class = title_button>질문 추가</button>"
						+ "</span>";
//				"<span class='get_q_a'>+</span>
					console.log(i);
					//ele + "<span class='get_a_title none'><button>선택</button></span></br>";
					
	    	}
    		$("#get_qna_list_content").html(ele);
	    }
	});
}

function getAnswer(queryReq){
	console.log(queryReq);
	$.ajax({
		type: "POST",
		 data: {
			'queryReqNo' : queryReq
		},
		dataType : 'json',
	    contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	    url: url + "/getOneAnswer",
	    success: function(data){
	    	console.log(data.length);
	    	console.log(JSON.stringify(data));
	    	if(data.length == 0 ){
	    		alert("아직 답변이 등록되지 않았습니다.");
	    		$("#acard").text("");
	    	}else{
	    		$("#acard").text(data[0].query_res_content);
	    	}
			
	    }
	});
}
var room_num_obj ={};
function enterRoom(room_num){
	console.log("방입장");
	room_num_obj.room_num = room_num;
	console.log("방번호 = " + room_num_obj.room_num);
	//방 들어오기 여기여기
	$("#make_room").animate({
		"left":"100%"
	}, 500).queue(function() {
		$("#make_room").addClass("none").dequeue();
		$("#room").removeClass("none");
		$("#room").animate({
			"left":"0"
		}, 500).dequeue();
	});
	console.log("티치터치!!!!!!!!!!");
	getBymbNo();
	//connect node server 
	get_question(room_num_obj.room_num);
	setChat(ObjectStorage.getItem("login").mbNo, room_num_obj.room_num);
	//member_num = ObjectStorage.getItem("login").mbNo;
	//group_num = room_num;

	console.log("node로 접속하자!!!!");
}
//editor
function doEditor(){
	console.log("doEditor!!!");
	$('#upload').hide();
	$('#upload_camera').bind('click', function(){
	$('#upload').append('<input id="input_camera" type="file" name="uploadFile" accept="image/*;capture=camera"/>');
		//alert('1');
	$( "#input_camera" ).trigger( "click" );
		//alert('2');
	});
}
//내 질문
function getMyQnA(room_num, mqcount){
	console.log("getMyQnA");
	console.log("내 질문 방 = " + room_num);
	console.log(mqcount);
	var count_fore = 0;
	var url = "http://"+window.location.hostname+":3000";
	$.ajax({
		  url: url + "/getMyQnA",
		  type: "post",
	      data: {
	  			'roomNum' : room_num,
				'mbNo' : ObjectStorage.getItem("login").mbNo,
				'count_fore' : count_fore,
				'count_back' : mqcount
	      },
	      dataType : 'json',
	      contentType: "application/x-www-form-urlencoded; charset=UTF-8" ,
	      success: function(data){
	    	  $("#div_myq *").remove();
				//console.log(JSON.stringify(data));
				console.log(JSON.stringify(data));
				for(var i = 0; i < data.length; i++){
					//DB 에서 질문 내용 가져오기...
					//qaArray.push(data[i]);
//					console.log(data[i]);
					console.log("success!!!!!!!!!!");
					//질문 답변 세트로 질문에 대한 답변은 여러개 올 수 있으므로 배열에 넣어놓음.
					console.log("i=" + i);
					ele += "<div class='div_qna_list'><span class='open_answer'>++</span>" +
							"<div class='question'>" +
							"<input type='hidden' name='qna1' value='" + data[i].req_results.query_req_no + "'/> " +
							"<input type='hidden' name='q_content' value='" + isHaveImg(data[i].req_results.query_req_content) + "'/>" +
							"<div class='question_logo'>"
								+ "Q" +
							"</div> " +
							"<table border='0' width='100%'> " +
							"<tr> " +
								"<td width='35%' align='center'>" +
									"<div class='question_namecard'>" +
										"<table style='border:1px solid rgb(222, 219, 4); border-radius:15px; background-color:rgb(253, 253, 191);'>" +
											"<tr>" + 
												"<td style='padding:0.5em; background-color:rgb(253, 253, 191);'>" +
													"<img id='mypic' width='100%' src='"+data[i].req_results.mb_picture+"'>" +
												"</td>" +
											"</tr>" +
											"<tr>" +
												"<td align='center' style='padding:0.5em; background-color:rgb(253, 253, 191);'>" +
												"<span style='display:inline-block; background-color:white; padding:0.2em; 0.5em; width:100%; max-width:100%;'>"+
													data[i].req_results.mb_id //MemberId
												+"</span></td>" +
											"</tr>" +
										"</table>" +
									"</div>" +
								"</td>" +
								"<td width='65%' style='position:relative;'>" +
									"<div class='question_func'>" +
										"<table width='100%' style='margin:0em auto; margin-bottom:0em;'>" +
											"<tr>" +
												"<td>" +
													"<span class='question_num'>" +
														data[i].req_results.query_req_no //requestNo
													+"</sapn>" +
												"</td>" +
												"<td>" +
													"<span class='answer_subject'>" +
														data[i].req_results.query_req_subject // subjects
													+"</span>" +
												"</td>" +
												"<td width='70'>" +
													"<span class='answer_three_light'>" +
														"<img border='0' width='100%' src='" + 
														"img/three_light_" + data[i].req_results.query_req_three_light +".PNG" // subjects
														+ "'>"+ 
													"</span>" +
												"</td>" +
												"<td width='70' align='right'>" +
													"<span class='answer_button' data-toggle='modal' data-target='#myModal'>" +
														"Answer"
													+"</span>" +
												"</td>" +
											"</tr>" +
										"</table>" +
									"</div>" +
									"<div class='qna_title'>"+
										data[i].req_results.query_req_title //title
									+"</div>" +
										
									"<div class='qna_contents'>" +
									isHaveImg(data[i].req_results.query_req_content)
									+ "</div>" +
									"<div class='qna_detail'>" +
										"<table width='100%'>" +
											"<tr>" +
												"<td>" +
													"<span class='date'>" +
														data[i].req_results.query_req_date //date
													+"</span>" +
													"<span class='detail'>" +
														"자세히보기" 
													+"</span>" +
												"</td>" +
											"</tr>" +
										"</table>" +
									"</div>" +
								"</td>" +
							"</tr>" +
						"</table>" +
					"</div>";
					
					if(data[i].res_results.length == 0){
						ele += "</div>";
					}
					
					for(var j = 0; j < data[i].res_results.length; j++){
						console.log("j=" + j);
						ele += "<div class='answer none'>" +
									"<input type='hidden' name='qna2' value='answer_02'/>" +
								"<div class='answer_logo'>" +
									"A"
								+ "</div>" +
								"<table border='0' width='100%'>" +
									"<tr>" +
										"<td width='65%' style='position:relative;'>" +
											"<div class='answer_like_wrapper'>" +
												"<img border='0' src='img/like.png'>" +
												"<span class='answer_like'>123</span>" +
											"</div>" +
											"<div class='qna_title'>" +
												data[i].res_results[j].query_res_title //title
											+ "</div>" 
											+"<div class='qna_contents'>" +
												data[i].res_results[j].query_res_content
											+"</div>" +
											"<div class='.qna_detail'>" +
												"<table width='100%'>" +
													"<tr>" +
														"<td>" +
															"<span class='date'>" +
																data[i].res_results[j].query_res_date
															+ "</span><br>" +
															"<span class='detail'>" +
																"자세히보기"
															+ "</span>" +
														"</td>" +
													"</tr>" +
												"</table>" +
											"</div>" +
										"</td>" +
										"<td width='35%' align='center'>" +
											"<div class='answer_namecard'>" +
												"<table style='border:1px solid rgb(13, 217, 200); border-radius:15px; background-color:rgb(253, 253, 191);'>" +
													"<tr>" +
														"<td style='padding:0.5em; background-color:rgb(197, 255, 240);'>" +
														"<img id='mypic' width='100%' src='"+data[i].res_results[j].mb_picture+"'>" +
														"</td>" +
													"</tr>" +
													"<tr>" +
													"<td align='center' style='padding:0.5em; background-color:rgb(197, 255, 240);'>" +
													"<span style='display:inline-block; background-color:white; padding:0.2em; 0.5em; width:100%; max-width:100%;'>"+
															data[i].res_results[j].mb_id
														+ "</span></td>" +
													"</tr>" +
												"</table>" +
											"</div>" +
										"</td>" +
									"</tr>" +
								"</table>" +
							"</div>";
						if(j == data[i].res_results.length - 1){
							ele += "</div>";
						}
					}
				}
				if(ele != ""){
			    	$("#div_myq").append(ele);
			    }
				ele="";
	      },error: function(xhr) {
	    	  alert("에러에러");
	      }
	});
}
