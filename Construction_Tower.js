const logger = require('utils.log').getLogger("Tower");
const CONFIG = require('config')
const SYS_CONFIG = require('config.system.setting');

function towerWork() {
    if (!CONFIG.TOWER || !CONFIG.SPAWN) {
        logger.info("缺少配置文件信息！")
        return;
    }
    // 直接遍历房间列表，检测每个房间内是否有需要攻击/维护的目标，避免使用 Tower 反复在同一房间内搜索以提升效率
    for (let room in CONFIG.TOWER) {
        // 检测是否有敌人
        const enemas = Game.rooms[room].find(FIND_HOSTILE_CREEPS);
        if (enemas.length) {
            towerAttack(room, enemas);
        } else {
            // 检测是否有建筑需要维护
            const repairTargets = Game.rooms[room].find(FIND_STRUCTURES, {
                filter: (structure) => (structure.hits < structure.hitsMax - 200 && structure.structureType !== STRUCTURE_RAMPART && structure.structureType !== STRUCTURE_WALL) || (structure.structureType === STRUCTURE_RAMPART &&
                    structure.hits / structure.hitsMax <= SYS_CONFIG.DEFENSE_CONSTRUCTION_HITS_LIMITS)
            });
            if (repairTargets.length) {
                towerRepair(room, repairTargets)
            } else {
                // 检测是否有受伤 Creep
                const injuredCreeps = Game.rooms[room].find(FIND_MY_CREEPS, {
                    filter: (creep) => creep.hits < creep.hitsMax
                });
                if (injuredCreeps.length) {
                    towerHeal(room, injuredCreeps)
                }
            }
        }
    }
}

//检测到进入范围的敌人自动攻击
function towerAttack(room, targets) {
    for (let i = 0; i < CONFIG.TOWER[room].length; i++) {
        let tower = Game.getObjectById(CONFIG.TOWER[room][i]);
        if (tower.store[RESOURCE_ENERGY] > 0) {
            tower.attack(targets[0])
        } else {
            logger.info("Tower[" + room + "][" + i + "]能量为空，无法工作！")
        }
    }
}

//检测到范围内需要维修、保养的劳工自动进行维护
function towerRepair(room, targets) {
    for (let i = 0; i < CONFIG.TOWER[room].length; i++) {
        let tower = Game.getObjectById(CONFIG.TOWER[room][i]);
        if (tower.store[RESOURCE_ENERGY] > 0) {
            tower.repair(targets[0])
        } else {
            logger.info("Tower[" + room + "][" + i + "]能量为空，无法工作！")
        }
    }
}

function towerHeal(room, targets) {
    for (let i = 0; i < CONFIG.TOWER[room].length; i++) {
        let tower = Game.getObjectById(CONFIG.TOWER[room][i]);
        if (tower.store[RESOURCE_ENERGY] > 0) {
            tower.heal(targets[0])
        } else {
            logger.info("Tower[" + room + "][" + i + "]能量为空，无法工作！")
        }
    }
}

module.exports = {
    towerWork: towerWork
};