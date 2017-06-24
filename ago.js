/**
 * @file    Ago.js
 */
//  -----------------------
//   1分钟内     刚刚
//   1小时内     n分钟前
//   24小时内    n小时前
//   n天内       n天前
//   年内        06-24
//   跨年        2017-06-24
//  -----------------------
/**
 * 时间修饰组件
 * @param {number} timestamp 毫秒级时间戳
 * @param {number} limit 可不传 [2-n] 用于设置天数范围 默认值30
 */
function ago(timestamp, limit) {

    limit = limit ? limit : 30;

    var result = '';
    var errMsg = 'error!';

    var now = new Date();
    var diff = now.getTime() - timestamp;

    /**
     * 补零
     * @param {number} n
     * @return {string}
     */
    function zeroFill(n) {
        
        if (n < 10) {

            return '0' + n;
        
        } else {
        
            return '' + n;
        
        }
    }
    
    if (diff >= 0) {
        
        diff = diff / 1000;
        
        if (diff < 60) { // 1分钟内

            result = '刚刚';

        } else if (diff < 3600) { // 1小时内

            result = Math.round(diff / 60) + '分钟前';

        } else if (diff < 86400) { // 24小时内

            result = Math.round(diff / 3600) + '小时前';

        } else {

            if (limit > 1 && diff < (86400 * limit)){ // n天内

                result = Math.round(diff / 86400) + '天前';

            } else {

                var date = new Date(timestamp);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();

                if (y < now.getFullYear()) { // 跨年
                
                    result = y + '-' + zeroFill(m) + '-' + zeroFill(d);

                } else {
                    
                    result = zeroFill(m) + '-' + zeroFill(d);

                }

            }
            
        }

        return result;
        
    } else {

        return errMsg;

    }
}