'use strict';
'require view';
'require form';
'require uci';

/*
 * Design theme configuration - mirrors the options consumed by
 * luci-theme-design (ucode/template/themes/design/header.ut):
 *
 *   design.global.mode          normal | light | dark
 *   design.global.navbar        display | close
 *   design.global.navbar_proxy  openclash | homeproxy | shadowsocksr | vssr | passwall | passwall2
 *
 * The section is an anonymous `config global` section, hence TypedSection
 * with anonymous = true (NamedSection would look for a *named* "global"
 * section which does not exist in /etc/config/design).
 */
return view.extend({
	load() {
		return uci.load('design');
	},

	render() {
		let m, s, o;

		m = new form.Map('design',
			_('Design Config'),
			_('Here you can set the mode of the theme and change the proxy tool icon in the navigation bar. [Recommend Chrome]'));

		s = m.section(form.TypedSection, 'global');
		s.anonymous = true;
		s.addremove = false;

		o = s.option(form.ListValue, 'mode',
			_('Theme mode'),
			_('You can choose Theme color mode here'));
		o.value('normal', _('Follow System'));
		o.value('light', _('Force Light'));
		o.value('dark', _('Force Dark'));
		o.rmempty = false;

		o = s.option(form.ListValue, 'navbar',
			_('Navigation bar setting'),
			_('The navigation bar is display by default'));
		o.value('display', _('Display navigation bar'));
		o.value('close', _('Close navigation bar'));
		o.rmempty = false;

		o = s.option(form.ListValue, 'navbar_proxy',
			_('Navigation bar proxy'),
			_('OpenClash by default'));
		o.value('openclash', 'openclash');
		o.value('homeproxy', 'homeproxy');
		o.value('shadowsocksr', 'shadowsocksr');
		o.value('vssr', 'vssr');
		o.value('passwall', 'passwall');
		o.value('passwall2', 'passwall2');
		o.rmempty = false;

		return m.render();
	}
});
