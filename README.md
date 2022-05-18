启动 docker，开启 postgres 容器：

```bash
docker-compose start -d
```

如果想进入 `psql`:

```bash
docker-compose exec psql psql -U postgres
```

运行项目：

1. Run `pnpm i` command
2. Run `pnpm dev` command
