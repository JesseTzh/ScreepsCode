const mountCreep = require('extension.creep');
const logger = require('utils.log').getLogger("main");

// 挂载所有的额外属性和方法
function mount() {
    logger.info("重新挂载原型扩展...");
    global.hasExtension = true
    mountCreep();
}

function collectionMemory() {
    for (let roomName in Game.rooms) {
        var esArray = new Array();
        //先遍历出所有 extension和 spawn
        for (var id in Game.structures) {
            if (Game.structures[id].structureType == 'extension' || Game.structures[id].structureType == 'spawn') {
                esArray.push(id);
            }
        }
        //存入内存
        logger.info("重新载入建筑序列...")
        Game.rooms[roomName].memory.esArray = esArray;
    }
}
module.exports = function (roomName) {
    if (!global.hasExtension) {
        logger.info("正在清除内存数据...")
        delete Memory.rooms;

        mount();

        collectionMemory();
    }
}