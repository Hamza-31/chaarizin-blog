
const starpiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
export function getAssetURL(url: string) {
	if (!url) return null;
	return `${starpiUrl}${url}`;
}
