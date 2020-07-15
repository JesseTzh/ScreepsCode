const harvester = require('Role_Harvester')
const upgrader = require('Role_Upgrader')
const builder = require('Role_Builder')
const mover = require('Role_Mover')
const miner = require('Role_Miner')
const guard = require('Role_Guard')

module.exports = {
    E6S22: ({
        Harvester_E6S22_0: harvester,
        Harvester_E6S22_1: harvester,
        Mover_E6S22_1: mover,
        Mover_E6S22_2: mover,
        Upgrader_E6S22_1: upgrader,
        Builder_E6S22: builder,
        ResidentDefender_E6S22: guard,
        Miner_01: miner,
    }),

    E8S23: ({
        Harvester_E8S23_0: harvester,
        Harvester_E8S23_1: harvester,
        Mover_03: mover,
        Upgrader_E8S23_1: upgrader,
        Builder_E8S23: builder,
        ResidentDefender_E8S23: guard,
        Miner_03: miner,
    }),

    E9S21: ({
        Harvester_E9S21_0: harvester,
        Harvester_E9S21_1: harvester,
        Mover_02: mover,
        Upgrader_E9S21_1: upgrader,
        Builder_E9S21: builder,
        ResidentDefender_E9S21: guard,
        Miner_02: miner,
    }),

    E8S25: ({
        Harvester_E8S25_0: harvester,
        Harvester_E8S25_1: harvester,
        Mover_E8S25: mover,
        Upgrader_E8S25_1: upgrader,
        Upgrader_E8S25_2: upgrader,
        Builder_E8S25: builder,
        Miner_04: miner,
    }),
}