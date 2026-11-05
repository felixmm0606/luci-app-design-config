# luci-app-design-config

[![Release](https://img.shields.io/github/release/gngpp/luci-app-design-config.svg?style=flat)](https://github.com/gngpp/luci-app-design-config/releases)
[![Downloads](https://img.shields.io/github/downloads/gngpp/luci-app-design-config/total?style=flat)](https://github.com/gngpp/luci-app-design-config/releases)

Design Theme Config Plugin.

## Features

- Support changing theme dark/light mode.
- Support showing/hiding the navbar.
- Support replacing commonly used proxy icons.

## Layout

```text
htdocs/luci-static/resources/view/design-config.js      LuCI JS view (form.Map)
root/usr/share/luci/menu.d/luci-app-design-config.json  menu entry (admin/system/design-config)
root/etc/config/design                                  UCI defaults (`config global`)
root/usr/share/rpcd/acl.d/luci-app-design-config.json   UCI ACL for the `design` package
```

The page is a plain LuCI JS view: no Lua templates, no `luci-compat`, and no `luci-lua-runtime` dependency.

It lives at **System → Design Config**:

```text
/cgi-bin/luci/admin/system/design-config
```

The UCI options it edits are exactly the ones read by `luci-theme-design`'s ucode templates.

## UCI options

| Option | Values | Theme behaviour |
| --- | --- | --- |
| `design.global.mode` | `normal` / `light` / `dark` | `normal` follows `prefers-color-scheme`; otherwise sets `data-theme=<value>` |
| `design.global.navbar` | `display` / `close` | Anything other than `display` hides the bottom navbar (`--vssrBottom: 0px`) |
| `design.global.navbar_proxy` | `openclash` / `homeproxy` / `shadowsocksr` / `vssr` / `passwall` / `passwall2` | Link target of the proxy icon; only `openclash` has its own icon, all other values use `images/ssr.png` |

## Menu visibility

The menu entry only appears when the Design theme is installed:

```text
/www/luci-static/design/css/style.css
```

## Compile

```bash
git clone https://github.com/gngpp/luci-app-design-config.git package/luci-app-design-config
make menuconfig # 选择 LUCI -> Applications -> luci-app-design-config
make V=s
```
