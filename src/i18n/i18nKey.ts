enum I18nKey 
{
	home = "home",//首页
	about = "about",//关于
	archive = "archive",//归档
	search = "search",//搜索

	tags = "tags",//标签
	categories = "categories",//分类
	recentPosts = "recentPosts",//最新文章

	comments = "comments",//评论

	untitled = "untitled",//未命名
	uncategorized = "uncategorized",//未分类
	noTags = "noTags",//暂无标签

	wordCount = "wordCount",//单词数
	wordsCount = "wordsCount",//单词数（复数）
	minuteCount = "minuteCount",//分钟数
	minutesCount = "minutesCount",//分钟数（复数）
	postCount = "postCount",//文章数
	postsCount = "postsCount",//文章数（复数）

	themeColor = "themeColor",//主题颜色

	lightMode = "lightMode",//亮色模式
	darkMode = "darkMode",//暗色模式
	systemMode = "systemMode",//系统模式

	more = "more",//更多

	author = "author",//作者
	publishedAt = "publishedAt",//发布时间
	license = "license",//许可证
}

export default I18nKey;	//导出枚举


/**



TypeScript


enum I18nKey {
    home = "home",
    about = "about",
    // ... 其他枚举成员
}

export default I18nKey;


enum：TypeScript 关键字，用于定义枚举类型
I18nKey：枚举类型的名称，遵循驼峰命名法（首字母大写）
枚举内部是一系列的键值对



// 导入枚举
import I18nKey from '../i18n/i18nKey';
// 导入翻译函数
import { i18n } from '../i18n/translation';

// 使用方式
const commentsText = i18n(I18nKey.comments); // 获取"评论"的翻译文本



 */