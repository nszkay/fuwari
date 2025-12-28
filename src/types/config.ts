//·网站配置
/*

类似c++的结构体，定义了网站的基本配置

导入了一些常量类型：AUTO_MODE, DARK_MODE, LIGHT_MODE
定义了SiteConfig类型 - 网站的基本配置
定义了Favicon类型 - 网站图标配置
定义了LinkPreset枚举 - 导航链接预设
定义了NavBarLink类型 - 导航栏链接
定义了NavBarConfig类型 - 导航栏配置
定义了ProfileConfig类型 - 个人资料配置
定义了LicenseConfig类型 - 许可证配置
定义了LIGHT_DARK_MODE类型 - 主题模式
定义了BlogPostData类型 - 博客文章数据
定义了ExpressiveCodeConfig类型 - 代码高亮配置


*/

import type { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants";

export type SiteConfig = 
{
	title: string;
	subtitle: string;

	lang:
		| "en"
		| "zh_CN"
		| "zh_TW"
		| "ja"
		| "ko"
		| "es"
		| "th"
		| "vi"
		| "tr"
		| "id";

	themeColor: {
		hue: number;
		fixed: boolean;
	};
	banner: {
		enable: boolean;
		src: string;
		position?: "top" | "center" | "bottom";
		credit: {
			enable: boolean;
			text: string;
			url?: string;
		};
	};
	toc: {
		enable: boolean;
		depth: 1 | 2 | 3;
	};

	favicon: Favicon[];
};

//·网站图标配置
export type Favicon = {
	src: string;
	theme?: "light" | "dark";
	sizes?: string;
};


// 导航栏链接预设
export enum LinkPreset 
{
	Home = 0,//首页
	Archive = 1,//归档页
	About = 2,//关于页
}


//·导航栏链接配置
export type NavBarLink = {
	name: string;
	url: string;
	external?: boolean;
};

//·导航栏配置
export type NavBarConfig = {
	links: (NavBarLink | LinkPreset)[];
};


//·个人资料配置
export type ProfileConfig = {
	avatar?: string;
	name: string;
	bio?: string;
	links: 
	{
		name: string;
		url: string;
		icon: string;
	}[];
};

//·许可证配置
export type LicenseConfig = {
	enable: boolean;
	name: string;
	url: string;
};


//·主题模式配置
export type LIGHT_DARK_MODE =
	| typeof LIGHT_MODE
	| typeof DARK_MODE
	| typeof AUTO_MODE;


//·博客文章数据
export type BlogPostData = {
	body: string;
	title: string;
	published: Date;
	description: string;
	tags: string[];
	draft?: boolean;
	image?: string;
	category?: string;
	prevTitle?: string;
	prevSlug?: string;
	nextTitle?: string;
	nextSlug?: string;
};


//·代码高亮配置
export type ExpressiveCodeConfig = {
	theme: string;
};
