/* =============================================================================
   author: David.Lee@FlipScript.com.cn
   create time: 2013-04-11
   description: 
   ========================================================================== */
   

Function.prototype.method = function(name, func) {
	  this.prototype[name] = func;
	  return this;
	};
	if(!String.prototype.trim){ //??¡è?¨C-????¦Ì?¨¨¡ì???¡§??¡¥??|¨¨?a??|??¡ëtrim()?¨C1?3?
	String.method('trim', function() {
	return this.replace(/^\s+|\s+$/g, '');
	});
	String.method('ltrim', function() {
	return this.replace(/^\s+/g, '');
	});
	String.method('rtrim', function() {
	return this.replace(/\s+$/g, '');
	});
	}
function navHover(){
	var whichone;
	var jQuerycur_nav_a;
	var jQuerycur_subnav;
	var curClass;
    console.log("hover````````````````")
	jQuery('.nav-a').hover(function(){
		jQuerycur_nav_a = jQuery(this);
        
		curClass = jQuery.trim(jQuerycur_nav_a.attr('class'));
		whichone = curClass.substring(curClass.lastIndexOf('nav-'));
		jQuerycur_subnav = jQuery('.sub'+whichone);
        console.log("hover````````````````"+ jQuerycur_subnav)
		jQuerycur_nav_a.addClass(whichone + '_hover');
		jQuerycur_subnav.css({display:'block'});
	},function(){
		jQuerycur_nav_a && jQuerycur_nav_a.removeClass(whichone + '_hover');
		jQuerycur_subnav && jQuerycur_subnav.css({display:'none'});
	});
	jQuery('.subnav-can').hover(function(){
		jQuerycur_nav_a.addClass(whichone + '_hover');
        console.log("whichone````````````````"+ whichone)
		jQuerycur_subnav.css({display:'block'});
	},function(){
		jQuerycur_nav_a && jQuerycur_nav_a.removeClass(whichone + '_hover');
		jQuerycur_subnav && jQuerycur_subnav.css({display:'none'});
	});
}
function siderClick(){
	jQuery(window).scrollTop(0);

	jQuery('.sider-btn-top').on('click touchstart',function(event){
		event.stopPropagation();
		goTop(0);
		return false;
	});
	jQuery('.sider-btn-prev').on('click touchstart',function(event){
		event.stopPropagation();
		var perh = jQuery(window).height() - 120;
		var num = Math.floor(jQuery(window).scrollTop() / perh);
		var target;
		if(jQuery(window).scrollTop() % perh===0){
			target = (num - 1) * perh;
		} else {
			target = num * perh;
		}
		goTop(target);
		return false;
	});
	jQuery('.sider-btn-next').on('click touchstart',function(event){
		event.stopPropagation();
		var perh = jQuery(window).height() - 120;
		var num = Math.ceil(jQuery(window).scrollTop() / perh);
		var target;
		if(jQuery(window).scrollTop() % perh===0){
			target = (num + 1) * perh;
		} else {
			target = num * perh;
		}
		goTop(target);
		return false;
	});

	var jQuerysiteSiderFav = jQuery('.site-sider-fav_wrap');
	var jQuerysiteSiderShare = jQuery('.site-sider-share_wrap');

	jQuery('.sider-btn-fav').on('click touchstart',function(event){
		event.stopPropagation();
		var sendData = {'type':'getreloadplanlist'};
			jQuery.ajax({
				type: "POST",
				dataType: "html",
				url: "/ajaxPlan.php",
				data: sendData,
				success: function(respData){
					jQuery('.site-sider-fav').html(respData);
				}
			});
		jQuerysiteSiderFav.toggleClass('site-sider-fav_show');
		if(jQuerysiteSiderShare.width() !== 0){
			jQuerysiteSiderShare.removeClass('site-sider-share_show');
		}
			
		return false;
	});
	jQuerysiteSiderFav.mouseleave(function(){
		jQuerysiteSiderFav.removeClass('site-sider-fav_show');
	});
	jQuery('.sider-btn-share').on('click touchstart',function(event){
		event.stopPropagation();
		jQuerysiteSiderShare.toggleClass('site-sider-share_show');
		if(jQuerysiteSiderFav.width() !== 0){
			jQuerysiteSiderFav.removeClass('site-sider-fav_show');
		}
		return false;
	});
	jQuerysiteSiderShare.mouseleave(function(){
		jQuerysiteSiderShare.removeClass('site-sider-share_show');
	});
}
function goTop(targetTop){
	var curtop = jQuery(window).scrollTop();
	var dur = Math.abs(curtop - targetTop)*0.80;
	if(dur >= 600){
		dur = 600;
	}
	jQuery("html,body").animate({scrollTop:targetTop},{queue:false, duration:dur, complete:function(){
		var jQueryresetLayoutTrigger = jQuery('.site-footer');
		jQueryresetLayoutTrigger.css('width','100.5%');
		setTimeout(function(){jQueryresetLayoutTrigger.css('width','100%');},0.5);
	}});
}
function switchWeather(interval){
	var jQueryweatherTables = jQuery('.site-weather table');
	var curIndex = 0;
	window.setInterval(function(){
		var index = curIndex + 1;
		if(index >= jQueryweatherTables.length){
			index = 0;
		}
		jQueryweatherTables.eq(curIndex).css("display","none");
		jQueryweatherTables.eq(index).css("display","table");
		curIndex = index;
	},interval);
}
function subNavSearch(){
	var jQuerysearchBox = jQuery('.subnav-search-txt');
	var jQuerykeywordGroup = jQuery('.search-tag_txt ul');
	var jQueryleftBtn = jQuery('.search-tag_l');
	var jQueryrightBtn = jQuery('.search-tag_r');
	var keywordGroupLength = jQuerykeywordGroup.size();
	var curKeywordGroupIndex = 0;
	jQuerykeywordGroup.eq(curKeywordGroupIndex).show();
	jQuerykeywordGroup.find('li a').on('click',function(){
		jQuerysearchBox.val(jQuery(this).text());
	});
	jQueryleftBtn.fadeTo(0,0.2).on('click',function(){

		if(curKeywordGroupIndex===0){
			return;
		} else {
			jQuerykeywordGroup.eq(curKeywordGroupIndex).hide();
			curKeywordGroupIndex --;
			if(curKeywordGroupIndex===0){
				jQueryleftBtn.fadeTo(0,0.2);
			} else {
				jQueryleftBtn.fadeTo(0,1);
			}
			jQueryrightBtn.fadeTo(0,1) 
			jQuerykeywordGroup.eq(curKeywordGroupIndex).show();
		}
	});
	jQueryrightBtn.on('click',function(){
		if(curKeywordGroupIndex===keywordGroupLength-1){
			return;
		} else {
			jQuerykeywordGroup.eq(curKeywordGroupIndex).hide();
			curKeywordGroupIndex ++;
			if(curKeywordGroupIndex===keywordGroupLength-1){
				jQueryrightBtn.fadeTo(0,0.2); 
			} else {
				jQueryrightBtn.fadeTo(0,1);
			}
			jQueryleftBtn.fadeTo(0,1)
			jQuerykeywordGroup.eq(curKeywordGroupIndex).show();
		}
	});
}
/*dialog ????¡­3*/
function openDialog(jQuerydialog){
	jQuerydialog.show();
	jQuery('.site-loginOverlay-wrap').fadeIn(200);
}
function closeDialog(){
	jQuery('.site-loginOverlay-wrap').fadeOut(200,function(){
		jQuery('.site-dialog').hide();
		/*?¡­???¨C??¡­???*/
		jQuery('.site-dialog .site-dialog-inputBox').val('');
		jQuery('.site-dialog .site-dialog-messageTip').hide();
		jQuery('.site-dialog .site-dialog-videoCont').html('');
		jQuery('.site-dialog .site-dialog-mapCont').html('');
		/*20140530???¨¦¡ê???3¨¦¡­?*/
		jQuery('#playerBox').html('');
		jQuery('#playerBoxipad').html('');
		jQuery('#playerBoxmob').html('');
		jQuery(window).off('resize',resizeVideo);
	});
}
function showDialogMsg(jQuerymsgTip, msg){
	jQuerymsgTip.text(msg).show(200);
}
function switchDialog(jQuerycur, jQuerytarget){
	jQuerycur.hide();
	jQuerytarget.show();
}
function loginDialog(){
	/*jQuery('#site-dialog-login-username').blur(function(){
		if(jQuery('#site-dialog-login-username').val() ===''){
			showDialogMsg(jQuery('.site-dialog-login-username-msgTip'),'¨¨¡¥¡¤????????¡§????¡±¡§??¡¤???');
		}
	});
	jQuery('#site-dialog-login-password').blur(function(){
		if(jQuery(this).val() ===''){
			showDialogMsg(jQuery('.site-dialog-login-password-msgTip'),'¨¨¡¥¡¤????????¡§??????????¡¥?? ?');
		} 
	});*/
	jQuery('.site-dialog-login-btnLogin').click(function(){
		var username = jQuery.trim(jQuery('#site-dialog-login-username').val());
		var password = jQuery('#site-dialog-login-password').val();
		var jQueryajaxMsgTip = jQuery('.site-dialog-login-password-msgTip');
		if(username==='' || password===''){
			if(username===''){
				showDialogMsg(jQuery('.site-dialog-login-username-msgTip'),'¨¨¡¥¡¤????????¡§????¡±¡§??¡¤???');
			} 
			if(password===''){
				showDialogMsg(jQuery('.site-dialog-login-password-msgTip'),'¨¨¡¥¡¤????????¡§??????????¡¥?? ?');
			} 
		}else {
			var sendData = {'type':'login','username':username, 'password':password};
			jQuery.ajax({
				type: "POST",
				dataType: "json",
				url: "/ajaxUser.php",
				data: sendData,
				success: function(respData){
					if(respData.status){
						if(respData.status === 'error_1'){
							showDialogMsg(jQueryajaxMsgTip,'?¡±¡§??¡¤?????¨C?¡¥?? ?¨¦¡±?¨¨¡¥¡¥');
						} else if(respData.status === 'error_2'){
							showDialogMsg(jQueryajaxMsgTip,'?-¡è?¡±¡§??¡¤?¡ã???a?3¡§???');
						} else if(respData.status === 'ok'){
							if(location.href=='http://www.australia.cn/tools'){
								location.reload();
							}
							var userHtml = respData.cont+'<span></span><a id="" href="/user/logout">¨¦€€??o</a>';
							jQuery('.login-btns').html(userHtml);
							userHtml ='<li><a href="/tools">??¡®???¨¨???¡§???¡­???</a></li><li><a href="/user/logout">¨¦€€??o</a></li>';
							jQuery('.mob_user-ul').html(userHtml);
							closeDialog();
						}
					} else {
						showDialogMsg(jQueryajaxMsgTip,'????????¡§?¡°??o¡±¨¦¡±?¨¨¡¥¡¥???¨¨¡¥¡¤??¡¤?¨C¡ã???¨¦???¨C¡ã??????');
					}
				},
				error: function(xhr,status){
					showDialogMsg(jQueryajaxMsgTip,'Sorry, '+status);
				}
			});
		}
	});
}
function registerDialog() {
	var jQueryajaxMsgTip = jQuery('.site-dialog-register-securityCode-msgTip');
	/*jQuery('#site-dialog-register-lastname').blur(function(){
		if(jQuery(this).val() === '' ){
			showDialogMsg(jQuery('.site-dialog-register-name-msgTip'),'¨¨¡¥¡¤????????¡§????¡ì¡°???');
		}
	});
	jQuery('#site-dialog-register-firstname').blur(function(){
		if(jQuery(this).val() === ''){
			showDialogMsg(jQuery('.site-dialog-register-name-msgTip'),'¨¨¡¥¡¤????????¡§????¡ì¡°???');
		}
	});*/
	jQuery('#site-dialog-register-password').blur(function(){
		var pattern = /^[a-zA-Z0-9]+$/;
		var pwd = jQuery(this).val();
		var len = pwd.length;
		if(len>16 || len<6 || !pattern.test(pwd)){
			showDialogMsg(jQuery('.site-dialog-register-password-msgTip'),'?¡¥?? ??o¡±¨¨¡¥£¤??¡¥6??¡ã16????1?¨¦¡ª¡ä???¨¨?¡À?¨C???¨C??¡ã?-¡ª?????????');
		}
	});
	jQuery('#site-dialog-register-password_confirm').blur(function(){
		if(jQuery(this).val() !== jQuery('#site-dialog-register-password').val()){
			showDialogMsg(jQuery('.site-dialog-register-password_confirm-msgTip'),'??¡è???¨¨?¡°?¡­£¤????¡¥?? ??????€¨¨?¡ä');
		}
	});
	jQuery('#site-dialog-register-email').blur(function(){
		var pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		var email = jQuery(this).val();
		if(!pattern.test(email)){
			showDialogMsg(jQuery('.site-dialog-register-email-msgTip'),'¨¨¡¥¡¤???????-¡ê??????¨¦????¡À? ????');
			return;
		}
		var sendData = {'type':'verifyEmail','email':jQuery.trim(jQuery('#site-dialog-register-email').val())};
		jQuery.ajax({
			type: "POST",
			dataType: "json",
			url: "/ajaxUser.php",
			data: sendData,
			success: function(respData){
				if(respData.status){
					if(respData.status === 'error_3'){
						showDialogMsg(jQuery('.site-dialog-register-email-msgTip'),'?-¡è¨¦????¡À??¡ã??€?¡¤2????3¡§???');
					} else if(respData.status === 'ok'){
						/*nothing*/
					}
				} 
			},
			error: function(xhr,status){
				showDialogMsg(jQueryajaxMsgTip,'Sorry, '+status);
			}
		});
	});
	jQuery('#site-dialog-register-securitycode-pic').click(function(){
		var baseSrc = '/vcode.php';
		var time = new Date();
		var stamp = time.toString()+time.getMilliseconds().toString();
		jQuery(this).attr('src',baseSrc+'?'+escape(stamp));
	});
	jQuery('#register-agreeArticle').change(function(){
		if(!this.checked){
			showDialogMsg(jQuery('.site-dialog-register-agreeArticle-msgTip'),'¨¨¡¥¡¤????????????');
		}else{
			jQuery(this).parent('label').next('.site-dialog-messageTip:visible').hide(200);
		}
	});
	jQuery('.site-dialog-register-btnRegister').click(function(){
		var lastname = jQuery.trim(jQuery('#site-dialog-register-lastname').val());
		var firstname = jQuery.trim(jQuery('#site-dialog-register-firstname').val());
		var email = jQuery.trim(jQuery('#site-dialog-register-email').val());
		var password = jQuery('#site-dialog-register-password').val();
		var password_confirm = jQuery('#site-dialog-register-password_confirm').val();
		var securitycode = jQuery.trim(jQuery('#site-dialog-register-securitycode').val());
		var receiveEmail = jQuery('#register-receiveEmail')[0].checked;
		var agreeArticle = jQuery('#register-agreeArticle')[0].checked;
		if(lastname===''||firstname===''||email === ''||password === ''||password_confirm === ''||securitycode === ''|| !agreeArticle){
			if(lastname===''){
				showDialogMsg(jQuery('.site-dialog-register-name-msgTip'),'¨¨¡¥¡¤????????¡§????¡ì¡°???');
			}
			if(firstname===''){
				showDialogMsg(jQuery('.site-dialog-register-name-msgTip'),'¨¨¡¥¡¤????????¡§????¡ì¡°???');
			}
			if(email === ''){
				showDialogMsg(jQuery('.site-dialog-register-email-msgTip'),'¨¨¡¥¡¤????????¡§???¨¦????¡À??¡ã??€');
			}
			if(password === ''){
				showDialogMsg(jQuery('.site-dialog-register-password-msgTip'),'¨¨¡¥¡¤???????¡¥?? ?');
			}
			if(password_confirm === ''){
				showDialogMsg(jQuery('.site-dialog-register-password_confirm-msgTip'),'¨¨¡¥¡¤??????¨¨?¡°?¡­£¤?¡¥?? ?');
			}
			if(securitycode === ''){
				showDialogMsg(jQuery('.site-dialog-register-securityCode-msgTip'),'¨¨¡¥¡¤????????¡ë?¡­¡§? ?');
			}
			if(!agreeArticle){
				showDialogMsg(jQuery('.site-dialog-register-agreeArticle-msgTip'),'¨¨¡¥¡¤????????????');
			}
		} else if(password !== password_confirm){
			showDialogMsg(jQuery('.site-dialog-register-password_confirm-msgTip'),'??¡è???¨¨?¡°?¡­£¤????¡¥?? ??????€¨¨?¡ä');
		} else {
			var sendData = {'type':'register',
							'lastname':lastname, 
							'firstname':firstname, 
							'email':email, 
							'password':password,
							'securitycode':securitycode,
							'receiveEmail':receiveEmail};
			jQuery.ajax({
				type: "POST",
				dataType: "json",
				url: "/ajaxUser.php",
				data: sendData,
				success: function(respData){
					if(respData.status){
						if(respData.status === 'error_4'){
							showDialogMsg(jQueryajaxMsgTip,'??¡ë?¡­¡§? ?¨¦¡±?¨¨¡¥¡¥?????1???????¡ë???¡é??€?? ');
						} else if(respData.status === 'ok'){
							var userHtml = '<a href="/user">'+respData.cont+'</a><span></span><a id="" href="/user/logout">¨¦€€??o</a>';
							jQuery('.login-btns').html(userHtml);
							switchDialog(jQuery('.siteDialog-register'), jQuery('.siteDialog-registerSuccess'));
							//closeDialog();
						}
					} else {
						showDialogMsg(jQueryajaxMsgTip,'????????¡§?¡°??o¡±¨¦¡±?¨¨¡¥¡¥???¨¨¡¥¡¤??¡¤?¨C¡ã???¨¦???¨C¡ã?3¡§???');
					}
				},
				error: function(xhr,status){
					showDialogMsg(jQueryajaxMsgTip,'Sorry, '+status);
				}
			});
		}
	});
}
function feedbackDialog() {
	var jQueryajaxMsgTip = jQuery('.site-dialog-feedback-suggestionCont-msgTip');
	jQuery('.site-dialog-feedback-btnFeedback').click(function(){
		var name = jQuery.trim(jQuery('#site-dialog-feedback-name').val());
		var email = jQuery.trim(jQuery('#site-dialog-feedback-email').val());
		var browser = jQuery('#site-dialog-feedback-browser').val();
		var os = jQuery('#site-dialog-feedback-os').val();
		var suggestionType = jQuery('#site-dialog-feedback-suggestionType').val();
		var suggestionCont = jQuery.trim(jQuery('#site-dialog-feedback-suggestionCont').val());
		if(name===''||email === ''||browser === ''||os === ''||os === ''||suggestionType === ''||suggestionCont === ''){
			if(name===''){
				showDialogMsg(jQuery('.site-dialog-feedback-name-msgTip'),'¨¨¡¥¡¤????????¡§????¡ì¡°???');
			}
			if(email === ''){
				showDialogMsg(jQuery('.site-dialog-feedback-email-msgTip'),'¨¨¡¥¡¤????????¡§???¨¦????¡À??¡ã??€');
			}
			if(browser === ''){
				showDialogMsg(jQuery('.site-dialog-feedback-browser_os-msgTip'),'¨¨¡¥¡¤¨¦€¡ë?????¡§????¦Ì?¨¨¡ì???¡§?¡¯??¡°?????3????');
			}
			if(os === ''){
				showDialogMsg(jQuery('.site-dialog-feedback-browser_os-msgTip'),'¨¨¡¥¡¤¨¦€¡ë?????¡§????¦Ì?¨¨¡ì???¡§?¡¯??¡°?????3????');
			}
			if(suggestionType === ''){
				showDialogMsg(jQuery('.site-dialog-feedback-suggestionType-msgTip'),'¨¨¡¥¡¤¨¦€¡ë?????¡§??????¨¨¡ì??¡À????');
			}
			if(suggestionCont === ''){
				showDialogMsg(jQuery('.site-dialog-feedback-suggestionCont-msgTip'),'¨¨¡¥¡¤????????¡§??????¨¦|????¨¨¡ì?');
			} 
		} else {
			var sendData = {'type':'feedback',
							'name':name, 
							'email':email, 
							'browser':browser, 
							'os':os,
							'suggestionType':suggestionType,
							'suggestionCont':suggestionCont};
			jQuery.ajax({
				type: "POST",
				dataType: "json",
				url: "/ajaxFeedback.php",
				data: sendData,
				success: function(respData){
					if(respData.status){
						if(respData.status === 'ok'){
							showDialogMsg(jQueryajaxMsgTip,'????o¡è????????????¨¨¡ã¡é??¡§??????¨¦|?');
							window.setTimeout(closeDialog,3000);
						}
					} else {
						showDialogMsg(jQueryajaxMsgTip,'????????¡§?¡°??o¡±¨¦¡±?¨¨¡¥¡¥???¨¨¡¥¡¤??¡¤?¨C¡ã???¨¦???¨C¡ã?3¡§???');
					}
				},
				error: function(xhr,status){
					showDialogMsg(jQueryajaxMsgTip,'Sorry, '+status);
				}
			});
		}
	});
}
function forgetPWDialog(){
	var jQueryajaxMsgTip = jQuery('.site-dialog-forgetPW-email-msgTip');
	jQuery('.site-dialog-forgetPW-btnSend').click(function(){
		var email = jQuery.trim(jQuery('#site-dialog-forgetPW-email').val());
		if(email===''){
			showDialogMsg(jQueryajaxMsgTip,'¨¨¡¥¡¤????????¡§????3¡§???¨¦????¡À');
		} else {
			var sendData = {'type':'forgetpwd','email':email};
			jQuery.ajax({
				type: "POST",
				dataType: "json",
				url: "/ajaxUser.php",
				data: sendData,
				success: function(respData){
					if(respData.status){
						if(respData.status === 'error_5'){
							showDialogMsg(jQueryajaxMsgTip,'?-¡è¨¦????¡À?¡ã???a?3¡§???');
						} else if(respData.status === 'ok'){
							showDialogMsg(jQueryajaxMsgTip,'?¡¥?? ?¨¦?????¨¦??????¡¤2??¡®¨¦€????¨¨¡¥¡¤??????¨¦????¡À??£¤?¡±?');
							window.setTimeout(closeDialog,3000);
						}
					} else {
						showDialogMsg(jQueryajaxMsgTip,'????????¡§?¡°??o¡±¨¦¡±?¨¨¡¥¡¥???¨¨¡¥¡¤??¡¤?¨C¡ã???¨¦???¨C¡ã??¡®¨¦€?');
					}
				},
				error: function(xhr,status){
					showDialogMsg(jQueryajaxMsgTip,'Sorry, '+status);
				}
			});
		}
	});
}

