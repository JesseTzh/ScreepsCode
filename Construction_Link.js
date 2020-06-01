/*  
    Link的建筑模块
    主要工作：远程传送能量，尽量保证矿工走最少的路
    函数：
        1. linkTransfer()：检查config文件中配置的Link能量容量是否冗余，是则发送至target
    参数：
        
    使用：
        1. 引入 var link = require('construction.link');
        2. 调用 link.linkTransfer();
*/
const logger = require('utils.log').getLogger("construction.link");
const CONFIG = require('config')
const SYS_CONFIG = require('config.system.setting');

function linkTransfer() {
    if (!CONFIG.LINK) {
        logger.debug("配置文件中找不到Link的信息！")
        return;
    }
    for (let i = 0; i < CONFIG.LINK.length; i++) {
        let send = Game.getObjectById(CONFIG.LINK[i][0]);
        let receive = Game.getObjectById(CONFIG.LINK[i][1]);
        // ①如果接收端能量为零则立即传输
        // ②如果发送端能量大于50%并且房间可用能量大于 ALLOW_UPGRADER_USE_ENERGY 参数值，则传输
        if ((send.store.getUsedCapacity(RESOURCE_ENERGY) / LINK_CAPACITY >= 0.5 && send.room.energyAvailable / send.room.energyCapacityAvailable >= SYS_CONFIG.ALLOW_UPGRADER_USE_ENERGY) ||
            (send.store.getUsedCapacity(RESOURCE_ENERGY) > 0 && receive.store.getUsedCapacity(RESOURCE_ENERGY) === 0)) {
            send.transferEnergy(receive);
        }
    }
}

module.exports = {
    linkTransfer: linkTransfer
};