$(document).ready(function(){loadImage($("#id_url").val()+"?_="+Math.random(),function(d,b){var c=$(this).data("size",{width:d,height:b});a(c)},function(){$("#id_noimgbaojing").show();$("#id_baojing").click(function(){$("#id_unusualID").val("5");$("#id_frm_score_monitor").submit();return false});$("#id_waitDiv").hide()});function a(Y){var V=!$.support.opacity&&!$.support.style&&window.XMLHttpRequest==undefined;if(V){document.execCommand("BackgroundImageCache",false,true)}var I=$("#id_waitDiv").hide();var i=$("#id_getDiv").prepend(Y);var z=($("#id_judgeFlag").length==0)?false:true;var x=$("#id_tool");var B=$("#id_bar");var l=$("#id_dragTag");var j=$("#id_rememberSize");var U=parseInt(j.val());var n=0;var v=$("#id_screen_plus");var g=$("#id_sign_url");var m=g.val();var O=$.trim(g.attr("alt"));var P=$("div.protect");var H=$("#id_isMarkTest").length;var q=$("#id_mark");var W=0;var h=180;var Q=$("#id_markingType");var e=Q.val();var J=$.trim(Q.attr("title"));var N=$.trim(Q.attr("alt"));var A=N.split(",");var t=$("#id_markInfo");var F=$("#id_score");var k=$("#id_scoreDiv");var G=$("#id_frm_score");var M=$("#id_overlay");var C;var r=$("#id_saveSubmit");if(e==1){C=$("#id_submitWait span")}else{C=$("#id_submitWait2")}var w=0;var R=$(window);var S=R.width();var c=R.height();var s=34;var X=41;var b;var d=Y.data("size");var y={subjectTimeFlag:$("#id_timeFlag").length==0?0:parseInt($("#id_timeFlag").val()),curTime:$("#id_time").length==0?0:parseInt($("#id_time").val()),timeFlag:false,counter:null,toast:$(".timeToast"),toastTimer:null,startCount:function(){var Z=this;Z.timeFlag=false;Z.counter=setTimeout(function(){Z.timeFlag=true},Z.curTime*1000)},check:function(aa){var Z=this;if(Z.subjectTimeFlag==0){return true}if(aa==0){return true}clearTimeout(Z.toastTimer);Z.toast.hide();if(Z.timeFlag){return true}else{Z.toast.show();Z.toastTimer=setTimeout(function(){Z.toast.hide()},3000);return false}}};var L=$("#id_plus_minus_info");if(y.subjectTimeFlag==1){y.startCount()}p();f();D();doLocal();function p(){if(e==1){W=(q.attr("title")=="")?262:372}else{W=132}n=parseInt((S-B.outerWidth()-W-30)/d.width*100);n=n>200?200:n;v.val(n);U=U||n;L.find("li[value='"+U+"']").addClass("foldCur");$("input[name='rememberSize']").val(U);if(V){Y.css({width:0,height:0})}b=z?u(U):E(U,true);i.resizable({minWidth:100,aspectRatio:true,helper:"ui-resizable-helper",start:function(){if(V){Y.width(0).height(0)}},stop:function(Z,aa){var ab=i.width()/d.width*100;$("input[name='rememberSize']").val(ab);L.find(".foldCur").removeClass("foldCur");if(!z){E(ab,false)}else{u(ab)}}})}function f(){if(e==1){if(A.length!=4){var af=b.h+s+X,ae=b.w-W;if(af+h>=c){af=(c-h)/2+X;ae=b.w}if(b.w+W>S){ae=S-W-5}A[0]=af;A[1]=ae;A[2]="";A[3]=""}q.css({top:A[0]+"px",left:A[1]+"px",width:W+"px"});k.show();F.focus().select();setTimeout(function(){R.scrollTop(0)},10);aa()}else{if(A.length!=4){var ae=b.w;if(b.w+W>S){ae=S-W-5}A[0]=s+X;A[1]=ae;A[2]=W;A[3]=""}q.css({top:A[0]+"px",left:A[1]+"px",width:A[2],height:A[3],cursor:"move"}).resizable({maxHeight:800,minHeight:45,maxWidth:1200,minWidth:72,helper:"ui-resizable-helper",stop:function(ag,ah){A[2]=ah.size.width;A[3]=ah.size.height;$("input[name='position']").val(A.join(","))}}).find(".scoreitem").click(function(){var ag=$(this).attr("title");if(y.check(ag)){if(isNaN(ag)){$("#id_frm_score_monitor").attr("action",ag+"!goOver.shtml").submit()}else{if(V){q.hide()}M.add(C).show();F.val(ag);if(!z){$("#id_tags").val(i.data("imgTag").getOriginalTags())}if(O!=""){ac()}else{G.submit()}}}return false}).hover(function(){$(this).find("span").addClass("scoreover")},function(){$(this).find("span").removeClass("scoreover")});k.show()}$("input[name='position']").val(A.join(","));q.draggable({addClasses:false,handle:"#id_submitWait",cursor:"move",stop:function(ak,al){A[0]=al.position.top;A[1]=al.position.left;var am=A[0];var aj=Math.floor(d.height*j.val()/100);var ah=aj+s+X;ah+=41;if(A[0]>=ah){am=ah}else{var ai=q.height();var an=R.scrollTop();var ag=am-an;if(ag+ai>c){am=c+an-ai}}if(A[0]!=am){A[0]=am;q.css("top",am+"px")}$("input[name='position']").val(am+","+A[1]+","+A[2]+","+A[3]);w=x.offset().top}});$("#id_scoretool").find("a").click(function(){$(this).parents(".foldContent").hide();w=x.offset().top;var ag=j.val()/100;var ah=Math.floor(d.width*ag);var ai=Math.floor(d.height*ag);var aj=parseInt(i.css("margin-left"));ah+=aj;if($(this).attr("title")=="right"){var ak=s+X;var al=R.scrollTop();if(al>0){al-=s}ak+=al;if(e==1){q.css({top:ak+"px",left:ah+"px"})}else{q.css({top:ak+"px",left:ah+"px",width:W+"px",height:""});A[2]=W;A[3]=""}A[0]=ak;A[1]=ah;$("input[name='position']").val((A[0]-al)+","+A[1]+","+A[2]+","+A[3])}else{var ak=ai+s+X;if(e==1){q.css({top:ak+"px",left:(ah-W)+"px"});A[1]=ah-W}else{q.css({top:ak+"px",left:0,width:ah+"px",height:""});A[1]=0;A[2]=ah;A[3]=""}A[0]=ak;$("input[name='position']").val(A.join(","))}});if(J!=""){$(":radio[value="+e+"]").attr("checked",true);$("#id_marktypetool").show();$(":radio[name='markingType']").click(function(){var ag=$(this).val();if(ag!=e){var ah=$("#id_frm_score_monitor");$("input[name='markingType']",ah).val(ag);$("input[name='position']",ah).val("");ah.attr("action",ah.attr("action").split("!")[0]+"!chgMarkType.shtml").submit()}})}function aa(){$("#id_markBtn").click(function(am){var an=$(am.target);if(an.is("input")){F.focus();var ak=F.val(),ah="";if(document.selection){var ai=document.selection.createRange();if(ai.text!=""){ak="";document.selection.clear()}}else{var aj=F[0];if(aj.selectionStart||aj.selectionStart=="0"){var ag=aj.selectionStart;var al=aj.selectionEnd;var ai=ak.substring(ag,al);if(ai!=""){ak=""}}}var ao=an.val();if(ao=="."){ah=ak+"."}else{if(!isNaN(ao)){if(ak=="0"||ak==""){ah=ao}else{ah=ak+ao}}else{if(ao=="退格"){ah=ak.substr(0,ak.length-1)}else{ah=F.attr("alt")}}}F.val(ah)}return false}).find(".fullmark").val("满 分 （"+F.attr("alt")+"分）");$(document).keypress(function(ah){if(ah.keyCode==13){var ag=$(ah.target);if(ag.attr("id")=="id_word"){ag.nextAll(":button").trigger("click")}else{if(!r.attr("disabled")){Z()}}return false}});$("#id_saveSubmit").removeClass("btnSave_invaid").addClass("btnSave").hover(function(){$(this).toggleClass("btnSaveOver")}).click(function(){Z()})}function Z(){if(ab()){if(y.check($.trim(F.val()))){if(V){q.hide()}M.add(C).show();r.attr("disabled",true).addClass("btnSave_invaid");if(!z){$("#id_tags").val(i.data("imgTag").getOriginalTags())}if(O!=""){ac()}else{G.submit()}}}}function ac(){var ag=G.serialize();window.setTimeout(ah,100);function ah(){$.ajax({async:false,url:m+"!ajaxSubmit.shtml",data:ag,dataType:"json",type:"POST",success:function(ai){C.html("提交成功");i.hide();I.show();if(ai.studentID!=0){imgUrl=O+ai.url+"?_="+Math.random();loadImage(imgUrl,function(al,ak){if(y.subjectTimeFlag==1){clearTimeout(y.counter);y.startCount()}var aj=Y;Y=$(this).data("size",{width:al,height:ak});aj.replaceWith(Y);if(d.width!=Y.data("size").width){d=Y.data("size")}i.show().data("imgTag").clearTags();I.hide();$("#id_tags").val("");var am=$("input[name='rememberSize']").val();if(!z){E(am,false)}else{u(am)}$("input[name='studentID']").val(ai.studentID);if(ai.doneNumber==1){$("#id_backMark").show()}if(H==0){$("input[name='markTeacherType']").val(ai.markTeacherType);if(ai.signTypeID==0){$("#id_signed").hide();$("#id_signing").show()}else{$("#id_signing").hide();var an=$("#id_sign").find("li[value='"+ai.signTypeID+"']").text();$("#id_signed").show().find(".signed").html(an)}if(ai.unusualID==0){$("#id_monitored").hide();$("#id_monitor").show()}else{var an=$("#id_monitorInfo").find("li[value='"+ai.unusualID+"']").text();if(ai.unusualState!=0){$("#id_monitored").hide();$("#id_monitor").show().find("span").eq(0).html("已处理："+an)}else{$("#id_monitor").hide();$("#id_monitored").show().find(".ft-gray").html(an).click(function(){jAlert("当前报警尚未处理，不能再报警了，请耐心等待下！","温馨提示")})}}}$(".scoreDone",t).text(ai.doneNumber);$(".scoreAvg",t).text(ai.average);setTimeout(function(){if(V){q.show()}M.add(C).hide();if(e==1){F.val("").focus();r.attr("disabled",false).removeClass("btnSave_invaid")}setTimeout(function(){R.scrollTop(0)},10)},10)},function(){window.location.reload()})}else{if(H==0){window.location.href=m+".shtml?questionID="+$("#id_questionID").val()+"&optionIndex="+$("input[name='optionIndex']").val()+"&flag3="+$("#id_flag3").val()}else{window.location.href=m+".shtml?questionID="+$("#id_questionID").val()+"&optionIndex="+$("input[name='optionIndex']").val()}}},error:function(ai,aj){if(ai.responseText!=undefined&&ai.responseText.indexOf("error-sessionexpired")!=-1){jAlert("对不起，提交失败，您的账号超时失效或被其他人登录，自动退出","温馨提示",function(){window.location.reload()})}else{jAlert("对不起，提交异常，请点击确定后重新批阅","温馨提示",function(){window.location.reload()})}}})}C.html("正在提交")}function ab(){var ah=/^(([1-9][0-9]*)|0)(\.[0-9]{1,2})?$/;var ag=true;var aj=$.trim(F.val());var ai=F.attr("alt");if(aj==""){ag=false;jAlert("对不起，请您输入分数","温馨提示",function(){F.focus();return false})}else{if(!ah.test(aj)){ag=false;jAlert("对不起，分数只能为正整数或0，一或两位正小数","温馨提示",function(){F.select();return false})}else{if(parseFloat(aj)>parseFloat(ai)){ag=false;jAlert("对不起，分数不能大于该题满分："+ai+"分","温馨提示",function(){F.select();return false})}else{if(J!=""){var al=",",ak=al+J+al;if(ak.indexOf(al+aj+al)==-1){ag=false;jAlert("对不起，请给出合理分值，给分点："+J,"温馨提示",function(){F.select();return false})}}}}}return ag}x.show();w=x.offset().top;R.scroll(function(){setTimeout(function(){ad($(this).scrollTop())},100)}).resize(function(){ad($(this).scrollTop())});function ad(aj){if(V){if(aj>X){x.css({position:"absolute",top:aj+"px"})}else{x.css({position:"relative",top:"0"})}}else{if(aj>X){x.css({position:"fixed",top:"0"})}else{x.css({position:"relative",top:"0"})}}var ah=parseInt(A[0]);var ai=Math.floor(Y.data("size").height*j.val()/100);if(ah<ai+s){var ag=x.offset().top-w;q.css({top:(ah+ag)+"px"})}else{q.css({top:(ah-X)+"px"})}}}function E(Z,aa){var ab=aa?i.find("input[name='loadTagData']").val():"";i.imgtag({loadData:ab,bili:Z/100,addScoreAction:T});return u(Z)}function T(aa){if(e==1){if(aa<0){var Z=parseFloat(F.attr("alt"));aa+=Z}F.val(aa)}}function u(Z){var ac=Y.data("size");var ab=ac.width,aa=ac.height;var ad=Math.floor(ab*Z/100),ae=Math.floor(aa*Z/100);Y.add(i).css({width:ad+"px",height:ae+"px"});if(V){P.css({height:ae+"px"})}return{w:ad,h:ae}}function D(){$("div.fold").click(function(){$(this).children("ul").toggle()});$("#id_scoreControl").click(function(){$(this).next(".foldContent").toggle()});if(V){P.css({height:b.curHeight})}var ab=$.cookie("color");if(ab!=null&&ab!=""&&ab!="rgb(255, 255, 255)"&&ab!="#ffffff"){P.show().data("color",ab).add("#id_nowcolor").css("background-color",ab)}$("#id_morecolor").click(function(){$(this).next(".foldContent").toggle("fast",function(){var ah=P.data("color");if($(this).is(":hidden")){if(ah){P.css("background-color",ah)}else{P.css("background-color","transparent").hide()}}else{if(!ah){P.show()}}})});$("span.colorBlock").not("#id_nowcolor").click(function(){P.css("background-color",$(this).attr("title"))});$("#id_colorClose").click(function(){$("#id_colorSelect").hide();var ah=P.css("background-color");if(ah!="rgba(0, 0, 0, 0)"&&ah!="transparent"){P.data("color",ah);$("#id_nowcolor").css("background-color",ah);$.cookie("color",ah,{expires:7,domain:document.domain,path:$("#id_cookiePath").val()})}else{P.removeData("color").hide();$("#id_nowcolor").css("background-color","#FFFFFF");$.cookie("color","",{expires:-1,domain:document.domain,path:$("#id_cookiePath").val()})}});$("#id_sign li").click(function(){var ah=$(this);if(H>0){jAlert("该操作会将此试卷标记为<font class='ft-red'>"+$.trim(ah.text())+"</font>,标记后可在复查功能中查看\r\n（试评时不保存标记）","温馨提示");$("#id_sign").hide()}else{jConfirm("确认标记<font class='ft-red'>"+$.trim(ah.text())+"</font>吗？","温馨提示",function(ai){if(ai){$.ajax({url:m+"!setGood.shtml",data:"studentID="+$("#id_studentID").val()+"&questionID="+$("#id_questionID").val()+"&signTypeID="+ah.attr("value"),success:function(aj){if(aj=="yes"){$("#id_sign").hide();$("#id_signing").hide();$("#id_signed").show().find(".signed").html(ah.text())}},error:function(){jAlert("服务器没有返回数据，可能服务器忙，请重试","温馨提示")}})}else{$("#id_sign").hide()}})}return false}).hover(function(){$(this).addClass("foldactive")},function(){$(this).removeClass("foldactive")});$("#id_signed").click(function(){jConfirm("确认取消标记吗？","温馨提示",function(ah){if(ah){$.ajax({url:m+"!cancelSign.shtml",data:"studentID="+$("#id_studentID").val()+"&questionID="+$("#id_questionID").val(),success:function(ai){if(ai=="yes"){$("#id_signed").hide();$("#id_signing").show()}},error:function(){jAlert("服务器没有返回数据，可能服务器忙，请重试","温馨提示")}})}else{$("#id_sign").hide()}})});if(!z){var ag=$("#id_unusualID").val();var aa=$("#id_unusualState").val();if(ag=="0"){$("#id_monitor").show()}else{var af=$("#id_monitorInfo").find("li[value='"+ag+"']").text();if(aa!=0){$("#id_monitor").show().find("span").eq(0).html("已处理："+af)}else{$("#id_monitored").show().find(".ft-gray").html(af).click(function(){jAlert("当前报警尚未处理，不能再报警了，请耐心等待下！","温馨提示")})}}$("#id_monitorInfo li").click(function(){var ai=$(this);if(H>0){jAlert("该操作在<font class='ft-red'>"+$.trim(ai.text())+"</font>时使用,报警后由相关人员进行处理\r\n（试评时不保存报警数据）","温馨提示");$("#id_monitorInfo").hide()}else{var ak="",ah=ai.attr("id").split("_")[1],aj=ai.attr("value");if(ah==1){ak="该操作将锁定当前这道试题，其他教师将无法继续批阅这道题，是否确认此操作？"}else{if(ah==2){ak="该操作将锁定整张试卷，其他教师将无法继续批阅这张试卷，是否确认此操作？"}else{if(ah==3){ak="该操作不锁定试题或试卷，您需要继续给分，是否确认此操作？"}}}var al="当前报警类型是："+ai.text()+"，"+ak;jConfirm(al,"温馨提示",function(am){if(am){if(ah==3){$.ajax({async:false,url:m+"!goWarningAjax.shtml",data:"studentID="+$("#id_studentID").val()+"&questionID="+$("#id_questionID").val()+"&unusualID="+aj,success:function(an){if(an=="yes"){$("#id_monitorInfo").hide();$("#id_monitor").hide();$("#id_monitored").show().find(".ft-gray").html(ai.text()).click(function(){jAlert("当前报警尚未处理，不能再报警了，请耐心等待下！","温馨提示")})}},error:function(){jAlert("服务器没有返回数据，可能服务器忙，请重试","温馨提示")}})}else{$("#id_unusualID").val(aj);$("#id_frm_score_monitor").submit()}}else{$("#id_monitorInfo").hide()}})}return false}).hover(function(){$(this).addClass("foldactive")},function(){$(this).removeClass("foldactive")});L.children().click(function(){var ai=$(this);ai.parent().hide();L.children().removeClass("foldCur");ai.addClass("foldCur");var ah=ai.attr("value");$("input[name='rememberSize']").val(ah);E(ah,false);return false}).hover(function(){$(this).addClass("foldactive")},function(){$(this).removeClass("foldactive")});o();var ad;var ac=$("#id_show_mark");var ae=$("#id_showTag");var Z=$("input[name='showTag']");if(ae.val()!=""){B.show();ac.text("隐藏批注栏");i.add(t).css({"margin-left":"77px"}).resizable("disable");Z.val("yes")}$("#id_note").click(function(){if(Z.val()==""){B.add(l).show();ad=setTimeout(function(){l.hide()},3000);ac.text("隐藏批注栏");i.add(t).css({"margin-left":"77px"}).resizable("disable");Z.val("yes")}else{B.add(l).hide();clearTimeout(ad);$("#bar_default").click();ac.text("显示批注栏");i.add(t).css({"margin-left":"4px"}).resizable("enable");Z.val("")}})}else{L.children().click(function(){var ai=$(this);ai.parent().hide();L.children().removeClass("foldCur");ai.addClass("foldCur");var ah=ai.attr("value");$("input[name='rememberSize']").val(ah);u(ah);return false}).hover(function(){$(this).addClass("foldactive")},function(){$(this).removeClass("foldactive")})}}function o(){var aa=$("#id_markType").val();var Z=$("#id_markScore").val();$.fn.imgtag.type=aa;$.fn.imgtag.score=Z;i.css({cursor:K(aa)});if(aa=="score"){B.find("li[title='"+Z+"']").addClass("baractive")}else{$("#bar_"+aa).addClass("baractive")}B.bind("click",function(ae){var ad=$(ae.target);if(ad.is("li")){var ac=ad.attr("id");if(ac=="bar_clear"){jConfirm("确定清除所有批注吗？","温馨提示",function(af){if(af){i.data("imgTag").clearTags()}})}else{var ab="";if(ac==""){ab="score";$.fn.imgtag.score=ad.attr("title");$("input[name='markScore']").val($.fn.imgtag.score)}else{ab=ac.split("_")[1]}$.fn.imgtag.type=ab;$("input[name='markType']").val(ab);i.css({cursor:K(ab)});B.find("li").removeClass("baractive");ad.addClass("baractive")}}return false}).find("li").not(".baractive").hover(function(){$(this).addClass("barhover")},function(){$(this).removeClass("barhover")})}function K(Z){var aa="pointer";if(Z=="box"||Z=="line"||Z=="wave"){aa="crosshair"}else{if(Z=="word"){aa="text"}else{if(Z=="default"){aa="default"}}}return aa}}});function loadImage(c,d,b){var a=new Image();a.src=c;if(a.complete){d&&d.call(a,a.width,a.height);return}a.onload=function(){d&&d.call(a,a.width,a.height)};a.onerror=function(){b&&b.call(a);a=a.onload=a.onerror=null}}jQuery.cookie=function(a,h,l){if(typeof h!="undefined"){l=l||{};if(h===null){h="";l.expires=-1}var d="";if(l.expires&&(typeof l.expires=="number"||l.expires.toUTCString)){var e;if(typeof l.expires=="number"){e=new Date();e.setTime(e.getTime()+(l.expires*24*60*60*1000))}else{e=l.expires}d="; expires="+e.toUTCString()}var k=l.path?"; path="+l.path:"";var f=l.domain?"; domain="+l.domain:"";document.cookie=[a,"=",encodeURIComponent(h),d,k,f].join("")}else{var c=null;if(document.cookie&&document.cookie!=""){var j=document.cookie.split(";");for(var g=0;g<j.length;g++){var b=jQuery.trim(j[g]);if(b.substring(0,a.length+1)==(a+"=")){c=decodeURIComponent(b.substring(a.length+1));break}}}return c}};