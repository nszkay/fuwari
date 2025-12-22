import { type CollectionEntry, getCollection } from "astro:content";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { getCategoryUrl } from "@utils/url-utils.ts";







// // Retrieve posts and sort them by publication date

/**
 * getRawSortedPosts() 是 Fuwari 博客主题中文章数据管理的基
 * 础函数，它实现了环境感知的文章获取和按发布日期排序的功能，为博客
 * 的文章列表、归档页等功能提供了核心数据支持。
 *  
 * 
 */
async function getRawSortedPosts() {
	const allBlogPosts = await getCollection("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	const sorted = allBlogPosts.sort((a, b) => {
		const dateA = new Date(a.data.published);
		const dateB = new Date(b.data.published);
		return dateA > dateB ? -1 : 1;
	});
	return sorted;
}










/**
 * 
 * 
 * getSortedPosts() 是 Fuwari 博客主题中的一个核心工具函数，
 * 它扩展了基础文章列表，为每篇文章添加了前后导航功能，使文章之
 * 间可以相互链接，提升用户阅读体验。
 * 
 * 
 * 
 */

export async function getSortedPosts() {
	// 获取原始排序的文章列表
	const sorted = await getRawSortedPosts();

	// 为每篇文章添加前一篇文章的信息
	for (let i = 1; i < sorted.length; i++) 
	{
		sorted[i].data.nextSlug = sorted[i - 1].slug;
		sorted[i].data.nextTitle = sorted[i - 1].data.title;
	}
	// 为每篇文章添加后一篇文章的信息
	for (let i = 0; i < sorted.length - 1; i++) 
	{
		sorted[i].data.prevSlug = sorted[i + 1].slug;
		sorted[i].data.prevTitle = sorted[i + 1].data.title;
	}

	return sorted;
}




export type PostForList = {
	slug: string;
	data: CollectionEntry<"posts">["data"];
};








/**
 * getSortedPostsList() 是 Fuwari 博客主题中的一个工具函数，
 * 用于获取精简版的博客文章列表数据。它从完整的文章数据中提取必要
 * 信息，用于博客中的列表展示场景，如首页、归档页、分类页等。
 * 
 * 
 * 
 */

export async function getSortedPostsList(): Promise<PostForList[]> 
{

	//获取原始排序的文章列表
	const sortedFullPosts = await getRawSortedPosts();

	// delete post.body
	// 从每篇文章中提取必要信息，用于列表展示
	const sortedPostsList = sortedFullPosts.map
	(
		(post) => 
		(
			{
				slug: post.slug,
				data: post.data,
			}
		)
	);


	return sortedPostsList;
}





export type Tag = {
	name: string;
	count: number;
};














export async function getTagList(): Promise<Tag[]> {
	const allBlogPosts = await getCollection<"posts">("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	const countMap: { [key: string]: number } = {};
	allBlogPosts.forEach((post: { data: { tags: string[] } }) => {
		post.data.tags.forEach((tag: string) => {
			if (!countMap[tag]) countMap[tag] = 0;
			countMap[tag]++;
		});
	});

	// sort tags
	const keys: string[] = Object.keys(countMap).sort((a, b) => {
		return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	return keys.map((key) => ({ name: key, count: countMap[key] }));
}

export type Category = {
	name: string;
	count: number;
	url: string;
};

export async function getCategoryList(): Promise<Category[]> {
	const allBlogPosts = await getCollection<"posts">("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});
	const count: { [key: string]: number } = {};
	allBlogPosts.forEach((post: { data: { category: string | null } }) => {
		if (!post.data.category) {
			const ucKey = i18n(I18nKey.uncategorized);
			count[ucKey] = count[ucKey] ? count[ucKey] + 1 : 1;
			return;
		}

		const categoryName =
			typeof post.data.category === "string"
				? post.data.category.trim()
				: String(post.data.category).trim();

		count[categoryName] = count[categoryName] ? count[categoryName] + 1 : 1;
	});

	const lst = Object.keys(count).sort((a, b) => {
		return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	const ret: Category[] = [];
	for (const c of lst) {
		ret.push({
			name: c,
			count: count[c],
			url: getCategoryUrl(c),
		});
	}
	return ret;
}
