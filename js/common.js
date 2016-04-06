var touchall = {};
touchall.transitionEnd = function(obj,callback){
	if(typeof obj =="object"){
		obj.addEventListener("transitionEnd",function(e){
			callback&&callback.apply(obj,e); 
		},false);
		obj.addEventListener("webkitTransitionEnd",function(e){
			callback&&callback.apply(obj,e)	
		},false);
	}
};

touchall.tap = function(obj,callback){
	var startTime = 0,isMove = false;
		if(typeof obj !="object") return;
		obj.addEventListener("touchstart",function(){
			startTime = Date.now();
//			console.log("touchstart");			
		},false);
		obj.addEventListener("touchmove",function(){
			isMove = true;
//			console.log("touchmove")
		},false);
		//为防止模拟器滑动后事件丢失，将touchend的事件源改为window
		window.addEventListener("touchend",function(e){
//			console.log("touchend");
			if(Date.now() - startTime < 200 && isMove ){
//				console.log("tap");
				callback && callback.apply(obj,[e])
			}
			startTime = 0;
			isMove = false;
		},false);
}
