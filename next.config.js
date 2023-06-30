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
