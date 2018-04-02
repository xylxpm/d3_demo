(function(V,x,b){var L={transition:"elastic",speed:300,width:false,initialWidth:"300",innerWidth:false,maxWidth:false,height:false,initialHeight:"100",innerHeight:false,maxHeight:false,scalePhotos:true,scrolling:true,inline:false,html:false,iframe:false,fastIframe:true,photo:false,href:false,title:false,rel:false,opacity:0.3,preloading:true,className:false,retinaImage:false,retinaUrl:false,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"\u4e0a\u4e00\u5f20",next:"\u4e0b\u4e00\u5f20",close:"\u5173\u95ed",xhrError:"\u5185\u5bb9\u52a0\u8f7d\u5931\u8d25.",imgError:"\u56fe\u7247\u52a0\u8f7d\u5931\u8d25.",open:false,returnFocus:true,reposition:true,loop:true,slideshow:false,slideshowAuto:true,slideshowSpeed:2500,slideshowStart:"\u5f00\u59cb",slideshowStop:"\u505c\u6b62",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico)((#|\?).*)?$/i,onOpen:false,onLoad:false,onComplete:false,onCleanup:false,onClosed:false,overlayClose:false,escKey:true,arrowKey:true,top:false,bottom:false,left:false,right:false,fixed:false,data:undefined,animateFlag:true},z="colorbox",d="cbox",j=d+"Element",H=d+"_open",D=d+"_load",C0=d+"_complete",G0=d+"_cleanup",k=d+"_closed",P=d+"_purge",i=!V.support.leadingWhitespace,R=i&&!b.XMLHttpRequest,K0=d+"_IE6",H0,Y,v,K,E,u,E0,A0,o,g,m,t,c,X,l,h,M,B,J0,F0,U=V("<a/>"),C,s,w,$0,D0,S,T,I0,J,e,L0,A,$,q="div",y,I=0,W;function a(A,$,B){var _=x.createElement(A);if($)_.id=d+$;if(B)_.style.cssText=B;return V(_)}function F(){return b.innerHeight?b.innerHeight:V(b).height()}function n($){var _=o.length,A=(T+$)%_;return(A<0)?_+A:A}function B0(_,$){return Math.round((/%/.test(_)?(($==="x"?g.width():F())/100):1)*parseInt(_,10))}function r($,_){return $.photo||$.photoRegex.test(_)}function N($,_){return $.retinaUrl&&b.devicePixelRatio>1?_.replace($.photoRegex,$.retinaSuffix):_}function Q($){if("contains"in Y[0]&&!Y[0].contains($.target)){$.stopPropagation();Y.focus()}}function _(){var _,$=V.data(S,z);if($==null){C=V.extend({},L);if(console&&console.log)console.log("Error: cboxElement missing settings object")}else C=V.extend({},$);for(_ in C)if(V.isFunction(C[_])&&_.slice(0,2)!=="on")C[_]=C[_].call(S);C.rel=C.rel||S.rel||V(S).data("rel")||"nofollow";C.href=C.href||V(S).attr("href")||V(S).attr("alt");C.title=C.title||S.title;if(typeof C.href==="string")C.href=V.trim(C.href)}function _0($,_){V(x).trigger($);U.trigger($);if(V.isFunction(_))_.call(S)}function O(){var B,H=d+"Slideshow_",G="click."+d,_,F,E,A;if(C.slideshow&&o[1]){_=function(){clearTimeout(B)};F=function(){if(C.loop||o[T+1])B=setTimeout($.next,C.slideshowSpeed)};E=function(){h.html(C.slideshowStop).unbind(G).one(G,A);U.bind(C0,F).bind(D,_).bind(G0,A);Y.removeClass(H+"off").addClass(H+"on")};A=function(){_();U.unbind(C0,F).unbind(D,_).unbind(G0,A);h.html(C.slideshowStart).unbind(G).one(G,function(){$.next();E()});Y.removeClass(H+"on").addClass(H+"off")};if(C.slideshowAuto)E();else A()}else Y.removeClass(H+"off "+H+"on")}function p(A){if(!L0){S=A;_();o=V(S);T=0;if(C.rel!=="nofollow"){o=V("."+j).filter(function(){var _=V.data(this,z),$;if(_)$=V(this).data("rel")||_.rel||this.rel;return($===C.rel)});T=o.index(S);if(T===-1){o=o.add(S);T=o.length-1}}H0.css({opacity:parseFloat(C.opacity),cursor:C.overlayClose?"pointer":"auto",visibility:"visible"}).show();if(y)Y.add(H0).removeClass(y);if(C.className)Y.add(H0).addClass(C.className);y=C.className;J0.html(C.close).show();if(!J){J=e=true;Y.css({visibility:"hidden",display:"block"});m=a(q,"LoadedContent","width:0; height:0; overflow:hidden").appendTo(K);s=E.height()+A0.height()+K.outerHeight(true)-K.height();w=u.width()+E0.width()+K.outerWidth(true)-K.width();$0=m.outerHeight(true);D0=m.outerWidth(true);C.w=B0(C.initialWidth,"x");C.h=B0(C.initialHeight,"y");$.position();if(R)g.bind("resize."+K0+" scroll."+K0,function(){H0.css({width:g.width(),height:F(),top:g.scrollTop(),left:g.scrollLeft()})}).trigger("resize."+K0);O();_0(H,C.onOpen);F0.add(X).hide();Y.focus();if(x.addEventListener){x.addEventListener("focus",Q,true);U.one(k,function(){x.removeEventListener("focus",Q,true)})}if(C.returnFocus)U.one(k,function(){V(S).focus()})}f()}}function G(){if(!Y&&x.body){W=false;g=V(b);Y=a(q).attr({id:z,"class":i?d+(R?"IE6":"IE"):"",role:"dialog",tabindex:"-1"}).hide();H0=a(q,"Overlay",R?"position:absolute":"").hide();c=a(q,"LoadingOverlay").add(a(q,"LoadingGraphic"));v=a(q,"Wrapper");K=a(q,"Content").append(X=a(q,"Title"),l=a(q,"Current"),B=a("button","Previous"),M=a("button","Next"),h=a("button","Slideshow"),c,J0=a("button","Close"));v.append(a(q).append(a(q,"TopLeft"),E=a(q,"TopCenter"),a(q,"TopRight")),a(q,false,"clear:left").append(u=a(q,"MiddleLeft"),K,E0=a(q,"MiddleRight")),a(q,false,"clear:left").append(a(q,"BottomLeft"),A0=a(q,"BottomCenter"),a(q,"BottomRight"))).find("div div").css({"float":"left"});t=a(q,false,"position:absolute; width:9999px; visibility:hidden; display:none");F0=M.add(B).add(l).add(h);V(x.body).append(H0,Y.append(v,t))}}function Z(){function _($){if(!($.which>1||$.shiftKey||$.altKey||$.metaKey||$.control)){$.preventDefault();p(this)}}if(Y){if(!W){W=true;M.click(function(){$.next()});B.click(function(){$.prev()});J0.click(function(){$.close()});H0.click(function(){if(C.overlayClose)$.close()});V(x).bind("keydown."+d,function(_){var A=_.keyCode;if(J&&C.escKey&&A===27){_.preventDefault();$.close()}if(J&&C.arrowKey&&o[1]&&!_.altKey)if(A===37){_.preventDefault();B.click()}else if(A===39){_.preventDefault();M.click()}});if(V.isFunction(V.fn.on))V(x).on("click."+d,"."+j,_);else V("."+j).live("click."+d,_)}return true}return false}if(V.colorbox)return;V(G);$=V.fn[z]=V[z]=function(A,_){var $=this;A=A||{};G();if(Z()){if(V.isFunction($)){$=V("<a/>");A.open=true}else if(!$[0])return $;if(_)A.onComplete=_;$.each(function(){V.data(this,z,V.extend({},V.data(this,z)||L,A))}).addClass(j);if((V.isFunction(A.open)&&A.open.call($))||A.open)p($[0])}return $};$.position=function(_,I){var J,L=0,G=0,H=Y.offset(),B,A;g.unbind("resize."+d);Y.css({top:-90000,left:-90000});B=g.scrollTop();A=g.scrollLeft();if(C.fixed&&!R){H.top-=B;H.left-=A;Y.css({position:"fixed"})}else{L=B;G=A;Y.css({position:"absolute"})}if(C.right!==false)G+=Math.max(g.width()-C.w-D0-w-B0(C.right,"x"),0);else if(C.left!==false)G+=B0(C.left,"x");else G+=Math.round(Math.max(g.width()-C.w-D0-w,0)/2);if(C.bottom!==false)L+=Math.max(F()-C.h-$0-s-B0(C.bottom,"y"),0);else if(C.top!==false)L+=B0(C.top,"y");else L+=Math.round(Math.max(F()-C.h-$0-s,0)/2);Y.css({top:H.top,left:H.left,visibility:"visible"});_=(Y.width()===C.w+D0&&Y.height()===C.h+$0)?0:_||0;v[0].style.width=v[0].style.height="9999px";function D($){E[0].style.width=A0[0].style.width=K[0].style.width=(parseInt($.style.width,10)-w)+"px";K[0].style.height=u[0].style.height=E0[0].style.height=(parseInt($.style.height,10)-s)+"px"}J={width:C.w+D0+w,height:C.h+$0+s,top:L,left:G};if(_===0)Y.css(J);if(R)C.animateFlag=false;if(C.animateFlag)Y.dequeue().animate(J,{duration:_,complete:function(){D(this);e=false;v[0].style.width=(C.w+D0+w)+"px";v[0].style.height=(C.h+$0+s)+"px";if(C.reposition)setTimeout(function(){g.bind("resize."+d,$.position)},1);if(I)I()},step:function(){D(this)}});else{Y.css(J);D(Y[0]);e=false;v[0].style.width=(C.w+D0+w)+"px";v[0].style.height=(C.h+$0+s)+"px";if(C.reposition)setTimeout(function(){g.bind("resize."+d,$.position)},1);if(I)I()}};$.resize=function(_){if(J){_=_||{};if(_.width)C.w=B0(_.width,"x")-D0-w;if(_.innerWidth)C.w=B0(_.innerWidth,"x");m.css({width:C.w});if(_.height)C.h=B0(_.height,"y")-$0-s;if(_.innerHeight)C.h=B0(_.innerHeight,"y");if(!_.innerHeight&&!_.height){m.css({height:"auto"});C.h=m.height()}m.css({height:C.h});$.position(C.transition==="none"?0:C.speed)}};$.prep=function(G){if(!J)return;var E,D=C.transition==="none"?0:C.speed;m.empty().remove();m=a(q,"LoadedContent").append(G);function F(){C.w=C.w||m.width();C.w=C.mw&&C.mw<C.w?C.mw:C.w;return C.w}function _(){C.h=C.h||m.height();C.h=C.mh&&C.mh<C.h?C.mh:C.h;return C.h}m.hide().appendTo(t.show()).css({width:F(),overflow:C.scrolling?"auto":"hidden"}).css({height:_()}).prependTo(K);t.hide();V(I0).css({"float":"none"});E=function(){var $=o.length,E,G="frameBorder",_="allowTransparency",F;if(!J)return;function H(){if(i&&typeof Y[0].style.removeAttribute=='function')Y[0].style.removeAttribute("filter")}F=function(){clearTimeout(A);c.hide();_0(C0,C.onComplete)};if(i)if(I0)m.fadeIn(100);X.html(C.title).add(m).show();if($>1){if(typeof C.current==="string")l.html(C.current.replace("{current}",T+1).replace("{total}",$)).show();M[(C.loop||T<$-1)?"show":"hide"]().html(C.next);B[(C.loop||T)?"show":"hide"]().html(C.previous);if(C.slideshow)h.show();if(C.preloading)V.each([n(-1),n(1)],function(){var A,_,B=o[this],$=V.data(B,z);if($&&$.href){A=$.href;if(V.isFunction(A))A=A.call(B)}else A=V(B).attr("href");if(A&&r($,A)){A=N($,A);_=new Image();_.src=A}})}else F0.hide();if(C.iframe){E=a("iframe")[0];if(G in E)E[G]=0;if(_ in E)E[_]="true";if(!C.scrolling)E.scrolling="no";V(E).attr({src:C.href,name:(new Date()).getTime(),"class":d+"Iframe",allowFullScreen:true,webkitAllowFullScreen:true,mozallowfullscreen:true}).one("load",F).appendTo(m);U.one(P,function(){E.src="//about:blank"});if(C.fastIframe)V(E).trigger("load")}else F();if(C.transition==="fade")Y.fadeTo(D,1,H);else H()};if(C.transition==="fade")Y.fadeTo(D,0,function(){$.position(0,E)});else $.position(D,E)};function f(){var H,F,B=$.prep,E,G=++I;e=true;I0=false;S=o[T];_();_0(P);_0(D,C.onLoad);C.h=C.height?B0(C.height,"y")-$0-s:C.innerHeight&&B0(C.innerHeight,"y");C.w=C.width?B0(C.width,"x")-D0-w:C.innerWidth&&B0(C.innerWidth,"x");C.mw=C.w;C.mh=C.h;if(C.maxWidth){C.mw=B0(C.maxWidth,"x")-D0-w;C.mw=C.w&&C.w<C.mw?C.w:C.mw}if(C.maxHeight){C.mh=B0(C.maxHeight,"y")-$0-s;C.mh=C.h&&C.h<C.mh?C.h:C.mh}H=C.href;A=setTimeout(function(){c.show()},100);if(C.inline){E=a(q).hide().insertBefore(V(H)[0]);U.one(P,function(){E.replaceWith(m.children())});B(V(H))}else if(C.iframe)B(" ");else if(C.html)B(C.html);else if(r(C,H)){H=N(C,H);V(I0=new Image()).addClass(d+"Photo").bind("error",function(){C.title=false;B(a(q,"Error").html(C.imgError))}).one("load",function(){var _;if(G!==I)return;if(C.retinaImage&&b.devicePixelRatio>1){I0.height=I0.height/b.devicePixelRatio;I0.width=I0.width/b.devicePixelRatio}if(C.scalePhotos){F=function(){I0.height-=I0.height*_;I0.width-=I0.width*_};if(C.mw&&I0.width>C.mw){_=(I0.width-C.mw)/I0.width;F()}if(C.mh&&I0.height>C.mh){_=(I0.height-C.mh)/I0.height;F()}}if(C.h)I0.style.marginTop=Math.max(C.mh-I0.height,0)/2+"px";if(o[1]&&(C.loop||o[T+1])){I0.style.cursor="pointer";I0.onclick=function(){$.next()}}if(i)I0.style.msInterpolationMode="bicubic";setTimeout(function(){B(I0)},1)});setTimeout(function(){I0.src=H},1)}else if(H)t.load(H,C.data,function(_,$){if(G===I)B($==="error"?a(q,"Error").html(C.xhrError):V(this).contents())})}$.next=function(){if(!e&&o[1]&&(C.loop||o[T+1])){T=n(1);p(o[T])}};$.prev=function(){if(!e&&o[1]&&(C.loop||T)){T=n(-1);p(o[T])}};$.close=function(){if(J&&!L0){L0=true;J=false;_0(G0,C.onCleanup);g.unbind("."+d+" ."+K0);H0.fadeTo(200,0);Y.stop().fadeTo(300,0,function(){Y.add(H0).css({"opacity":1,cursor:"auto"}).hide();_0(P);m.empty().remove();setTimeout(function(){L0=false;_0(k,C.onClosed)},1)})}};$.remove=function(){Y.stop().remove();H0.remove();Y=null;V("."+j).removeData(z).removeClass(j);V(x).unbind("click."+d)};$.element=function(){return V(S)};$.settings=L}(jQuery,document,window))