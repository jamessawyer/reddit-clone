启动 docker，开启 postgres 容器：

```bash
docker-compose start -d
```

如果想进入 `psql`:

```bash
# -u postgres 表示是 连接 postgres 的用户名
# reddie-postgres 是 container 名称 定义在 docker-compose.yml 中的 container_name 字段
# psql 执行命令
docker exec -it -u postgres reddit-postgres psql

# 显示数据库
\l

# 连接到指定的数据库
\c reddit

# 显示reddit数据库中的表
\d

# 查看users表结构
\d users

# 显示表中数据
select * from users;
```

如果不清楚 `psql` 命令，可以使用帮助命令查看

```bash
\?
```

退出 `psql`:

```bash
exit
```

运行项目：

1. Run `pnpm i` command
2. Run `pnpm dev` command
