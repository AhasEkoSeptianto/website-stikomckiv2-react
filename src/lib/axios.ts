import Axios from 'axios'
import { getCookies } from './cookie';

Axios.defaults.baseURL = 'https://api.example.com';
Axios.defaults.headers.common['Authorization'] = getCookies('auth-token');

const get = async (url: string) => {
	
	var resApi =  [] || null;

	await Axios.get(url)
		.then((res: any) => resApi = res)
		.catch(err => resApi = err);

	
	return resApi;
}

const post = async (url: any, data: any) => {
	
	var resApi = await Axios.post(url, data, {
			headers : {
			  'Content-Type' : 'application/json',
			  'Accept' : 'application/json'
			}})

	return resApi;
}

const GET = async (url: string, params: any) => {
	return await Axios.get(process.env.REACT_APP_ENP_BE + url,{ params: params })
}


const POST = async (url: string, data: any) => {
	return await Axios.post(process.env.REACT_APP_ENP_BE + url, data)
}

const PUT = async (url: string,  params: any, data: any,) => {
	return await Axios.put(process.env.REACT_APP_ENP_BE + url, data, { params: params })
}

const DELETE = async (url: string, params: any) => {
	return await Axios.delete(process.env.REACT_APP_ENP_BE + url, { params: params })
}

export { get, post, GET, POST, PUT, DELETE };