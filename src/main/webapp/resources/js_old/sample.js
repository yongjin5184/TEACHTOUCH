var str = "";
function selectMember(){
	$.ajax({
		type:"post",
		url:"../selectMember.do",
		success:function(data){
			/*//VO에 있는 값 갖다가 쓰면 됩니다요.
			//mbNo,mbId,mbPassword,mbName,mbJob,mbEmail,mbPhone,mbAddr,mbLevel;
			str += "<p>" + data[1].mbId + "</p>" 
				+ "<p>" + data[1].mbPassword + "</p>";
			
			$("#sample").html(str);*/
			console.log(data);
		},error:function(xhr){
			console.log('문제발생!');
		}
	});
}