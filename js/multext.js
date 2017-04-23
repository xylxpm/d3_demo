/**
 * 封装文本自动换行
 * @param  container,文本的容器，可以是<svg>或<g>
 * @param  str,字符串
 * @param  posX,文本的x坐标
 * @param  posY,文本的y坐标
 * @param  width,每一行的宽度，单位为像素
 * @param  fontsize,文字的大小（可省略），默认为 14
 * @param  fontfamily文字的字体（可省略），默认为 simsun, arial
 * @use
 var str = "青青子衿，悠悠我心，但为君故，沉吟至今。";
 GetMulText(svg,str,30,100,120,20,"simsun");
 在 svg 容器里的坐标(30, 100)处添加指定字符串，每一行的长度为120个像素，超出的部分自动换行，字体大小为20，字体为宋体。
 */

function GetMulText(container, str, posX, posY, width, fontsize, fontfamily) {
    if (arguments.length < 6) {
        fontsize = 14;
    }
    if (arguments.length < 7) {
        fontfamily = 'simsun,arial';
    }

    //获取分割后的字符串
    var strs = splitByLine(str, width, fontsize);

    var mulText = container.append('text')
        .attr('x', posX)
        .attr('y', posY)
        .style('font-size', fontsize)
        .style("font-family", fontfamily);

    mulText.selectAll('tspan')
        .data(strs)
        .enter()
        .append('tspan')
        .attr('x', mulText.attr('x'))
        .attr('dy', '1em')
        .text(function (d) {
            return d;
        })

    return mulText;


    function splitByLine(str, max, fontsize) {
        var curLen = 0;
        var result = [];
        var start = 0, end = 0;
        for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i);
            var pixelLen = code > 255 ? fontsize : fontsize / 2;
            curLen += pixelLen;
            if (curLen > max) {
                end = i;
                result.push(str.substring(start, end));
                start = i;
                curLen = pixelLen
            }
            if (i === str.length - 1) {
                end = i;
                result.push(str.substring(start, end + 1));
            }
        }
        return result;
    }
}