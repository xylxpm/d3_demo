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
;(function($){			
	//预定义量，防止参数缺失
	var optionDefaults = {
		fps : 40 ,
		duration : 5000,
		creatDropTime : 400 , //
		sky : 'sunshine',
		weatherData : {}, //天气数据
		move : true ,//是否移动
		drag : true , //是否允许拖动
		autoDrop : false, //自动下雨雪
		
		//所有天气状态
		//几乎所有的天气都可以归结为这五种                               
		weatherStates : {
			//晴天 
			sunshine	: { length : 1 }, /* typesNum , child  */
			//多云
			cloudy 		: { length : 1 },
			//阴天
			overcast 	: { length : 2 },
			// 雨
			rainy 		: { length : 2, drop : [{ time : 300 } , {time : 300 }] },
			//雨夹雪
			sleet 		: { length : 2, drop : [{ time : 300 } , {time : 800 } ] },
			//雪
			snow 		: { length : 2, drop : [{ time : 800 } , {time : 800 }] }
		}
	};
	
	
	$.fn.weather = function( option ){
		option = $.extend({}, optionDefaults ,option);
		//检测 天气情况，天气必须存在于 集合中
		option.sky = option.sky || optionDefaults.sky ;	
		option.drag = !!option.drag ;	
		option.move = !!option.move ;	
		option.autoDrop = !!option.autoDrop ;
		var obj ;
				
		this.each(function(){
			obj = new Weather( $(this) , option );
			obj.init( option.config );
		});
		
		return obj.$weatherArea ; //返回天气预报的区域 , .weather-info
	}; 
	
	//构造函数
	function Weather( $element  , opts ){
		this.$element = $element ; //天气图标父级 html 节点
		this.$weatherArea = null;  //天气自身的根节点
		this.$weather = null;  //天气图表的 html 节点
		this.opts = opts ;
		this.sky = opts.sky ; // 天气
		this.skyState = opts.weatherStates[ opts.sky ] ;  //天气状态信息
	}
	
	//原型
	Weather.prototype = {
		constructor : Weather ,
		version : '3.0',
		init : function(config){
			//天气预报信息，此数据来源于中国气象网
			var weatherInfo = this.opts.weatherData || {},
				//IE、Firefox 旧版本 对于字符串拼接很慢，用数组很快 
				html = [],
				//当前天气子节点数量
				skyState_child_length = ( this.skyState || '' ).length ,
				templeteHtml = '<div class="weather-info"><h2>{#city#}<span>{#date#}</span></h2><div class="weather-show"><div class="day_weather"><span class="weather">{#day#} : {#day_weather#}</span>/<span class="temp">{#day_temp#}{#temp#}</span></div><div class="night_weather"><span class="weather">{#night#} : {#night_weather#}</span>/<span class="temp">{#night_temp#}{#temp#}</span></div></div><div class="julying-weather-copy"></div></div>',
				i = 0
			;
			for( ; i < skyState_child_length ; i++){
				html.push('<div class="julying-weather"><div class="'+ this.opts.sky +' sky sky-'+i+'"><div class="child-'+i+' child">');			
				if( weatherInfo.city ){
					html.push( templete( templeteHtml, {
						'{#city#}' : weatherInfo.city,
						'{#date#}' : weatherInfo.date,
						'{#day#}' : config.lang.day ,
						'{#day_weather#}' : weatherInfo.day_weather ,
						'{#day_temp#}' : weatherInfo.day_temp,
						'{#temp#}' : config.lang.temp,
						'{#day_wind#}' : weatherInfo.day_wind,
						'{#night_weather#}' : weatherInfo.night_weather,
						'{#night#}' : config.lang.night ,
						'{#night_temp#}' : weatherInfo.night_temp,
						'{#wangzimo#}' : config.lang.wangzimo 
					}) );
				}
				html.push('</div></div></div>');
			};
			
			this.$element.append( html.join('') );	
			html = null ;	
			this.$weatherArea = this.$element.find('div.julying-weather');	
			this.$weather = this.$element.find('.sky');	
			
			this.moveIcon();
			this.creatDrop();
			if( this.opts.drag ){
				this.dragWeather();
			}
			return this ;
		},
		//移动天气图标
		moveIcon : function(){
			var myTime = []
				_self = this ;
			this.$weather.each(function(i){
				var $this = $(this);
				var $weatherInfo = $this.find('.weather-info');
				$this.click(function(){
					if( !$this.hasClass('weather-is-move')){
						$weatherInfo.show(300);
					}
					return false;
				}).show();
				
				//解决 mouseout bug
				$(document).click(function(){
					$weatherInfo.hide(300);
				});
				
				if( ! _self.opts.move ){
					return _self ;
				}
				$this.css({ left: rand( 0 , $this.parent().width() * 0.8 )}).show();
				$this.hover(function(){
					$this.stop();
					if(myTime[i]) clearTimeout(myTime[i]);
				},function(){
					if(myTime[i]) clearTimeout(myTime[i]);
					myTime[i] = setTimeout(function(){
						creatMove($this,i);
					},rand( 200 , 1000 ));
					$weatherInfo.hide(300);
				});
				creatMove( $this , i /*$this,skys,sky,opts,i*/);
				//浏览器改变尺寸时，重新计算大小
				$(window).resize(function(){
					//if(myTime[i]) 
						clearTimeout(myTime[i] || {});
					$this.stop().animate({left:rand( 0, $this.parent().width() * 0.5 )},300,function(){
						creatMove( $this , i );
					});
				});
				return _self ;
			});
			
			function creatMove( $this , i ){
				var current_function = arguments.callee ,
					widthMax = $this.parent().width(),
					start = 0 ,
					end = 0,
					width = $this.width() || 160,
					leftMax = widthMax - width ,
					duration = _self.opts.duration ,
					left = rand( 0 , leftMax ),
					fps = _self.opts.fps ,
					speed = Math.abs( parseInt($this.css('left')) - left ) * rand( fps * 0.8 , fps * 1.2 ) || 5000 ,					
					time = rand( duration - duration * 0.5 , duration + duration * 0.5 )
				;
				$this.animate({left:left}, speed ,'linear', function(){
					myTime[i] = setTimeout(function(){
						current_function($this,i);
					},rand( 50 , 1000 ));
				});			
			}
			
		},
		
		creatDrop : function(){
			var _self = this ;
			this.$weather.each(function(i){
				//判断是否需要下雨
				if( ! _self.skyState.drop || ! _self.skyState.drop.length )
					return false ;
				var $this = $(this),
					$child = $this.find('.child'),
					dropTime = null;
				if( _self.opts.autoDrop ){
					setInterval(function(){
						_self.drop( $child );
					}, _self.opts.creatDropTime);				
				}else{
					$this.hover(function(){
						clearInterval( dropTime || {} );
						dropTime = setInterval(function(){
							_self.drop( $child );
						}, _self.opts.creatDropTime);
					},function(){
						clearInterval(dropTime || {});
					});
				}
			});	
		},
		//下雪，下雨
		drop : function( $wearherChild ){
			//制造雨雪
			this.makeDrop( $wearherChild );
			$wearherChild.find('div[name=init]').each(function(){
				var $this = $(this),
					top = parseInt($this.css('top')) || 0 ,
					flyTime = parseInt($this.attr('data-fly-time')) || 200 ;
				$this.attr({name:'run'});
				//让每个雨、雪点落下时间 有间隔，模拟真实场景
				setTimeout(function(){
					$this.css({display:'block' , top : rand( top - 10 , top + 10 ) })
						.animate({'top': $wearherChild.height() + parseInt( $this.attr('data-end')) , opacity:0},flyTime,function(){
							$this.remove();
						});
				},rand(0,1000));
			});
		},
		//制造
		makeDrop : function($wearherChild){
			var objWidth = $wearherChild.width(),
				objHeight = $wearherChild.height(),
				left = 0,
				end = 0,
				index = rand( 0 , ( this.skyState.drop.length || 1 ) - 1),
				flyTime = this.skyState.drop[index].time || 300 ,
				is = '' ,
				i = 0,
				i_len = rand(2,6) ;
			flyTime = rand( flyTime * 0.5,flyTime * 2);			
			for( ; i<= i_len ; i++){
				left = rand( 0 , objWidth * 0.9);
				end = rand(objHeight * 0.5 , objHeight * 2) ;
				is = is + '<div name="init" data-end="'+ end +'" class="drop drop-'+ index +'" data-fly-time="'+ flyTime +'" style="left:'+ left +'px;"><i></i></div>';
			};
			$wearherChild.append(is);
		},	
		//拖动天气元素
		dragWeather : function(){			
			this.$weather.each(function(i){
				drag( $(this), i );
			});   
		}
		
	}// prototype
	
	/* 工具类 方法*/
	
	/**
	 * 随机函。在区间取整数，如同 php 函数 的 rand()
	 * @param mi 区间最小值
	 * @param ma 区间最大值
	 * @return 整数
	 */
	function rand(mi,ma){   
		var range = ma - mi;
		var out = mi + Math.round( Math.random() * range) ;	
		return parseInt(out);   
	}
	
	/**
	 * 模板替换函数
	 * @param mi 模板字符串
	 * @param ma 模板的json数据
	 * @return 替换后的模板数据
	 */	
	function templete(html, data){
		for(var key in data){
			html = html.split(key).join(data[key]);
		}
		return html;
	}
	
	/**
	 * 拖动函数
	 * @param $move 待拖动的对象
	 * @return $move
	 */
	function drag( $move ){
		var _isMove = false,
			_x = 0,
			_y = 0;			
		$move.mousedown(function(e){
			_isMove = true;
			_x =  e.pageX || 0 ;
			_y = e.pageY || 0 ;
			_x = _x - parseInt( $move.css("left"));
			_y = _y -parseInt( $move.css("top"));
			$move.addClass('weather-is-move');
			//这里增加命名空间
			$(document).bind('mousemove.weather',function(e){
				setPos(e);
			});	
		}).mouseup(function(){
			_isMove = false;
			$(document).unbind('mousemove.weather',setPos());
			$move.removeClass('weather-is-move');
			
		});
		function setPos(e){				
			if( ! _isMove ){
				return ;
			}
			var x = e.pageX -  _x,
				y = e.pageY - _y;
			
			$move.css({ left : x , top : y });				
		}
		return $move ;				
	}
})(jQuery);