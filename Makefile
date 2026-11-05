include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-design-config
PKG_VERSION:=1.3
PKG_RELEASE:=20261103

PKG_MAINTAINER:=gngpp <gngppz@gmail.com>

LUCI_TITLE:=LuCI page for Design Config
LUCI_PKGARCH:=all
LUCI_DEPENDS:=+luci-base

define Package/$(PKG_NAME)/conffiles
/etc/config/design
endef

# The package ships an rpcd ACL file.  Reload rpcd and drop the LuCI caches so
# the new menu entry and ACL are usable right after installation.
define Package/$(PKG_NAME)/postinst
#!/bin/sh
[ -n "$${IPKG_INSTROOT}" ] || {
	rm -f /tmp/luci-indexcache.*
	rm -rf /tmp/luci-modulecache/
	/etc/init.d/rpcd reload 2>/dev/null
}
exit 0
endef

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
