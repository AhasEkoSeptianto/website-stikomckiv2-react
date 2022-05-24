const changeName = (name: any) => {
	
	if (name.length >= 29) {
		var resMaxName = maxLength(30, name);
		return resMaxName;
	}

	var name = name.split(' ');
	let resName: any = [];
	var space = "";

	// menyimpan value jika ada space tertinggal diakhir, funsi lain dari trim()
	var name = name.filter((el: any, index: any) => {
		if (el == "" && index != 0){
			space = " ";
		}
		return el != "";
	});


	// iterasi
	name.forEach((val: any) =>{
		
		// ubah string menjadi array
		let arrVal = val.split(''); 
		// ubah chart pertama menjadi uppercase
		let upper = val.charAt(0).toUpperCase();
		// hapus array nilai pertama yang akan diganti 
		arrVal.splice(0,1);
		// ubah arr val menjadi string kembali
		arrVal = arrVal.join('');

		let res = upper + arrVal ;
		resName.push(res);

	})

	// concat()
	resName = resName.join(' ');

	return resName + space;
}

var maxLength = (max: any, name: any) => {
	let resName = name.split('');
	resName = resName.splice( 0, max );
	resName = resName.join('');
	return resName;
}

var changeNumberPhone = (number: any) => {
	if (number.charAt(0) === "0") {

		number = "";

		return number;
	}

	var phoneNumb = number.replace(/[^0-9]+/g, "");
	phoneNumb = maxLength(13, phoneNumb);

	return phoneNumb;
}

export { 
	changeName,
	maxLength,
	changeNumberPhone,
}