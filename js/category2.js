window.onload = function(){
	leftCategory();
};

var leftCategory = function(){
	var parentDom = document.getElementsByClassName("jd_category_l")[0];
	var childrenDom = parentDom.getElementsByClassName("jd_category_left_con")[0];
	var parentHeight = parentDom.offsetHeight;
	var childrenHeight = childrenDom.offsetHeight;
	// 盒子区间
	var maxY = 0,minY = - (childrenHeight - parentDom) ;
	//记录滑动时当前Y的位置
	var curY = 0;
	//改变位置的方法：
	var changeTranslateY = function(y){
		childrenDom.style.transform = "translateY("+ y +"px)"
		childrenDom.style.webkitTransform = "translateY("+ y +"px)"
	}
	//加过渡
	var addTransition = function(){
		childrenDom.style.transition = "all 0.2s ease";
		childrenDom.style.webkitTransition = "all 0.2s ease";
	};
	//减过渡
	var removeTransition = function(){
		childrenDom.style.transition = "none";
		childrenDom.style.webkitTransition = "none";
	};
	
	var distance = 150;
	var startY = 0;
	var moveY = 0;
	var endY = 0;
	
	//滑动
	childrenDom.addEventListener("touchstart",function(e){
		//初始y的坐标
		startY = e.touches[0].clientY;
	},false);
	
	childrenDom.addEventListener("touchmove",function(e){
		//不停做滑动时y的值
		moveY = startY - endY;
		//滑动区间
		if((curY - moveY) < (maxY + 150) && (curY - moveY) > (minY - 150)){
			removeTransition();
			changeTranslateY(curY - moveY);
		}		
		endY = e.touches[0].clientY;
	},false);
	
	childrenDom.addEventListener("touchend",function(e){
		if(curY - moveY > 0 ){
			curY = maxY;
			addTransition();
			changeTranslateY(curY);
		}else if((curY - moveY) < minY){
			curY = minY;
			addTransition();
		}else {
			curY = curY - moveY;
		}
		
		startY = 0;
	    moveY = 0;
	    endY = 0;
	},false)
	
}
