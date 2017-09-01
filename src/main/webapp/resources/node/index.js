var grp_no;
var mem_no;
var count_fore = 0;
var count_back = 3; 

var qaArray = new Array();
var index = 0;
var ele = "";
//Answercard
var query_req_no; //card no
var query_req_title;
var query_req_content;
var query_res_refer; 
//var url = "http://175.126.125.214:3000";

var url = "http://"+window.location.hostname+":3000";
//var url = "http://localhost:3000";
$(document).ready(function(){
//	get_question(grp_no);
	//자세히 보기
	var $detailButton = $(".detail");
	
	$("#div_qna").on('click','.detail', function(){
		
		var card_name = $(this).find('input').attr('name');
		var card_val = $(this).find('input').val();
		check_card_name = card_name;
		switch (card_name) {
			case 'q_no':
				
				detail_question(card_val);	
				break;	
			case 'a_no':
			
				detail_anwser(card_val);
				break;
			default:
				break;
		}
		
	 });
	//질문 자세히 보기
	function detail_question(question_no){
		
		$.ajax({
			url : url+"/detailQuestion",
			type : "post",
			data : {
				'queryReqNo' : question_no,
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8" ,
			dataType : "json",
			
			success : function(data) {
				
				var req_content = data[0].query_req_content;
				var req_title = data[0].query_req_title;
				var query_req_no = data[0].query_req_no;
				
				$("#detail_qnaNumber").text(query_req_no);
				$("#detail_title").val(req_title);
				$("#detail_editor > #general_editor").html(req_content);
				header_buffer = req_title;
				editor_buffer = req_content;
				$("#detailModal").modal('show');
			}
		});
	}
	//답변 자세히 보기 
	function detail_anwser(answer_no){
		$.ajax({
			url : url+"/detailAnswer",
			type : "post",
			data : {
				'queryResNo' : answer_no,
			},
			dataType : "json",
			
			success : function(data) {

				var res_content = data[0].query_res_content;
				var res_title = data[0].query_res_title;
				var query_res_no = data[0].query_res_no;
				
				$("#detail_qnaNumber").text(query_res_no);
				$("#detail_title").val(res_title);
				$("#detail_editor > #general_editor").html(res_content);
				
				header_buffer = res_title;
				editor_buffer = res_content;
				$("#detailModal").modal('show');
			}
		});
	}
	
	//Modal 닫기
	$("#answer_modal").on('click', ".answer_register_close", function() {
		
		$('#answer_modal').modal('hide');
		header_buffer='';
		editor_buffer='';
	});

	//Answer 등록
	$("#answer_modal").on('click', "#answer_register",function() {
		
		
		mb_no = ObjectStorage.getItem("login").mbNo;
		query_res_refer = 1;
		add_answer(query_req_no, grp_no , mb_no , query_res_refer);
		get_question(grp_no);

		$('#answer_modal').modal('hide');
		
		header_buffer='';
		editor_buffer='';
	});
});

function init() {
	qaArray = [];
	index=0;
}

function get_question(room_num) {
	grp_no = room_num; //groupNo
	console.log("room_num = " + room_num);
	mem_no = ObjectStorage.getItem("login").mbNo;
	console.log("mem_no = " + mem_no);
	$.ajax({
		url : url+"/GetQuestion",
		type : "post",
		data : {
			'group' : grp_no,
			'count_fore' : count_fore,
			'count_back' : count_back
		},
		dataType : "json",
		
		success : function(data) {
			$("#div_qna *").remove();
			//console.log(JSON.stringify(data));
			console.log(JSON.stringify(data));
			for(var i = 0; i < data.length; i++){
				//DB 에서 질문 내용 가져오기...
				//qaArray.push(data[i]);
//				console.log(data[i]);
				console.log("success!!!!!!!!!!");
				//질문 답변 세트로 질문에 대한 답변은 여러개 올 수 있으므로 배열에 넣어놓음.
				console.log("i=" + i);
				ele += "<div class='div_qna_list'>" +
						"<div class='question'>" +
						"<input type='hidden' name='qna1' value='" + data[i].req_results.query_req_no + "'/> " +
						"<input type='hidden' name='q_content' value='" + data[i].req_results.query_req_title + "'/>" +
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
												"<span class='answer_button' data-toggle='modal' data-target='#answer_modal'>" +
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
								isHaveImg(data[i].req_results.query_req_content)
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
										isHaveImg(data[i].res_results[j].query_res_content)
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
			if(ele != ""){$("#div_qna").append(ele);}

			count_back+=3;
			ele="";
			//답변 버튼을 눌렀을 때
			var $answerButton = $(".question .answer_button");
			$answerButton.on('click', function() {
				$('#answer_modal').modal('show');
				$('#answer_title').val('');
				$('#answer_editor > #general_editor').html('');
				query_req_no = $(this).closest(".question").find("input").eq(0).val();
				query_req_title = $(this).closest(".question").find("input").eq(1).val();
				$('#answer_modal_title').text('Answer-'+ query_req_no + ' : ' + query_req_title);
			
				element = "";
				header_buffer = "";
				editor_buffer = "";
				
				
			});
		},
		error : function(){
		}
	
	});
}


//답변 함수
function add_answer(query_req_no, grp_no , mb_no , query_res_refer) {
	//console.log(query_req_no, grp_no,mb_no);

	var answer_title = $('#answer_title').val();
	var answer_content = $('#answer_editor > #general_editor').html();
	$.ajax({
		type : "post",
		data : {
			'queryReqNo' : query_req_no,
			'groNo' : grp_no,
			'mbNo' : mb_no,
			'queryResSubject' : "Math",
			'queryResTitle' : answer_title,
			'queryResContent' : answer_content,
			'queryResFile' : "File",
			'queryResRefer' : query_res_refer
		},
		dataType : "json",
		url : url+"/AddAnswer",
		success : function(data) {
			alert("답변이 등록되었습니다.");
		},
		error : function(xhr) {
			alert("에러에러");
		}
	});
}
//신호등 update
function updateThreeLight(grp_no, req_num, three_color){
	$.ajax({
		url : url+"/UpdateThreeLight",
		type : "post",
		data : {
			'gro_no' :grp_no,
			'req_num' : req_num,
			'three_color' : three_color
		},
		dataType : "json",
		success : function(data) {
			console.log(eval(data));	
		},
		error : function(xhr){
			/* error */
		}
	});
}

 function add_question(mb_no, grp_no, title, content){

//	 alert(mb_no+grp_no+title+content);
//	var subject = document.getElementById('qa_subject').value;
//	var content = $('textarea#qa_content').val();
//	console.log(content);
	$.ajax({
		url : url+"/AddQuestion",
		type : "post",
		data : {
			'title' : title,
			'member' : mb_no,
			'group' : grp_no,
			'subject' : "수학",
			'content' : content
		},
		dataType : "json",
		
		success : function(data) {
			console.log("success add_question()");
//			get_question();
			var $roomTabMenu1 = $("#room_tab_menu ul li:nth-of-type(1)");
			alert('질문이 등록되었습니다.');
			$($roomTabMenu1).trigger('click');
		},
		
		error : function(){
		}
	});
}
/*
 *		자세히 보기  
*/
 
//QnA 수정

//질문수정
function questionUpdate(detail_no_value,detail_editor_value,detail_title_value){
 	//alert("질문 수정!!!!!!!!!!");
 	$.ajax({
 		url : url+"/questionUpdate",
 		type : "post",
 		data : {
 			'queryQesNo' : detail_no_value,
 			'queryQesContent' : detail_editor_value,
 			'queryQesTitle' : detail_title_value
 		},
 		dataType : "json",
 		
 		success : function(data) {
 	
 		}
 	});
} 
 
//답변수정
function answerUpdate(detail_no_value,detail_editor_value,detail_title_value){
//	alert("답변 수정!!!!!!!!!!");
 	$.ajax({
 		url : url+"/answerUpdate",
 		type : "post",
 		data : {
 			'queryResNo' : detail_no_value,
 			'queryResContent' : detail_editor_value,
 			'queryResTitle' : detail_title_value
 		},
 		dataType : "json",
 		
 		success : function(data) {
 			//console.log(data);
 		}
 	});
 }

function isHaveImg(html) {
	if(html.indexOf('<img') > -1) {
		return "이미지 있음";
	}
	else {
		return html.substring(0, 30)+"...";
	}
}