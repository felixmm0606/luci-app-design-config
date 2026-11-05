# luci-app-design-config

[![Release](https://img.shields.io/github/release/felixmm0606/luci-app-design-config.svg?style=flat)](https://github.com/felixmm0606/luci-app-design-config/releases)
[![Downloads](https://img.shields.io/github/downloads/felixmm0606/luci-app-design-config/total?style=flat)](https://github.com/felixmm0606/luci-app-design-config/releases)

Design 主题配置插件。

> [!IMPORTANT]
> 本仓库 `ucode` 分支为主要开发分支，已从 Lua CBI 迁移为纯 LuCI JS 视图，**不再依赖 `luci-compat` 和 `luci-lua-runtime`**。`master` 分支保留旧版 Lua 实现仅供参考。

## 功能

- 支持更改主题深色/浅色模式。
- 支持显示/隐藏导航栏。
- 支持更换常用的代理图标。

## 分支说明

| 分支 | 视图技术 | 运行时依赖 | 说明 |
| --- | --- | --- | --- |
| `ucode` (推荐) | LuCI JS (`form.Map`) | `luci-base` | 适用于官方 OpenWrt 23.05+、ImmortalWrt 及现代 LuCI master 架构 |
| `master` | Lua CBI (`SimpleForm`) | `luci-compat` + `luci-lua-runtime` | 旧版，适用于早期基于 Lua 的 OpenWrt 18.06 / 旧版 LEDE 固件 |

## 文件布局

```text
htdocs/luci-static/resources/view/design-config.js      LuCI JS 视图 (form.Map)
root/usr/share/luci/menu.d/luci-app-design-config.json  菜单入口 (admin/system/design-config)
root/etc/config/design                                  UCI 默认配置 (`config global`)
root/usr/share/rpcd/acl.d/luci-app-design-config.json   UCI ACL (`design` 包)
```

页面使用纯 LuCI JS 视图实现：无 Lua 模板、无 `luci-compat`、无 `luci-lua-runtime` 依赖。

位于 **系统 → Design Config**：

```text
/cgi-bin/luci/admin/system/design-config
```

编辑的 UCI 选项与 `luci-theme-design` 的 ucode 模板读取的完全一致。

## UCI 选项

| 选项 | 可选值 | 主题行为 |
| --- | --- | --- |
| `design.global.mode` | `normal` / `light` / `dark` | `normal` 跟随 `prefers-color-scheme`；否则设置 `data-theme=<value>` |
| `design.global.navbar` | `display` / `close` | 非 `display` 时隐藏底部导航栏 (`--vssrBottom: 0px`) |
| `design.global.navbar_proxy` | `openclash` / `homeproxy` / `shadowsocksr` / `vssr` / `passwall` / `passwall2` | 代理图标的链接目标；仅 `openclash` 有独立图标，其余使用 `images/ssr.png` |

## 菜单可见性

菜单仅在 Design 主题安装后显示，依赖文件检测：

```text
/www/luci-static/design/css/style.css
```

## 编译

```bash
# 使用 ucode 分支
git clone -b ucode https://github.com/felixmm0606/luci-app-design-config.git package/luci-app-design-config
make menuconfig # 选择 LUCI -> Applications -> luci-app-design-config
make V=s
```

## 致谢

- 上游仓库：[0x676e67/luci-app-design-config](https://github.com/0x676e67/luci-app-design-config)
