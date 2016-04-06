//顶部颜色逐渐改变
window.onload = function(){
	search();
	scrollPic();
	seconk();
}
var search = function(){
	var bannerH = document.getElementsByClassName("jd_banner")[0].offsetHeight;	
	var opt = 0;
	window.onscroll = function(){
		var scrollT = document.body.scrollTop;
		if( scrollT < bannerH){
		opt = scrollT/bannerH * 0.85;
	}else {
		opt = 0.85;
	}
	document.querySelector(".jd_header_box").style.background = "rgba(201,21,35,"+ opt +")"
	}
}

var scrollPic = function(){
	var jdBanner = document.getElementsByClassName("jd_banner")[0];
	var width = jdBanner.offsetWidth;
	var imgBox = jdBanner.children[0];
	var imgLis = imgBox.children;
	var pointBox = jdBanner.children[1];
	var pointLis = pointBox.children;
	//pointBox.onclick = function(){
	//	console.log(pointBox.length);
	//}
	//加过渡
	var addTransition = function(){
		imgBox.style.transition = "all .4s ease";
		imgBox.style.webkitTransition = "all .4s ease";
	}
	//减过渡：
	var removeTransition = function(){
		imgBox.style.transition = "none";
		imgBox.style.webkitTransition = "none";
	}
	//改变位置：
	var changeTranslateX = function(x){
		imgBox.style.transform = "translateX("+ x +"px)"
		imgBox.style.webkitTransform = "translateX("+ x +"px)"
	}
	var index = 1;
	var timer = null;
	var pointindex = 0;
	clearInterval(timer);
	timer = setInterval(function(){
		index++;
		if(index >= imgLis.length -1){
			index = 1
		} 
		addTransition();
		changeTranslateX(-index*width)
	},3000)
	
	touchall.transitionEnd(imgBox,function(e){
		if(index >= imgLis.length -1 ){
			index = 1;								
		}else if(index <=0){
			index = imgLis.length -2;										
		}		
		pointindex = index;
		removeTransition();			
		setPoint();
		changeTranslateX(-index*width);
	});
	
	var setPoint = function(){
		for(var i =0; i <pointLis.length; i++ ){
			pointLis[i].className = "";
		}
		pointLis[pointindex-1].className = "cur";
	}
	
	//手指滑动事件
	var startX = 0,
		endX = 0,
		disX = 0;
	imgBox.addEventListener("touchstart",function(e){
		console.log(e);
		clearInterval(timer);
		startX = e.touches[0].clientX;		
	},false);
	
	imgBox.addEventListener("touchmove",function(e){
		endX = e.touches[0].clientX;
		disX = endX - startX;
		removeTransition();
		changeTranslateX(-index*width - disX)
	},false);
	
	imgBox.addEventListener("touchend",function(e){
		if(Math.abs(disX) > 1/3*width && endX != 0){
            if(disX > 0){
                index ++;
            }else{
                index --;
            }
        }
		    addTransition();
			changeTranslateX(-index*width)
		
			clearInterval(timer);
			timer = setInterval(function(){
			index++;
			addTransition();
			changeTranslateX(-index*width)
		},3000);
		startX = 0;
		endX = 0;
		disX = 0;			
			
	},false)

}

//秒杀开始
var seconk = function(){
	var timer = null;
	var secondkill = document.getElementsByClassName("sk_time")[0];
	var spans = secondkill.getElementsByTagName("span");
	var time = 8*60*60; //8小时转为秒
	setInterval(function(){		
		time--; 
		if(time < 0){
			clearInterval(timer);
			return false;
		}
		var h = Math.floor(time / 60 / 60);
		var m = Math.floor(time % (60*60) /60);
		var s = time % 60;
		
		spans[0].innerHTML = h > 10 ? Math.floor(h/10) : 0;
		spans[1].innerHTML = h % 10;
		
		spans[3].innerHTML = m > 10 ? Math.floor(m/10) : 0;
		spans[4].innerHTML = m % 10;
		
		spans[6].innerHTML = s > 10 ? Math.floor(s/10) : 0;
		spans[7].innerHTML = s % 10;
	},1000)
}


 










