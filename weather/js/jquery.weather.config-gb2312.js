;var jQueryWeatherConfig = {
	lang : {
		day : '°×Ìì',
		night : 'Ò¹Íí',
		temp : '¡ãC',
		wind : '¼¶·ç',
		wangzimo : 'Íõ×ÓÄ«'
	},
	convert : function(sky){
		var weatherInfo = {
				cloudy 		: ['¶àÔÆ','¶àÔÆ×ªÒõ','Çç×ª¶àÔÆ','Òõ×ª¶àÔÆ'],
				overcast	: ['Òõ','Îí','É³³¾±©','¸¡³¾','ÑïÉ³','Ç¿É³³¾±©'],
				rainy		: ['¶àÔÆ×ªĞ¡Óê','Ğ¡Óê×ª¶àÔÆ','Ğ¡Óê','ÖĞÓê','´óÓê','±©Óê','´ó±©Óê','ÌØ´ó±©Óê','¶³Óê','Ğ¡Óê×ªÖĞÓê','ÖĞÓê×ª´óÓê','´óÓê×ª±©Óê','±©Óê×ª´ó±©Óê','´ó±©Óê×ªÌØ´ó±©Óê','ÕóÓê','À×ÕóÓê','À×ÕóÓê°éÓĞ±ù±¢'],
				sleet		: ['Óê¼ĞÑ©'],
				snow		: ['ÕóÑ©','Ğ¡Ñ©','ÖĞÑ©','´óÑ©','±©Ñ©','Ğ¡Ñ©×ªÖĞÑ©','ÖĞÑ©×ª´óÑ©','´óÑ©×ª±©Ñ©','ÖĞÑ©×ªĞ¡Ñ©','´óÑ©×ªÖĞÑ©','±©Ñ©×ª´óÑ©'],
				sunshine	: ['Çç']
			},
			weather = '',
			state = '';
		for( state in weatherInfo ){
			if( $.inArray( sky , weatherInfo[state] ) > -1 ){
				weather = state;
				break;
			}
		} 
		return weather || state || 'sunshine'  ;
	}
};