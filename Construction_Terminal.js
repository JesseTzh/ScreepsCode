const logger = require('utils.log').getLogger("Construction.Terminal");
const CONFIG = require('config')

function terminalWork() {
    const terminal = Game.getObjectById('5ec894626cfcf42a53807c7c');
    const amountToSell = 1000, maxTransferEnergyCost = 500;
    const orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ZYNTHIUM_BAR});

    for (let i = 0; i < orders.length; i++) {
        if(orders[i].price <= 0.5){
            continue;
        }
        const transferEnergyCost = Game.market.calcTransactionCost(
            amountToSell, 'E6S22', orders[i].roomName);

        if (transferEnergyCost < maxTransferEnergyCost) {
            const result = Game.market.deal(orders[i].id, amountToSell, "E6S22");
            if(result === OK){
                logger.info("交易成功，交易单价为：" + orders[i].price)
            }
            break;
        }
    }
}

module.exports = {
    terminalWork: terminalWork
};