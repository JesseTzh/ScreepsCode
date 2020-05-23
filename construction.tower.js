const logger = require('utils.log').getLogger("construction.tower");
const CONFIG = require('config')

function towerWork() {
    if (!CONFIG.TOWER) {
        logger.debug("配置文件中找不到Tower的信息！")
        return;
    }
    for (let i = 0; i < CONFIG.TOWER.length; i++) {
        var tower = Game.getObjectById(CONFIG.TOWER[i]);
        //调用
        if (tower.store[RESOURCE_ENERGY] > 0) {
            if (constructionTower.attack(tower)) {
            } else if (constructionTower.repair(tower)) {
                logger.debug("🔧Repairing");
            }
        } else {
            logger.debug("No Energy In Tower");
        }
    }
}

var constructionTower = {
    //检测到进入范围的敌人自动攻击，以距离为准
    attack: function (tower) {
        //攻击函数
        var hostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (hostile) {
            tower.attack(hostile);
            return true;
        }

    },

    //检测到范围内需要维修、保养的劳工自动进行维护，以距离为为准
    repair: function (tower) {
        //维护函数
        var damage = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => (structure.hits < structure.hitsMax - 200 && structure.structureType != STRUCTURE_RAMPART && structure.structureType != STRUCTURE_WALL) || (structure.structureType == 'rampart' && Game.time % 100 == 0)
        });
        logger.debug("维护目标：" + damage);
        if (damage) {
            tower.repair(damage);
            return true;
        } else {
            for (let name in Game.creeps) {
                if (Game.creeps[name].hitsMax > Game.creeps[name].hits) {
                    tower.heal(Game.creeps[name]);
                }
            }
        }
    }
}

module.exports = {
    towerWork: towerWork
};