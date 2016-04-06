window.onload = function(){
	leftCategory();
};

var leftCategory = function(){
	var parentDom = document.getElementsByClassName("jd_category_l")[0];
	var childrenDom = parentDom.getElementsByClassName("jd_category_left_con")[0];
	var parentHeight = parentDom.offsetHeight;
	var childrenHeight = childrenDom.offsetHeight;
	// 盒子区间
	var maxY = 0,minY= -(childrenHeight-parentHeight);
	var distance = 150;
	//改变位置：
	var changeTranslateY = function(y){
		childrenDom.style.transform = "translateY("+ y +"px)";
		childrenDom.style.webkitTransform = "translateY("+ y +"px)";		
	};
	//加过渡:
	var addTransition = function(){
		childrenDom.style.transition = "all .2s ease";
		childrenDom.style.webkitTransition = "all .2s ease";		
	}
	//减过渡:
	var removeTransition = function(){
		childrenDom.style.transition = "none";
		childrenDom.style.webkitTransition = "none";
	}
	
	var startY = 0,
	    endY = 0,
	    moveY = 0,
	    //当前Y定位的值
	    currentY = 0;
	    
	//  开始滑动：
	
	childrenDom.addEventListener("touchstart",function(e){
		startY = e.touches[0].clientY;
//		console.log(startY);
	},false);
	
	childrenDom.addEventListener("touchmove",function(e){
		endY = e.touches[0].clientY;
//		console.log(endY);
		moveY =  startY - endY ;
//		console.log(moveY);
// 滑动区间
		if((currentY - moveY) < (maxY + distance) && (currentY - moveY) > (minY - distance)){
			removeTransition();
			changeTranslateY(currentY - moveY);
//			console.log(changeTranslateY(currentY - moveY));
		}	
	},false);
	
	childrenDom.addEventListener("touchend",function(e){
		//向下滑动:
		if(currentY - moveY > maxY){
			currentY = maxY;
			addTransition();
			changeTranslateY(currentY)
		}else if(currentY - moveY < minY){
			currentY = minY;
			addTransition();
			changeTranslateY(currentY);
		} else {
			currentY = currentY - moveY;			 
		}
		
		startY = 0;
		endY = 0;
		moveY = 0;
	},false);
	
	//点击
	var liList = childrenDom.getElementsByTagName("li");
	//点击事件
	touchall.tap(childrenDom,function(e){
//		console.log(1);
		for(var i = 0; i <liList.length; i++ ){
			liList[i].className = ""; 
			liList[i].index = i;
		}
		var nowLi = e.target.parentNode;
		var liH = nowLi.offsetHeight;
		/*console.log(liH);
		console.log(nowLi);*/
		nowLi.className = "now";
		
		var translateY = - nowLi.index * liH;
		if(translateY > maxY){
			addTransition();
			changeTranslateY(translateY);
			currentY = translateY;
		}else {
			changeTranslateY(minY);
			currentY = minY;
		}
		
		//模拟加载效果;
		var rightDom = document.getElementsByClassName("jd_category_r")[0];
		rightDom.style.transition = "all .2s ease";
		rightDom.style.webkitTransition = "all .2s ease";
		rightDom.style.opacity = 0;
		setTimeout(function(){
			rightDom.style.opacity= 1
		},200)
		
	})
	
	
}
