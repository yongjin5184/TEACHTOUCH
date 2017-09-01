var grp_no;
var mem_no = ObjectStorage.getItem("login").mbNo;
var count_fore = 0;
var count_back = 3; 

var qaArray = new Array();
var index = 0;
var ele = "";

//var url = "http://175.126.125.214:3000";
var url = "http://localhost:3000";
$(document).ready(function(){
//	get_question();
//	console.log("처음!!!!");
//	$(window).scroll(function(){
//		
//		if($(window).scrollTop() >= $(document).height() - $(window).height()){
//			get_question();
//		}
//
//	});
});

function init() {
	qaArray = [];
	index=0;
}
function get_question(room_num) {
	grp_no = room_num; //groupNo
	console.log("room_num = " + room_num);
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
			$("#div_qna").append("<div class='question'>  " +
					"<input type='hidden' name='qna1' value='question_01'/> " +
				"<div class='question_logo'>" +
					"QUESTION"
				+ "</div> " +
				"<table border='0' width='100%'> " +
				"<tr> " +
					"<td width='35%' align='center'>" +
						"<div class='question_namecard'>" +
								"<table>" +
									"<tr>" + 
										"<td>" +
											"<img width='100%' src='aa'>" +
										"</td>" +
									"</tr>" +
									"<tr>" +
										"<td>" +
											"이름" //MemberId
										+"</td>" +
									"</tr>" +
								"</table>" +
							"</div>" +
						"</td>" +
						"<td width='65%' style='position:relative;'>" +
							"<div class='question_func'>" +
								"<table  width='100%' style='margin:0.5em auto; margin-bottom:1em;'>" +
									"<tr>" +
										"<td>" +
											"<span class='question_num'>" +
												"No234" //No
											+"</sapn>" +
										"</td>" +
										"<td>" +
											"<span class='answer_three_light'>" +
												"rgb" //
											+"</span>" +
										"</td>" +
										"<td align='right'>" +
											"<span class='answer_button'>" +
												"Answer"
											+"</span>" +
										"</td>" +
									"</tr>" +
								"</table>" +
							"</div>" +
							"<div class='qna_title'>"+
								"글제목" //title
							+"</div>" +
								
							"<div class='qna_contents'>" +
								"글내용이 길경우 하나의 줄만 유지가 되는지 테스트해봅니다. 하나둘셋. 하나둘셋넷. 하나둘셋넷다섯, 가나다라마바사아자차카타파하" //content
							+ "</div>" +
							"<div>" +
								"<table width='100%'>" +
									"<tr>" +
										"<td>" +
											"<span class='detail'>" +
												"자세히보기" 
											+"</span>" +
										"</td>" +
										"<td align='right'>" +
											"<span class='date'>" +
												"2014-09-09"
											+"</span>" +
										"</td>" +
									"</tr>" +
								"</table>" +
							"</div>" +
						"</td>" +
					"</tr>" +
				"</table>");
			
			for(var i = 0; i < data.length; i++){
				//DB 에서 질문 내용 가져오기...
				//qaArray.push(data[i]);
//				console.log(data[i]);
				console.log("success!!!!!!!!!!");
				//질문 답변 세트로 질문에 대한 답변은 여러개 올 수 있으므로 배열에 넣어놓음.
				console.log("i=" + i);
				ele += '<div class="lastid" id='+ i +'><p>'+"question "+ i + " " 
				+ data[i].req_results.query_req_content +'</p></div>';
				for(var j = 0; j < data[i].res_results.length; j++){
					console.log("j=" + j);
					ele += '<div class="lastid" id='+ j +'><p>'+"answer "+ j + " " 
					+ data[i].res_results[j].query_res_content +'</p></div>';
				}
			}
			if(ele != ""){
		    	$("#qna_inner_div").append(ele);
		    }
//			display_question();
			//qaArray = [];
			count_back+=3;
			ele='';
		},
		error : function(){
		}
	
	});
}
function add_question() {
	console.log("question button");
//	var subject = document.getElementById('qa_subject').value;
	var content = $('textarea#qa_content').val();
//	console.log(content);
	$.ajax({
		url : url+"/AddQuestion",
		type : "post",
		data : {
			'member' : mem_no,
			'group' : grp_no,
			//'subject' : subject,
			'content' : content
		},
		dataType : "json",
		
		success : function(data) {
			console.log("success add_question()");
//			get_question();
		},
		
		error : function(){
		}
	});
}
