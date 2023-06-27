import Axios from "axios";


const axiosClient = Axios.create({
	headers: {
		"Content-Type": "application/json",
		"Cache-Control": "no-cache",
		"Access-Control-Allow-Origin": true,
	},
	timeout: 3000,
});
export default axiosClient