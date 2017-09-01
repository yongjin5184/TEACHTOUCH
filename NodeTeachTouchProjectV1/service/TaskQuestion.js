
/**
 * Task Question requet and response
 */

app.post('/GetQuestion', function(req, res){
   res.header('Access-Control-Allow-Origin', '*');
   var connection =  connDB();
   connection.connect();
   connection.query('SELECT * FROM rtes_query_req join rtes_member on rtes_query_req.mb_no = rtes_member.mb_no WHERE gro_no='+mysql.escape(req.body.group)  + ' order by query_req_date desc limit '+mysql.escape(Number(req.body.count_fore))  + ',' + mysql.escape(Number(req.body.count_back)), function(err, req_results, fields){
      console.log("fore = " + Number(req.body.count_fore));
      console.log("back = " + Number(req.body.count_back));
      var resultArr = new Array();
      if(err)
         throw err;
       
      ///////////////////////////////////////////////
      //
      for(var i=0; i<req_results.length; i++) {
        //call converDate
         var query_req_date = convertDate(req_results[i].query_req_date);
         console.log("Date = " + query_req_date); // 날짜에 년월일시분 삽입해서 다시 넣어줌...
         var obj = {};
         req_results[i].query_req_date = query_req_date;
         obj.req_results = req_results[i]; //객체로 선언
         resultArr.push(obj);
      }
      
      var connection =  connDB();
      connection.connect();
   
      connection.query('SELECT * FROM rtes_query_res join rtes_member on rtes_query_res.mb_no = rtes_member.mb_no WHERE gro_no='+mysql.escape(req.body.group) + ' order by query_res_date desc', function(err, res_results, fields){
         if(err)
            throw err;
         ///////////////////////////////////////////////
         //
         
         for(var i=0; i < resultArr.length; i++) {
            var res_Arr = new Array();
            for(var j=0; j < res_results.length; j++) {
               if(resultArr[i].req_results.query_req_no == res_results[j].query_req_no) {
                  //call converDate
                  var query_res_date = convertDate(res_results[j].query_res_date);
                  res_results[j].query_res_date = query_res_date;
                  res_Arr.push(res_results[j]); //배열에 저장
               }
            } 
            resultArr[i].res_results = res_Arr;
         }

         
         ///////////////////////////////////////////////
         // console.log(JSON.stringify(resultArr));
         res.send(eval(resultArr)); //반환되는 값은 큰 배열안에 질문,답변 객체가 들어있음. 답변은 다시 배열 안에 들어있음.
         resultArr=[];
      });
      connection.end();
      ///////////////////////////////////////////////
   });
   connection.end();
});

//console.log(JSON.stringify(outterArr));
app.post('/AddQuestion', function(req, res){
	res.header('Access-Control-Allow-Origin', '*');
	var connection =  connDB();
	connection.connect();
	console.log(JSON.stringify(req.body));
	
	
	var reg_date = new Date().format("yyyyMMddHHmmss");
//	console.log(reg_date +1);

	var post = {
		gro_no : req.body.group,
		mb_no : req.body.member,
		query_req_title : req.body.title,
		query_req_subject : '수학',
		query_req_content : req.body.content,
		query_req_date : reg_date
	};

	
	connection.query('Insert Into rtes_query_req SET ?', post, function(error){
	    if(error){
	        console.log(error.message);
	      }else{
	        console.log('succes');
	      }
	});
	connection.end();
	var connection =  connDB();
	connection.connect();
    	connection.query('Select rm.mb_register_id, rg.gro_name From rtes_member  as rm  join rtes_join_group as rjg on rjg.mb_no = rm.mb_no join rtes_group as rg on rjg.gro_no = rg.gro_no Where not rm.mb_no= ' + mysql.escape(Number(req.body.member))+  ' and rg.gro_no=' + mysql.escape(Number(req.body.group))  ,function(err, results, fields){
	      	if(err)
		     throw err;
		 for(var i = 0 ; i < results.length; i++){
		 	
		 	registrationIds[i] = results[i].mb_register_id;
		 }	
		console.log("!!!!!!!!!!!!!!!!" + JSON.stringify(results));	
		console.log('first : ' + results[0].gro_name);
		console.log('second : ' +req.body.title);

		 var message = new gcm.Message({
			timeToLive: 3,
			data: {
				title: results[0].gro_name,
				message:  req.body.title,
				msgcnt: 1
			}
			
		});

		 sender.send(message, registrationIds, 4, function (err, result) {
			  console.log(result);
		});
		 
      });
      connection.end();
      res.send([]);
});

