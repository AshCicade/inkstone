
## 常用属性
- jobKey：和触发器关联的Job身份。
- startTime：触发器生效时间点。
- endTime：触发器失效时间点。
- priority：优先级。
- misfire：错过触发。
- calendar：日历示例，Quartz的Calendar对象可以在定义和存储trigger的时候与trigger进行关联。Calendar用于从trigger的调度计划中排除时间段。

## SimpleTrigger
### 作用
在具体的时间点执行一次，或者在具体的时间点执行，并且以指定的间隔重复执行若干次。

### SimpleTrigger Misfire策略
#### MISFIRE_INSTRUCTION_FIRE_NOW
1. 若触发器为“一次性”（非重复）触发器或**REPEAT_COUNT == 0**，则在当前时刻立即触发一次。
2. 若触发器 **REPEAT_COUNT > 0** ，则机制同 **MISFIRE_INSTRUCTION_RESCHEDULE_NOW_WITH_REMAINING_REPEAT_COUNT**。

#### MISFIRE_INSTRUCTION_RESCHEDULE_NOW_WITH_EXISTING_REPEAT_COUNT
在当前时刻立即触发一次（即使关联的Calendar排除了“现在”），并以当前时刻作为起始时间，按照触发间隔依次往后触发，总触发次数不变，也就是Trigger的FINAL_FIRE_TIME会往后移。

#### MISFIRE_INSTRUCTION_RESCHEDULE_NOW_WITH_REMAINING_REPEAT_COUNT
#### MISFIRE_INSTRUCTION_RESCHEDULE_NEXT_WITH_REMAINING_COUNT
#### MISFIRE_INSTRUCTION_RESCHEDULE_NEXT_WITH_EXISTING_COUNT
