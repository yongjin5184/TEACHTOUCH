$(document).ready(function() {

  $("#english_editor").val('');
  $("#div_q").on("keyup click", "#english_editor", function(e){
	  
	  if(e.keyCode == 32) {$("#searchbar").hide(); return;}
	  var url = "http://"+window.location.hostname+':'+3000;
	  var current_caret = GetCaretPosition(document.getElementById('english_editor'));
	  var current_word='';
	  
	  current_word = ReturnWord($('#english_editor').text(), GetCaretPosition(document.getElementById('english_editor')));
   
	  $("#search_value").val(current_word);
	  if(current_word.length < 2) return;

	  $("#search_window").empty();
	  $("#search_window").append("<div id='searchbar'><ul id='search_ul'></div>");
	  $("#search_value").val(current_word);
	 
	  $.ajax({
		  type: "GET",
		  data: {
			  'term' : current_word 
			  },
		  dataType : 'json',
		  url: url + "/word",
		  success: function(data){
			console.log('data ' + JSON.stringify(data));
			for(var i = 0; i < data.length; i++){
				$("#search_ul").append("<li class='search_li'>"+data[i].word+"</li>");    
			}
			
			$("#search_ul li").click(function() {
				
				$("#searchbar").show();
				$("#searchbar").remove();
				$("#searchbar").val($(this).text());
				
				var words;
				var new_word = $(this).text();
				var textValue = $('#english_editor').text();
				
				var index = 0;
				var str = '';
				
				for(var i=current_caret; i>=0; i--) {
					if(textValue[i] == ' ') {
						index++;
					}
				}  
				console.log('index value : ' + index);
				words = textValue.split(' ');
				
				words[index]=new_word;
				
				
				str = words.join(' ');
				
			    $("#english_editor").text(str);
			    
				placeCaretAtEnd(document.getElementById('english_editor'));
				
				$("#search_value").val(new_word);
				
			}); 
		}});
	});
});


function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}


function GetCaretPosition(editableDiv) {
    var caretPos = 0, containerEl = null, sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            if (range.commonAncestorContainer.parentNode == editableDiv) {
                caretPos = range.endOffset;
            }
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        if (range.parentElement() == editableDiv) {
            var tempEl = document.createElement("span");
            editableDiv.insertBefore(tempEl, editableDiv.firstChild);
            var tempRange = range.duplicate();
            tempRange.moveToElementText(tempEl);
            tempRange.setEndPoint("EndToEnd", range);
            caretPos = tempRange.text.length;
        }
    }
    return caretPos;
}

function ReturnWord(text, caretPos) {
	console.log(caretPos);
    var index = text.indexOf(caretPos);
    var preText = text.substring(0, caretPos);
    if (preText.indexOf(" ") > 0) {
        var words = preText.split(" ");
        return words[words.length - 1]; //return last word
    }
    else {
        if(preText!=null)
        	return preText;
        else
        	return null;
    }
}
	
function search_word(){
	var word = $("#search_value").val();
	currentURL = "http://m.endic.naver.com/search.nhn?searchOption=all&query="+word;
	window.location.href = currentURL;
}

function complete_word(){
	var tmp = $('#english_editor').text();
	console.log("click complete word");
	$("#div_q").html($("#g_editor").html());
	$('#general_editor').html(editor_buffer + tmp);	
	editor_buffer += tmp;
}