function videoDialog(url,posterurl){
	var u = navigator.userAgent;
	if(u.indexOf('iPhone') > -1 ||u.indexOf('iPad') > -1 ){
		location.href=url+'.mp4';
		return;
	}

	var vW = 852,vH = 480;
	var winW = jQuery(window).width();
	if(winW <= 860){
		vW = 620;
		vH = 348;
	}
	if(winW <= 640){
		vW = 460;
		vH = 258;
	}
	if(winW <= 480){
		vW = 340;
		vH = 190;
	}
	if(winW <= 360){
		vW = 300;
		vH = 167;
	}
	var browser='html5';
	if(navigator.userAgent.indexOf('rv:11.0') != -1||jQuery.browser.safari||jQuery.browser.msie) {  
        browser='ie';  
   	}
   	if(Modernizr.touch){
   		browser='html5';
   	}	
   	var isWindowsPhone = /windows phone/i.test(navigator.userAgent.toLowerCase());
   	if(isWindowsPhone){
   		browser='html5';
   	}

   	var isSurface = /arm/i.test(navigator.userAgent.toLowerCase());
   	if(isSurface){
   		browser='html5';
   	}
   	var videohtmlstr='';
	if(browser=='ie'){
		videohtmlstr+='<object name="popplayer" width="'+vW+'" height="'+vH+'" id="popplayer" data="http://australia-video.oss.aliyuncs.com/swf/flowplayer-3.2.16.swf" type="application/x-shockwave-flash">';
        videohtmlstr+='<param name="flashvars" value=\'config={"clip":{"url":"'+url+'.flv"},"playerId":"popplayer","playlist":[{"url":"'+url+'.flv","autoPlay": true}]}\'>';
        videohtmlstr+='<param name="movie" value="http://australia-video.oss.aliyuncs.com/swf/flowplayer-3.2.16.swf">';
        videohtmlstr+='<param name="allowscriptaccess" value="always">';
        videohtmlstr+='<param name="allowfullscreen" value="true">';
        videohtmlstr+='<param name="wmode" value="transparent">';
        videohtmlstr+='<param name="bgcolor" value="#000">';
        videohtmlstr+='</object>';
	}else{
		videohtmlstr+='<video id="popplayer" controls="controls" width="'+vW+'" height="'+vH+'" poster="'+posterurl+'" controls autoplay style="background-color:#000;">';
		videohtmlstr+='<source src="'+url+'.mp4" type="video/mp4"  />';
		videohtmlstr+='<source src="'+url+'.webm" type="video/webm" />';
		videohtmlstr+='<source src="'+url+'.ogv" type="video/ogg" codecs="theora, vorbis" />';
		videohtmlstr+='</video>';
	}
    jQuery('.site-dialog-videoCont').html(videohtmlstr);
	openDialog(jQuery('.siteDialog-playVideo'));
	jQuery(window).on('resize',resizeVideo);
}

