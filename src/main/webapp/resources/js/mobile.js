var editor_buffer='';
var header_buffer = '';
var check_card_name = '';
$(document).ready(function() {

	// Star Rating
	var oxStarRating = 0;
	$("#note_importance").raty({
		number:5,
		click: function(score, evt) {
			oxStarRating = score;
		}
	});
	
	/*
	*		방리스트 초기화
	*		데이터베이스 이용
	*/
	var browserHeight = $(window).height();
	var height1 = $("#main_logo").height();
	var height2 = $("#main_tab_menu").height();

	$(".auto-height").css("min-height", (browserHeight-height1-height2)+"px");
	$(".auto-height2").css("min-height", (browserHeight-height1)+"px");
	
	$(".moveToRoomTop").hide();
	
//	$(".room_bg").eq(0).css("background-image", "url('../img/flower.PNG')");

	/*
	*		로그인
	*/

	//		로그인 버튼 처리
	/*$("#login_button").on('click', function() {
		var $browserHeight = $(window).height();
		$("#login").animate({
			"right": '100%'
		}, 1200);
	});*/

	//		회원가입 버튼 처리
	$('#register_button').on('click', function() {
		$("#register").show();
		$("#register").animate({
			"right": '0'
		}, 1200);
	});

	$('#checkIn_cancle').on('click', function() {
		$("#register").animate({
			"right": '100%'
		}, 1200);
	});
	
/*	$('#register_signup').on('click', function() {
		$("#register").animate({
			"right": '100%'
		}, 1200);
	})*/

	/*
	*		메인
	*/

	//		메뉴 체크시 내용 변화
	var $mainTab1 = $("#div_group_list");
	var $mainTab2 = $("#div_my_page");

	var $mainTabMenu1 = $("#main_tab_menu ul li:nth-of-type(1)");
	var $mainTabMenu2 = $("#main_tab_menu ul li:nth-of-type(2)");

	$mainTabMenu1.on('click', function() {
		$mainTabMenu1.addClass("main_tab_on");
		$mainTabMenu1.removeClass("main_tab_off");
		$mainTabMenu2.addClass("main_tab_off");
		$mainTabMenu2.removeClass("main_tab_on");
		$mainTab1.show();
		$mainTab2.hide();
		
		editor_buffer='';
		header_buffer='';
	});

	$mainTabMenu2.on('click', function() {
		$mainTabMenu1.addClass("main_tab_off");
		$mainTabMenu1.removeClass("main_tab_on");
		$mainTabMenu2.addClass("main_tab_on");
		$mainTabMenu2.removeClass("main_tab_off");
		$mainTab1.hide();
		$mainTab2.show();
		
		editor_buffer='';
		header_buffer='';
	});

	/*
	*		각 방 및 오답노트 클릭시 나타나는 페이지
	*/

	$("#room_table").on('click', ".note" ,function() {
		$("#note").removeClass("none");
		$("#note").animate({
			"left":0
		}, 500);
	});
	var m_room_num;
	$("#div_group_list").on('click', '.room', function() {
		$("#room").removeClass("none");
		m_room_num = $(this).find(".room_num").val();
		console.log("방 번호" + m_room_num);
		$("#room").animate({
			"left":0
		}, 500);
	});

	$("#div_group_list").on('click', '.add', function() {
		console.log("방 만들기 클릭!!!"); //여기여기
		$("#add_img").css("background-color", "#bbe7ff"); 
		$("#make_room").removeClass("none");
		console.log("방 만들기 애니메이션 ");
		$("#make_room").animate({
			"left":0
		}, 500);
	});
	 $("#qna_search_div").bind('scroll', function() {
		 if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
            search_count = search_count + 3;
            search_card(m_room_num , $("#search_text").val(),search_count);
        }
	});
	 
//	 $("#div_myq").bind('scroll', function() {
//		 if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
//            alert('도착 !!!!!!');
//			mqcount = mqcount + 3;
//            getMyQnA(m_room_num ,mqcount);
//        }
//	});
	/*
	*		방제목 길경우 마퀴태그
	*/
/*
	$(".marquee").marquee({
		duration:2000,
		delayBeforeStart:0	
	});
*/
	/*
	*		각 방 및 오답노트 닫기
	*/
 
	$('.moveToRoomTop').on('click', function(){
		//alert('hi');
		$("#room").animate({
            scrollTop: 0
        }, 600);
        return false;
	});
	
	$(".back_to_main").on('click', function() {
		console.log("뒤로뒤로");
		var $myParent = $(this).parent().parent();	// 각 방 및 오답노트
		console.log("$myParent = " + $myParent.attr('id'));
		$myParent.animate({
			"left": "100%"
		}, 500).queue(function() {
			$myParent.addClass("none").dequeue();
		});
	});

	
	$("#room_search").on('click',function(){
		console.log("질문 검색");
		$("#qna_search_div").removeClass("none");
		//초기화
		$("#search_text").val('');
		$("#search_content").empty();
	});
	
	/*
	*		방 UI
	*/

	/*
	*		탭 메뉴
	*/


	var $roomTab1 = $("#div_qna");
	var $roomTab2 = $("#div_q");
	var $roomTab3 = $("#div_ppt");
	var $roomTab4 = $("#div_myq");

	var $roomTabMenu1 = $("#room_tab_menu ul li:nth-of-type(1)");
	var $roomTabMenu2 = $("#room_tab_menu ul li:nth-of-type(2)");
	var $roomTabMenu3 = $("#room_tab_menu ul li:nth-of-type(3)");
	var $roomTabMenu4 = $("#room_tab_menu ul li:nth-of-type(4)");

	$roomTabMenu1.on('click', function() {
		$roomTabMenu1.addClass("room_tab_on");
		$roomTabMenu1.removeClass("room_tab_off");
		$roomTabMenu2.addClass("room_tab_off");
		$roomTabMenu2.removeClass("room_tab_on");
		$roomTabMenu3.addClass("room_tab_off");
		$roomTabMenu3.removeClass("room_tab_on");
		$roomTabMenu4.addClass("room_tab_off");
		$roomTabMenu4.removeClass("room_tab_on");
		
		$roomTab1.show();
		$roomTab2.hide();
		$roomTab3.hide();
		$roomTab4.hide();
		
		editor_buffer='';
		header_buffer='';
	});

	$roomTabMenu2.on('click', function() {
		$roomTabMenu1.addClass("room_tab_off");
		$roomTabMenu1.removeClass("room_tab_on");
		$roomTabMenu2.addClass("room_tab_on");
		$roomTabMenu2.removeClass("room_tab_off");
		$roomTabMenu3.addClass("room_tab_off");
		$roomTabMenu3.removeClass("room_tab_on");
		$roomTabMenu4.addClass("room_tab_off");
		$roomTabMenu4.removeClass("room_tab_on");
		
		$roomTab1.hide();
		$roomTab2.show();
		$roomTab3.hide();
		$roomTab4.hide();
		
		editor_buffer='';
		header_buffer='';
	});

	$roomTabMenu3.on('click', function() {
		$roomTabMenu1.addClass("room_tab_off");
		$roomTabMenu1.removeClass("room_tab_on");
		$roomTabMenu2.addClass("room_tab_off");
		$roomTabMenu2.removeClass("room_tab_on");
		$roomTabMenu3.addClass("room_tab_on");
		$roomTabMenu3.removeClass("room_tab_off");
		$roomTabMenu4.addClass("room_tab_off");
		$roomTabMenu4.removeClass("room_tab_on");
		
		$roomTab1.hide();
		$roomTab2.hide();
		$roomTab3.show();
		$roomTab4.hide();
		
		editor_buffer='';
		header_buffer='';
	});

	$roomTabMenu4.on('click', function() {
		$roomTabMenu1.addClass("room_tab_off");
		$roomTabMenu1.removeClass("room_tab_on");
		$roomTabMenu2.addClass("room_tab_off");
		$roomTabMenu2.removeClass("room_tab_on");
		$roomTabMenu3.addClass("room_tab_off");
		$roomTabMenu3.removeClass("room_tab_on");
		$roomTabMenu4.addClass("room_tab_on");
		$roomTabMenu4.removeClass("room_tab_off");
		
		$roomTab1.hide();
		$roomTab2.hide();
		$roomTab3.hide();
		$roomTab4.show();
		
		editor_buffer='';
		header_buffer='';
	});
	
	$("#my_page").on('click', ".info_edit_btn", function() {
		var $infoParent = $(this).parent();
		
		if ($infoParent.next().hasClass("none")) {
			$infoParent.css("border-bottom-width","0px");
			$infoParent.next().removeClass("none");
		} else {
			$infoParent.css("border-bottom-width","1px");
			$infoParent.next().addClass("none");
		}
		
	});


	/*
	*		글쓰기
	*/

	/*var $write = $("#write_menu span");

	$write.on('click', function() {

		$("#div_write").css("display", "block");

	});*/

/*
	var $back = $("#div_logo");

	$back.on('click', function() {
		window.history.back();
	});
*/

	/*
	*		Q & A 자세히보기
	*/

//	var $qDetail = $(".question .detail");
//	var $aDetail = $(".answer .detail");
	var $qnaDetail = $(".qna_detail");

	$qnaDetail.on('click', '.detail', function() {
		var $qna_num = $(this).closest(".question").find("input").val();
	});

	$qnaDetail.on('click', '.detail', function() {
		var $qna_num = $(this).closest(".answer").find("input").val();
	});
	/*
	*		Q & A 자세히보기 Modal
	*/
	
	var $detailQnaCloseButton = $("#detail_qna_update");
	$detailQnaCloseButton.on('click' , function(){
		//권한 검증
		var qnakey = $("#detail_qnaNumber").text();
		switch (check_card_name) {
		case 'q_no':
			//alert("switch case = " + check_card_name);
			$.ajax({
				url : url+"/isMyQuestion",
				type : "post",
				data : {
					'q_no' : qnakey,
					'mb_no' : ObjectStorage.getItem("login").mbNo
				},
				dataType : "json",
				
				success : function(data) {
					if(data.msg == "ok") {
						$('#detail_title').attr('readonly', false);
						$('#detail_editor > #general_editor').attr('contenteditable', true);
					}
				},
				
				error : function(xhr) {
					//alert("에러에러");
				}
			});
			break;	
			
		case 'a_no':
			$.ajax({
				url : url+"/isMyAnswer",
				type : "post",
				data : {
					'a_no' : qnakey,
					'mb_no' : ObjectStorage.getItem("login").mbNo
				},
				dataType : "json",
				
				success : function(data) {
					if(data.msg == "ok") {
						$('#detail_title').attr('readonly', false);
						$('#detail_editor > #general_editor').attr('contenteditable', true);
					}
				},
				
				error : function(xhr) {
					//alert("에러에러");
				}
			});
			break;
		default:
			break;
		}
		
	});
	
	//닫기버튼
	$('.detail_close').on('click', function(){
		$('#detail_title').attr('readonly', true);
		$('#detail_editor > #general_editor').attr('contenteditable', false);
	});
	
	//저장 버튼
	var $detailQnaSave = $("#detail_qna_save");
	$detailQnaSave.on('click', function(){
		var detail_no_value = $("#detail_qnaNumber").text();
		var detail_editor_value =  $('#detail_editor > #general_editor').html();
		var detail_title_value = $("#detail_title").val();
		
		//alert(check_card_name +" "+ detail_no_value +" "+ detail_editor_value +" "+ detail_title_value);
		switch (check_card_name) {
		case 'q_no':
			//alert("switch case = " + check_card_name);
			questionUpdate(detail_no_value,detail_editor_value,detail_title_value);
			break;	
		case 'a_no':
			//alert("switch case = " + check_card_name);
			answerUpdate(detail_no_value,detail_editor_value,detail_title_value);
			break;
		default:
			break;
		}
		
		$('detailModal').modal('hide');
		header_buffer = '';
		editor_buffer = '';	
	});
	/*
	 * 		신호등
	 */

	$("#div_qna").on('click', '.answer_three_light', function(e) {
		var offset = $(this).offset();
		var clickPosX = e.clientX-offset.left;
		var clickPosY = e.clientY-offset.top;
		// 빨강
		if (clickPosX > 2 && clickPosX < 21) {
			console.log("빨강");
			$(this).find("img").attr("src", "img/three_light_1.PNG");
			var req_num = $(this).parent().parent().find(".question_num").text();
			var three_color = 1;
			updateThreeLight(grp_no,req_num,three_color);
		} else if (clickPosX > 25 && clickPosX < 43) {
			console.log("주황");
			$(this).find("img").attr("src", "img/three_light_2.PNG");
			var req_num = $(this).parent().parent().find(".question_num").text();
			var three_color = 2;
			console.log("신호등 =" + grp_no);
			updateThreeLight(grp_no,req_num,three_color);
		} else if (clickPosX > 47 && clickPosX < 64) {
			console.log("초록");
			$(this).find("img").attr("src", "img/three_light_3.PNG");
			var req_num = $(this).parent().parent().find(".question_num").text();
			var three_color = 3;
			updateThreeLight(grp_no,req_num,three_color);
		}
	});
	
	// 내 질문 답변 열기
	$("#div_myq").on('click', '.open_answer', function() {
		var $qAnswer = $(this).siblings(".answer");
		
		if ($qAnswer.hasClass("none")) {
			$qAnswer.removeClass("none");			
		} else {
			$qAnswer.addClass("none");			
		}
	});
	/*
	*		답변 버튼
	*/
	var $answerButton = $(".question .answer_button");

	/*$answerButton.on('click', function() {
		var $qna_num = $(this).closest(".question").find("input").val();

		alert($qna_num);
	});*/

	$("#write_button").on('click', function(){/*
		$(".black_overlay").show();
		$("#upload_qna").show();*/
		$("#upload_qna").animate({
			"left":0
		}, 500);
	});

	$(".close").on('click', function() {
		$(".black_overlay").hide();
		$("#upload_qna").hide();
	});
	
	$("#qna_search_div").on('click', '.close', function() {
		$(this).parent().addClass("none");
		$("#search_content").addClass("none");
		
	});
	var search_count = 0;
	$("#qna_search_div").on('click','span', function(){
		console.log("!!!!!!!!!!!!");
		$("#search_content").removeClass("none");
		search_count = 3;
		search_card(m_room_num , $("#search_text").val(),search_count);
	});
	/*
	 *     방 만들기
	 */
	var before_img = ""; // 이전 이미지 
	var before_obj = null;
	var select_img;
	var select_color;
	$(".add_img").on('click',function(){
		console.log("image click!!!");
		var chk_img = $(this).closest(".icon_select").find('input').eq(0).val();
		select_img = $(this).closest(".icon_select").find('input').eq(1).val();
		
		console.log(chk_img);
		console.log(select_img);
		
		if(before_img != "" && before_obj != null){
			console.log("상태변화");
			console.log("if문 안!!!!!!");
			before_obj.attr("src",before_img);
		}
		
		console.log("아이콘");
		$("#add_img").attr("src",select_img);
		$(this).attr("src",chk_img);
		before_img = select_img;
		before_obj = $(this);
		console.log(select_img);
		console.log("!!!!!!!!!!!");
	});
	var img_color;
	var hex_color;
	$(".add_color").on('click',function(){
		console.log("색깔 클릭");
		var chk_img_color = $(this).closest(".icon_select").find('input').eq(0).val();
		img_color = $(this).closest(".icon_select").find('input').eq(1).val();
		hex_color = $(this).closest(".icon_select").find('input').eq(2).val();
		console.log(chk_img_color);
		console.log(img_color);
		console.log(hex_color);
		console.log("배경");
		$("#add_img").css("background-color",hex_color);
	});
	$("#create_room_btn").on('click', function(){
		console.log("create_room_btn");
		createGroup(select_img ,hex_color);
		//초기화
		$('#gro_subject').find('option:first').attr('selected', 'selected'); 
		$('#gro_grade').find('option:first').attr('selected', 'selected'); 
		$('#gro_name').val('');
		$("#add_img").attr("src","img/chair.PNG");
		$("#add_img").css("background-color",'#bbe7ff');
		
	});
	
	/*
	 *     오답노트 들어가기 
	 */
	var note_value;
	$(".my_note").on('click',function(){
		console.log("click!!!!!");
		$("#note_detail").removeClass("none");
		console.log($(this).find("input").eq(0).val());
		note_value = $(this).find("input").eq(0).val();
		selectNote(note_value);
		
		$("#note_detail").animate({
			"left":"0"
		}, 500);
	});
	
	
	
	$("#delete_note_button").on('click', function() {
		console.log("삭제!!!!!!!!");
	/*	var cb_flag = $('input:checkbox[name="cname"]').is(":checked") 
		console.log(cb_flag);
		var value = $('.ids:checked').val();
		console.log(value);*/
		var delArr = [];
		 $('input:checkbox[name="cname"]:checked').each(function() {
		      console.log("값 =" + this.value);
		      delArr.push(this.value);
		  });
		 for(var i = 0; i < delArr.length; i++){
			 console.log("value = " + delArr[i]);
		 }
		  var NoteObj = {'noteDeleteNo':delArr};
		  
	      $.ajax({
	  		type:"post", 
	  		data:JSON.stringify(NoteObj),
	  		dataType:'text',
	  		contentType:'application/json',
	  		url:"../deleteNote.do", 
	  		success:function(data) {
	  			console.log(data);
	  			selectNote(note_value);
	  		},
	  		error:function(xhr){ 
	  			console.log("문제 발생!!!!!");
	  		} 
	  	});
		 
	});
	
	$("#getQnA").on('click', function() {
		console.log("질문가져오기");
		$(".black_overlay").show();
		$("#get_qna_list").show();
		getQnA(note_value);
	});
	//popover
	/*
	$(function (){
		 $(".sideview").popover("hide");
	});*/
	
	$("#get_qna_list").on('click', "#get_qna_close", function() {
		$(this).parent().hide();
		$(".black_overlay").hide();
	});
	
	$("#write_note_button").on('click',function(){
		console.log("오답노트 글쓰기 버튼!!!!!!");
		//alert("오답노트 = " + note_value);
		$("#note_subject").val(note_value);
	});
	
	/*
	 * 		과목 가져오기 열고 닫기
	 */
	
	$("#get_qna_list").on('click', '.get_q_a', function() {
		var $myParent = $(this).parent();
		
		if ($myParent.next().hasClass("none")) {
			$myParent.next().removeClass("none");
			$myParent.next().css("display","inline-block");
		} else {
			$myParent.next().addClass("none");
			$myParent.next().css("display","none");
			
		}
	});
	/*
	 * 		질문 가져오기 버튼 클릭
	 */
	$("#get_qna_list_content").on('click',".title_button",function(){
		$("#qcard").empty();
		var queryReq = $(this).parent().find("input").val();
		var title = $(this).parent().text();
		var q_title = title.replace("질문 추가", "");
		$("#qcard").text(q_title);
		getAnswer(queryReq);
		//$(".get_a_title").removeClass("none");
		//alert($(this).next().text());
	});
	
	/*
	 * 		에디터
	 */
	var callElement;
	var callElement_body;
	var headerElement;
	
	/*
	 * 일반 에디터
	 */
	
	$("#div_q").on('keyup', '#general_editor', function(e) {
		editor_buffer = $('#general_editor').html();
	});
	$("#div_q").on('keyup', '#question_title', function(e) {
		header_buffer = $('#question_title').val();
	});	
	$("#div_q").on('click', "#general_editor_btn", function() {
		editor_buffer +=  $("#english_editor").text();
	
		$("#div_q").html($("#g_editor").html());
		$('#general_editor').html(editor_buffer);
	});
	//test
	// file insert 용
	$("#insertupBtn").click(function() {
		console.log("insert");
		if($("#Insertuploader").val()){
//			alert("사진있음");
			$('#insertup').submit(function() {
				console.log("insert inner");
				$("#insertup").ajaxSubmit(option);
				return false;
			});
			var option = {
				beforeSubmit : function() {
					console.log('ajaxForm insert 전송 시작!');
				},
				success : function(data) {
					console.log(data);
//					insertBoard(data);
				}
			}
		} else {
//			alert("사진없음");
		}
	});
	//질문 올리기
	$("#div_q").on('click','#add_question' ,function(){
		
		var title = $('#question_title').val();
		var content = $('#div_q > #general_editor').html();
		console.log("방이름  " + room_num_obj.room_num);
		add_question(ObjectStorage.getItem("login").mbNo, room_num_obj.room_num, title, content);
		
		
	});
	/*
	 * 영어 에디터
	 */
	$("#div_q").on('click', "#general_english_btn", function() {
		$("#div_q").html($("#e_editor").html());
	});
	
	/*
	 * 수학 에디터
	 */
	$("#div_q").on('click', "#general_math_btn", function() {
		$("#div_q").html($("#g_editor").html());
		$('#mathModal').modal('show');
		callElement = 'div_q';
		callElement_body = 'g_editor';
		headerElement = 'question_title';
	});
	
	$("#mathModal").on('click', '.math_send', function(){
		var latexMath = $('#editable-math'); 
		var img_html = '<img src="http://latex.codecogs.com/gif.latex?'+latexMath.mathquill('latex') +'">';

		$('#mathModal').modal('hide');
		$("#"+callElement).html($("#"+callElement_body).html());
		$("#"+headerElement).val(header_buffer);
		$("#"+callElement + '>' +'#general_editor').html(editor_buffer + img_html);
		
		editor_buffer+=img_html;
	});
	
	$("#mathModal").on('click', '.mathModal_close', function(){

		$('#mathModal').modal('hide');
		
	});
	
	/* 
	 * 지우개 
	 */
	
	$("#div_q").on('click', "#general_eraser_btn", function() {
		$('#general_editor').text('');
		editor_buffer='';
	});
	

	/*
	 * 답변 일반 에디터
	 */
	
	$("#answer_modal").on('keyup', '#general_editor', function(e) {
		editor_buffer = $('#general_editor').html();
	});
	
	$("#answer_editor").on('keyup', '#answer_title', function(e) {
		header_buffer = $('#answer_title').val();
	});
	
	$("#answer_modal").on('click', "#re_general_editor_btn", function() {
		//editor_buffer +=  $("#english_editor").text();
	
		$("#answer_editor").html($("#answer_editor").html());
		$('#answer_editor > #general_editor').html(editor_buffer);
	});
	
	/*
	 * 답변 영어 에디터
	 */
	$("#answer_modal").on('click', "#re_general_english_btn", function() {
		//$("#answer_editor").html($("#e_editor").html());
	});
	
	/*
	 * 답변 수학 에디터
	 */
	$("#answer_modal").on('click', "#re_general_math_btn", function() {
		$("#answer_editor").html($("#answer_editor").html());
		$('#answer_title').val(header_buffer);
		$('#mathModal').modal('show');
		callElement = 'answer_editor';
		callElement_body = 'answer_editor';
		headerElement = 'answer_title';
	});
	
	/* 답변 지우개 */
	$("#answer_modal").on('click', "#re_general_eraser_btn", function() {
		$('#general_editor').text('');
		editor_buffer='';
	});
	
	/*
	 * 자세히보기 일반 에디터
	 */
	
	$("#detailModal").on('keyup', '#detail_editor > #general_editor', function(e) {
		editor_buffer = $('#detail_editor #general_editor').html();
	});
	
	$("#answer_editor").on('keyup', '#detail_title', function(e) {
		header_buffer = $('#detail_title').val();
	});
	
	$("#detailModal").on('click', "#detail_general_editor_btn", function() {
		$("#detail_editor").html($("#detail_editor").html());
		$('#detail_editor > #general_editor').html(editor_buffer);
	});
	
	/*
	 * 자세히보기 영어 에디터
	 */
	$("#detailModal").on('click', "#detail_general_english_btn", function() {
		//$("#answer_editor").html($("#e_editor").html());
	});
	
	/*
	 * 자세히보기 수학 에디터
	 */
	$("#detailModal").on('click', "#detail_general_math_btn", function() {
		$("#detail_editor").html($("#detail_editor").html());
		$('#detail_title').val(header_buffer);
		$('#mathModal').modal('show');
		callElement = 'detail_editor';
		callElement_body = 'detail_editor';
		headerElement = 'detail_title';
		
	});
	
	
	/* 
	 *자세히보기 지우개
	 */
	$("#detailModal").on('click', "#detail_general_eraser_btn", function() {
		$('#detail_editor > #general_editor').text('');
		editor_buffer='';
	});
	
	document.getElementById('uploadImage').addEventListener('change', handleFileSelect, false);
	
});


