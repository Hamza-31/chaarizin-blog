/** @type {import('next').NextConfig} */
require('dotenv').config()
const { loadEnvConfig } = require("@next/env");
loadEnvConfig(process.env.NEXT_PUBLIC_STRAPI_API_URL);

const nextConfig = {
	env: {
		ROOT: __dirname,
	  },
	publicRuntimeConfig: {
		url: process.env.NEXT_PUBLIC_STRAPI_API_URL,
	  },
	  async redirects() {
		return [
		  {
			source: "/user",
			destination: "/",
			permanent: true,
		  },
		];
	  },
	webpack: config => {
		config.ignoreWarnings = [
		  { module: /node_modules\/node-fetch\/lib\/index\.js/ },
		  { file: /node_modules\/node-fetch\/lib\/index\.js/ },
		];
	  
		return config;
	  },
	images: {
		domains: [
			'chaarizin-api-bucket.s3.eu-west-3.amazonaws.com',
			'chaarizin-api-6b9b561dda2e.herokuapp.com',
			'chaarizin-blog-6ff1e6396f99.herokuapp.com',
			'http://ec2-13-53-73-34.eu-north-1.compute.amazonaws.com/'],
		remotePatterns: [
		  {
			protocol: "http",
			hostname: "localhost",
			port: "3000",
			pathname: "/api",
		  },
		  {
			protocol: "http",
			hostname: "127.0.0.1",
			port: "1337",
			pathname: "/uploads/**",
		  },
		  {
			protocol: "https",
			hostname: "**.cdninstagram.com",
			port: "",
			pathname: "/v/**",
		  },
		],
	  },
}

module.exports = nextConfig
