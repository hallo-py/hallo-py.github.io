function sleep(ms){
	return new Promise(resolve=>setTimeout(resolve,ms))
}

var myIntroductionList=["你好！","我是Python虫","这里是我的个人博客","我初中啦!","我是一个热爱编程的中学生"]
var tag=document.querySelector("span#text")
var cursor=document.querySelector("span#cursor")

let index=0;

async function write(time){
	if (index>=myIntroductionList.length){
		index=0;
	}
	let strlen=myIntroductionList[index].length
	for (let j=0;j<strlen;j++){
		tag.textContent+=myIntroductionList[index][j]
		await sleep(500)
	}
	await flicker(1000)
	for (let j=strlen-1;j>=0;j--){
		tag.textContent=tag.textContent.slice(0,j)
		await sleep(100)
	}
	index++;
	await flicker(1000)
	window.requestAnimationFrame(write)
}

async function flicker(time){
	await sleep(450)
	cursor.textContent=" "
	await sleep(450)
	cursor.textContent="|"
	await sleep(300)
}

window.onload= async function(){
	flicker(1000)
	await sleep(1000)
	window.requestAnimationFrame(write)
}
