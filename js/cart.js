window.onload = function(){
	deleteOption();
}
var deleteOption = function(){
	var jd_popwin = document.getElementsByClassName("jd_popwin")[0];
	var box = document.getElementsByClassName("jd_popwin_box")[0];
	var deleteList = document.getElementsByClassName("allbox_r");
	var up;  //点击的那个按钮
//	console.log(deleteList.length);
	for(var i = 0; i < deleteList.length; i++){
//		console.log(deleteList.length);
		deleteList[i].index = i;
		touchall.tap(deleteList[i],function(){
//			console.log(this.index);
			jd_popwin.style.display="block";
			var jd_popwinH = jd_popwin.offsetHeight;
			var boxH = box.offsetHeight;
			box.style.marginTop = (jd_popwinH-boxH)/2 + "px";
			box.className = "jd_popwin_box jump";
			
			up = this.firstElementChild;
			console.log(up);
			//给盖子加过渡
			up.style.transition = "all 0.2s ease";
			up.style.webkitTransition = "all 0.2s ease";
			//加动画
			up.style.transformOrigin = "left bottom";
			up.style.webkitTransformOrigin = "left bottom";
			up.style.transform = "rotate(-45deg)";
			up.style.webkitTransform = "rotate(-45deg)";
		})
	}
	var cancle = document.getElementsByClassName("cancle")[0];
	touchall.tap(cancle,function(){
		jd_popwin.style.display= "none";
		if(up){
			up.style.transform = "none";
			up.style.webkitTransform = "none";
		}
	})
}
