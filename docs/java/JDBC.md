
## 快速入门

### 步骤
1. 注册驱动
2. 获取连接
3. 定义SQL语句
4. 获取执行SQL对象
5. 执行SQL
6. 处理返回结果
7. 释放资源

### 代码示例：
```java
import java.sql.Connection;
import java.sql.Statement;
import java.sql.DriverManager;
import java.sql.ResultSet;

public class JDBC {
    /**
     * JDBC快速入门
     */
    public static void main(String[] args) throws Exception {
        //1. 注册驱动
        Class.forName("com.mysql.jdbc.Driver");
        //2. 获取连接
        String url = "jdbc:mysql://127.0.0.1:3306/test?useSSL=false";
        String username = "root";
        String password = "root";
        Connection conn = DriverManager.getConnection(url, username, password);
        //3. 定义sql
        String sql = "select * from user";
        //4. 获取执行sql的对象 Statement
        Statement stmt = conn.createStatement();
        //5. 执行sql
        ResultSet rst = stmt.executeQuery(sql);//受影响的行数
        //6. 处理结果
        while(rst.next()){
            System.out.println(
                    rst.getInt(1)+"\t"+
                            rst.getString(2)+"\t"+
                            rst.getInt(3)
            );
        }
        //7. 释放资源
        stmt.close();
        conn.close();
    }
}
```

## JDBC API详解

### DriverManager（驱动管理器）
#### 作用
1. 注册驱动
2. 获取数据库连接

### Connection（数据库连接对象）
#### 作用
1. 获取执行SQL对象
2. 事务管理

### Statement（执行SQL对象）
#### 作用
1. 执行SQL语句

#### PreparedStatement
1. 预防SQL注入问题

### ResultSet（结果集对象）
#### 作用
1. 封装了SQL查询语句的结果