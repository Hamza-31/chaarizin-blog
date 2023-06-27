
export interface BaseCollection {
	sort: string;
	status: string;
	user_created: string;
	date_created: string;
	user_updated: string;
	date_updated: string;
}

export interface Article extends BaseCollection {
	id: number;
	category: number;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	subtitle: string;
	content: string;
	excerpt: string;
	postImage: string;
	slug: string;
	title: string;
};

export type Collections = {
	article: Article;
};