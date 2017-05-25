/**
 * ! jQuery wheater 3.0
 *
 * Page URL		: http://julying.com/lab/weather/
 * Mail 		: 316970111@qq.com
 * QQ 			: 316970111 
 * created 		: 2010-09-10 13:55:29 
 * last update 	: 2013-03-1 10:30:00
 * Add 			: China Shenzhen
 *
 * Copyright 2013 | julying.com 
 */
;(function(_doc){
	var optionDefaults = {
			parentbox 	: '.demo' ,	//父级容器  ，支持 jQuery/css3 选择器
			moveArea 	: 'limit', // 默认移动范围 all ： 全屏幕 ，  limit : 只在父级中移动
			zIndex 		: 1, // css 的 z轴高低。数字越大，层级越高
			move 		: 0, // 是否移动 ： 1 ， 0
			style 		: 'medialoot',  //有 7 中类型  blue、cartoon-1、cartoon-2、cartoon-3、default、medialoot、meteocons
			styleSize 	: 'small' ,	// 天气图标大小 ， big ， small ; 其中 空值 = big
			area 		: 'assign', // 天气地区的方式，client: 根据用户地区判断, assign：固定显示一个地区的天气
			city		: '', //可以指定城市。支持 encodeURI 编码 ， 和 中文汉字,
			styles		: ['blue','cartoon-1','cartoon-2','cartoon-3','default','medialoot','meteocons'] //共有那些样式模板
		},    	
		_thisScript = '',
		//本脚本的存在路径
		_path = (function(script, i, me) {
			for (i in script) {
				//须保证文件名含有"jquery.weather"字符
				if (script[i].src && script[i].src.indexOf('jquery.weather') !== -1){
					me = script[i];
				}
			};		
			_thisScript = me || script[script.length - 1];
			me = _thisScript.src.replace(/\\/g, '/');
			return me.lastIndexOf('/') < 0 ? '.' : me.substring(0, me.lastIndexOf('/')) + '/';
		}( _doc.getElementsByTagName('script'))),
		//文件名传过来的参数
		_parameter = (function(src){
			src = (src.split('?')[1] || '').replace('&amp;','&').replace(/<|>/g,''); //不允许: < >
			var values = src.match( /[^&]+?([^&]*)/g ) || '',//获取 网址传过来的参数,根据 & 拆分
				value = '' ,//临时变量
				params = {}, //用对象来保存 获取的 对象
				len = values.length ,				
				i = 0 ;
			for(; i< len ; i++){
				value = values[i].split('=') || ['',''];
				if( value[0] != '' && value.length == 2  ){
					params[ value[0] ] = value[1];
				}
			}
			return params ;
		}( _thisScript.src ));
	if ( ! window.jQuery ) {
		include(['http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js'],function(){
			creatWeather( optionDefaults, _parameter );
		});
	}else{
		creatWeather( optionDefaults, _parameter);
	}
		
	
	/**
	 * 初始化天气环境
	 * @param optionDefaults 配置参数默认值
	 * @param _parameter 区间最大值
	 * @return 
	 */
	function creatWeather( optionDefaults, _parameter){		
		var option = jQuery.extend({}, optionDefaults, _parameter );
		//调整参数
		if( option.styleSize == 'big' ){
			option.styleSize = '';
		}
		switch( option.style ){
			case '_random' : {
				option.style = option.styles[ rand( 0, option.styles.length - 1 ) ];
			}
			break ;
			case (! option.style in option.styles ) : {
				option.style = option.styles[0];
			}
			break ;
		}
		
		if( ( parseInt( option.move ) || 0 ) == 0 ){
			option.move = false ;
		}
		if( ( parseInt( option.autoDrop ) || 0 ) == 0 ){
			option.autoDrop = false ;
		}
		if( ( parseInt( option.drag ) || 0 ) == 0 ){
			option.drag = false ;
		}
		
		
		//无阻赛 加载 样式
		include([ _path +'../css/main.css', _path +'../images/'+ option.style + ( option.styleSize ? '/'+ option.styleSize : ''  ) +'/julying-weather.css']);
		;jQuery(function($){
			var charset = (document.charset || document.characterSet || 'utf-8').toLowerCase() ;
			if( charset != 'utf-8' ){ //目前仅支持 两种编码方式 , 在 gbk 编码下 使用 gb2312 也可以（gb2312是 gbk 的子集）
				charset = 'gb2312';
			}						
			//无阻赛 加载 天气渲染 js
			include([ _path +'jquery.weather.js?t'+ (new Date()).valueOf(), _path +'jquery.weather.config-'+ charset +'.js' ],function(){				
				var $weatherBox = $(option.parentbox),
					cityName = option.city.indexOf('%') == 0 ? option.city : encodeURI( option.city );
						
				if( 'client' == option.area ){ //如果选定地区，根据IP
					cityName = '';
				}
				//如果不存在 父级容器，就创建
				if( $weatherBox.size() == 0 ){
					option.parentbox = '#julying-weather-'+ (new Date()).valueOf() ;
					$('body').append('<div id="'+ option.parentbox.replace('#','') +'"></div>');
					$weatherBox = $(option.parentbox);
				}				
				//如果 需要把天气图表限定在某一个区域
				if( option.moveArea == 'limit' && $.inArray( $weatherBox.css('position'), ['fixed','absolute']) < 0 ){
					$weatherBox.css({position:'relative'});
				}
				include(['http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&day=0&city='+ cityName +'&dfc=1&charset='+ charset], function(){
					var city = '', weatherData = '', dataInfo = '';
					for( city in window.SWther.w ){					
						dataInfo = SWther.w[city][0];
						weatherData = {
							city : city ,
							date : SWther.add.now.split(' ')[0] || '',
							day_weather: dataInfo.s1,
							night_weather :dataInfo.s2,
							day_temp: dataInfo.t1,
							night_temp: dataInfo.t2,
							day_wind:dataInfo.p1,
							night_wind: dataInfo.p2
						};
					}
					var now = new Date( SWther.add.now );
						 hour = now.getHours() ,
						sky = hour > 18 ? weatherData.day_weather : weatherData.night_weather ;
					option.sky = jQueryWeatherConfig.convert( sky ) ;
					option.weatherData = weatherData ;
					option.config = jQueryWeatherConfig;
					$weatherBox.css({zIndex:option.zIndex}).weather( option );
				});
			});//load creat
		//	$('body').append('<iframe src="http://julying.com/blog/statics/statistics.php" style="display:none;"></iframe>');
		});
	}
	
	/**
	 * 获取随机数（整数）
	 * @param mi 区间最小值
	 * @param ma 区间最大值
	 * @return int
	 */
	function rand(mi,ma){
		var out = mi + Math.round( Math.random() * ( ma - mi)) ;	
		return parseInt(out);
	}
	
	/* include.js */
	function include(d,g){
		function o(){}
		function j(b,c,a){/\.css$/.test(b)?(a=f.createElement(p),a.href=b,a.rel="stylesheet",a.type="text/css",e.appendChild(a),c()):(k++,a=f.createElement(q),a.onload=function(){r(a,c)},a.onreadystatechange=function(){/loaded|complete/.test(this.readyState)&&r(a,c)},a.async=!0,a.src=b,e.insertBefore(a,e.firstChild))}
		function r(b,c){t(c);l[b.src.split("/").pop()]=1;b.onload=b.onreadystatechange=null}
		function t(b){function c(){!--k&&g()}
		b.length?b(c):(b(),c())};function s(b){var c,a;c=b.length;for(a=[];c--;a.unshift(b[c]));return a}
		var f=document,e=f.getElementsByTagName("head")[0],l={},k=0,h=[],q="script",p="link",m;!d.pop&&(d=[d]);g=g||o;(function c(a,i,e,n){if(!f.body)return setTimeout(c,1);h=[].concat(s(f.getElementsByTagName(q)),s(f.getElementsByTagName(p)));for(a=h.length;a--;)(m=h[a].src||h[a].href)&&(l[m.split("/").pop()]=m);for(a=d.length;a--;)n=o,e=!1,d[a].pop?(i=d[a][0],n=d[a][1],e=d[a][2]):i=d[a],l[i.split("/").pop()]||j(i,n,e);!k&&g()})()
	}
	
}(document));