function resizeVideo(){
	var $videoContainer = jQuery('.siteDialog-playVideo');
	var $popplayer = jQuery('#popplayer');
	$popplayer.width($videoContainer.width()).height($videoContainer.height());
}

function videohtml(url,pic){ 
	var videohtmlstr='';
	var vW = 880,vH = 496;
	var winW = jQuery(window).width();
	if(winW <= 860){
		vW = 620;
		vH = 348;
	}
	if(winW <= 640){
		vW = 460;
		vH = 258;
	}
	if(winW <= 480){
		vW = 340;
		vH = 190;
	}
	if(winW <= 360){
		vW = 300;
		vH = 167;
	}
	var browser='html5';
	if(navigator.userAgent.indexOf('rv:11.0') != -1||jQuery.browser.safari||jQuery.browser.msie) {  
        var browser='ie';  
   	}
   	if(Modernizr.touch){
   		browser='html5';
   	}
   	var isWindowsPhone = /windows phone/i.test(navigator.userAgent.toLowerCase());
   	if(isWindowsPhone){
   		browser='html5';
   	}

   	var isSurface = /arm/i.test(navigator.userAgent.toLowerCase());
   	if(isSurface){
   		browser='html5';
   	}
	if(browser=='ie'){
		videohtmlstr+='<div class="videolist-topVideo">';
		videohtmlstr+='<object name="player" width="'+vW+'" height="'+vH+'" id="player" data="http://australia-video.oss.aliyuncs.com/swf/flowplayer-3.2.16.swf" type="application/x-shockwave-flash" >';
        videohtmlstr+='<param name="flashvars" value=\'config={"clip":{"url":"'+url+'.flv"},"playerId":"player","playlist":[{"url":"'+pic+'.jpg","scaling": "orig"},{"url":"'+url+'.flv","autoPlay": false}]}\'>';
        videohtmlstr+='<param name="movie" value="http://australia-video.oss.aliyuncs.com/swf/flowplayer-3.2.16.swf">';
        videohtmlstr+='<param name="allowscriptaccess" value="always">';
        videohtmlstr+='<param name="allowfullscreen" value="true">';
        videohtmlstr+='<param name="wmode" value="transparent">';
        videohtmlstr+='</object></div>';
	}else{
		videohtmlstr+='<div class="videolist-topVideo" onclick="jQuery(\'#player\').attr(\'controls\',\'controls\');ga(\'send\',\'event\',\'RAvideo\',\'play\');_hmt.push([\'_trackEvent\', \'RAvideo\', \'play\']);">';
		videohtmlstr+='<video id="player" controls="controls" width="'+vW+'" height="'+vH+'" poster="'+pic+'1.jpg" style="background-color:#000; cursor:pointer;">';
		videohtmlstr+='<source src="'+url+'.mp4" type="video/mp4"  />';
		videohtmlstr+='<source src="'+url+'.webm" type="video/webm" />';
		videohtmlstr+='<source src="'+url+'.ogv" type="video/ogg" codecs="theora, vorbis" />';
		videohtmlstr+='</video>';
		videohtmlstr+='</div>';
	}
	document.write(videohtmlstr);
	/*Media = document.getElementById("player"); 
	Media.addEventListener("play", function () {
		ga('send','event','RAvideo','play');
 		_hmt.push(['_trackEvent', 'RAvideo', 'play']);            
	}, false)
	
	Media.addEventListener("pause", function () {
		ga('send','event','RAvideo','pause');
 		_hmt.push(['_trackEvent', 'RAvideo', 'pause']);            
	}, false)*/
}

