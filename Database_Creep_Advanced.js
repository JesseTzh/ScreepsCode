const OUTERWORLD_CONFIG = require('config.outerworld')
const CONFIG = require('config')
const outerharvester = require('Role_OuterHarvester')
const claimer = require('Role_OuterClaimer')
const outbuilder = require('Role_OuterBuilder')
const outmover = require('Role_OuterMover')
const tank = require('Role_Tank')
const colonist = require('Role_Colonists')
const dismantler = require('Role_Dismantler')
const specialMover = require('Role_SpecialMover')
const remoteupgrader = require('Role_RemoteUpgrader')
const remoteHarvester = require('RemoteHarvester')


module.exports = {
    E6S22: ({
        OuterClaimer_E6S22_1: claimer({
            sourceId: ['5bbcad3a9099fc012e636e4d'],
            targetRoomName: ['E5S22'],
            pathFinderPoint: [[25, 25]]
        }),
        OuterClaimer_E6S22_2: claimer({
            sourceId: ['5bbcad489099fc012e637091', '5bbcad3a9099fc012e636e4d'],
            targetRoomName: ['E6S23', 'E5S22'],
            pathFinderPoint: [[25, 25]]
        }),
    }),
    E8S23: ({
        OuterClaimer_E8S23_1: claimer({
            sourceId: ['5bbcad7b9099fc012e63757c', '5bbcad6c9099fc012e6373f2', '5bbcad7b9099fc012e637581'],
            targetRoomName: ['E9S23', 'E8S24', 'E9S24'],
            pathFinderPoint: [[25, 25]]
        }),
        OuterClaimer_E8S23_2: claimer({
            sourceId: ['5bbcad579099fc012e637263', '5bbcad7b9099fc012e63757c'],
            targetRoomName: ['E7S23', 'E9S23'],
            pathFinderPoint: [[25, 25]]
        }),
    }),

    E9S21: ({
        OuterClaimer_E9S21_1: claimer({
            sourceId: ['5bbcad7a9099fc012e637579', '5bbcad6c9099fc012e6373e8'],
            targetRoomName: ['E9S22', 'E8S21'],
            pathFinderPoint: [[25, 25]]
        }),
    }),

    E8S25: ({

    }),
}