app.post('/AddAnswer', function(req, res){
    res.header('Access-Control-Allow-Origin', '*');
    var connection =  connDB();
    connection.connect();
    console.log(JSON.stringify(req.body));


    var reg_date = new Date().format("yyyyMMddHHmmss");
    //  console.log(reg_date +1);

    var post = {
	      query_req_no : req.body.queryReqNo,
	      gro_no : req.body.groNo,
	      mb_no : req.body.mbNo,
	      query_res_subject : req.body.queryResSubject,
	      query_res_title: req.body.queryResTitle,
	      query_res_content : req.body.queryResContent,
	      query_res_file: req.body.queryResFile,
	      query_res_refer: req.body.queryResRefer,
	      query_res_date : reg_date
      };

      connection.query('Insert Into rtes_query_res SET ?', post, function(error){
          if(error){
              console.log(error.message);
            }else{
              console.log('succes');
            }
      }); 

      connection.query('select * from rtes_group where gro_no = ' +  mysql.escape(Number(req.body.groNo)) ,function(err, results, fields){
	     if(err)
	     	throw err;
	      console.log(JSON.stringify(results));
	      console.log("그룹이름 = " + results[0].gro_name);
	      var connection =  connDB(); 
	      connection.connect();
	      connection.query('select mb_register_id from rtes_member as rm join rtes_query_req as rqr on rm.mb_no = rqr.mb_no where query_req_no = ' +  mysql.escape(Number(req.body.queryReqNo)) ,function(err, results_register, fields){
	      	console.log("질문 한 사람의 기기 번호 " + results_register[0].mb_register_id);
	      	registrationIds = [];
	      	registrationIds[0] = results_register[0].mb_register_id;
	      	var connection =  connDB(); 
	     	connection.connect();
	     	connection.query('select  query_req_title from rtes_query_req where query_req_no=' +mysql.escape(Number(req.body.queryReqNo)) ,function(err, results_req, fields){
	     		if(err)
	     			throw err;	
	     		console.log(results_req[0].query_req_title);
	     		var message = new gcm.Message({
			timeToLive: 3,
			data: {
				title:  results[0].gro_name,
				message:  results_req[0].query_req_title,
				msgcnt: 1
			}
			});
			 sender.send(message, registrationIds, 4, function (err, result) {
			 	 console.log(result);
			});	
		}); connection.end();
	      }); connection.end();
	  });connection.end();
   res.send([]);
      
});