var playerAutoWidth = function(){
	var player = jQuery("#player");
	var cankao= jQuery('.videolist-classify-wrap').find('ul').width();
	var nowh=cankao*496/880;
	var noww=nowh*880/496;
	player.css('width',noww+'px' );
	player.css('height',nowh+'px');
	//player.style.cssText="width:"+noww+"px;height:"+nowh+"px;";
};
if(jQuery('#player')){
	jQuery(window).resize(function(){playerAutoWidth();setTimeout('playerAutoWidth()',2000);});
}

var frameAutoWidth = function(){
	var player = jQuery("#videoframe");
	var cankao= jQuery('.videoframe').width();
	var nowh=cankao*489/772;
	var noww=nowh*772/489;
	player.css('width',noww+'px' );
	player.css('height',nowh+'px');
	player.attr('width',noww);
	player.attr('height',nowh);
	//player.style.cssText="width:"+noww+"px;height:"+nowh+"px;";
};
if(jQuery('#videoframe')){
	jQuery(window).resize(function(){frameAutoWidth();setTimeout('frameAutoWidth()',1000);});
}

function viewMap(lat,lng,text){
	var map;
	var mapDiv = document.getElementById('MapView');
      map = new google.maps.Map(mapDiv, {
        center: new google.maps.LatLng(lat,lng),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat,lng),
        map: map,
        title:''
    });

    var contentString =text;
    
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    google.maps.event.addListener(marker,'click',function(){
      infowindow.open(map,marker);
    });

    openDialog(jQuery('.siteDialog-showMap'));
    google.maps.event.trigger(map, "resize");
    map.setCenter(new google.maps.LatLng(lat,lng));
}

