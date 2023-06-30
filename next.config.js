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
		domains: ['chaarizin-api-6b9b561dda2e.herokuapp.com','chaarizin-blog-6ff1e6396f99.herokuapp.com','http://ec2-13-53-73-34.eu-north-1.compute.amazonaws.com/'],
		remotePatterns: [
			// {
			//   protocol: "https",
			//   hostname: "chaarizin-blog-6ff1e6396f99.herokuapp.com",
			//   port: "",
			//   pathname: "/api",
			// },
			// {
			//   protocol: "https",
			//   hostname: "127.0.0.1",
			//   port: "chaarizin-api-6b9b561dda2e.herokuapp.com",
			//   pathname: "/uploads/**",
			// },
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
			hostname: "scontent-cdg3-1.cdninstagram.com",
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
