
var roomlist = [];
var check_roomlist = [];
var serverUrl = 'http://'+window.location.hostname+':'+'3000';
var socket = io.connect(serverUrl);
var clientid;
var myname = '';
/////////////////////////////////////////////////////////////
// information
var member_num = 2;
var group_num = 1;
var isRoomMaster = 0;
/////////////////////////////////////////////////////////////
$(document).ready(function(){	
	
	//방만들기 
	$("#room_make").click(function(){
		if($("#roomname").val() === ''){
			alert('fill room name');
			return;
		}
		for(var i=0; i<check_roomlist.length; i++){
			if(check_roomlist[i] === $("#roomname").val()){
				alert('already exist room name. try again!!');
				$("#roomname").val('');
				return;
			}
		}
		var data = {"roomname":$("#roomname").val(), 'group_num':group_num, 'member_num':member_num};
		socket.emit('roommake', data);
		$("#roomname").val("");
	});
	
	//
	$("#chatroom").hide();
	
	//로딩시에 방목록 얻어오기 요청
	getRoomList();
	socket.on('yourname', function(data){
		if(Number(data.group_num) != Number(group_num)) return;
		if(Number(data.member_num) == Number(member_num)) {myname = data.member_name;}
		
	});
	
	//방목록 얻어오기 요청
	socket.on('roomlist',function(data){
		if(Number(data.group_num) != group_num) return;
		//개설된 방목록 
		roomlist = [];
		if(Number(data.member_num) == Number(member_num))	isRoomMaster = Number(data.isRoomMaster);
		clientid = data.clientid;
		data = data.roomdata;
		
		for(var key in data){
			if(key.indexOf("/") > -1){
				
				var myroom = false;
				
				for(var i = 0 ; i < data[key].length ; i++){
					if(data[key][i] == io.sockets[serverUrl].sessionid)
						myroom = true;
				}
				
				roomlist.push({"name":key.split("/").join(""),count:data[key].length,myroom:myroom});
			}
		}

		viewRoomlist(roomlist);
	});
	
	
	//Room 변경 
	socket.on('room_research',function(data){
		getRoomList();
	});
	
	//입장시 화면 처리
	socket.on('intro',function(data){
		$("#chatroom textarea").val($("#chatroom textarea").val() + '(' + data + ') is in room\n');
		$('#chatroom textarea').scrollTop($('#chatroom textarea')[0].scrollHeight);
	});

	//msg 처리
	socket.on('message_send',function(data){
		$("#chatroom textarea").val($("#chatroom textarea").val() + '[' + data.from + '] : ' + data.msg + '\n');
		$('#chatroom textarea').scrollTop($('#chatroom textarea')[0].scrollHeight);
		console.log(data);
		
	});
	
	//퇴장 화면 처리
	socket.on('message_send_disconnect',function(data){
		
		//console.log("DICONNECT");
		if(data.from == null) return;
		$("#chatroom textarea").val($("#chatroom textarea").val() + '(' + data.from + ') is out of room\n');
		$('#chatroom textarea').scrollTop($('#chatroom textarea')[0].scrollHeight);
	});

	
	//입력창에서 엔터시에 데이터 전송 
	$("#chatroom div input").keypress(function(e){
		if(e.keyCode == 13){
			socket.emit('message', {"msg":$("#chatroom div input").val()});
			$("#chatroom div input").val("");
		}
	});
	
});

//REST 요청으로 방목록 받아오기 
function getRoomList(){
	
	$.ajax({
		type: "post",
		dataType: "json",
		data : {'group_num' : group_num},
		url: serverUrl+"/roomlist",
		success: function(data){
			console.log(JSON.stringify(data));
			roomlist = [];
			
			for(var key in data){
				if(key.indexOf("/") > -1){
					var myroom = false;
					for(var i = 0 ; i < data[key].length ; i++){
						if(data[key][i] == io.sockets[serverUrl].sessionid)
							myroom = true;
					}
					
					roomlist.push({"name":key.split("/").join(""),count:data[key].length,myroom:myroom});
				}
			}
			
			viewRoomlist(roomlist);
		},
		error: function(res){
			
		}
	});
	
}


function viewRoomlist(data){
	check_roomlist = [];
	//reset
	for(var i=0; i<data.length; i++){
		check_roomlist[i] = data[i].name;
	}
	//기존리스트 삭제
	$("#roomlist li").remove();
	$("#teachroom").show();
	
	//방목록 표기 
	for(var i = 0 ; i < data.length ; i++){
		if(data[i].myroom){
			$("#teachroom").hide();
			$("#roommake").hide();
			$("#chatroom").show();
			$("#chatroom_legend").text("RoomName : " + data[i].name + " || counts : " + data[i].count + " || name:" + myname);
			
		}else{
			$("#roomlist").append("<li '>Room :" + data[i].name + ", counts :" + data[i].count + 
					" <input type = 'button' value = 'Enter' data-roomname='" + data[i].name + "' > </li>");
		}
	}
	
	if(data.length < 1){
		$("#roomlist").append("<li>Not exist created room</li>");
	}else{
		//이벤트 핸들러 설정
		$("#roomlist li input[type=button]").click(function(){

			var data = {"roomname":$(this).data("roomname"), 'group_num':group_num, "member_num":member_num};
			socket.emit('roommake', data);
			nickname = $("#roomlist li input[type=text]").val();
			
		});
		
	}
	
}
