const mountCreep = require('extension.creep');
const logger = require('utils.log').getLogger("main");

// 挂载所有的额外属性和方法
module.exports = function () {
    if (!global.hasExtension) {
        logger.info("正在挂载原型扩展...");
        global.hasExtension = true
        mountCreep();

        logger.debug("清除能量存量统计...")
        delete Memory.rooms;
    }
}