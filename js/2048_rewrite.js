//2048代码重构
//操作数组，然后加样式，尽量减少操作dom次数

//开始返回一个都为零的二维数组,通过按键改变数组的值返回
function centerArr() {
	var arr = [];
	for(let i = 0; i < 6; i++) {
		arr[i] = new Array();
		for(let j = 0; j < 6; j++) {
			arr[i][j] = 1;
		}
	}

	//按键改变数组的值
	document.onkeydown = function() {
		let key = event || window.event;
		if(key.keyCode == 37) { //向左移动
			for(let i = 4; i >= 1; i--) {
				for(let k = 5; k > 1; k--) {
					for(let j = 5; j > 1; j--) {
						if(arr[j - 1][i] == 0 || arr[j - 1][i] == arr[j][i]) {
							arr[j - 1][i] = arr[j - 1][i] + arr[j][i];
							arr[j][i] = 0;
						}
					}
				}
			}
		}
	}

	return arr;
}

function oprNum(arr) {
	for(let i = 4; i >= 1; i--) {
		for(let k = 5; k > 1; k--) {
			for(let j = 5; j > 1; j--) {
				if(arr[j - 1][i] == 0 || arr[j - 1][i] == arr[j][i]) {
					arr[j - 1][i] = arr[j - 1][i] + arr[j][i];
					arr[j][i] = 0;
				}
			}
		}
	}
	console.log(arr);
}

function container() {
	var arrBox = [];
	var arr = centerArr();
	for(let i = 0; i < 6; i++) {
		arrBox[i] = new Array();
		for(let j = 0; j < 6; j++) {
			let box = createBox();
			arrBox[i][j] = box;
			box.style.left = 10 * i + 113 * (i - 1) + 'px';
			box.style.top = 10 * j + 113 * (j - 1) + 'px';
			box.getElementsByTagName('span')[0].innerHTML = arr[i][j];
		}
	}
}
container();

//生成格子
function createBox() {
	var Odiv = document.createElement('div');
	var Ospan = document.createElement('span');
	Odiv.setAttribute('class', 'move-box');
	Odiv.style.cssText = 'width:113px;height:113px;border-radius: 5px;position: absolute;';
	Ospan.style.cssText = 'font-size:65px;font-weight: 700;line-height:113px;width:113px;height:113px;' +
		'display:inline-block;border-radius: 5px;text-align: center;';
	Odiv.appendChild(Ospan);
	box.appendChild(Odiv);
	return Odiv;
}