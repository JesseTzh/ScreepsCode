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
const logger = require('utils.log').getLogger("Link");
const CONFIG = require('config')
const SYS_CONFIG = require('config.system.setting');

function linkTransfer() {
    for (let roomName of CONFIG.CLAIM_ROOM) {
        if(Game.rooms[roomName].controller.level < 5){
            logger.debug(`房间[${roomName}]控制等级尚未达到5级,没有Link可工作.`)
            continue;
        }
        //房间可用能量大于 ALLOW_UPGRADER_USE_ENERGY 参数值
        if (Game.rooms[roomName].getRatioOfEnergy() <= SYS_CONFIG.ALLOW_UPGRADER_USE_ENERGY) {
            logger.info(`房间[${roomName}]能量余量过低,暂停传输工作.`)
            continue;
        }
        let sourceLinkList = Game.rooms[roomName].getSourceLinkList();
        let receiveLink = Game.getObjectById(Game.rooms[roomName].getControllerLink());
        if (sourceLinkList && receiveLink) {
            for (let i = 0; i < sourceLinkList.length; i++) {
                let sendLink = Game.getObjectById(sourceLinkList[i]);
                if (checkEnergyStatus(sendLink)) {
                    //发送端能量储量大于50%，或接收端能量为0,则传输
                    if ((sendLink.store.getUsedCapacity(RESOURCE_ENERGY) / LINK_CAPACITY >= 0.5) || (receiveLink.store.getUsedCapacity(RESOURCE_ENERGY) === 0)) {
                        sendLink.transferEnergy(receiveLink);
                    }
                }
            }
        }else{
            logger.warn(`房间[${roomName}]数据库中缺失Link相关数据,请检查！`)
        }
    }
}

function checkEnergyStatus(sendLink) {
    //发送端不在冷却中
    if (sendLink.cooldown === 0) {
        //发送端能量大于1
        if (sendLink.store.getUsedCapacity(RESOURCE_ENERGY) > 1) {
            return true;
        }
    }
    return false;
}

module.exports = {
    linkTransfer: linkTransfer
};