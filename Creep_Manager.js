const logger = require('utils.log').getLogger("manager.creep");
const creepConfigs = require('config.creep');
const creepTemplateConfigs = require('config.creep.template')

function creepManager() {
    for (name in creepConfigs) {
        if (!Game.creeps[name]) {
            if (name in creepTemplateConfigs) {
                //获取对应模板文件
                const creepTemplateConfig = creepTemplateConfigs[name];
                if (Game.rooms[creepTemplateConfig.roomName].energyAvailable >= 300) {
                    //初始化模板
                    const creepTemplate = require('Creep_TemplateGenerate').genTemplate(creepTemplateConfig.roomName);
                    var template = creepTemplate.getTemplateByConfig(creepTemplateConfig);
                }
                var result = Game.spawns[creepTemplateConfig.spawnName].spawnCreep(template, name);
                if (result != OK) {
                    logger.warn(name + " 重生失败！错误代码：" + result)
                } else if (result == ERR_NOT_ENOUGH_ENERGY) {
                    Memory.creeps[name].RebornFailTimes ? Memory.creeps[name].RebornFailTimes += 1 : Memory.creeps[name].RebornFailTimes = 1;
                } else {
                    logger.info('正在重生 : ' + name);
                    //删除之前Creep记忆
                    //delete Memory.creeps[name];
                }
            }
            else {
                logger.error(name + "找不到模板文件")
            }
            return;
        }
    }
}

module.exports = {
    creepManager: creepManager
};