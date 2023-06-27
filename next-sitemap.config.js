/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.NEXT_PUBLIC_CHAARIZIN_URL || "http://127.0.0.1:3000",
	generateRobotsTxt:true,
	generateIndexSitemap:false
}