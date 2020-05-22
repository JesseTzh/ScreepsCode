const logger = require('utils.log').getLogger("manager.creep");
const creepConfigs = require('config.creep');
const creepTemplateConfigs = require('config.creep.template')

function creepManager() {
    for (name in creepConfigs) {
        if (!Game.creeps[name]) {
            if (Memory.creeps[name] && Memory.creeps[name].RebornFlag && Memory.creeps[name].RebornFlag == "No") {
                logger.info('取消重生：' + name);
                continue;
            }
            if (name in creepTemplateConfigs) {
                //获取对应模板文件
                const creepTemplateConfig = creepTemplateConfigs[name];
                if (Game.rooms[creepTemplateConfig.roomName].energyAvailable >= 300) {
                    //初始化模板
                    const creepTemplate = require('Creep_TemplateGenerate').genTemplate(creepTemplateConfig.roomName);
                    var template = creepTemplate.getTemplateByConfig(creepTemplateConfig);
                }
                var result = Game.spawns[creepTemplateConfig.spawnName].spawnCreep(template, name);
                if (result == ERR_NOT_ENOUGH_ENERGY) {
                    Memory.creeps[name].RebornFailTimes ? Memory.creeps[name].RebornFailTimes += 1 : Memory.creeps[name].RebornFailTimes = 1;
                    if (Memory.creeps[name].RebornFailTimes > 1000) {
                        Game.notify('Creep ' + name + '长达1000ticks复活失败！');
                    }
                } else if (result == OK) {
                    logger.info('正在重生 : ' + name);
                    //删除之前Creep记忆
                    //delete Memory.creeps[name];
                    return;
                } else if(result != OK) {
                    logger.warn(name + " 重生失败！错误代码：" + result);
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