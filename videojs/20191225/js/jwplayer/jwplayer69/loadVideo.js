jwplayer.key = 'TS4qsaxnmU61G+MTcWh8YKllWcQ=';
/**
 * 定时器
 */
var timeoutId;
/*
 * 加载视频方法，加载视频完毕后，执行函数
 * videoUrl 视频地址
 * imageUrl 预览图片地址
 * width    宽度
 * height   高度
 */
function createPlayerLisSection(videoUrl, imageUrl, width, height) {
    //return false;
    //加载播放器，没有暂停过
    sessionStorage.setItem("pause",0);
    sessionStorage.setItem("playFlag",0);
    sessionStorage.removeItem("lookVideoMap");
    seekFlag = false;
    addLogs = true;
    jwplayer('videoDiv').setup({
        //'flashplayer': '../../js/jwplayer/jwplayer69/jwplayer.flash.swf',
        //'html5player': '../../js/jwplayer/jwplayer69/jwplayer.html5.js',
        'width': width,
        'height': height,
        'file': videoUrl,
        'image': imageUrl,
        'analytics': {
            'cookies': false,
            'enabled': false
        },
        'primary': "html5",
        'preload': "none",
        'androidhls': "true",
        'abouttext': "Etiantian.com",
        'aboutlink': "http://www.etiantian.com",
        'autostart': "false",
        'startparam': "start"
    });

    updatelookVideoMap(0);

    jwplayer().onPlay(function(){

        window.setTimeout("seekTime()",1000);
        window.setTimeout("addLogsOnplay()",2000);
        var pause = sessionStorage.getItem("pause");
        addPlayPointLogs();
    });
    jwplayer().onPause(function(){
        //清除定时器
        window.clearTimeout(timeoutId);
        //暂停标记
        sessionStorage.setItem("pause",1);
        addPlayPointLogsonPause();
        //alert('暂停');
    });
    jwplayer().onSeek(function(){
        //拖动标记
        sessionStorage.setItem("pause",2);
        //addPlayPointLogs();
        //alert("拖动111");
    });

    //setHTML('video');
}