function initDialog(){
	jQuery('#site-btn-login,#mob_site-btn-login').click(function(){
		openDialog(jQuery('.siteDialog-login'));
	});
	jQuery('#site-btn-register,#mob_site-btn-register').click(function(){
		openDialog(jQuery('.siteDialog-register'));
	});
	jQuery('#site-link-feedback').click(function(){
		openDialog(jQuery('.siteDialog-feedback'));
	});
	jQuery('#site-dialog-login-link-forgetPW').click(function(){
		switchDialog(jQuery('.siteDialog-login'), jQuery('.siteDialog-forgetPW'));
	});
	jQuery('#site-dialog-login-link-registerNow').click(function(){
		switchDialog(jQuery('.siteDialog-login'), jQuery('.siteDialog-register'));
	});
	jQuery('#site-dialog-register-link-loginNow').click(function(){
		switchDialog(jQuery('.siteDialog-register'), jQuery('.siteDialog-login'));
	});
	jQuery('.site-dialog-registerSuccess-btnOk').click(function(){
		closeDialog();
	});
	jQuery('.siteSearch-searchResult-list-item-pic-btnShowMap,.seekTravelInfo-searchResult-list-item-pic-btnShowMap').click(function(){
		//openDialog(jQuery('.siteDialog-showMap'));
		var text=jQuery(this).find('span').attr('data-text');
		var lat=jQuery(this).find('span').attr('data-lat');
		var lng=jQuery(this).find('span').attr('data-lng');
		viewMap(lat,lng,text);
	});

	jQuery('.site-dialog-cont select').change(function () {
	    if(jQuery(this).val() === "") jQuery(this).addClass("selectOptionPlaceholder");
	    else jQuery(this).removeClass("selectOptionPlaceholder");
	});
	var jQuerydialogs =  jQuery('.site-dialog');
	var jQueryinputs = jQuerydialogs.find('.site-dialog-inputBox');
	var jQuerydialogClose = jQuerydialogs.find('.site-dialog-close');
	jQueryinputs.focus(function(){
		jQuery(this).parent('p').next('.site-dialog-messageTip:visible').hide(200);
	});
	jQuerydialogClose.click(function(){
		closeDialog();
	});
	loginDialog();
	registerDialog();
	feedbackDialog();
	forgetPWDialog();
}
jQuery(function(){
	navHover();
	siderClick();
	subNavSearch();
	switchWeather(10000);
	initDialog();
	jQuery(document).keyup(function(e){
		var code = e.keyCode ? e.keyCode : e.which;
		if(code==27){
			closeDialog();
		}   
	});
	
	/*for mobile interaction*/
	var isWindowsPhone = /windows phone/i.test(navigator.userAgent.toLowerCase());
	isWindowsPhone && jQuery('html').addClass('wp-ie10');
	mob_navTouch();
	if(Modernizr.touch || isWindowsPhone){
		jQuery('html').removeClass('no-touch');
		switchHeader();
		navTouch();
		gridImgTouch();
		gridAoShiTouch();
	}
	if(!Modernizr.input.placeholder){
		jQuery('html').addClass('no-placeholder');
	}
	
});

