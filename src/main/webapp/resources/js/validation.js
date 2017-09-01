var cssObj_basic = {"color" : "#34495e", "background-color" : "#ffffff"};
var cssObj_basic_blur = {"color" : "#34495e", "border-color" : "#A5DE9F"};

var cssObj_after = {"color" : "red", "background-color" : "#E1E1E1"};

var patient_admission_flag = true;
//정규식
var nameRegEx = /^[가-힣]{2,4}$/;
var juminRegEx1 = /^[0-9]{2}([0]{1}[1-9]{1}|[1]{1}[0-2]{1})([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-1]{1})$/;
var juminRegEx2 = /^[1-2]{1}[0-9]{6}$/;
var phoneRegEx1 = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
//var phoneRegEx1 = /^[0]{1}[0-9]{1,2}$/; 
//var phoneRegEx2 = /^[0-9]{3,4}$/;
//var phoneRegEx3 = /^[0-9]{4}$/;
var emailRegEx = /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
//check flag
var admission_name_flag = false;
var admission_id_flag = false;
var admission_password_flag = false;
var admission_phone1_flag = false;
//var admission_phone2_flag = false;
//var admission_phone3_flag = false;
var admission_sex_flag = false;
var admission_job_flag = false;
var admission_email_flag = false;

function nameCheck(name){
	if(name.length <2 || name.length>4) {
		$("#checkIn_name").css(cssObj_after);
		$("#checkIn_name").val("이름은 2~4자로");
		$("#checkIn_name").focus(function() {
			$("#checkIn_name").css(cssObj_basic);
			$("#checkIn_name").val("");
		});
//		$("#checkIn_name").change(function() {
//			$("#checkIn_name").css(cssObj_basic);
//		});
//		alert("이름을 정확히 입력해 주세요(2~4)");
		patient_admission_flag = false;
		return;
	} else if(name.search(nameRegEx) == -1) {
		$("#checkIn_name").css(cssObj_after);
		$("#checkIn_name").val("이름은 한글만");
		$("#checkIn_name").focus(function() {
			$("#checkIn_name").css(cssObj_basic);
			$("#checkIn_name").val("");
		});
//		$("#checkIn_name").change(function() {
//			$("#checkIn_name").css(cssObj_basic);
//		});
//		alert("이름은 한글만...");
		admission_name_flag = false;
		return;
	} else {
		admission_name_flag = true;
	}
};

function idCheck(id) {
	if(id.length <5 || id.length >12) {
		$("#checkIn_id").css(cssObj_after);
		$("#checkIn_id").val("ID는 5~12자로");
		$("#checkIn_id").focus(function() {
			$("#checkIn_id").css(cssObj_basic);
			$("#checkIn_id").val("");
		});
//		$("#checkIn_id").change(function() {
//			$("#checkIn_id").css(cssObj_basic);
//		});
//		alert("id는 5글자 이상 12글자 이하로 입력해주세요.");
		admission_id_flag = false;
		return;
	} else {
		admission_id_flag = true;
	}
};

function passwordCheck(password) {
	if(password.length < 5 || password.length > 12) {
		console.log(password);
		alert("암호는 5글자 이상 12글자 이하로 입력해주세요.");
		$("#checkIn_pass").css(cssObj_after);
		$("#checkIn_pass").focus(function() {
			$("#checkIn_pass").css(cssObj_basic);
			$("#checkIn_pass").val("");
		});
//		$("#checkIn_pass").change(function() {
//			$("#checkIn_pass").css(cssObj_basic);
//		});
		admission_password_flag = false;
		return;
	} else {
		admission_password_flag = true;
	}
};

function phoneCheck1(phone) {
	if(phone.search(phoneRegEx1) == -1) {
		$("#checkIn_phoneNum_first").css(cssObj_after);
		$("#checkIn_phoneNum_first").val("정확히 입력해주세요");
		$("#checkIn_phoneNum_first").focus(function() {
			$("#checkIn_phoneNum_first").css(cssObj_basic);
			$("#checkIn_phoneNum_first").val("");
		});
//		alert("전화번호를 정확히 입력해주세요.");
		admission_phone1_flag = false;
		return;
	} else {
		admission_phone1_flag = true;
	}
};

//function phoneCheck2(phone) {
//	if(phone.search(phoneRegEx2) == -1) {
//		$("#checkIn_phoneNum_mid").css(cssObj_after);
//		$("#checkIn_phoneNum_mid").val("정확히 입력해주세요");
//		$("#checkIn_phoneNum_mid").focus(function() {
//			$("#checkIn_phoneNum_mid").css(cssObj_basic);
//			$("#checkIn_phoneNum_mid").val("");
//		});
////		alert("전화번호를 정확히 입력해주세요.");
//		admission_phone2_flag = false;
//		return;
//	} else {
//		admission_phone2_flag = true;
//	}
//};

//function phoneCheck3(phone) {
//	if(phone.search(phoneRegEx3) == -1) {
//		$("#checkIn_phoneNum_last").css(cssObj_after);
//		$("#checkIn_phoneNum_last").val("정확히 입력해주세요");
//		$("#checkIn_phoneNum_last").focus(function() {
//			$("#checkIn_phoneNum_last").css(cssObj_basic);
//			$("#checkIn_phoneNum_last").val("");
//		});
////		alert("전화번호를 정확히 입력해주세요.");
//		admission_phone3_flag = false;
//		return;
//	} else {
//		admission_phone3_flag = true;
//	}
//};
//
function sexCheck(sex) {
	if(sex != "M" && sex != "F") {
		alert("성별을 선택해주세요.");
		admission_sex_flag = false;
		return;	
	} else {
		admission_sex_flag = true;
	}
};

function jobCheck(job) {
	if(job != "S" && job != "T") {
		alert("직업을 선택해주세요.");
		admission_job_flag = false;
		return;	
	} else {
		admission_job_flag = true;
	}
};

function emailCheck(email){
	console.log("이메일체크");
	if(email.search(emailRegEx) == -1) {
		$("#checkIn_email").css(cssObj_after);
		$("#checkIn_email").val("email을 정확히 입력해주세요");
		$("#checkIn_email").focus(function() {
			$("#checkIn_email").css(cssObj_basic);
			$("#checkIn_email").val("");
		});
		admission_email_flag = false;
	}else{
		admission_email_flag = true;
	}
};
