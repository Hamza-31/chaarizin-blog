import Axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { cookies } from "next/dist/client/components/headers";
// import { store } from "../store";
// const { getState } = store;
interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
	headers: AxiosRequestHeaders
}
const axios = Axios.create({
	baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
	headers: {
		"Content-Type": "application/json",
		"Cache-Control": "no-cache",
		"Access-Control-Allow-Origin": "*",
	},
	timeout: 3000,
});

let accessToken = ""
export const setAccessToken = async (token: string) => {
	accessToken = token
}

let csrfToken = ""
export const setCsrfToken = async () => {
	const nextCookies = cookies();
	const token = nextCookies.get('next-auth.csrf-token')?.value || ""
	csrfToken = token;

}

axios.interceptors.request.use(async (config: AdaptAxiosRequestConfig) => {
	// const accessToken = sessionStorage.getItem('next-auth.session-token')
	// const session = await getServerSession(authOptions);
	// const nextCookies = cookies();
	// const accessToken = nextCookies.get('next-auth.session-token')?.value

	if ((config.method === "post" || config.method === "put" || config.method === "delete") && csrfToken) {
		config.headers['X-CSRF-TOKEN'] = csrfToken;
	}
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});
axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.log(`Axios Response Error`, error.response.data);
		return error.response.data
	}
);
export default axios;
