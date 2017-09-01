

$( document ).ready(function() {
	/*var	html ='<div class="usedMath" style="height:40px"></div>'+
		       '<div id="math_content" class="math_editor">'+
		         '<div id="editable-math" class="mathquill-editor"></div>' +
		       '</div>' +
		       '<div class="dial_content"></div><br/>';*/ /*+
		       '<div id="dial_control">' +
		         '<a href="#" id="btn_send"class="btn_control">Send</a>' +
		       '</div>' +
		       '<div id="dialog_send" title="Send Math Img"></div>';*/
	//$('#math_editor').append(html);
});


function detectmob() { 
	 if( navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	 || navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i)
	 || navigator.userAgent.match(/BlackBerry/i)
	 || navigator.userAgent.match(/Windows Phone/i)
	 ){
	    return true;
	  }
	 else {
	    return false;
	  }
}

function addTooldial(root, jQ) {
	/////////////////////////////////////////////////////
	// 
	var usedMath = new Array();
	var usedMathLength = 18;
	var mobile_size = 500;

	($(window).width() > mobile_size)?usedMathLength = 18:usedMathLength = 8;
	/////////////////////////////////////////////////////
	//layout
	var M_Dial_Btn = [
		{	
			'type'	 : 'm_basic',
			'layout' : [
						[{btn_id:'dial_7', btn_value:'7'}, {btn_id:'dial_8', btn_value:'8'}, {btn_id:'dial_9', btn_value:'9'}, {btn_id:'m_dial_shift', btn_value:'Menu'}, {btn_id:'dial_tab', btn_value:'Tab'}],
						[{btn_id:'dial_4', btn_value:'4'}, {btn_id:'dial_5', btn_value:'5'}, {btn_id:'dial_6', btn_value:'6'}, {btn_id:'m_dial_basic_lshift', btn_value:'◀'}, {btn_id:'m_dial_basic_rshift', btn_value:'▶'}],
						[{btn_id:'dial_1', btn_value:'1'}, {btn_id:'dial_2', btn_value:'2'}, {btn_id:'dial_3', btn_value:'3'}, {btn_id:'dial_sup', btn_value:'^'}, {btn_id:'dial_sub', btn_value:'_'}],
						[{btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_0', btn_value:'0'}, {btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_enter', btn_value:'Enter'}, {btn_id:'dial_spacebar', btn_value:'SB'}],
						[{btn_id:'dial_left', btn_value:'←'}, {btn_id:'dial_up', btn_value:'↑'}, {btn_id:'dial_down', btn_value:'↓'}, {btn_id:'dial_right', btn_value:'→'}, {btn_id:'dial_del', btn_value:'Del'}]
					   ]
		},
		{	
			'type'	 : 'm_english_lower_1',
			'layout' : [
						[{btn_id:'dial_a', btn_value:'a'}, {btn_id:'dial_b', btn_value:'b'}, {btn_id:'dial_c', btn_value:'c'}, {btn_id:'m_dial_shift', btn_value:'Menu'}, {btn_id:'dial_tab', btn_value:'Tab'}],
						[{btn_id:'dial_d', btn_value:'d'}, {btn_id:'dial_e', btn_value:'e'}, {btn_id:'dial_f', btn_value:'f'}, {btn_id:'m_dial_english_lower3', btn_value:'◀'}, {btn_id:'m_dial_english_lower2', btn_value:'▶'}],
						[{btn_id:'dial_g', btn_value:'g'}, {btn_id:'dial_h', btn_value:'h'}, {btn_id:'dial_i', btn_value:'i'}, {btn_id:'dial_sup', btn_value:'^'}, {btn_id:'dial_sub', btn_value:'_'}],
						[{btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'m_dial_capslock_U_1', btn_value:'CL'}, {btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_enter', btn_value:'Enter'}, {btn_id:'dial_spacebar', btn_value:'SB'}],
						[{btn_id:'dial_left', btn_value:'←'}, {btn_id:'dial_up', btn_value:'↑'}, {btn_id:'dial_down', btn_value:'↓'}, {btn_id:'dial_right', btn_value:'→'}, {btn_id:'dial_del', btn_value:'Del'}]
					   ]
		},
		{	
			'type'	 : 'm_english_lower_2',
			'layout' : [
						[{btn_id:'dial_j', btn_value:'j'}, {btn_id:'dial_k', btn_value:'k'}, {btn_id:'dial_l', btn_value:'l'}, {btn_id:'m_dial_shift', btn_value:'Menu'}, {btn_id:'dial_tab', btn_value:'Tab'}],
						[{btn_id:'dial_m', btn_value:'m'}, {btn_id:'dial_n', btn_value:'n'}, {btn_id:'dial_o', btn_value:'o'}, {btn_id:'m_dial_english_lower1', btn_value:'◀'}, {btn_id:'m_dial_english_lower3', btn_value:'▶'}],
						[{btn_id:'dial_p', btn_value:'p'}, {btn_id:'dial_q', btn_value:'q'}, {btn_id:'dial_r', btn_value:'r'}, {btn_id:'dial_sup', btn_value:'^'}, {btn_id:'dial_sub', btn_value:'_'}],
						[{btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'m_dial_capslock_U_2', btn_value:'CL'}, {btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_enter', btn_value:'Enter'}, {btn_id:'dial_spacebar', btn_value:'SB'}],
						[{btn_id:'dial_left', btn_value:'←'}, {btn_id:'dial_up', btn_value:'↑'}, {btn_id:'dial_down', btn_value:'↓'}, {btn_id:'dial_right', btn_value:'→'}, {btn_id:'dial_del', btn_value:'Del'}]
					   ]
		},
		{	
			'type'	 : 'm_english_lower_3',
			'layout' : [
						[{btn_id:'dial_s', btn_value:'s'}, {btn_id:'dial_t', btn_value:'t'}, {btn_id:'dial_u', btn_value:'u'}, {btn_id:'m_dial_shift', btn_value:'Menu'}, {btn_id:'dial_tab', btn_value:'Tab'}],
						[{btn_id:'dial_v', btn_value:'v'}, {btn_id:'dial_w', btn_value:'w'}, {btn_id:'dial_x', btn_value:'x'}, {btn_id:'m_dial_english_lower2', btn_value:'◀'}, {btn_id:'m_dial_english_lower1', btn_value:'▶'}],
						[{btn_id:'dial_y', btn_value:'y'}, {btn_id:'dial_z', btn_value:'z'}, {btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_sup', btn_value:'^'}, {btn_id:'dial_sub', btn_value:'_'}],
						[{btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'m_dial_capslock_U_3', btn_value:'CL'}, {btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_enter', btn_value:'Enter'}, {btn_id:'dial_spacebar', btn_value:'SB'}],
						[{btn_id:'dial_left', btn_value:'←'}, {btn_id:'dial_up', btn_value:'↑'}, {btn_id:'dial_down', btn_value:'↓'}, {btn_id:'dial_right', btn_value:'→'}, {btn_id:'dial_del', btn_value:'Del'}]
					   ]
		},
		{	
			'type'	 : 'm_english_upper_1',
			'layout' : [
						[{btn_id:'dial_A', btn_value:'A'}, {btn_id:'dial_B', btn_value:'B'}, {btn_id:'dial_C', btn_value:'C'}, {btn_id:'m_dial_shift', btn_value:'Menu'}, {btn_id:'dial_tab', btn_value:'Tab'}],
						[{btn_id:'dial_D', btn_value:'D'}, {btn_id:'dial_E', btn_value:'E'}, {btn_id:'dial_F', btn_value:'F'}, {btn_id:'m_dial_english_upper3', btn_value:'◀'}, {btn_id:'m_dial_english_upper2', btn_value:'▶'}],
						[{btn_id:'dial_G', btn_value:'G'}, {btn_id:'dial_H', btn_value:'H'}, {btn_id:'dial_I', btn_value:'I'}, {btn_id:'dial_sup', btn_value:'^'}, {btn_id:'dial_sub', btn_value:'_'}],
						[{btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'m_dial_capslock_L_1', btn_value:'CL'}, {btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_enter', btn_value:'Enter'}, {btn_id:'dial_spacebar', btn_value:'SB'}],
						[{btn_id:'dial_left', btn_value:'←'}, {btn_id:'dial_up', btn_value:'↑'}, {btn_id:'dial_down', btn_value:'↓'}, {btn_id:'dial_right', btn_value:'→'}, {btn_id:'dial_del', btn_value:'Del'}]
					   ]
		},
		{	
			'type'	 : 'm_english_upper_2',
			'layout' : [
						[{btn_id:'dial_J', btn_value:'J'}, {btn_id:'dial_K', btn_value:'K'}, {btn_id:'dial_L', btn_value:'L'}, {btn_id:'m_dial_shift', btn_value:'Menu'}, {btn_id:'dial_tab', btn_value:'Tab'}],
						[{btn_id:'dial_M', btn_value:'M'}, {btn_id:'dial_N', btn_value:'N'}, {btn_id:'dial_O', btn_value:'O'}, {btn_id:'m_dial_english_upper1', btn_value:'◀'}, {btn_id:'m_dial_english_upper3', btn_value:'▶'}],
						[{btn_id:'dial_P', btn_value:'P'}, {btn_id:'dial_Q', btn_value:'Q'}, {btn_id:'dial_R', btn_value:'R'}, {btn_id:'dial_sup', btn_value:'^'}, {btn_id:'dial_sub', btn_value:'_'}],
						[{btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'m_dial_capslock_L_2', btn_value:'CL'}, {btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_enter', btn_value:'Enter'}, {btn_id:'dial_spacebar', btn_value:'SB'}],
						[{btn_id:'dial_left', btn_value:'←'}, {btn_id:'dial_up', btn_value:'↑'}, {btn_id:'dial_down', btn_value:'↓'}, {btn_id:'dial_right', btn_value:'→'}, {btn_id:'dial_del', btn_value:'Del'}]
					   ]
		},
		{	
			'type'	 : 'm_english_upper_3',
			'layout' : [
						[{btn_id:'dial_S', btn_value:'S'}, {btn_id:'dial_T', btn_value:'T'}, {btn_id:'dial_U', btn_value:'U'}, {btn_id:'m_dial_shift', btn_value:'Menu'}, {btn_id:'dial_tab', btn_value:'Tab'}],
						[{btn_id:'dial_V', btn_value:'V'}, {btn_id:'dial_W', btn_value:'W'}, {btn_id:'dial_X', btn_value:'X'}, {btn_id:'m_dial_english_upper2', btn_value:'◀'}, {btn_id:'m_dial_english_upper1', btn_value:'▶'}],
						[{btn_id:'dial_Y', btn_value:'Y'}, {btn_id:'dial_Z', btn_value:'Z'}, {btn_id:'dial_dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_sup', btn_value:'^'}, {btn_id:'dial_sub', btn_value:'_'}],
						[{btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'m_dial_capslock_L_3', btn_value:'CL'}, {btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_enter', btn_value:'Enter'}, {btn_id:'dial_spacebar', btn_value:'SB'}],
						[{btn_id:'dial_left', btn_value:'←'}, {btn_id:'dial_up', btn_value:'↑'}, {btn_id:'dial_down', btn_value:'↓'}, {btn_id:'dial_right', btn_value:'→'}, {btn_id:'dial_del', btn_value:'Del'}]
					   ]
		},
		{	
			'type'	 : 'm_operation_1',
			'layout' : [
						[{btn_id:'dial_plus', btn_value:'+'}, {btn_id:'dial_minus', btn_value:'-'}, {btn_id:'dial_mul', btn_value:'x'}, {btn_id:'m_dial_shift', btn_value:'Menu'}, {btn_id:'dial_tab', btn_value:'Tab'}],
						[{btn_id:'dial_div', btn_value:'÷'}, {btn_id:'dial_per', btn_value:'%'}, {btn_id:'dial_LP', btn_value:'('}, {btn_id:'m_dial_operation_4', btn_value:'◀'}, {btn_id:'m_dial_operation_2', btn_value:'▶'}],
						[{btn_id:'dial_RP', btn_value:')'}, {btn_id:'dial_LP2', btn_value:'{'}, {btn_id:'dial_RP2', btn_value:'}'}, {btn_id:'dial_sup', btn_value:'^'}, {btn_id:'dial_sub', btn_value:'_'}],
						[{btn_id:'dial_LP3', btn_value:'['}, {btn_id:'dial_RP3', btn_value:']'}, {btn_id:'dial_abs', btn_value:'||'}, {btn_id:'dial_enter', btn_value:'Enter'}, {btn_id:'dial_spacebar', btn_value:'SB'}],
						[{btn_id:'dial_left', btn_value:'←'}, {btn_id:'dial_up', btn_value:'↑'}, {btn_id:'dial_down', btn_value:'↓'}, {btn_id:'dial_right', btn_value:'→'}, {btn_id:'dial_del', btn_value:'Del'}]
					   ]
		},
		{	
			'type'	 : 'm_operation_2',
			'layout' : [
						[{btn_id:'dial_equal', btn_value:'='}, {btn_id:'dial_lt', btn_value:'<'}, {btn_id:'dial_rt', btn_value:'>'}, {btn_id:'m_dial_shift', btn_value:'Menu'}, {btn_id:'dial_tab', btn_value:'Tab'}],
						[{btn_id:'dial_lt_equal', btn_value:'≤'}, {btn_id:'dial_rt_equal', btn_value:'≥'}, {btn_id:'dial_not_equal', btn_value:'≠'}, {btn_id:'m_dial_operation_1', btn_value:'◀'}, {btn_id:'m_dial_operation_3', btn_value:'▶'}],
						[{btn_id:'dial_prime', btn_value:'′'}, {btn_id:'dial_double_prime', btn_value:'″'}, {btn_id:'dial_dot', btn_value:'.'}, {btn_id:'dial_sup', btn_value:'^'}, {btn_id:'dial_sub', btn_value:'_'}],
						[{btn_id:'dial_plus_minus', btn_value:'±'}, {btn_id:'dial_combi', btn_value:'<var class="florin">C</var>'}, {btn_id:'dial_frac', btn_value:'n/m'}, {btn_id:'dial_enter', btn_value:'Enter'}, {btn_id:'dial_spacebar', btn_value:'SB'}],
						[{btn_id:'dial_left', btn_value:'←'}, {btn_id:'dial_up', btn_value:'↑'}, {btn_id:'dial_down', btn_value:'↓'}, {btn_id:'dial_right', btn_value:'→'}, {btn_id:'dial_del', btn_value:'Del'}]
					   ]
		},
		{	
			'type'	 : 'm_operation_3',
			'layout' : [
						[{btn_id:'dial_sqrt', btn_value:'<span style="font-size: 0.8em; padding-top: 3px"><span class="sqrt-prefix">&radic;</span><span class="sqrt-stem" style="border-top-width: 1.7142857142857144px;">&nbsp;</span></span>'}, {btn_id:'dial_nsqrt', btn_value:'<span style="font-size: 0.7em"><sup class="nthroot"><var>n</var></sup><span><span class="sqrt-prefix">&radic;</span><span class="sqrt-stem" style="border-top-width: 1.7142857142857144px; ">&nbsp;</span></span></span>'}, {btn_id:'dial_log', btn_value:'log'}, {btn_id:'m_dial_shift', btn_value:'Menu'}, {btn_id:'dial_tab', btn_value:'Tab'}],
						[{btn_id:'dial_ln', btn_value:'ln'}, {btn_id:'dial_lim', btn_value:'lim'}, {btn_id:'dial_sum', btn_value:'∑'}, {btn_id:'m_dial_operation_2', btn_value:'◀'}, {btn_id:'m_dial_operation_4', btn_value:'▶'}],
						[{btn_id:'dial_binomial', btn_value:'Bino'}, {btn_id:'dial_prod', btn_value:'∏'}, {btn_id:'dial_coprod', btn_value:'∐'}, {btn_id:'dial_sup', btn_value:'^'}, {btn_id:'dial_sub', btn_value:'_'}],
						[{btn_id:'dial_matrix', btn_value:'Matrix'}, {btn_id:'dial_int', btn_value:'∫'}, {btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_enter', btn_value:'Enter'}, {btn_id:'dial_spacebar', btn_value:'SB'}],
						[{btn_id:'dial_left', btn_value:'←'}, {btn_id:'dial_up', btn_value:'↑'}, {btn_id:'dial_down', btn_value:'↓'}, {btn_id:'dial_right', btn_value:'→'}, {btn_id:'dial_del', btn_value:'Del'}]
					   ]
		},
		{	
			'type'	 : 'm_operation_4',
			'layout' : [
						[{btn_id:'dial_fx', btn_value:'<var class="florin">ƒ</var>'}, {btn_id:'dial_sin', btn_value:'sin'}, {btn_id:'dial_cos', btn_value:'cos'}, {btn_id:'m_dial_shift', btn_value:'Menu'}, {btn_id:'dial_tab', btn_value:'Tab'}],
						[{btn_id:'dial_tan', btn_value:'tan'}, {btn_id:'dial_sec', btn_value:'sec'}, {btn_id:'dial_csc', btn_value:'csc'}, {btn_id:'m_dial_operation_3', btn_value:'◀'}, {btn_id:'m_dial_operation_1', btn_value:'▶'}],
						[{btn_id:'dial_cot', btn_value:'cot'}, {btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_sup', btn_value:'^'}, {btn_id:'dial_sub', btn_value:'_'}],
						[{btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_enter', btn_value:'Enter'}, {btn_id:'dial_spacebar', btn_value:'SB'}],
						[{btn_id:'dial_left', btn_value:'←'}, {btn_id:'dial_up', btn_value:'↑'}, {btn_id:'dial_down', btn_value:'↓'}, {btn_id:'dial_right', btn_value:'→'}, {btn_id:'dial_del', btn_value:'Del'}]
					   ]
		},
		{	
			'type'	 : 'm_symbol_1',
			'layout' : [
						[{btn_id:'dial_exclamation_mark', btn_value:'!'}, {btn_id:'dial_golbang', btn_value:'@'}, {btn_id:'dial_sharp', btn_value:'#'}, {btn_id:'m_dial_shift', btn_value:'Menu'}, {btn_id:'dial_tab', btn_value:'Tab'}],
						[{btn_id:'dial_dollor', btn_value:'$'}, {btn_id:'dial_colon', btn_value:':'}, {btn_id:'dial_semi', btn_value:';'}, {btn_id:'m_dial_symbol_4', btn_value:'◀'}, {btn_id:'m_dial_symbol_2', btn_value:'▶'}],
						[{btn_id:'dial_question', btn_value:'?'}, {btn_id:'dial_comma', btn_value:','}, {btn_id:'dial_slash', btn_value:'/'}, {btn_id:'dial_sup', btn_value:'^'}, {btn_id:'dial_sub', btn_value:'_'}],
						[{btn_id:'dial_cdots', btn_value:'<span>⋯</span>'}, {btn_id:'dial_circ', btn_value:'<span>∘</span>'}, {btn_id:'dial_infinite', btn_value:'<span mathquill-command-id="32">∞</span>'}, {btn_id:'dial_enter', btn_value:'Enter'}, {btn_id:'dial_spacebar', btn_value:'SB'}],
						[{btn_id:'dial_left', btn_value:'←'}, {btn_id:'dial_up', btn_value:'↑'}, {btn_id:'dial_down', btn_value:'↓'}, {btn_id:'dial_right', btn_value:'→'}, {btn_id:'dial_del', btn_value:'Del'}]
					   ]
		},
		{	
			'type'	 : 'm_symbol_2',
			'layout' : [
						[{btn_id:'dial_alpha', btn_value:'<var>α</var>'}, {btn_id:'dial_beta', btn_value:'<var>β</var>'}, {btn_id:'dial_gamma', btn_value:'<var>γ</var>'}, {btn_id:'m_dial_shift', btn_value:'Menu'}, {btn_id:'dial_tab', btn_value:'Tab'}],
						[{btn_id:'dial_delta', btn_value:'<var>δ</var>'}, {btn_id:'dial_theta', btn_value:'<var>θ</var>'}, {btn_id:'dial_mu', btn_value:'<var>μ</var>'}, {btn_id:'m_dial_symbol_1', btn_value:'◀'}, {btn_id:'m_dial_symbol_3', btn_value:'▶'}],
						[{btn_id:'dial_sigma', btn_value:'<var>σ</var>'}, {btn_id:'dial_digamma', btn_value:'<var>ϝ</var>'}, {btn_id:'dial_omega', btn_value:'<span>Ω</span>'}, {btn_id:'dial_sup', btn_value:'^'}, {btn_id:'dial_sub', btn_value:'_'}],
						[{btn_id:'dial_phi', btn_value:'<var>ϕ</var>'}, {btn_id:'dial_pi', btn_value:'<span class="nonSymbola">π</span>'}, {btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_enter', btn_value:'Enter'}, {btn_id:'dial_spacebar', btn_value:'SB'}],
						[{btn_id:'dial_left', btn_value:'←'}, {btn_id:'dial_up', btn_value:'↑'}, {btn_id:'dial_down', btn_value:'↓'}, {btn_id:'dial_right', btn_value:'→'}, {btn_id:'dial_del', btn_value:'Del'}]
					   ]
		},
		{	
			'type'	 : 'm_symbol_3',
			'layout' : [
						[{btn_id:'dial_wedge', btn_value:'<span>∧</span>'}, {btn_id:'dial_vee', btn_value:'<span class="selection blur"><span>∨</span></span>'}, {btn_id:'dial_cup', btn_value:'<span>∪</span>'}, {btn_id:'m_dial_shift', btn_value:'Menu'}, {btn_id:'dial_tab', btn_value:'Tab'}],
						[{btn_id:'dial_cap', btn_value:'<span>∩</span>'}, {btn_id:'dial_in', btn_value:'<span class="binary-operator">∈</span>'}, {btn_id:'dial_notin', btn_value:'<span class="binary-operator">∉</span>'}, {btn_id:'m_dial_symbol_2', btn_value:'◀'}, {btn_id:'m_dial_symbol_4', btn_value:'▶'}],
						[{btn_id:'dial_subset', btn_value:'<span class="binary-operator">⊂</span>'}, {btn_id:'dial_notsubset', btn_value:'<span class="binary-operator">⊄</span>'}, {btn_id:'dial_subseteq', btn_value:'<span class="selection blur"><span class="binary-operator">⊆</span></span>'}, {btn_id:'dial_sup', btn_value:'^'}, {btn_id:'dial_sub', btn_value:'_'}],
						[{btn_id:'dial_notsubset', btn_value:'<span class="binary-operator">⊈</span>'}, {btn_id:'dial_all', btn_value:'∀'}, {btn_id:'dial_exisists', btn_value:'<span>∃</span>'}, {btn_id:'dial_enter', btn_value:'Enter'}, {btn_id:'dial_spacebar', btn_value:'SB'}],
						[{btn_id:'dial_left', btn_value:'←'}, {btn_id:'dial_up', btn_value:'↑'}, {btn_id:'dial_down', btn_value:'↓'}, {btn_id:'dial_right', btn_value:'→'}, {btn_id:'dial_del', btn_value:'Del'}]
					   ]
		},
		{	
			'type'	 : 'm_symbol_4',
			'layout' : [
						[{btn_id:'dial_angle', btn_value:'∠'}, {btn_id:'dial_equiv', btn_value:'<span class="binary-operator">≡</span>'}, {btn_id:'dial_therefore', btn_value:'∴'}, {btn_id:'m_dial_shift', btn_value:'Menu'}, {btn_id:'dial_tab', btn_value:'Tab'}],
						[{btn_id:'dial_because', btn_value:'∵'}, {btn_id:'dial_botharrow', btn_value:'⇔'}, {btn_id:'dial_notbotharrow', btn_value:'⇎'}, {btn_id:'m_dial_symbol_3', btn_value:'◀'}, {btn_id:'m_dial_symbol_1', btn_value:'▶'}],
						[{btn_id:'dial_rarrow', btn_value:'⇒'}, {btn_id:'dial_notrarrow', btn_value:'⇏'}, {btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_sup', btn_value:'^'}, {btn_id:'dial_sub', btn_value:'_'}],
						[{btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;&nbsp;'}, {btn_id:'dial_enter', btn_value:'Enter'}, {btn_id:'dial_spacebar', btn_value:'SB'}],
						[{btn_id:'dial_left', btn_value:'←'}, {btn_id:'dial_up', btn_value:'↑'}, {btn_id:'dial_down', btn_value:'↓'}, {btn_id:'dial_right', btn_value:'→'}, {btn_id:'dial_del', btn_value:'Del'}]
					   ]
		},
	];
	var D_Dial_Btn = [
		{	
			'type'	 : 'basic',
			'layout' : [
						[{btn_id:'dial_tab', btn_value:'Tab'},{btn_id:'dial_1', btn_value:'1'},{btn_id:'dial_2', btn_value:'2'},{btn_id:'dial_3', btn_value:'3'},{btn_id:'dial_4', btn_value:'4'},{btn_id:'dial_5', btn_value:'5'},{btn_id:'dial_6', btn_value:'6'},{btn_id:'dial_7', btn_value:'7'},{btn_id:'dial_8', btn_value:'8'},{btn_id:'dial_9', btn_value:'9'},{btn_id:'dial_0', btn_value:'0'},{btn_id:'dial_del', btn_value:'Del'}],
						[{btn_id:'dial_plus', btn_value:'+'},{btn_id:'dial_minus', btn_value:'-'},{btn_id:'dial_mul', btn_value:'x'},{btn_id:'dial_div', btn_value:'÷'}, {btn_id:'dial_per', btn_value:'%'},{btn_id:'dial_LP', btn_value:'('},{btn_id:'dial_RP', btn_value:')'},{btn_id:'dial_LP2', btn_value:'{'},{btn_id:'dial_RP2', btn_value:'}'},{btn_id:'dial_LP3', btn_value:'['},{btn_id:'dial_RP3', btn_value:']'}, {btn_id:'dial_enter', btn_value:'&nbsp;&nbsp;Enter&nbsp;&nbsp;'}],
						[{btn_id:'dial_shift', btn_value:'&nbsp;shift&nbsp;'},{btn_id:'dial_equal', btn_value:'='},{btn_id:'dial_lt', btn_value:'<'},{btn_id:'dial_rt', btn_value:'>'}, {btn_id:'dial_lt_equal', btn_value:'≤'}, {btn_id:'dial_rt_equal', btn_value:'≥'}, {btn_id:'dial_not_equal', btn_value:'≠'}, {btn_id:'dial_plus_minus', btn_value:'±'}, {btn_id:'dial_prime', btn_value:'′'}, {btn_id:'dial_double_prime', btn_value:'″'}, {btn_id:'dial_dot', btn_value:'.'}, {btn_id:'dial_abs', btn_value:'||'}],
						[{btn_id:'dial_sup', btn_value:'^'},{btn_id:'dial_sub', btn_value:'_'},{btn_id:'dial_sqrt', btn_value:'&nbsp;&nbsp;√&nbsp;&nbsp;'},{btn_id:'dial_spacebar', btn_value:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Space&nbsp;&nbsp;Bar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'},{btn_id:'dial_english', btn_value:'En'},{btn_id:'dial_left', btn_value:'←'},{btn_id:'dial_up', btn_value:'↑'},{btn_id:'dial_down', btn_value:'↓'},{btn_id:'dial_right', btn_value:'→'}]
					   ]
		},
		{	
			'type'	 : 'english_upper',
			'layout' : [
						[{btn_id:'dial_tab', btn_value:'Tab'},{btn_id:'dial_A', btn_value:'A'},{btn_id:'dial_B', btn_value:'B'},{btn_id:'dial_C', btn_value:'C'},{btn_id:'dial_D', btn_value:'D'}, {btn_id:'dial_E', btn_value:'E'},{btn_id:'dial_F', btn_value:'F'},{btn_id:'dial_G', btn_value:'G'},{btn_id:'dial_H', btn_value:'H'},{btn_id:'dial_I', btn_value:'I'},{btn_id:'dial_J', btn_value:'J'}, {btn_id:'dial_del', btn_value:'Del'}],
						[{btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_K', btn_value:'K'}, {btn_id:'dial_L', btn_value:'L'},{btn_id:'dial_N', btn_value:'N'},{btn_id:'dial_O', btn_value:'O'},{btn_id:'dial_P', btn_value:'P'}, {btn_id:'dial_Q', btn_value:'Q'}, {btn_id:'dial_R', btn_value:'R'}, {btn_id:'dial_S', btn_value:'S'}, {btn_id:'dial_T', btn_value:'T'}, {btn_id:'dial_U', btn_value:'U'},{btn_id:'dial_enter', btn_value:'Enter'}],
						[{btn_id:'dial_shift', btn_value:'shift'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_V', btn_value:'V'}, {btn_id:'dial_W', btn_value:'W'}, {btn_id:'dial_X', btn_value:'X'}, {btn_id:'dial_Y', btn_value:'Y'}, {btn_id:'dial_Z', btn_value:'Z'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_capslock_U', btn_value:'Caps lock'}],
						[{btn_id:'dial_sup', btn_value:'^'},{btn_id:'dial_sub', btn_value:'_'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;'},{btn_id:'dial_spacebar', btn_value:'&nbsp;&nbsp;Space&nbsp;Bar&nbsp;&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_left', btn_value:'←'},{btn_id:'dial_up', btn_value:'↑'},{btn_id:'dial_down', btn_value:'↓'},{btn_id:'dial_right', btn_value:'→'}]
					   ] 
		},
		{	
			'type'	 : 'english_lower',
			'layout' : [
						[{btn_id:'dial_tab', btn_value:'Tab'},{btn_id:'dial_a', btn_value:'a'},{btn_id:'dial_b', btn_value:'b'},{btn_id:'dial_c', btn_value:'c'},{btn_id:'dial_d', btn_value:'d'}, {btn_id:'dial_e', btn_value:'e'},{btn_id:'dial_f', btn_value:'f'},{btn_id:'dial_g', btn_value:'g'},{btn_id:'dial_h', btn_value:'h'},{btn_id:'dial_i', btn_value:'i'},{btn_id:'dial_j', btn_value:'j'}, {btn_id:'dial_del', btn_value:'Del'}],
						[{btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_k', btn_value:'k'}, {btn_id:'dial_l', btn_value:'l'},{btn_id:'dial_n', btn_value:'n'},{btn_id:'dial_o', btn_value:'o'},{btn_id:'dial_p', btn_value:'p'}, {btn_id:'dial_q', btn_value:'q'}, {btn_id:'dial_r', btn_value:'r'}, {btn_id:'dial_s', btn_value:'s'}, {btn_id:'dial_t', btn_value:'t'}, {btn_id:'dial_u', btn_value:'u'},{btn_id:'dial_enter', btn_value:'&nbsp;Enter&nbsp;'}],
						[{btn_id:'dial_shift', btn_value:'shift'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_v', btn_value:'v'}, {btn_id:'dial_w', btn_value:'w'}, {btn_id:'dial_x', btn_value:'x'}, {btn_id:'dial_y', btn_value:'y'}, {btn_id:'dial_z', btn_value:'z'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_capslock_L', btn_value:'Caps lock'}],
						[{btn_id:'dial_sup', btn_value:'^'},{btn_id:'dial_sub', btn_value:'_'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;'},{btn_id:'dial_spacebar', btn_value:'&nbsp;&nbsp;Space&nbsp;Bar&nbsp;&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_left', btn_value:'←'},{btn_id:'dial_up', btn_value:'↑'},{btn_id:'dial_down', btn_value:'↓'},{btn_id:'dial_right', btn_value:'→'}]
					   ] 
		},
		{	
			'type'	 : 'operation',
			'layout' : [
						[{btn_id:'dial_tab', btn_value:'Tab'},{btn_id:'dial_sqrt', btn_value:'<span style="font-size: 0.8em; padding-top: 3px"><span class="sqrt-prefix">&radic;</span><span class="sqrt-stem" style="border-top-width: 1.7142857142857144px;">&nbsp;</span></span>'},{btn_id:'dial_nsqrt', btn_value:'<span style="font-size: 0.7em"><sup class="nthroot"><var>n</var></sup><span><span class="sqrt-prefix">&radic;</span><span class="sqrt-stem" style="border-top-width: 1.7142857142857144px; ">&nbsp;</span></span></span>'},{btn_id:'dial_frac', btn_value:'n/m'},{btn_id:'dial_log', btn_value:'log'},{btn_id:'dial_ln', btn_value:'ln'},{btn_id:'dial_lim', btn_value:'lim'}, {btn_id:'dial_prod', btn_value:'∏'}, {btn_id:'dial_coprod', btn_value:'∐'}, {btn_id:'dial_del', btn_value:'Del'}],
						[{btn_id:'dial_matrix', btn_value:'Matrix'}, {btn_id:'dial_sum', btn_value:'∑'}, {btn_id:'dial_sin', btn_value:'sin'},{btn_id:'dial_cos', btn_value:'cos'},{btn_id:'dial_tan', btn_value:'tan'},{btn_id:'dial_sec', btn_value:'sec'}, {btn_id:'dial_csc', btn_value:'csc'},{btn_id:'dial_cot', btn_value:'cot'}, {btn_id:'dial_enter', btn_value:'Enter'}],
						[{btn_id:'dial_shift', btn_value:'&nbsp;shift&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_int', btn_value:'∫'},{btn_id:'dial_fx', btn_value:'<var class="florin">ƒ</var>'},{btn_id:'dial_combi', btn_value:'<var class="florin">C</var>'}, {btn_id:'dial_binomial', btn_value:'Binomial'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;'}],
						[{btn_id:'dial_sup', btn_value:'^'},{btn_id:'dial_sub', btn_value:'_'},{btn_id:'dial_basic', btn_value:'Num'},{btn_id:'dial_spacebar', btn_value:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Space&nbsp;&nbsp;Bar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'},{btn_id:'dial_english', btn_value:'En'},{btn_id:'dial_left', btn_value:'←'},{btn_id:'dial_up', btn_value:'↑'},{btn_id:'dial_down', btn_value:'↓'},{btn_id:'dial_right', btn_value:'→'}]
					   ] 
		},
		{	
			'type'	 : 'symbol1',
			'layout' : [
						[{btn_id:'dial_tab', btn_value:'Tab'},{btn_id:'dial_exclamation_mark', btn_value:'!'},{btn_id:'dial_golbang', btn_value:'@'},{btn_id:'dial_sharp', btn_value:'#'},{btn_id:'dial_dollor', btn_value:'$'}, {btn_id:'dial_anper', btn_value:'&'},{btn_id:'dial_colon', btn_value:':'},{btn_id:'dial_semi', btn_value:';'},{btn_id:'dial_question', btn_value:'?'},{btn_id:'dial_comma', btn_value:','},{btn_id:'dial_slash', btn_value:'/'}, {btn_id:'dial_del', btn_value:'Del'}],
						[{btn_id:'dial_alpha', btn_value:'<var>α</var>'}, {btn_id:'dial_beta', btn_value:'<var>β</var>'}, {btn_id:'dial_gamma', btn_value:'<var>γ</var>'},{btn_id:'dial_delta', btn_value:'<var>δ</var>'},{btn_id:'dial_theta', btn_value:'<var>θ</var>'},{btn_id:'dial_mu', btn_value:'<var>μ</var>'}, {btn_id:'dial_sigma', btn_value:'<var>σ</var>'}, {btn_id:'dial_digamma', btn_value:'<var>ϝ</var>'}, {btn_id:'dial_omega', btn_value:'<span>Ω</span>'}, {btn_id:'dial_phi', btn_value:'<var>ϕ</var>'},{btn_id:'dial_enter', btn_value:'&nbsp;&nbsp;Enter&nbsp;&nbsp;'}],
						[{btn_id:'dial_shift', btn_value:'&nbsp;&nbsp;shift&nbsp;&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_pi', btn_value:'<span class="nonSymbola">π</span>'}, {btn_id:'dial_infinite', btn_value:'<span mathquill-command-id="32">∞</span>'}, {btn_id:'dial_LP', btn_value:'('},{btn_id:'dial_RP', btn_value:')'},{btn_id:'dial_LP2', btn_value:'{'},{btn_id:'dial_RP2', btn_value:'}'},{btn_id:'dial_LP3', btn_value:'['},{btn_id:'dial_RP3', btn_value:']'}, {btn_id:'dial_cdots', btn_value:'<span>⋯</span>'}, {btn_id:'dial_circ', btn_value:'<span>∘</span>'}],
						[{btn_id:'dial_sup', btn_value:'^'},{btn_id:'dial_sub', btn_value:'_'}, {btn_id:'dial_symbol_1', btn_value:'&nbsp;◀&nbsp;'}, {btn_id:'dial_spacebar', btn_value:'&nbsp;&nbsp;Space&nbsp;Bar&nbsp;&nbsp;'}, {btn_id:'dial_symbol_2', btn_value:'&nbsp;▶&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_left', btn_value:'←'},{btn_id:'dial_up', btn_value:'↑'},{btn_id:'dial_down', btn_value:'↓'},{btn_id:'dial_right', btn_value:'→'}]
					   ] 
		},
		{	
			'type'	 : 'symbol2',
			'layout' : [
						[{btn_id:'dial_tab', btn_value:'Tab'},{btn_id:'dial_exclamation_mark', btn_value:'!'},{btn_id:'dial_golbang', btn_value:'@'},{btn_id:'dial_sharp', btn_value:'#'},{btn_id:'dial_dollor', btn_value:'$'}, {btn_id:'dial_anper', btn_value:'&'},{btn_id:'dial_colon', btn_value:':'},{btn_id:'dial_semi', btn_value:';'},{btn_id:'dial_question', btn_value:'?'},{btn_id:'dial_comma', btn_value:','},{btn_id:'dial_slash', btn_value:'/'}, {btn_id:'dial_del', btn_value:'Del'}],
						[{btn_id:'dial_wedge', btn_value:'<span>∧</span>'}, {btn_id:'dial_vee', btn_value:'<span class="selection blur"><span>∨</span></span>'}, {btn_id:'dial_cup', btn_value:'<span>∪</span>'},{btn_id:'dial_cap', btn_value:'<span>∩</span>'},{btn_id:'dial_in', btn_value:'<span class="binary-operator">∈</span>'}, {btn_id:'dial_notin', btn_value:'<span class="binary-operator">∉</span>'}, {btn_id:'dial_subset', btn_value:'<span class="binary-operator">⊂</span>'}, {btn_id:'dial_notsubset', btn_value:'<span class="binary-operator">⊄</span>'}, {btn_id:'dial_subseteq', btn_value:'<span class="selection blur"><span class="binary-operator">⊆</span></span>'}, {btn_id:'dial_notsubseteq', btn_value:'<span class="binary-operator">⊈</span>'}, {btn_id:'dial_enter', btn_value:'Enter'}],
						[{btn_id:'dial_shift', btn_value:'shift'}, {btn_id:'dial_angle', btn_value:'<span>∠</span>'}, {btn_id:'dial_equiv', btn_value:'<span class="binary-operator">≡</span>'}, {btn_id:'dial_all', btn_value:'∀'}, {btn_id:'dial_exisists', btn_value:'<span>∃</span>'},{btn_id:'dial_therefore', btn_value:'∴'},{btn_id:'dial_because', btn_value:'∵'},{btn_id:'dial_botharrow', btn_value:'⇔'},{btn_id:'dial_notbotharrow', btn_value:'⇎'},{btn_id:'dial_rarrow', btn_value:'⇒'}, {btn_id:'dial_notrarrow', btn_value:'⇏'}],
						[{btn_id:'dial_sup', btn_value:'^'},{btn_id:'dial_sub', btn_value:'_'}, {btn_id:'dial_symbol_1', btn_value:'&nbsp;◀&nbsp;'}, {btn_id:'dial_spacebar', btn_value:'&nbsp;&nbsp;Space&nbsp;Bar&nbsp;&nbsp;'}, {btn_id:'dial_symbol_2', btn_value:'&nbsp;▶&nbsp;'}, {btn_id:'dial_non', btn_value:'&nbsp;'}, {btn_id:'dial_left', btn_value:'←'},{btn_id:'dial_up', btn_value:'↑'},{btn_id:'dial_down', btn_value:'↓'},{btn_id:'dial_right', btn_value:'→'}]
					   ] 
		}
	];
	function dial_layout (type) {

		var html = '<br>';
		var className = '';
		var data = null;
		var dialArr = [];

		if($(window).width() > mobile_size) {
			className = 'dial_key';
			dialArr = D_Dial_Btn;
		}
		else {
			className = 'dial_key add_mobile_class';
			dialArr = M_Dial_Btn;
		}

		for(var i=0; i < dialArr.length; i++) {
			if( type === dialArr[i].type) {
				data = dialArr[i].layout;
				break;
			}
		}

		for(var i=0; i < data.length; i++) {
			for(var j=0; j < data[i].length; j++) {
				html+='<button id="'+ data[i][j].btn_id+'" class="'+ className +'">'+ data[i][j].btn_value+'</button>';
			}
			html+= '<br>';
		}

		return html;
	}

	//load

	if($(window).width() > mobile_size) $('.dial_content').append(dial_layout('basic'));
	else $('.dial_content').append(dial_layout('m_basic'));
	dial_event();
	

	//event

	function dial_event() {
		for(var i=0; i<=9; i++) {
			dialCharEvent(root, jQ, 'dial_'+i, i.toString(), i.toString());
		}

		for(var i=97; i<=122; i++) {
			dialCharEvent(root, jQ, 'dial_'+String.fromCharCode(i), String.fromCharCode(i), String.fromCharCode(i));
		}

		for(var i=65; i<=90; i++) {
			dialCharEvent(root, jQ, 'dial_'+String.fromCharCode(i), String.fromCharCode(i), String.fromCharCode(i));
		}

		dialCharEvent(root, jQ, 'dial_plus', '+', '+');
		dialCharEvent(root, jQ, 'dial_minus', '-', '-');
		dialCharEvent(root, jQ, 'dial_mul', '×', 'x');
		dialCharEvent(root, jQ, 'dial_div', '÷', '÷');
		dialCharEvent(root, jQ, 'dial_per', '%', '%');

		dialCharEvent(root, jQ, 'dial_LP', '(', '(');
		dialCharEvent(root, jQ, 'dial_RP', ')', ')');

		dialCharEvent(root, jQ, 'dial_LP2', '\\{', '{');
		dialCharEvent(root, jQ, 'dial_RP2', '\\}', '}');

		dialCharEvent(root, jQ, 'dial_LP3', '\\[', '[');
		dialCharEvent(root, jQ, 'dial_RP3', '\\]', ']');
		dialCharEvent(root, jQ, 'dial_abs', '\\mid', '||');

		dialCharEvent(root, jQ, 'dial_equal', '=', '=');
		dialCharEvent(root, jQ, 'dial_lt', '<', '<');
		dialCharEvent(root, jQ, 'dial_rt', '>', '>');
		dialCharEvent(root, jQ, 'dial_lt_equal', '\\le', '≤');
		dialCharEvent(root, jQ, 'dial_rt_equal', '\\ge', '≥');
		dialCharEvent(root, jQ, 'dial_not_equal', '\\ne', '≠');
		dialCharEvent(root, jQ, 'dial_plus_minus', '\\pm', '±');
		dialCharEvent(root, jQ, 'dial_prime', '′', '′');
		dialCharEvent(root, jQ, 'dial_double_prime', '″', '″');
		dialCharEvent(root, jQ, 'dial_dot', '.', '.');
		

		dialCharEvent(root, jQ, 'dial_sup', '^', '^');
		dialCharEvent(root, jQ, 'dial_sub', '_', '_');

		dialCharEvent(root, jQ, 'dial_sqrt', '\\sqrt', '√');
		dialCharEvent(root, jQ, 'dial_nsqrt', '\\nthroot', '<span style="font-size: 0.7em"><sup class="nthroot"><var>n</var></sup><span><span class="sqrt-prefix">&radic;</span><span class="sqrt-stem" style="border-top-width: 1.7142857142857144px; ">&nbsp;</span></span></span>');
		dialCharEvent(root, jQ, 'dial_sum', '\\sum', 'Σ');
		dialCharEvent(root, jQ, 'dial_prod', '\\prod', '∏');
		dialCharEvent(root, jQ, 'dial_coprod', '\\coprod', '∐');

		dialCharEvent(root, jQ, 'dial_frac', '\\frac', 'n/m');
		dialCharEvent(root, jQ, 'dial_matrix', '\\vector', 'M');
		dialCharEvent(root, jQ, 'dial_log', '\\log', 'log');
		dialCharEvent(root, jQ, 'dial_lim', '\\lim', 'lim');
		dialCharEvent(root, jQ, 'dial_ln', '\\ln', 'ln');
		dialCharEvent(root, jQ, 'dial_combi', 'C', '<var class="florin">C</var>');
		dialCharEvent(root, jQ, 'dial_int', '\\int', '∫');
		dialCharEvent(root, jQ, 'dial_binomial', '\\binomial', 'B');

		dialCharEvent(root, jQ, 'dial_sin', '\\sin', 'sin');
		dialCharEvent(root, jQ, 'dial_cos', '\\cos', 'cos');
		dialCharEvent(root, jQ, 'dial_tan', '\\tan', 'tan');
		dialCharEvent(root, jQ, 'dial_sec', '\\sec', 'sec');
		dialCharEvent(root, jQ, 'dial_csc', '\\csc', 'csc');
		dialCharEvent(root, jQ, 'dial_cot', '\\cot', 'cot');


		dialCharEvent(root, jQ, 'dial_fx', '\\f', '<var class="florin">ƒ</var>');
		dialCharEvent(root, jQ, 'dial_exclamation_mark', '!', '!');
		dialCharEvent(root, jQ, 'dial_golbang', '@', '@');
		dialCharEvent(root, jQ, 'dial_sharp', '#', '#');
		dialCharEvent(root, jQ, 'dial_dollor', '$', '$');
		dialCharEvent(root, jQ, 'dial_anper', '&', '&');
		dialCharEvent(root, jQ, 'dial_colon', ':', ':');
		dialCharEvent(root, jQ, 'dial_semi', ';', ';');
		dialCharEvent(root, jQ, 'dial_comma', ',', ',');
		dialCharEvent(root, jQ, 'dial_question', '?', '?');
		dialCharEvent(root, jQ, 'dial_slash', '/', '/');

		dialCharEvent(root, jQ, 'dial_alpha', '\\alpha', '<var>α</var>');
		dialCharEvent(root, jQ, 'dial_beta', '\\beta', '<var>β</var>');
		dialCharEvent(root, jQ, 'dial_gamma', '\\gamma', '<var>γ</var>');
		dialCharEvent(root, jQ, 'dial_delta', '\\delta', '<var>δ</var>');
		dialCharEvent(root, jQ, 'dial_theta', '\\theta', '<var>θ</var>');
		dialCharEvent(root, jQ, 'dial_mu', '\\mu', '<var>μ</var>');
		dialCharEvent(root, jQ, 'dial_sigma', '\\sigma', '<var>σ</var>');
		dialCharEvent(root, jQ, 'dial_digamma', '\\digamma', '<var>ϝ</var>');
		dialCharEvent(root, jQ, 'dial_omega', '\\omega', '<var>Ω</var>');
		dialCharEvent(root, jQ, 'dial_phi', '\\phi', '<var>ϕ</var>');
		dialCharEvent(root, jQ, 'dial_pi', '\\pi', '<span class="nonSymbola">π</span>');
		dialCharEvent(root, jQ, 'dial_infinite', '\\inf', '<span mathquill-command-id="32">∞</span>');
		dialCharEvent(root, jQ, 'dial_cdots', '\\cdots', '<span>⋯</span>');
		dialCharEvent(root, jQ, 'dial_circ', '\\circ', '<span>∘</span>');
		
		dialCharEvent(root, jQ, 'dial_wedge', '\\wedge', '<span>∧</span>');
		dialCharEvent(root, jQ, 'dial_vee', '\\vee', '<span class="selection blur"><span>∨</span></span>');
		dialCharEvent(root, jQ, 'dial_cup', '\\cup', '<span>∪</span>');
		dialCharEvent(root, jQ, 'dial_cap', '\\cap', '<span>∩</span>');
		dialCharEvent(root, jQ, 'dial_in', '\\in', '<span class="binary-operator">∈</span>');
		dialCharEvent(root, jQ, 'dial_notin', '\\notin', '<span class="binary-operator">∉</span>');
		dialCharEvent(root, jQ, 'dial_subset', '\\subset', '<span class="binary-operator">⊂</span>');
		dialCharEvent(root, jQ, 'dial_notsubset', '\\notsubset', '<span class="binary-operator">⊄</span>');
		dialCharEvent(root, jQ, 'dial_subseteq', '\\subseteq', '<span class="selection blur"><span class="binary-operator">⊆</span></span>');
		dialCharEvent(root, jQ, 'dial_notsubseteq', '\\notsubseteq', '<span class="binary-operator">⊈</span>');
		dialCharEvent(root, jQ, 'dial_angle', '\\angle', '<span>∠</span>');
		dialCharEvent(root, jQ, 'dial_all', '∀', '∀');
		dialCharEvent(root, jQ, 'dial_exisists', '∃', '∃');
		dialCharEvent(root, jQ, 'dial_therefore', '∴', '<span>∴</span>');
		dialCharEvent(root, jQ, 'dial_because', '∵', '<span>∵</span>');
		dialCharEvent(root, jQ, 'dial_botharrow', '⇔', '<span>⇔</span>');
		dialCharEvent(root, jQ, 'dial_notbotharrow', '⇎', '<span>⇎</span>');
		dialCharEvent(root, jQ, 'dial_rarrow', '⇒', '<span>⇒</span>');
		dialCharEvent(root, jQ, 'dial_notrarrow', '⇏', '<span>⇏</span>');

		dialChangeEvent('dial_shift');
		dialChangeEvent('dial_basic');
		dialChangeEvent('dial_english');
		dialChangeEvent('dial_operation');
		dialChangeEvent('dial_symbol');

		dialChangeEvent('m_dial_shift');

		dialTriggerEvent('dial_del', 8);
		dialTriggerEvent('dial_tab', 9);
		dialTriggerEvent('dial_enter', 13);
		dialTriggerEvent('dial_spacebar', 32);
		dialTriggerEvent('dial_left', 37);
		dialTriggerEvent('dial_up', 38);
		dialTriggerEvent('dial_down', 40);
		dialTriggerEvent('dial_right', 39);

	}
	
	//load
	
	displayUsedMath();

	$('#btn_send').click(function () {
		var latexMath = $('#editable-math');
		$('#dialog_send').append('<img src="http://latex.codecogs.com/gif.latex?'+latexMath.mathquill('latex')+'">');
		$('#dialog_send').dialog({
	      modal: true,
	      position: { my: 'center'},
	      buttons: {
	        Ok: function() {
	          $( this ).dialog( "close" );
	          $('#dialog_send *').remove();
	        }
	      }
    	});
	});


	function displayUsedMath() {
		var html='';
		html+='<table><tr>';
		for(var i=0; i<usedMath.length; i++) {
			html+='<td>';
			html+='<button id="usedMath_'+i+'"class="btn_usedMath">'+usedMath[i].diplay+'</button>';
			html+='</td>';
		}
		html+='</tr></table>'
		
		$('.usedMath *').remove();
		$('.usedMath').append(html);

		for(var i=0; i<usedMath.length; i++) {
			dialCharEvent(usedMath[i].root, usedMath[i].jQ, 'usedMath_'+i, usedMath[i].ch, usedMath[i].display);
		}

	}

	function dialCharEvent (root, jQ, el, ch, diplay) {
		$('#'+el).click(function(){
		    root.cursor.writeLatex(ch, true);
		    jQ.focus();

		    if(el.indexOf("usedMath_") > -1) return;

		    function existUsedMath (ch) {
				for(var i=0; i<usedMath.length; i++) {
					if(usedMath[i].ch === ch) return true;
				}
				return false;
			}

		    if(usedMath.length < usedMathLength && !existUsedMath(ch)) {
			   	usedMath.unshift({
			   		'root'	: root,
			   		'jQ'	: jQ,
			   		'elementId' : el,
			   		'ch' : ch,
			   		'diplay' : diplay
			   	});
			} else {
				if(!existUsedMath(ch)) {
					usedMath.pop();
					usedMath.unshift({
				   		'root'	: root,
				   		'jQ'	: jQ,
				   		'elementId' : el,
				   		'ch' : ch,
				   		'diplay' : diplay
				   	});
				}
			}

			displayUsedMath();
		  }
		);
	}
	function dialChangeEvent (el) {
		// not mobile size
		if (el === 'dial_shift') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append('<br/>');
		    	$('.dial_content').append('<button id="dial_basic" class="btn_shift">Basic</button>');
		    	$('.dial_content').append('<button id="dial_english" class="btn_shift">English</button>');
		    	$('.dial_content').append('<button id="dial_operation" class="btn_shift">Operation</button>');
		    	$('.dial_content').append('<button id="dial_symbol" class="btn_shift">Symbol</button>');

		    	dialChangeEvent('dial_basic');
		    	dialChangeEvent('dial_english');
		    	dialChangeEvent('dial_operation');
		    	dialChangeEvent('dial_symbol');

			});
		}

		else if (el === 'dial_basic') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('basic'));
				dial_event();
			});
		}
		else if (el === 'dial_english' || el === 'dial_capslock_U') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('english_lower'));
				dialChangeEvent('dial_capslock_L');
				dial_event();
			});
		}

		else if (el === 'dial_capslock_L') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('english_upper'));
				dialChangeEvent('dial_capslock_U');
				dial_event();
			});
		}

		else if (el === 'dial_operation') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('operation'));
				
				dial_event();
			});
		}

		else if (el === 'dial_symbol' || el === 'dial_symbol_1') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('symbol1'));
				dialChangeEvent('dial_symbol_1');
				dialChangeEvent('dial_symbol_2');
				dial_event();
			});
		}

		else if (el === 'dial_symbol_2') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('symbol2'));
				dialChangeEvent('dial_symbol_1');
				dialChangeEvent('dial_symbol_2');
				dial_event();
			});
		}

		// mobile size
		if (el === 'm_dial_shift') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append('<br/>');
		    	$('.dial_content').append('<button id="m_dial_basic" class="btn_shift">Basic</button>');
		    	$('.dial_content').append('<button id="m_dial_english" class="btn_shift">English</button>');
		    	$('.dial_content').append('<button id="m_dial_operation" class="btn_shift">Operation</button>');
		    	$('.dial_content').append('<button id="m_dial_symbol" class="btn_shift">Symbol</button>');

		    	dialChangeEvent('m_dial_basic');
		    	dialChangeEvent('m_dial_english');
		    	dialChangeEvent('m_dial_operation');
		    	dialChangeEvent('m_dial_symbol');

			});
		}
		else if (el === 'm_dial_basic') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('m_basic'));
				dial_event();
			});
		}

		else if(el === 'm_dial_english' 
			|| el === 'm_dial_english_lower1' 
			|| el === 'm_dial_capslock_L_1') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('m_english_lower_1'));
				dialChangeEvent('m_dial_english_lower3');
				dialChangeEvent('m_dial_english_lower2');
				dialChangeEvent('m_dial_capslock_U_1');
				dial_event();
			});
		}

		else if(el === 'm_dial_english_lower2' || el === 'm_dial_capslock_L_2') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('m_english_lower_2'));
				dialChangeEvent('m_dial_english_lower1');
				dialChangeEvent('m_dial_english_lower3');
				dialChangeEvent('m_dial_capslock_U_2');
				dial_event();
			});
		}

		else if(el === 'm_dial_english_lower3' || el === 'm_dial_capslock_L_3') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('m_english_lower_3'));
				dialChangeEvent('m_dial_english_lower2');
				dialChangeEvent('m_dial_english_lower1');
				dialChangeEvent('m_dial_capslock_U_3');
				dial_event();
			});
		}

		else if(el === 'm_dial_english_upper1' || el === 'm_dial_capslock_U_1') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('m_english_upper_1'));
				dialChangeEvent('m_dial_english_upper3');
				dialChangeEvent('m_dial_english_upper2');
				dialChangeEvent('m_dial_capslock_L_1');
				dial_event();
			});
		}

		else if(el === 'm_dial_english_upper2' || el === 'm_dial_capslock_U_2') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('m_english_upper_2'));
				dialChangeEvent('m_dial_english_upper1');
				dialChangeEvent('m_dial_english_upper3');
				dialChangeEvent('m_dial_capslock_L_2');
				dial_event();
			});
		}

		else if(el === 'm_dial_english_upper3' || el === 'm_dial_capslock_U_3') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('m_english_upper_3'));
				dialChangeEvent('m_dial_english_upper2');
				dialChangeEvent('m_dial_english_upper1');
				dialChangeEvent('m_dial_capslock_L_3');
				dial_event();
			});
		}

		else if (el === 'm_dial_operation' || el === 'm_dial_operation_1') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('m_operation_1'));
				dialChangeEvent('m_dial_operation_4');
				dialChangeEvent('m_dial_operation_2');
				dial_event();
			});
		}

		else if (el === 'm_dial_operation_2') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('m_operation_2'));
				dialChangeEvent('m_dial_operation_1');
				dialChangeEvent('m_dial_operation_3');
				dial_event();
			});
		}

		else if (el === 'm_dial_operation_3') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('m_operation_3'));
				dialChangeEvent('m_dial_operation_2');
				dialChangeEvent('m_dial_operation_4');
				dial_event();
			});
		}

		else if (el === 'm_dial_operation_4') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('m_operation_4'));
				dialChangeEvent('m_dial_operation_3');
				dialChangeEvent('m_dial_operation_1');
				dial_event();
			});
		}

		else if (el === 'm_dial_symbol' || el === 'm_dial_symbol_1') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('m_symbol_1'));
				dialChangeEvent('m_dial_symbol_4');
				dialChangeEvent('m_dial_symbol_2');
				dial_event();
			});
		}
		
		else if (el === 'm_dial_symbol_2') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('m_symbol_2'));
				dialChangeEvent('m_dial_symbol_1');
				dialChangeEvent('m_dial_symbol_3');
				dial_event();
			});
		}

		else if (el === 'm_dial_symbol_3') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('m_symbol_3'));
				dialChangeEvent('m_dial_symbol_2');
				dialChangeEvent('m_dial_symbol_4');
				dial_event();
			});
		}

		else if (el === 'm_dial_symbol_4') {
			$('#'+el).click(function(){
				$('.dial_content').empty();
				$('.dial_content').append(dial_layout('m_symbol_4'));
				dialChangeEvent('m_dial_symbol_3');
				dialChangeEvent('m_dial_symbol_1');
				dial_event();
			});
		}
	}
	function dialTriggerEvent (el, keycode) {
		$('#'+el).click(function(){
		    $('.textarea').trigger({
		        type: 'keydown',
		        which: keycode,
		        keyCode: keycode
		    });
		});
	}

}


