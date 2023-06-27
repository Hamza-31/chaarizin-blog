/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: config => {
		config.ignoreWarnings = [
		  { module: /node_modules\/node-fetch\/lib\/index\.js/ },
		  { file: /node_modules\/node-fetch\/lib\/index\.js/ },
		];
	  
		return config;
	  },
	images: {
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
			hostname: "scontent-cdg2-1.cdninstagram.com",
			port: "",
			pathname: "/v/**",
		  },
		  {
			protocol: "https",
			hostname: "scontent-cdg4-1.cdninstagram.com",
			port: "",
			pathname: "/v/**",
		  },
	
		  {
			protocol: "https",
			hostname: "scontent-cdt1-1.cdninstagram.com",
			port: "",
			pathname: "/v/**",
		  },
		  {
			protocol: "https",
			hostname: "scontent-cdg4-2.cdninstagram.com",
			port: "",
			pathname: "/v/**",
		  },
		  {
			protocol: "https",
			hostname: "scontent-cdg4-3.cdninstagram.com",
			port: "",
			pathname: "/v/**",
		  },
		  {
			protocol: "https",
			hostname: "video-cdt1-1.cdninstagram.com",
			port: "",
			pathname: "/v/**",
		  },
		],
		// domains:[
		// 	"scontent-cdg2-1.cdninstagram.com",
		// 	"scontent-cdg4-1.cdninstagram.com",
		// 	"scontent-cdt1-1.cdninstagram.com",
		// 	"scontent-cdg4-2.cdninstagram.com",
		// 	"scontent-cdg4-3.cdninstagram.com",
		// 	"video-cdt1-1.cdninstagram.com"
		// ]
	  },
}

module.exports = nextConfig
