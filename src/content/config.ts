/**
 *
 * 使用Astro的内容集合API
 * 引入Zod库进行数据验证
 *
 * 文章集合配置
 * 定义文章的字段和验证规则
 *
 *
 *
 */

import { defineCollection, z } from "astro:content";

/* Posts Collection */

/*


 字段说明
字段			类型			必需			默认值			说明
title			string			✅			-				文章标题
published		date			✅			-				发布日期
updated			date			❌			-				更新日期
draft			boolean			❌			false			草稿状态
description		string			❌			""				文章描述
image			string			❌			""				封面图片路径
tags			string[]		❌			[]				标签数组
category		string			❌			""				分类（可空）
lang			string			❌			""				语言代码



 */
const postsCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().nullable().default(""),
		lang: z.string().optional().default(""),

		/* For internal use */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});
const specCollection = defineCollection({
	schema: z.object({}),
});

// 导出所有集合定义，供Astro内容API使用。
export const collections = {
	posts: postsCollection,
	spec: specCollection,
};

// 导出所有集合定义，供Astro内容API使用。
