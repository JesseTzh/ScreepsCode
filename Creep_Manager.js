const logger = require('utils.log').getLogger("Creep_Manager");
const creepConfigs = require('config.creep');
const creepTemplateConfigs = require('config.creep.template');
const SYS_CONFIG = require('config.system.setting');

function creepManager() {
    let spawnBusyList = new Set();
    for (let name in creepConfigs) {
        if (!Game.creeps[name]) {
            if (checkCreepRebornFlag(name)) {
                continue;
            }
            //检查是否有对应模板文件
            if (name in creepTemplateConfigs) {
                //获取对应模板文件
                let creepTemplateConfig = creepTemplateConfigs[name];
                //判断 Creep所用Spawn是否正忙
                if (spawnBusyList.has(creepTemplateConfig.spawnName)) {
                    logger.info("[" + creepTemplateConfig.spawnName + "]正忙，无法重生 [" + name + "]");
                    continue;
                }
                if (Game.rooms[creepTemplateConfig.roomName].energyAvailable >= 300) {
                    //初始化模板
                    const creepTemplate = require('Creep_TemplateGenerate').genTemplate(creepTemplateConfig.roomName);
                    const template = creepTemplate.getTemplateByConfig(creepTemplateConfig);
                    let result = Game.spawns[creepTemplateConfig.spawnName].spawnCreep(template, name);
                    if (result === ERR_NOT_ENOUGH_ENERGY) {
                        spawnBusyList.add(creepTemplateConfig.spawnName);
                        tryAdaptionReborn(name, creepTemplateConfig);
                    } else if (result === OK) {
                        logger.info('正在重生 : ' + name);
                        //重生失败计数归零
                        Memory.creeps[name].RebornFailTimes = 0;
                        spawnBusyList.add(creepTemplateConfig.spawnName);
                    } else if (result === ERR_BUSY) {
                        logger.info("[" + name + "]重生失败，Spawn[" + creepTemplateConfig.spawnName + "]正忙！");
                        const freeSpawn = Game.rooms[creepTemplateConfig.roomName].getFreeSpawn();
                        if (freeSpawn) {
                            Game.spawns[freeSpawn.name].spawnCreep(template, name);
                        }
                        spawnBusyList.add(creepTemplateConfig.spawnName);
                    } else {
                        logger.warn("[" + name + "]重生失败！错误代码：" + result);
                    }
                }
            } else {
                logger.error(`找不到[${name}]所对应的生成模板！`);
            }
        }
    }
}

//检查 Creep 是否已被暂停重生
function checkCreepRebornFlag(name) {
    if (Memory.creeps[name] && Memory.creeps[name].RebornFlag && Memory.creeps[name].RebornFlag === "No") {
        logger.debug("[" + name + ']已被暂停重生');
        return true;
    } else {
        return false;
    }
}

//房间能量不足尝试使用自适应模板重生
function tryAdaptionReborn(name, creepTemplateConfig) {
    // Creep 所在房间
    const room = Game.rooms[creepTemplateConfig.roomName];
    // Creep 内存记忆
    const creepMemory = Memory.creeps[name];
    logger.info(`${room}没有足够能量重生[${name}]!`);
    // 如果是Mover则立刻尝试自适应重生
    if (!isMover(name, creepTemplateConfig) && creepMemory) {
        //重生失败计数 + 1
        creepMemory.RebornFailTimes === null ? creepMemory.RebornFailTimes = 1 : creepMemory.RebornFailTimes += 1;
        // 200ticks 重生失败则采用自适应模板
        if (creepMemory.RebornFailTimes > 200) {
            if (canNotUseSelfAdaptionTemplate(name)) {
                //不能使用自适应模板生成的Creep
                logger.warn(name + "不能使用自适应模板生成，跳过重生！");
            }
            let tempTemplate = require('Creep_TemplateGenerate').genTemplate(room.name).getSelfAdaptionTemplate();
            const result = Game.spawns[room.name].spawnCreep(tempTemplate, name);
            if (result === OK) {
                let message = name + "长时间重生失败，使用自适应模板......";
                logger.info(message);
                Game.notify(message);
            } else if (result !== ERR_BUSY) {
                let message = `${name}使用自适应模板重生出错，错误代码:[${result}]`
                logger.info(message);
                Game.notify(message);
            }
        }
    }
}

function isMover(name, creepTemplateConfig) {
    let flag = false;
    if (name.search("Mover") !== -1) {
        let template = require('Creep_TemplateGenerate').genTemplate(creepTemplateConfig.roomName).getMoverSelfAdaptionTemplate();
        const result = Game.spawns[creepTemplateConfig.spawnName].spawnCreep(template, name);
        if (result === OK) {
            let message = `[${name}]已使用自适应模板重生！`
            logger.info(message);
            Game.notify(message);
            flag = true;
            //重生失败计数归零
            Memory.creeps[name].RebornFailTimes = 0;
        } else if (result !== ERR_BUSY) {
            let message = `${name}使用自适应模板重生出错，错误代码:[${result}]`
            logger.info(message);
            Game.notify(message);
        }
    }
    return flag;
}

function canNotUseSelfAdaptionTemplate(creepName) {
    for (let name of SYS_CONFIG.CAN_NOT_USE_SELF_ADAPTION_TEMPLATE) {
        if (creepName.search(name) !== -1) {
            return true;
        }
    }
    return false;
}

module.exports = {
    creepManager: creepManager
};