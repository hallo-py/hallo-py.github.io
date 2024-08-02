function findarg(search,arg){
	let find = new RegExp(arg+"=(.+)").exec(search);
	if (!find){
		find = new RegExp(arg+"=(.+)&").exec(search);
	}
	if (find){
		return find[1];
	} else {
		return null;
	}
}