// cookies
import Cookies from "universal-cookie";

var cookies = new Cookies();

const getCookies = (cookieName: string) => {
	let rescookies = cookies.get(cookieName);
	return rescookies;
}

const setCookies = (bareer: any, val: any) => {
	let rescookies = cookies.set(bareer, val, { path:'/', sameSite:'none' , secure:true })
	return rescookies
} 

const getAllCookies = () => {
	let rescookies = cookies.getAll();
	return rescookies;
}

const removeCookies = (cookieName: string) => {
	let rescookies = cookies.remove(cookieName);
	return removeCookies;
}


export {
	getCookies,
	setCookies,
	getAllCookies,
	removeCookies,
}