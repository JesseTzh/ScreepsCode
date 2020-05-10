# Screeps Code

尝试用拙劣的代码模仿出一个自己的自适应Screeps AI

### 功能实现

- [x] Creep工作配置文件化
- [x] Creep模板自适应生成
- [x] 基础的Log功能
- [ ] 能量平衡系统（还在优化）

### 使用说明

1. 打开[config.js](./config.js)文件，并将其中的

   ```
   //能量矿点 ID
   ENERGY_SOURCE: ['5bbcad489099fc012e63708d','5bbcad489099fc012e63708f'],
   ```

   修改为自己的矿点ID，以及将

   ```
   //升级 Controller 所用的能量来源
   UPGRADE_ENERGY_SOURCE: ['5eb569554dac05ff668051db'],
   ```

   修改为自己Spawn的ID

2. 将 [config.system.setting.js](./config.system.setting.js) 中的

   ```
   //默认基地名称
   SPAWN_NAME: "Home",
   ```

   改为自己的Spawn名称，并将

   ```
   //是否按照已铺好Road的情况生成Creep
   ROAD_FLAG: true,
   ```

   修改为false，以保证Creep按照没有铺设Road的情况生成孵化模板

3. 在 [config.creep.js](./config.creep.js) 文件中根据自己房间的情况调配各Creep工种个数

4. 即刻开始！

### 最后

[Log](https://github.com/zhpjy/screeps) 模块来自 [PY](https://github.com/zhpjy)