app.post('/UpdateThreeLight', function(req, res){
	console.log("!!!!!!!!");
	var connection =  connDB();
	connection.connect();
	console.log(JSON.stringify(req.body));
	var post = {
		gro_no : req.body.gro_no,
		query_req_three_light : req.body.three_color,
		query_req_no : req.body.req_num
	};
	connection.query('update rtes_query_req set query_req_three_light = ? where query_req_no = ?', [post.query_req_three_light,post.query_req_no], function(error,rows){
		if(error)throw error;
		
	      	var connection =  connDB(); 
	     	connection.connect();

	     	connection.query('select query_req_title from rtes_query_req where query_req_no = '  + mysql.escape(Number(req.body.req_num)),function(error, results_req, fields){
	     		if(error)
	     			throw error;
	  
			var connection =  connDB(); 
		     	connection.connect();

		     	connection.query('Select rm.mb_register_id, rg.gro_name From rtes_member  as rm  join rtes_join_group as rjg on rjg.mb_no = rm.mb_no join rtes_group as rg on rjg.gro_no = rg.gro_no Where rm.mb_job= "선생님" and rg.gro_no = '  + mysql.escape(Number(req.body.gro_no)),function(error, results_register, fields){
		     		if(error)
		     			throw error;
		     		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + post.query_req_three_light);
		     		if(post.query_req_three_light == 2){
			     		registrationIds = [];
			     		 for(var i=0; i<results_register.length; i++) {
			     		 	console.log(JSON.stringify(results_register[i]));
		      				registrationIds[i] = results_register[i].mb_register_id;
			     		 }
			   		var message = new gcm.Message({
						timeToLive: 3,
						data: {
							title:  results_register[0].gro_name +"(도움요청!)" ,
							message:  results_req[0].query_req_title,
							msgcnt: 1
						}
					});
					sender.send(message, registrationIds, 4, function (err, result) {
						console.log(result);
					});
				}
				registrationIds = [];
		   	});
		  	connection.end();
		});
		connection.end();	
	}); 
	connection.end();
});

app.post('/searchQuestion', function(req, res){
	res.header('Access-Control-Allow-Origin', '*');
	console.log("검색 텍스트 " + req.body.searchText);
	var textval = '%' + req.body.searchText + '%'
	var connection =  connDB();
	connection.connect();
	connection.query('SELECT * FROM rtes_query_req join rtes_member on rtes_query_req.mb_no = rtes_member.mb_no WHERE gro_no='+mysql.escape(req.body.roomNum)+ 'and query_req_content' + ' LIKE '   + mysql.escape('%' + req.body.searchText + '%') + ' order by query_req_date desc limit '+mysql.escape(Number(req.body.count_fore))  + ',' + mysql.escape(Number(req.body.count_back)), function(err, req_results, fields){
	  console.log("fore = " + Number(req.body.count_fore));
	  console.log("back = " + Number(req.body.count_back));
	  var resultArr = new Array();
	  if(err)
	     throw err;
	   
	  ///////////////////////////////////////////////
	  //
	  for(var i=0; i<req_results.length; i++) {
	    //call converDate
	     var query_req_date = convertDate(req_results[i].query_req_date);
	     console.log("날짜 = " + query_req_date); // 날짜에 년월일시분 삽입해서 다시 넣어줌...
	     var obj = {};
	     req_results[i].query_req_date = query_req_date;
	     obj.req_results = req_results[i]; //객체로 선언
	     resultArr.push(obj);
	  }
	  
	  var connection =  connDB();
	  connection.connect();

	  connection.query('SELECT * FROM rtes_query_res join rtes_member on rtes_query_res.mb_no = rtes_member.mb_no WHERE gro_no='+mysql.escape(req.body.roomNum), function(err, res_results, fields){
	     if(err)
	        throw err;
	     ///////////////////////////////////////////////
	     //
	     
	     for(var i=0; i < resultArr.length; i++) {
	        var res_Arr = new Array();
	        for(var j=0; j < res_results.length; j++) {
	           if(resultArr[i].req_results.query_req_no == res_results[j].query_req_no) {
	              //call converDate
	              var query_res_date = convertDate(res_results[j].query_res_date);
	              res_results[j].query_res_date = query_res_date;
	              res_Arr.push(res_results[j]); //배열에 저장
	           }
	        } 
	        resultArr[i].res_results = res_Arr;
	     }

	     
	     ///////////////////////////////////////////////
	     // console.log(JSON.stringify(resultArr));
	     res.send(eval(resultArr)); //반환되는 값은 큰 배열안에 질문,답변 객체가 들어있음. 답변은 다시 배열 안에 들어있음.
	     resultArr=[];
	  });
	  connection.end();
	  ///////////////////////////////////////////////
	});
	connection.end();
});


