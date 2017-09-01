
/**
 * Created by saltfactory on 6/20/14.
 */

/**
 * filename : android_gcm_provider.js
 */

// create a message with default values
//var message = new gcm.Message();

// or with object values
var message = new gcm.Message({
  timeToLive: 3,
  data: {
    title:'hi',
    message: 'new message',
    msgcnt: 1
  }
});

//registrationIds.push('APA91bHpVDdRBpWaPPbg0FrLfIUe7gkrTIXmawsi5Ps8SojZtzmDUvWIj3PF5PJQkG9w8izYJFKD0hu_qZkSaNXe-fklONcKFaoZR-_cz9sQb_NHmejbG2HAzIc4d-hXmLcg1HtA2jiiHbKGUXYTA6eK8oktxoMkgg'); // PhoneGap ÇÁ·ÎÁ§Æ®ÀÇ ¾Èµå·ÎÀÌµå ÇÁ·ÎÁ§Æ®¿¡¼­ È¹µæÇÑ registerID¸¦ ÀÔ·ÂÇÑ´Ù. ÀÌ registerID¸¦ ÀÌ¿ëÇÏ¿© ¾Èµå·ÎÀÌµå µð¹ÙÀÌ½º¿¡ Çª½Ã¸¦ Àü¼ÛÇÑ´Ù.
//registrationIds.push('APA91bHLG7GzQFsweDxlaF1dKuCQhsTSaG9uuwr8bEdEvEvflF1qQR-8ODfdJNN7xDbFGzuvCkXsN_hivaodZQ-l6tol-6aw2Ndlmw5QoTghRMapB9LH-KyUwbWb5udW6AxY7Pvs5Sei');

/**
 * Params: message-literal, registrationIds-array, No. of retries, callback-function
 **/
/*
 * get registrationIds
 */

 //gcm 필요한 요소
 //1. 메세지 객체
 //2. 등록된 기기 번호
 //3. 
var connection =  connDB();
connection.connect();
connection.query('SELECT mb_register_id FROM rtes_member', function(err, results, fields){
	if(err)
		throw err;
	//console.log(JSON.stringify(results));
	for(var i=0; i<results.length; i++){
		registrationIds[i] = results[i].mb_register_id;
	}
	sender.send(message, registrationIds, 4, function (err, result) {
		  console.log(result);
	});
});

connection.end();
