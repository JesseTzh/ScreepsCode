const logger = require('utils.log').getLogger("construction.tower");
const CONFIG = require('config')

function towerWork() {
    if (!CONFIG.TOWER || !CONFIG.SPAWN) {
        logger.info("缺少配置文件信息！")
        return;
    }
    for (let room in CONFIG.TOWER) {
        const enemas = Game.rooms[room].find(FIND_HOSTILE_CREEPS);
        if (enemas.length) {
            towerAttack(room, enemas);
        } else {
            const repairTargets = Game.rooms[room].find(FIND_STRUCTURES, {
                filter: (structure) => (structure.hits < structure.hitsMax - 200 && structure.structureType !== STRUCTURE_RAMPART && structure.structureType !== STRUCTURE_WALL) || (structure.structureType === 'rampart' && Game.time % 100 === 0)
            });
            if (repairTargets.length) {
                towerRepair(room, repairTargets)
            } else {
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