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
                var creepTemplateConfig = creepTemplateConfigs[name];
                if (spawnBusyList.has(creepTemplateConfig.spawnName)) {
                    logger.info(creepTemplateConfig.spawnName + "无法执行当前任务，暂停重生: " + name)
                    //Creep所用Spawn正忙
                    continue;
                }
                if (Game.rooms[creepTemplateConfig.roomName].energyAvailable >= 300) {
                    //初始化模板
                    var creepTemplate = require('Creep_TemplateGenerate').genTemplate(creepTemplateConfig.roomName);
                    var template = creepTemplate.getTemplateByConfig(creepTemplateConfig);
                    var result = Game.spawns[creepTemplateConfig.spawnName].spawnCreep(template, name);
                    if (result == ERR_NOT_ENOUGH_ENERGY) {
                        logger.info(name + "没有足够资源重生,房间" + creepTemplateConfig.roomName + "当前可用能量：" + Game.rooms[creepTemplateConfig.roomName].energyAvailable);
                        if (Memory.creeps[name] && !Memory.creeps[name].RebornFailTimes) {
                            Memory.creeps[name].RebornFailTimes = 1;
                        } else if (Memory.creeps[name] && Memory.creeps[name].RebornFailTimes) {
                            Memory.creeps[name].RebornFailTimes += 1;
                        }
                        // 100ticks 重生失败则采用自适应模板
                        if(Memory.creeps[name].RebornFailTimes > 100){
                            var temp =  require('Creep_TemplateGenerate').genTemplate(creepTemplateConfig.roomName)
                            var tempTemplate = temp.getSelfAdaptionTemplate();
                            result = Game.spawns[creepTemplateConfig.spawnName].spawnCreep(tempTemplate, name);
                            if(result == OK){
                                let message = name + "长时间重生失败，使用自适应模板......";
                                logger.info(message);
                                Game.notify(message);
                            }else if(result != OK && result != ERR_BUSY){
                                let message = name + "自适应模板出错，请检查！"
                                logger.info(message);
                                Game.notify(message);
                            }
                            spawnBusyList.add(creepTemplateConfig.spawnName);
                        }else{
                            spawnBusyList.add(creepTemplateConfig.spawnName);
                        }
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