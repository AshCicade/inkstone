---
title: Job与JobDetail
createTime: 2025/02/13 10:15:22
permalink: /quartz/g2ngt30o/
---

## 创建Job和JobDetail
一个 job 就是一个实现了 Job 接口的类，该接口只有一个方法：

Job 接口：
```java
package org.quartz;

public interface Job {

  public void execute(JobExecutionContext context)
    throws JobExecutionException;
}
```

JobDetail实例是通过JobBuilder类创建的:
```java
import static org.quartz.JobBuilder.*;

// 定义JobDetail实例，和具体要执行的Job关联
JobDetail job = newJob(HelloJob.class)
  .withIdentity("myJob", "group1")
  .build();

```

每次调度容器执行Job时，在调用其execute(…)方法之前都会创建该类的一个新的实例，执行完毕，对该实例的引用就被丢弃了，实例会被垃圾回收。该调度策略引申出两个要求：
- 当使用默认的JobFactory时，Job必须有一个无参的构造函数。若使用自定义的JobFactory另说。
- Job类中不应该定义有状态的数据属性，因为在Job的多次执行中，这些数据不会保留。

## 同一个Job定义之间传递属性

### JobDataMap
上面提到Job类中不应该定义有状态的数据属性，那我们如何在Job的多次执行中跟踪Job的状态呢？JobDetail对象的JobDataMap属性。
在构建JobDetail时，将数据放在JobDataMap中
```java
  // 创建JobDetail对象将其和DumbJob关联
JobDetail job = newJob(DumbJob.class)
  .withIdentity("myJob", "group1") // 名称 "myJob", 组号 "group1"
  .usingJobData("jobSays", "Hello World!")
  .usingJobData("myFloatValue", 3.141f)
  .build();
```

在Job的执行过程中，从JobDataMap中取出数据
```java
public class DumbJob implements Job {

  public DumbJob() {
  }

  public void execute(JobExecutionContext context)
    throws JobExecutionException
  {
    JobKey key = context.getJobDetail().getKey();

    JobDataMap dataMap = context.getJobDetail().getJobDataMap();

    String jobSays = dataMap.getString("jobSays");
    float myFloatValue = dataMap.getFloat("myFloatValue");

    System.err.println("Instance " + key + " of DumbJob says: " + jobSays + ", and val is: " + myFloatValue);
  }
}
```

### 属性的自动注入
默认的JobFactory实现（**`org.quartz.simpl.PropertySettingJobFactory`**），newJob方法中：
1. 调用Job类的newInstance()方法
2. 尝试获取Job类中的属性对应的setter方法，将JobDataMap中的对应的key的value值注入其中

所以在Job类中定义属性和set方法，Quartz的默认JobFactory实现在job被实例化的时候会自动调用这些set方法，这样你就不需要在execute()方法中显式地从map中取数据了。

JobFactory实现数据的自动“注入”，则示例代码为：
```java
public class DumbJob implements Job {


  String jobSays;
  float myFloatValue;
  ArrayList state;

  public DumbJob() {
  }

  public void execute(JobExecutionContext context)
    throws JobExecutionException
  {
    JobKey key = context.getJobDetail().getKey();

    JobDataMap dataMap = context.getMergedJobDataMap();  // Note the difference from the previous example

    state.add(new Date());

    System.err.println("Instance " + key + " of DumbJob says: " + jobSays + ", and val is: " + myFloatValue);
  }

  public void setJobSays(String jobSays) {
    this.jobSays = jobSays;
  }

  public void setMyFloatValue(float myFloatValue) {
    this.myFloatValue = myFloatValue;
  }

  public void setState(ArrayList state) {
    this.state = state;
  }

}
```

## Job状态与并发

### @DisallowConcurrentExecution
将该注解加到Job类上，告诉Quartz不要并发地执行同一个job定义（这里指特定的job类）的多个实例。这里只针对同一个Job定义，对于不同的Job定义可以并发执行，所以该限制是针对JobDetail的。

###  @PersistJobDataAfterExecution
将该注解加在Job类上，告诉Quartz在成功执行了job类的execute方法后（没有发生任何异常），更新JobDetail中JobDataMap的数据，使得该Job（即JobDetail）在下一次执行的时候，JobDataMap中是更新后的数据，而不是更新前的旧数据。

如果你使用了@PersistJobDataAfterExecution注解，我们强烈建议你同时使用@DisallowConcurrentExecution注解，因为当同一个Job（JobDetail）的两个实例被并发执行时，由于竞争，JobDataMap中存储的数据很可能是不确定的。