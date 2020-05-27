const logger = require('utils.log').getLogger("manager.creep");
const creepConfigs = require('config.creep');
const creepTemplateConfigs = require('config.creep.template')

function creepManager() {
    var spawnBusyList = new Set();
    for (name in creepConfigs) {
        if (!Game.creeps[name]) {
            if (Memory.creeps[name] && Memory.creeps[name].RebornFlag && Memory.creeps[name].RebornFlag == "No") {
                logger.info(name + '已停止重生');
                continue;
            }
            if (name in creepTemplateConfigs) {
                //获取对应模板文件
                const creepTemplateConfig = creepTemplateConfigs[name];
                if (spawnBusyList.has(creepTemplateConfig.spawnName)) {
                    //Creep所用Spawn正忙
                    continue;
                }
                if (Game.rooms[creepTemplateConfig.roomName].energyAvailable >= 300) {
                    //初始化模板
                    const creepTemplate = require('Creep_TemplateGenerate').genTemplate(creepTemplateConfig.roomName);
                    var template = creepTemplate.getTemplateByConfig(creepTemplateConfig);
                    var result = Game.spawns[creepTemplateConfig.spawnName].spawnCreep(template, name);
                    if (result == ERR_NOT_ENOUGH_ENERGY) {
                        logger.info(name + "没有足够资源重生,房间" + creepTemplateConfig.roomName + "可用能量：" + Game.rooms[creepTemplateConfig.roomName].energyAvailable);
                        spawnBusyList.add(creepTemplateConfig.spawnName);
                        //return;
                        // !Memory.creeps[name].RebornFailTimes ? Memory.creeps[name].RebornFailTimes = 1 : Memory.creeps[name].RebornFailTimes += 1;
                        // if (Memory.creeps[name].RebornFailTimes > 1000) {
                        //     Game.notify('Creep ' + name + '长达1000ticks复活失败！');
                        // }
                    } else if (result == OK) {
                        logger.info('正在重生 : ' + name);
                        if (Memory.creeps[name].RebornFailTimes) {
                            Memory.creeps[name].RebornFailTimes = 0;
                        }
                        //删除之前Creep记忆
                        //delete Memory.creeps[name];
                    } else if (result == ERR_BUSY) {
                        logger.info(name + "重生失败，Spawn " + creepTemplateConfig.spawnName + " 正忙！");
                        spawnBusyList.add(creepTemplateConfig.spawnName);
                    } else if (result != OK) {
                        logger.info(template)
                        logger.warn(name + " 重生失败！错误代码：" + result);
                    }
                }
            }
            else {
                logger.error(name + "找不到模板文件")
            }
        }
    }
}

module.exports = {
    creepManager: creepManager
};