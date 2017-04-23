/**
 * ��װ�ı��Զ�����
 * @param  container,�ı���������������<svg>��<g>
 * @param  str,�ַ���
 * @param  posX,�ı���x����
 * @param  posY,�ı���y����
 * @param  width,ÿһ�еĿ�ȣ���λΪ����
 * @param  fontsize,���ֵĴ�С����ʡ�ԣ���Ĭ��Ϊ 14
 * @param  fontfamily���ֵ����壨��ʡ�ԣ���Ĭ��Ϊ simsun, arial
 * @use
 var str = "�������ƣ��������ģ���Ϊ���ʣ���������";
 GetMulText(svg,str,30,100,120,20,"simsun");
 �� svg �����������(30, 100)�����ָ���ַ�����ÿһ�еĳ���Ϊ120�����أ������Ĳ����Զ����У������СΪ20������Ϊ���塣
 */

function GetMulText(container, str, posX, posY, width, fontsize, fontfamily) {
    if (arguments.length < 6) {
        fontsize = 14;
    }
    if (arguments.length < 7) {
        fontfamily = 'simsun,arial';
    }

    //��ȡ�ָ����ַ���
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