
var roomlist = [];
var check_roomlist = [];
var serverUrl = 'http://'+window.location.hostname+':'+'3000';
var socket = io.connect(serverUrl);
var clientid;
var myname = '';
/////////////////////////////////////////////////////////////
// information
var member_num = 1;
var group_num = 1;
var isRoomMaster = 0;
/////////////////////////////////////////////////////////////
$(document).ready(function(){	
	
	//諛��앹꽦
	$("#room_make").click(function(){
		
		if($("#roomname").val() === ''){
			alert('방 이름을 입력해주세요');
			return;
		}
		for(var i=0; i<check_roomlist.length; i++){
			if(check_roomlist[i] === $("#roomname").val()){
				alert('이미 존재하는 방입니다. 다시 시도해주세요.');
				$("#roomname").val('');
				return;
			}
		}
		var data = {"roomname":$("#roomname").val(), 'query_num':$('#querynum').val(), 'group_num':group_num, 'member_num':member_num};
		socket.emit('roommake', data);
		$("#roomname").val("");
		$("#querynum").val("");
	});
	
	$("#exit_teachroom").click(function(){
		socket.emit('leave_room', null);
		
	});

	$("#chatroom").hide();
	
	//諛⑹젙蹂��살뼱�ㅺ린
	getRoomList();
	socket.on('yourname', function(data){
		if(Number(data.group_num) != Number(group_num)) return;
		if(Number(data.member_num) == Number(member_num)) {myname = data.member_name;}
		
	});
	
	socket.on('roomlist',function(data){
		if(Number(data.group_num) != group_num) return; 
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
	
	
	//Room �ㅼ떆 媛�졇�ㅺ린
	socket.on('room_research',function(data){
		getRoomList();
	});
	
	
	socket.on('intro',function(data){
		$("#chatroom textarea").val($("#chatroom textarea").val() + '(' + data + ') 님이 들어왔습니다.\n');
		$('#chatroom textarea').scrollTop($('#chatroom textarea')[0].scrollHeight);
	});

	//msg 蹂대궡湲�
	socket.on('message_send',function(data){
		$("#chatroom textarea").val($("#chatroom textarea").val() + '[' + data.from + '] : ' + data.msg + '\n');
		$('#chatroom textarea').scrollTop($('#chatroom textarea')[0].scrollHeight);
		console.log(data);
		
	});
	
	//�묒냽 醫낅즺
	socket.on('message_send_disconnect',function(data){
		
		if(data.from == null) return;
		$("#chatroom textarea").val($("#chatroom textarea").val() + '(' + data.from + ') 님이 나가셨습니다.\n');
		$('#chatroom textarea').scrollTop($('#chatroom textarea')[0].scrollHeight);
		
	});

	socket.on('message_send_leave',function(data){
	
		if(data.from == null) return;
		$("#chatroom textarea").val($("#chatroom textarea").val() + '(' + data.from + ') 님이 나가셨습니다.\n');
		$('#chatroom textarea').scrollTop($('#chatroom textarea')[0].scrollHeight);
		
	});
	
	//梨꾪똿 �낅젰
	$("#chatroom div input").keypress(function(e){
		if(e.keyCode == 13){
			socket.emit('message', {"msg":$("#chatroom div input").val()});
			$("#chatroom div input").val("");
		}
	});
	
});

//REST 梨꾪똿諛��붿껌
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
	//占쏙옙占쏙옙占쏙옙占쏙옙트 占쏙옙占쏙옙
	$("#roomlist li").remove();
	$("#roommake").show();
	$("#teachroom").show();
	$("#chatroom").hide();
	//占쏙옙占쏙옙 표占쏙옙 
	for(var i = 0 ; i < data.length ; i++){
		if(data[i].myroom){
			$("#teachroom").hide();
			$("#roommake").hide();
			$("#chatroom").show();
			$("#chatroom_legend").text("방 이름 : " + data[i].name + " || 인원수 : " + data[i].count + " || 이름 :" + myname);
			
		}else{
			$("#roomlist").append("<li '>방 이름 :" + data[i].name + ", 인원 수 :" + data[i].count + 
					" <input type = 'button' value = 'Enter' data-roomname='" + data[i].name + "' > </li>");
		}
	}
	
	if(data.length < 1){
		$("#roomlist").append("<li>아직 개설된 방이 없습니다.</li>");
	}else{
		
		$("#roomlist li input[type=button]").click(function(){

			var data = {"roomname":$(this).data("roomname"), 'query_num':$('#querynum').val(), 'group_num':group_num, "member_num":member_num};
			socket.emit('roommake', data);
			nickname = $("#roomlist li input[type=text]").val();
			
		});
		
	}
	
}