/*for mobile interaction*/
function mob_navTouch(){
	var $mob_menuBtn = jQuery('.mob_nav-menu');
	var $mob_loginBtn = jQuery('.mob_nav-login');
	var $mob_nav = jQuery('.mob_nav-ul');
	var $mob_user = jQuery('.mob_user-ul');
	var $mob_search = jQuery('.mob_nav-search-wrap');
	var $mob_weather =jQuery('.site-weather');
	
	$mob_menuBtn.on('click touchstart',function(event){
		event.stopPropagation();
		if($mob_loginBtn.hasClass('mob_nav-login_active')){
			$mob_loginBtn.triggerHandler('click');
		}
		$mob_nav.toggleClass('mob_nav-ul_show');
		$mob_search.toggleClass('mob_nav-search-wrap_show');
		$mob_weather.toggleClass('site-weather_hide');
		jQuery(this).toggleClass('mob_nav-menu_active');
		return false;
	});
	$mob_loginBtn.on('click touchstart',function(event){
		event.stopPropagation();
		if($mob_menuBtn.hasClass('mob_nav-menu_active')){
			$mob_menuBtn.triggerHandler('click');
		}
		$mob_user.toggleClass('mob_user-ul_show');
		jQuery(this).toggleClass('mob_nav-login_active');
		return false;
	});
	jQuery('.mob_nav-search-btn').on('touchstart touchend',function(){
		jQuery(this).toggleClass('mob_nav-search-btn_active');
	});
}

