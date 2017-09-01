var ObjectStorage = {
		
	"setItem" : function(key , obj){
		sessionStorage.setItem( key , JSON.stringify(obj));
	},
	"getItem" : function(key){
		return JSON.parse(sessionStorage.getItem(key));
	},
		
	"clear" : function() {
		sessionStorage.clear();
	},
	
	"removeItem" : function(key) {
		sessionStorage.removeItem(key);
	}
};