app.post('/getMyQnA', function(req, res){
	res.header('Access-Control-Allow-Origin', '*');
	var connection =  connDB();
	connection.connect();
	console.log("mbNo  = " + req.body.mbNo);

	connection.query('SELECT * FROM rtes_query_req join rtes_member on rtes_query_req.mb_no = rtes_member.mb_no WHERE gro_no='+mysql.escape(Number(req.body.roomNum)) + ' and  rtes_query_req.mb_no = ' + mysql.escape(req.body.mbNo) + ' order by query_req_date desc limit '+mysql.escape(Number(req.body.count_fore))  + ',' + mysql.escape(Number(req.body.count_back)), function(err, req_results, fields){
	console.log("fore = " + Number(req.body.count_fore));
	console.log("back = " + Number(req.body.count_back));
	var resultArr = new Array();
	  if(err)
	     throw err;
	   
	  ///////////////////////////////////////////////
	  //
	  for(var i=0; i<req_results.length; i++) {
	    //call converDate
	     var query_req_date = convertDate(req_results[i].query_req_date);
	     console.log("날짜 = " + query_req_date); // 날짜에 년월일시분 삽입해서 다시 넣어줌...
	     var obj = {};
	     req_results[i].query_req_date = query_req_date;
	     obj.req_results = req_results[i]; //객체로 선언
	     resultArr.push(obj);
	  }
	  
	  var connection =  connDB();
	  connection.connect();

	  connection.query('SELECT * FROM rtes_query_res join rtes_member on rtes_query_res.mb_no = rtes_member.mb_no WHERE gro_no='+mysql.escape(req.body.roomNum), function(err, res_results, fields){
	     if(err)
	        throw err;
	     ///////////////////////////////////////////////
	     //
	     
	     for(var i=0; i < resultArr.length; i++) {
	        var res_Arr = new Array();
	        for(var j=0; j < res_results.length; j++) {
	           if(resultArr[i].req_results.query_req_no == res_results[j].query_req_no) {
	              //call converDate
	              var query_res_date = convertDate(res_results[j].query_res_date);
	              res_results[j].query_res_date = query_res_date;
	              res_Arr.push(res_results[j]); //배열에 저장
	           }
	        } 
	        resultArr[i].res_results = res_Arr;
	     }

	     
	     ///////////////////////////////////////////////
	     // console.log(JSON.stringify(resultArr));
	     res.send(eval(resultArr)); //반환되는 값은 큰 배열안에 질문,답변 객체가 들어있음. 답변은 다시 배열 안에 들어있음.
	     resultArr=[];
	  });
	  connection.end();
	  ///////////////////////////////////////////////
	});
	connection.end();
});

app.post('/getOneQnA', function(req, res){
 res.header('Access-Control-Allow-Origin', '*');
   var connection =  connDB();
   connection.connect();
   connection.query('SELECT * FROM rtes_query_req join rtes_member on rtes_query_req.mb_no = rtes_member.mb_no WHERE rtes_query_req.mb_no = '+mysql.escape(req.body.mbNo)  +'and rtes_query_req.query_req_subject = ' + mysql.escape(req.body.queryReqSubject) + ' order by query_req_date desc', function(err, req_results, fields){
      if(err)
         throw err;
       console.log("first query : " + JSON.stringify(req_results));
      ///////////////////////////////////////////////
      //
      for(var i=0; i<req_results.length; i++) {
        //call converDate
         var query_req_date = convertDate(req_results[i].query_req_date);
         console.log("Date = " + query_req_date); // 날짜에 년월일시분 삽입해서 다시 넣어줌...
         req_results[i].query_req_date = query_req_date;
      }
      res.send(req_results);
   });
   connection.end();
});

