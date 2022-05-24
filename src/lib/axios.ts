import Axios from 'axios'

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

export { get, post };