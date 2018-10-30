(function(){
	/*
	@ ajax
	 */
	function ajax(opt) {
	    opt = opt || {};//opt以数组方式存参，如果参数不存在就为空。
	    opt.method = opt.method.toUpperCase() || 'POST';//转为大写失败，就转为POST
	    opt.url = opt.url || '';//检查URL是否为空
	    opt.async = opt.async || true;//是否异步
	    opt.data = opt.data || null;//是否发送参数，如POST、GET发送参数
	    opt.success = opt.success || function () {}; //成功后处理方式
	    var xmlHttp = null;//定义1个空变量
	    if (XMLHttpRequest) {
	        xmlHttp = new XMLHttpRequest();//如果XMLHttpRequest存在就新建，IE大于9&&非IE有效
	    }
	    else {
	        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');//用于低版本IE
	    }
	    var params = [];//定义1个空数组
	    for (var key in opt.data){
	        params.push(key + '=' + opt.data[key]);//将opt里的data存到push里
	    }
	    var postData = params.join('&');//追加个& params
	    if (opt.method.toUpperCase() === 'POST') {
	        xmlHttp.open(opt.method, opt.url, opt.async);//开始请求
	        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');//发送头信息，与表单里的一样。
	        xmlHttp.send(postData);//发送POST数据
	    }
	    else if (opt.method.toUpperCase() === 'GET') {
	        xmlHttp.open(opt.method, opt.url, opt.async);//GET请求
	        xmlHttp.send(null);//发送空数据
	    }
	    xmlHttp.onreadystatechange = function () {
	        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {//readyState有5个状态，可以百度一下看看都有什么。当请求完成，并且返回数据成功
	            opt.success(xmlHttp.responseText);//返回成功的数据
	        }
	    };
	} 

	/*
		移动端屏幕适配
	 */
	var rem = {
	  baseRem: 40,
	  // 基准字号，按照iphone6应该为20，此处扩大2倍，便于计算
	  baseWidth: 750,
	  // 基准尺寸宽，此处是按照ihpone6的尺寸
	  rootEle: document.getElementsByTagName("html")[0],
	  initHandle: function() {
	    this.setRemHandle();
	    this.resizeHandle();
	  },
	  setRemHandle: function() {
	    var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
	    this.rootEle.style.fontSize = clientWidth * this.baseRem / this.baseWidth + "px";
	  },
	  resizeHandle: function() {
	    var that = this;
	    window.addEventListener("resize",
	    function() {
	      setTimeout(function() {
	        that.setRemHandle();
	      },
	      300);
	    });
	  }
	};
	// rem.initHandle();


	/**
	 * 防抖函数
	 * @param method 事件触发的操作
	 * @param delay 多少毫秒内连续触发事件，不会执行
	 * @returns {Function}
	 */
	function debounce(method,delay) {
	    let timer = null;
	    return function () {
	        let self = this,
	            args = arguments;
	        timer && clearTimeout(timer);
	        timer = setTimeout(function () {
	            method.apply(self,args);
	        },delay);
	    }
	}

	/**
	 * 函数节流方法
	 * @param Function fn 延时调用函数
	 * @param Number delay 延迟多长时间
	 * @param Number atleast 至少多长时间触发一次
	 * @return Function 延迟执行的方法
	 */
	var throttle = function (fn, delay, atleast) {
	    var timer = null;
	    var previous = null;
	 
	    return function () {
	        var now = +new Date();
	 
	        if ( !previous ) previous = now;
	 
	        if ( now - previous > atleast ) {
	            fn();
	            // 重置上一次开始时间为本次结束时间
	            previous = now;
	        } else {
	            clearTimeout(timer);
	            timer = setTimeout(function() {
	                fn();
	            }, delay);
	        }
	    }
	}

	function debounce(foo, delay) {
	  var counter;
	  return function() {
	    var _this = this;
	    var args = arguments;
	    clearTimeout(counter);
	    counter = setTimeout(function() {
	      foo.apply(_this, args);
	    }, delay);
	  }
	}

	function throttle(foo, delay) {
	  var counting = false;
	  return function() {
	    if (counting) {
	      return;
	    }
	    counting = true;
	    var _this = this;
	    var args = arguments;
	    setTimeout(function() {
	      counting = false;
	      foo.apply(_this, args);
	    }, delay);
	  }
	}

	/*
	   判断滑动方向函数
	   
	  * upCallBack 向上滑动的回调
	  * downCallBack 向下滑动的回调
	* */
	 function touchDirection( upCallBack , downCallBack ){
	  var startx, starty, touchDirection;//获得角度
	     function getAngle(angx, angy) {
	         return Math.atan2(angy, angx) * 180 / Math.PI;
	     };
	  
	     //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
	     function getDirection(startx, starty, endx, endy) {
	         var angx = endx - startx;
	         var angy = endy - starty;
	         var result = 0;
	  
	         //如果滑动距离太短
	         if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
	             return result;
	         }
	  
	         var angle = getAngle(angx, angy);
	         if (angle >= -135 && angle <= -45) {
	             result = 1;
	         } else if (angle > 45 && angle < 135) {
	             result = 2;
	         } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
	             result = 3;
	         } else if (angle >= -45 && angle <= 45) {
	             result = 4;
	         }
	  
	         return result;
	     }
	     //手指接触屏幕
	     document.addEventListener("touchstart", function(e) {
	         startx = e.touches[0].pageX;
	         starty = e.touches[0].pageY;
	     }, false);
	     //手指离开屏幕
	     document.addEventListener("touchend", function(e) {
	         var endx, endy;
	         endx = e.changedTouches[0].pageX;
	         endy = e.changedTouches[0].pageY;
	         var direction = getDirection(startx, starty, endx, endy);
	         if( direction == 1 ){
	          upCallBack()
	         }else if( direction == 2 ){
	          downCallBack()
	         }
	     }, false);
	 }

	/**内部方法：用户合并一个或多个对象到第一个对象
	   参数：
	   target 目标对象  对象都合并到target里
	   source 合并对象
	   deep 是否执行深度合并
    */
    function extend(target, source, deep) {
        for (key in source)
            if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
                // source[key] 是对象，而 target[key] 不是对象， 则 target[key] = {} 初始化一下，否则递归会出错的
                if (isPlainObject(source[key]) && !isPlainObject(target[key]))
                    target[key] = {}

                // source[key] 是数组，而 target[key] 不是数组，则 target[key] = [] 初始化一下，否则递归会出错的
                if (isArray(source[key]) && !isArray(target[key]))
                    target[key] = []
                // 执行递归
                extend(target[key], source[key], deep)
            }
            // 不满足以上条件，说明 source[key] 是一般的值类型，直接赋值给 target 就是了
            else if (source[key] !== undefined) target[key] = source[key]
    }

}())