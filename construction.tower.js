const logger = require('utils.log').getLogger("construction.tower");
const CONFIG = require('config')

function towerWork() {
    if(!CONFIG.TOWER){
        logger.info("None tower config found!")
        return;
    }
    for (let i = 0; i < CONFIG.TOWER.length; i++) {
        var tower = Game.getObjectById(CONFIG.TOWER[i]);
        //调用
        if (tower.store[RESOURCE_ENERGY] > 0) {
            if (constructionTower.attack(tower)) {
                logger.debug("⚔️Attack!!");
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
            filter: (structure) => structure.hits < structure.hitsMax - 10
        });
        logger.debug("维护目标：" + damage);
        if (damage) {
            tower.repair(damage);
            return true;
        }
    }
}

module.exports = {
    towerWork: towerWork
};