function switchHeader(){
	var $siteTop = jQuery('.site-top');
	var $mob_nav = jQuery('.mob_nav-ul');
	jQuery(window).on('scroll',function(){
		var $this = jQuery(this);
		if($this.width()<=640 && $this.height()>$this.width()){ //??¨C?¡À?
			if($this.scrollTop()>=70){
				$siteTop.height(50).css({
					'position':'fixed',
					'top':'-70px'
				});
			}else{
				$siteTop.height(120).css({
					'position':'static',
					'top':'0'
				});
			}
		}
	}).on('resize',function(){
		var $this = jQuery(this);
		var winW = $this.width();
		var winH = $this.height();
		if(winW>winH && winH<480){ //?¡§a?¡À?
			$siteTop.height(120).css({
				'position':'static',
				'top':'0'
			});
		}else if(winH>winW){ //??¨C?¡À?
			if($this.scrollTop()>=70){
				$siteTop.height(50).css({
					'position':'fixed',
					'top':'-70px'
				});
			}
		}
		if($this.width()>640 && $this.height()>480){ //?¡§a?¡À?
			$siteTop.height(120).css({
				'position':'fixed',
				'top':'0'
			});
		}else if($this.scrollTop()>=70 && $this.height()>$this.width()){
			$siteTop.height(50).css({
				'position':'fixed',
				'top':'-70px'
			});
		}
	}).triggerHandler('resize');/*.on('orientationchange', function(){
		var $this = $(this);
		var winW = $this.width();
		var winH = $this.height();
		if(winW>winH && winH<480){ //?¡§a?¡À?
			$siteTop.height(120).css({
				'position':'static',
				'top':'0'
			});
		}else if(winH>winW){ //??¨C?¡À?
			if($this.scrollTop()>=70){
				$siteTop.height(50).css({
					'position':'fixed',
					'top':'-70px'
				});
			}
		}
		return false;
	})*/
}

function navTouch(){
	jQuery('.nav-a').on('click',function(){
		if(jQuery.trim(jQuery(this).attr('class')).indexOf('home')<0){
			return false;
		}
	});
}
function gridImgTouch(){
	!jQuery('.gridNoEvent').length && jQuery('.cityitem-name_1').on('touchstart mousedown',function(event){
		event.stopPropagation(); 
		jQuery(this).toggleClass('cityitem-name-show');
		return false;
	});
	jQuery('.cityitem-name_1_butt').on('touchstart mousedown',function(e){e.stopPropagation()});
}
function gridAoShiTouch() { 
	jQuery('.testb').on('touchstart mousedown',function(event){
		event.stopPropagation(); 
		jQuery(this).toggleClass('schedul-name-show');
		return false;
	});
}