app.post('/getOneAnswer', function(req, res){
 res.header('Access-Control-Allow-Origin', '*');
   var connection =  connDB();
   connection.connect();
   connection.query('select query_res_no, query_req_no, query_res_title, query_res_content, query_res_date, query_res_selected from rtes_query_res where query_req_no = ' +mysql.escape(req.body.queryReqNo) + ' order by query_res_selected desc limit 1', function(err, req_results, fields){
      if(err)
         throw err;
       console.log("first query : " + JSON.stringify(req_results));
      ///////////////////////////////////////////////
      //
        //call converDate
        if( req_results.length != 0){
         var query_res_date = convertDate(req_results[0].query_res_date);
         console.log("Date = " + query_res_date); // 날짜에 년월일시분 삽입해서 다시 넣어줌...
         req_results[0].query_res_date = query_res_date;
     }
      res.send(req_results);
   });
   connection.end();
});

app.post('/detailQuestion', function(req, res){
 	res.header('Access-Control-Allow-Origin', '*');
 	var connection =  connDB();
	connection.connect();
    	connection.query('select * from rtes_query_req where query_req_no = ' +mysql.escape(req.body.queryReqNo), function(err, results, fields){
    		console.log(JSON.stringify(results));
    		res.send(results);
    	});
    	connection.end();
});

app.post('/detailAnswer', function(req, res){
 	res.header('Access-Control-Allow-Origin', '*');
 	var connection =  connDB();
	connection.connect();
    	connection.query('select * from rtes_query_res where query_res_no = ' +mysql.escape(req.body.queryResNo), function(err, results, fields){
    		console.log(JSON.stringify(results));
    		res.send(results);
    	});
    	connection.end();
});

app.post('/questionUpdate', function(req, res){
	res.header('Access-Control-Allow-Origin', '*');
 	var connection =  connDB();
	connection.connect();
	var post = {
		query_req_no : req.body.queryQesNo,
		query_req_content : req.body.queryQesContent,
		query_req_title : req.body.queryQesTitle
	};
	connection.query('update rtes_query_req set query_req_title = ?, query_req_content = ? where query_req_no = ?' , [post.query_req_title,post.query_req_content,post.query_req_no], function(error,rows){
		if(error)throw error;
		res.send("업데이트 성공!!!");
	});
	connection.end();
});

app.post('/answerUpdate', function(req, res){
	res.header('Access-Control-Allow-Origin', '*');
 	var connection =  connDB();
	connection.connect();
	var post = {
		query_res_no : req.body.queryResNo,
		query_res_content : req.body.queryResContent,
		query_res_title : req.body.queryResTitle
	};
	connection.query('update rtes_query_res set query_res_title = ?, query_res_content = ? where query_res_no = ?' , [post.query_res_title,post.query_res_content,post.query_res_no], function(error,rows){
		if(error)throw error;
		res.send("업데이트 성공!!!");
	});
	connection.end();
});

/*
 * detail update 조건
 */
app.post('/isMyQuestion', function(req, res){
	res.header('Access-Control-Allow-Origin', '*');
	var connection =  connDB();
	connection.connect();
	connection.query('select * from rtes_query_req where query_req_no='+mysql.escape(req.body.q_no)+' and mb_no='+mysql.escape(req.body.mb_no), function(error, results){
		if(error)
			throw error;
		console.log("DATA " + JSON.stringify(results));
		if(results.length > 0) {
			res.send({msg:'ok'});
		}
		else {
			res.send({msg:'fail'});
		}
	});
	connection.end();
});

app.post('/isMyAnswer', function(req, res){
	res.header('Access-Control-Allow-Origin', '*');
	var connection =  connDB();
	connection.connect();
	connection.query('select * from rtes_query_res where query_res_no='+mysql.escape(req.body.a_no)+' and mb_no='+mysql.escape(req.body.mb_no), function(error, results){
		if(error)
			throw error;
		console.log("DATA " + JSON.stringify(results));
		if(results.length > 0) {
			res.send({msg:'ok'});
		}
		else {
			res.send({msg:'fail'});
		}
	});
	connection.end();
});