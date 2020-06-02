# Screeps Code

尝试用拙劣的代码模仿出一个自己的自适应Screeps AI

### 功能实现

- [x] Creep工作配置文件化
- [x] Creep模板可通过Config或自适应生成
- [x] 基础的Log功能
- [x] 能量平衡系统初步完善
- [x] 外矿功能初步实现
- [x] Ai入侵监测并自动攻击
- [x] 商品生产、交易初步实现

### 使用说明

1. 修改 [config.js](./config.js) 文件中为自己的建筑、矿点ID，请注意同时填入自己的房间名。例如

   ```
   //能量矿点 ID
   ENERGY_SOURCE: ({
           房间名: ['矿点ID', '矿点ID']
       }),
   ```
   如是开局状态，仅修改 ENERGY_SOURCE 、SPAWN 、 UPGRADE_ENERGY_SOURCE 即可

2. 在 [config.creep.template.js](./config.creep.template.js) 中将Creep模板配置为适合当前Rcl等级的模板，如刚开局可配置为：

   ```
   Harvester_01: ({
           genMode: "Config", 
           partsSet: [[WORK, 1], [MOVE, 2], [CARRY, 1]],
           spawnName: "首个基地名称",
           roomName: "房间名"
       }),
   ```
    开局状态下仅配置 Harvester 以及 Upgrader 即可，Mover 一般在 RCL 4级有 Link 之后再行配置

3. 在 [config.creep.js](./config.creep.js) 文件中根据自己房间的情况调配各Creep工种与工作目标

4. 即刻开始！

### 最后

[Log](./utils.log.js) 模块来自 [PY](https://github.com/zhpjy/screeps)