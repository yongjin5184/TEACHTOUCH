/**
 * Chat Server Source
 */
io.sockets.on('connection',function(socket){
	
	socket.on('roommake',function(data){

		socket.join(data.roomname);
		socket.set('room',data.roomname);
		//console information
		console.log("////////////////////////////////////////////////");
		console.log("roomname : " + data.roomname);
		console.log("query_num : " + data.query_num);
		console.log("group_num : " + data.group_num);
		console.log("member_num : " + data.member_num);
		console.log("////////////////////////////////////////////////");
		
		//data value check
		
		if(data.query_num != Number(data.query_num)) {
			data.query_num = '';
		}
		
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// step1 - set member_name
		var connection =  connDB();
		connection.connect();
		connection.query('SELECT mb_name FROM rtes_member WHERE mb_no='+data.member_num, function(err, results, fields){
			
			if(err)
			     throw err;
			
			//��ϵ��� ���� ����� ����ó��
			if(results.length == 0) {
				socket.set('member_name', 'member_name error');
			}
			
			//��ϵ� �����
			socket.set('member_name', results[0].mb_name);
			
			//////////////////////////////////////////////////////////////////////////////////////////////////////////
			//step2 room_manage setting
			
			var search_group = false;
			var search_room = false;
			var my_group_room_list = [];
			var isRoomMaster = 0;
			//first search group exist or not exist 
			for(var i=0; i<room_manage.length; i++){
				if(Number(room_manage[i].group_num) == Number(data.group_num)) {
					console.log("exist group")
					search_group = true;
					my_group_room_list =  room_manage[i].rooms;
					break;
				}
			}
			
			//exist
			if(search_group) {
				//search this room alreay exist
				for(var i=0; i<my_group_room_list.length; i++){
					if(my_group_room_list[i].room_name === data.roomname) {
						console.log("exitst room")
						search_room = true;
						break;
					}
				}
				
				if(!search_room) {
					//방장만이 방정보를 넣을 수 있다.
					my_group_room_list.push({'room_name':data.roomname, 'room_master':data.member_num, 'query_num' : data.query_num});
				}
				
			}
			//not exist 
			else {
				console.log("not exist group")
				var obj = {};
				var arr = [];
	
				arr.push({'room_name':data.roomname, 'room_master':data.member_num, 'query_num' : data.query_num});
				obj.group_num = data.group_num;
				obj.rooms = arr;
				my_group_room_list = arr;
				room_manage.push(obj);
			}
			console.log("first : " + JSON.stringify(room_manage));
			console.log("second : " +  JSON.stringify(io.sockets.manager.rooms));
			////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////
			//step3 parsing my group room list
			
			var group_room = []; //���� client�� �ִ� group�� room ����Ʈ��
			var room_manage_obj = io.sockets.manager.rooms; 
			var grouop_room_manage_obj = {}; // �ش� �׷��� ������
			
			for(var i=0; i<room_manage.length; i++){
				if(Number(room_manage[i].group_num) == Number(data.group_num)){
					group_room = room_manage[i].rooms;
				}
			}
			
			for(var i=0; i<group_room.length; i++){
				var room = group_room[i];
				//console.log("room : "+room)
				for(var key in room_manage_obj){
					if(room.room_name == key.split("/").join("")){
						var obj_key = '/'+room.room_name;
						grouop_room_manage_obj[obj_key] = room_manage_obj[key];
						break;
					}
				}
			}
			
			console.log('my group room list : ' + JSON.stringify(grouop_room_manage_obj));
			////////////////////////////////////////////////////////////////////////////////////////////////////////
			// set permission
			for(var i=0; i<room_manage.length; i++){
				for(var j=0; j<room_manage[i].rooms.length; j++){
					//���� ���� �ִ� �濡�� ���� �븶���Ϳ� ���� ������ ���� �ο�
					if((room_manage[i].rooms[j].room_name === data.roomname) && 
							(Number(room_manage[i].rooms[j].room_master) == Number(data.member_num))){
						isRoomMaster = 1;
					}
				}
			}
			////////////////////////////////////////////////////////////////////////////////////////////////////////
			//�� ��� ���
			socket.get('member_name',function(err, name){
				io.sockets.emit('yourname',{"group_num":data.group_num, "member_num":data.member_num, "member_name":name});
				io.sockets.emit('roomlist',{"roomdata":grouop_room_manage_obj,"clientid":socket.id, "member_num":data.member_num, "group_num":data.group_num, "isRoomMaster":isRoomMaster});
				socket.get("room",function(err,room){
					io.sockets.in(room).emit('intro',name);
				});
			});
		});
		connection.end();
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		var connection =  connDB();
		// 질문을 한 사람에게 방이 만들었음을 알리는 push
		if(data.query_num != ''){
			connection.query('SELECT * FROM rtes_query_req WHERE query_req_no='+Number(data.query_num), function(err, results, fields){
				
				if(err)
				     throw err;
				
				if(results.length > 0) {
					
					var re_connection =  connDB();
					re_connection.query('SELECT mb_register_id FROM rtes_member WHERE mb_no='+Number(results[0].mb_no), function(err, re_results, fields){
						if(err)
						     throw err;
						console.log('쿼리 있어 : ' + JSON.stringify(results));
						var registrationIds = [];
						var message = new gcm.Message({
							  timeToLive: 3,
							  data: {
							    title: results[0].query_req_title+"(강의 개설)",
							    message: "'"+data.roomname+"'방으로 가보세요.",
							    msgcnt: 1
							  }
						});
						registrationIds[0] = re_results[0].mb_register_id;
						sender.send(message, registrationIds, 4, function (err, result) {
							  console.log(result);
						});
					});
					re_connection.end();
				}
				
			});
		}
		
		// 질문을 한 사람이 방에 들어왔을 때 방장에게 push
		// get entered room query_num
		var thisRoomQueryNum = '';
		for(var i=0; i<room_manage.length; i++) {
			//현재 내가 들어온 그룹
			if(Number(room_manage[i].group_num) == Number(data.group_num)){
				for(var j=0; j<room_manage[i].rooms.length; j++) {
					if(room_manage[i].rooms[j].room_name === data.roomname) {
						thisRoomQueryNum = room_manage[i].rooms[j].query_num;
						break;
					}
				}
				break;
			} 
		}
		if(thisRoomQueryNum != '') {
			connection.query('SELECT * FROM rtes_query_req WHERE mb_no='+Number(data.member_num)+' and query_req_no='+Number(thisRoomQueryNum), function(err, results, fields){
				
				if(err)
				     throw err;
				
				if(results.length > 0) {
					var re_connection =  connDB();
					re_connection.query('SELECT mb_register_id FROM rtes_member WHERE mb_no='+Number(data.member_num), function(err, re_results, fields){
						if(err)
						     throw err;
						
						var registrationIds = [];
						var message = new gcm.Message({
							  timeToLive: 3,
							  data: {
							    title: data.roomname,
							    message: '질문자가 들어왔습니다.',
							    msgcnt: 1
							  }
						});
						registrationIds[0] = re_results[0].mb_register_id;
						sender.send(message, registrationIds, 4, function (err, result) {
							  console.log(result);
						});
					});
					re_connection.end();
				}
			});
		}
		connection.end();
	});
	
	//message ó��
	socket.on('message',function(data){
		socket.get('member_name',function(err,name){
			socket.get('room',function(err,room){
				io.sockets.in(room).emit('message_send',{'msg':data.msg,'from':name});
			});
		});
	});
	
	//ĥ�� ������ ó��
	socket.on('linesend', function (data) {
	  	console.log(data);
	  	socket.get('room',function(err,room){
	    		socket.broadcast.in(room).emit('linesend_toclient', data);
	    });
	});

	//유저가 방 나가기를 하였을 때
	socket.on('leave_room',  function(){
		socket.get('member_name', function(err, name){
			socket.get('room', function(err, room){
				io.sockets.in(room).emit('message_send_leave',{'msg':'','from':name});
				socket.leave(room);
				var data = io.sockets.manager.rooms;
				var deleted_room_name = '';

				for(var key in data) {
					if(key.split("/").join("") === room){
						if(data[key].length <= 0){
							deleted_room_name = room;
						}
					}
				}
				
				//������� room�� ���� room_manage���� room���� ����
				for(var i=0; i<room_manage.length; i++){
					for(var j=0; j<room_manage[i].rooms.length; j++){
						if(room_manage[i].rooms[j].room_name === deleted_room_name){
							room_manage[i].rooms.splice(j,1);
						}
					}
					
					//���� �׷쳻�� ���� ��� ��ٸ� �׷��� room��ü ����
					if(room_manage[i].rooms.length == 0){
						room_manage.splice(i,1);
						break;
					}
				}


				io.sockets.emit('room_research',null);
			});
		});
	});

	socket.on('disconnect', function () {
		var data = io.sockets.manager.rooms;
		var deleted_room_name = '';
		
		
		//�� ��� ���
		socket.get('member_name',function(err, name){
			socket.get('room',function(err,room){
				//delete
				//������� ���̶��...
				for(var key in data) {
					if(key.split("/").join("") === room){
						if(data[key].length <= 1){
							deleted_room_name = room;
						}
					}
				}
				
				//������� room�� ���� room_manage���� room���� ����
				for(var i=0; i<room_manage.length; i++){
					for(var j=0; j<room_manage[i].rooms.length; j++){
						if(room_manage[i].rooms[j].room_name === deleted_room_name){
							room_manage[i].rooms.splice(j,1);
						}
					}
					
					//���� �׷쳻�� ���� ��� ��ٸ� �׷��� room��ü ����
					if(room_manage[i].rooms.length == 0){
						room_manage.splice(i,1);
						break;
					}
				}
				
				io.sockets.in(room).emit('message_send_disconnect',{'msg':'','from':name});
			});
		});
		io.sockets.emit('room_research',null);
		
	});
	
});

