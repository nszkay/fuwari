//前端设置
/*

在./config.ts文件中，定义了网站的基本配置，包括网站标题、副标题、语言、主题颜色、横幅图片、目录索引等。

自己在config.ts补充信息，设置前端个人资料
*/

import type {
	ExpressiveCodeConfig, //代码高亮配置
	LicenseConfig, //许可证配置
	NavBarConfig, //导航栏配置
	ProfileConfig, //个人资料配置
	SiteConfig, //网站配置
} from "./types/config";

import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "nszkay", //网站标题
	subtitle: "nszkay", //网站副标题
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: false,
		src: "assets/images/demo-banner.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		// {
		//   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
		//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		// }
	],
};

//导航栏设置
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,

		// {
		// 	name: "GitHub",
		// 	url: "https://github.com/saicaca/fuwari", // Internal links should not include the base path, as it is automatically added
		// 	external: true, // Show an external link icon and will open in a new tab
		// },
	],
};

//左侧个人信息，头像设置
export const profileConfig: ProfileConfig = {
	avatar: "assets/images/头像.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "nszkay",
	bio: "my name is nszkay, a student in Nanjing University of Science and Technology.",
	links: [
		{
			name: "bilibili",
			icon: "fa6-brands:bilibili", // Visit https://icones.js.org/ for icon codes
			// You will need to install the corresponding icon set if it's not already included
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://space.bilibili.com/3493092309076122",
		},
		{
			name: "Steam",
			icon: "fa6-brands:steam",
			url: "https://store.steampowered.com",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/nszkay",
		},
	],
};

//开源协议
export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

//代码块高亮设置
export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
