//bug记录:
//1)累加不是逐次累加,比如 [4,2,2,0]会左滑动成[8,0,0,0]; FFF893
//2)让随机数隔半秒出现 ---未解决;
//3)随机数产生应该在为零的区域
//4)游戏结束条件判断bug：最后一个格子被填满前弹出提示

window.onload = function() {
	var arr = [];

	//生成格子
	function createBox() {
		var Odiv = document.createElement('div');
		var Ospan = document.createElement('span');
		Odiv.setAttribute('class', 'move-box');
		Odiv.style.cssText = 'width:113px;height:113px;border-radius: 5px;position: absolute;';
		Ospan.style.cssText = 'font-size:65px;font-weight: 700;line-height:113px;width:113px;height:113px;' +
			'display:inline-block;border-radius: 5px;text-align: center;';
		Ospan.innerHTML = '0';
		Odiv.appendChild(Ospan);
		box.appendChild(Odiv);
		return Odiv;
	}

	//用二维数组来装16个格子   i代表列，j代表行
	function container() {
		for(let i = 0; i < 6; i++) {
			arr[i] = new Array();
			for(let j = 0; j < 6; j++) {
				let box = createBox();
				arr[i][j] = box;
				//				box.getElementsByTagName('span')[0].innerHTML=0;
				box.style.left = 10 * i + 113 * (i - 1) + 'px';
				box.style.top = 10 * j + 113 * (j - 1) + 'px';
			}
		}
		showDiv();
	}
	container();

	//通过按键控制滑动方向
	document.onkeydown = function() {
		let key = event || window.event;
		
		if(key.keyCode == 37) { //向左移动
			for(let i = 4; i >= 1; i--) {
				for(let k = 5; k > 1; k--) {
					//相邻两个数字比较，如果有一个为零或者相同则相加
					for(let j = 5; j > 1; j--) {
						if(arr[j - 1][i].getElementsByTagName('span')[0].innerHTML == '0' || arr[j - 1][i].getElementsByTagName('span')[0].innerHTML == arr[j][i].getElementsByTagName('span')[0].innerHTML) {
							arr[j - 1][i].getElementsByTagName('span')[0].innerHTML = parseInt(arr[j][i].getElementsByTagName('span')[0].innerHTML) +
								parseInt(arr[j - 1][i].getElementsByTagName('span')[0].innerHTML);
							arr[j][i].getElementsByTagName('span')[0].innerHTML = '0';
						}
					}
				}
			}
			randomNum();
			showDiv();
			colorAdd();
		} else if(key.keyCode == 39) { //向右移动
			for(let i = 4; i >= 1; i--) {
				for(let k = 0; k <= 3; k++) {
					for(let j = 0; j <= 3; j++) {
						if(arr[j + 1][i].getElementsByTagName('span')[0].innerHTML == '0' || arr[j + 1][i].getElementsByTagName('span')[0].innerHTML == arr[j][i].getElementsByTagName('span')[0].innerHTML) {
							arr[j + 1][i].getElementsByTagName('span')[0].innerHTML = parseInt(arr[j][i].getElementsByTagName('span')[0].innerHTML) +
								parseInt(arr[j + 1][i].getElementsByTagName('span')[0].innerHTML);
							arr[j][i].getElementsByTagName('span')[0].innerHTML = '0';
						}
					}
				}
			}
			randomNum();
			showDiv();
			colorAdd();
		} else if(key.keyCode == 38) { //向上移动
			for(let i = 4; i >= 1; i--) {
				for(let k = 5; k > 1; k--) {
					for(let j = 5; j > 1; j--) {
						if(arr[i][j - 1].getElementsByTagName('span')[0].innerHTML == '0' || arr[i][j - 1].getElementsByTagName('span')[0].innerHTML == arr[i][j].getElementsByTagName('span')[0].innerHTML) {
							arr[i][j - 1].getElementsByTagName('span')[0].innerHTML = parseInt(arr[i][j - 1].getElementsByTagName('span')[0].innerHTML) +
								parseInt(arr[i][j].getElementsByTagName('span')[0].innerHTML);
							arr[i][j].getElementsByTagName('span')[0].innerHTML = '0';
						}
					}
				}

			}
			randomNum();
			showDiv();
			colorAdd();
		} else if(key.keyCode == 40) { //向下移动
			for(let i = 4; i >= 1; i--) {
				for(let k = 0; k <= 3; k++) {
					for(let j = 0; j <= 3; j++) {
						if(arr[i][j + 1].getElementsByTagName('span')[0].innerHTML == '0' || arr[i][j + 1].getElementsByTagName('span')[0].innerHTML == arr[i][j].getElementsByTagName('span')[0].innerHTML) {
							arr[i][j + 1].getElementsByTagName('span')[0].innerHTML = parseInt(arr[i][j + 1].getElementsByTagName('span')[0].innerHTML) +
								parseInt(arr[i][j].getElementsByTagName('span')[0].innerHTML);
							arr[i][j].getElementsByTagName('span')[0].innerHTML = '0';
						}
					}
				}

			}
			randomNum();
			showDiv();
			colorAdd();
		}
		
		//判断游戏结束 条件：是否都为零
		let arr2=[];
		for(let i=1;i<5;i++){
			for(let j=1;j<5;j++){
				arr2.push(parseInt(arr[i][j].getElementsByTagName('span')[0].innerHTML));
			}
		}
		function over(a){
			return a>0;
		}
//		console.log(arr2);
		if(arr2.every(over)){
			alert('game over');
		}
//		console.log([2, 4, 8, 16, 2, 4, 8, 32, 2, 4, 2, 4, 4, 2, 4, 2].every(over));
	}

	//如果为0则不显示
	function showDiv() {
		for(let i = 4; i >= 0; i--) {
			for(let j = 4; j >= 0; j--) {
				if(arr[i][j].getElementsByTagName('span')[0].innerHTML == '0') {
					arr[i][j].getElementsByTagName('span')[0].style.display = 'none';
				} else {
					arr[i][j].getElementsByTagName('span')[0].style.display = 'block';
				}
			}
		}

	}

	//随机产生数字2或者4
	function randomNum() {
		let i = random(1, 4) + 1;
		let j = random(1, 4) + 1;
		let k = 2 * (random(0, 1) + 1) //随机产生2或者4
		if(arr[i][j].getElementsByTagName('span')[0].innerHTML == '0') {
			arr[i][j].getElementsByTagName('span')[0].innerHTML = k.toString();
		}
		return arr[i][j].getElementsByTagName('span')[0].innerHTML;
	}

	//从n到m随机产生整数
	function random(n, m) {
		return Math.round(Math.random() * (m - n));
	}

	//颜色累加
	function colorAdd() {
		for(let i = 1; i < 5; i++) {
			for(let j = 1; j < 5; j++) {
				let opcaity = Math.log(parseInt(arr[i][j].getElementsByTagName('span')[0].innerHTML)) / Math.log(2) * 2;
				arr[i][j].getElementsByTagName('span')[0].style.background = 'rgba(241,223,69,' + opcaity / 10 + ')';
			}
		}
	}

	//重置游戏
	document.getElementById('newGame').onclick = function() {
		for(let i = 0; i < 6; i++) {
			for(let j = 0; j < 6; j++) {
				arr[i][j].getElementsByTagName('span')[0].innerHTML = '0';
			}
		}
		showDiv();
	}
	
	//分数累积
	function scoreAdd(){
		
	}

}