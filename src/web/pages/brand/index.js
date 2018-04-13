import '@css/common/common.styl';
import './css/brand.styl';

import resize from '@js/lib/resize750'
import $ from 'zepto'

let car2 = {
	_events 		: {},									// 自定义事件---this._execEvent('scrollStart');

	_rotateNode		: $('.p-ct'),							// 旋转体

	_page 			: $('.m-page'),							// 模版页面切换的页面集合
	_pageNum		: $('.m-page').size(),					// 模版页面的个数
	_pageNow		: 0,									// 页面当前的index数
	_pageNext		: null,									// 页面下一个的index数

	_touchStartValY	: 0,									// 触摸开始获取的第一个值
	_touchDeltaY	: 0,									// 滑动的距离

	_moveStart		: true,									// 触摸移动是否开始
	_movePosition	: null,									// 触摸移动的方向（上、下）
	_movePosition_c	: null,									// 触摸移动的方向的控制
	_mouseDown		: false,								// 判断鼠标是否按下
	_moveFirst		: true,
	_moveInit		: false,

	_firstChange	: false,

	_elementStyle	: document.createElement('div').style,	// css属性保存对象

	_UC 			: RegExp("Android").test(navigator.userAgent)&&RegExp("UC").test(navigator.userAgent)? true : false,
	_weixin			: RegExp("MicroMessenger").test(navigator.userAgent)? true : false,
	_iPhoen			: RegExp("iPhone").test(navigator.userAgent)||RegExp("iPod").test(navigator.userAgent)||RegExp("iPad").test(navigator.userAgent)? true : false,
	_Android		: RegExp("Android").test(navigator.userAgent)? true : false,

/***********************
 *  = gobal通用函数
 ***********************/
 	// 判断函数是否是null空值
	_isOwnEmpty		: function (obj) {
						for(var name in obj) {
							if(obj.hasOwnProperty(name)) {
								return false;
							}
						}
						return true;
					},
	// 判断浏览器内核类型
	_vendor			: function () {
						var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
							transform,
							i = 0,
							l = vendors.length;

						for ( ; i < l; i++ ) {
							transform = vendors[i] + 'ransform';
							if ( transform in this._elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
						}
						return false;
					},
	// 判断浏览器来适配css属性值
	_prefixStyle	: function (style) {
						if ( this._vendor() === false ) return false;
						if ( this._vendor() === '' ) return style;
						return this._vendor() + style.charAt(0).toUpperCase() + style.substr(1);
					},
	// 判断是否支持css transform-3d（需要测试下面属性支持）
	_hasPerspective	: function(){
						var ret = this._prefixStyle('perspective') in this._elementStyle;
						if ( ret && 'webkitPerspective' in this._elementStyle ) {
							this._injectStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
								ret = node.offsetLeft === 9 && node.offsetHeight === 3;
							});
						}
						return !!ret;
					},
		_translateZ : function(){
						if(car2._hasPerspective){
							return ' translateZ(0)';
						}else{
							return '';
						}
					},

	// 判断属性支持是否
	_injectStyles 	: function( rule, callback, nodes, testnames ) {
						var style, ret, node, docOverflow,
							div = document.createElement('div'),
							body = document.body,
							fakeBody = body || document.createElement('body'),
							mod = 'modernizr';

						if ( parseInt(nodes, 10) ) {
							while ( nodes-- ) {
								node = document.createElement('div');
								node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
								div.appendChild(node);
								}
						}

						style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
						div.id = mod;
						(body ? div : fakeBody).innerHTML += style;
						fakeBody.appendChild(div);
						if ( !body ) {
							fakeBody.style.background = '';
							fakeBody.style.overflow = 'hidden';
							docOverflow = docElement.style.overflow;
							docElement.style.overflow = 'hidden';
							docElement.appendChild(fakeBody);
						}

						ret = callback(div, rule);
						if ( !body ) {
							fakeBody.parentNode.removeChild(fakeBody);
							docElement.style.overflow = docOverflow;
						} else {
							div.parentNode.removeChild(div);
						}

						return !!ret;
					},
	// 自定义事件操作
 	_handleEvent 	: function (type) {
						if ( !this._events[type] ) {
							return;
						}

						var i = 0,
							l = this._events[type].length;

						if ( !l ) {
							return;
						}

						for ( ; i < l; i++ ) {
							this._events[type][i].apply(this, [].slice.call(arguments, 1));
						}
					},
	// 给自定义事件绑定函数
	_on				: function (type, fn) {
						if ( !this._events[type] ) {
							this._events[type] = [];
						}

						this._events[type].push(fn);
					},
	//禁止滚动条
	_scrollStop		: function(){
						//禁止滚动
						$(window).on('touchmove.scroll',this._scrollControl);
						$(window).on('scroll.scroll',this._scrollControl);
					},
	//启动滚动条
	_scrollStart 	: function(){
						//开启屏幕禁止
						$(window).off('touchmove.scroll');
						$(window).off('scroll.scroll');
					},
	//滚动条控制事件
	_scrollControl	: function(e){e.preventDefault();},

 	// 页面切换开始
 	page_start		: function(){
 		car2._page.on('touchstart mousedown',car2.page_touch_start);
 		car2._page.on('touchmove mousemove',car2.page_touch_move);
 		car2._page.on('touchend mouseup',car2.page_touch_end);
 	},

 	// 页面切换停止
 	page_stop		: function(){
		car2._page.off('touchstart mousedown');
 		car2._page.off('touchmove mousemove');
 		car2._page.off('touchend mouseup');
 	},

 	// page触摸移动start
 	page_touch_start: function(e){
 		if(!car2._moveStart) return;

 		if(e.type == "touchstart"){
        	car2._touchStartValY = window.event.touches[0].pageY;
        }else{
        	car2._touchStartValY = e.pageY||e.y;
        	car2._mouseDown = true;
        }

        car2._moveInit = true;

        // start事件
        car2._handleEvent('start');
 	},

 	// page触摸移动move
 	page_touch_move : function(e){
 		e.preventDefault();

		if(!car2._moveStart) return;
		if(!car2._moveInit) return;

		// 设置变量值
 		var $self = car2._page.eq(car2._pageNow),
 			h = parseInt($self.height()),
 			moveP,
 			scrollTop,
 			node=null,
 			move=false;

 		// 获取移动的值
 		if(e.type == "touchmove"){
        	moveP = window.event.touches[0].pageY;
        	move = true;
        }else{
        	if(car2._mouseDown){
        		moveP = e.pageY||e.y;
        		move = true;
        	}else return;
        }

		// 获取下次活动的page
        node = car2.page_position(e,moveP,$self);

		// page页面移动
 		car2.page_translate(node);

        // move事件
        car2._handleEvent('move');





 	},

 	// page触摸移动判断方向
 	page_position	: function(e,moveP,$self){
 		var now,next;

 		// 设置移动的距离
 		if(moveP!='undefined') car2._touchDeltaY = moveP - car2._touchStartValY;

 		// 设置移动方向
    	car2._movePosition = moveP - car2._touchStartValY >0 ? 'down' : 'up';
    	if(car2._movePosition!=car2._movePosition_c){
    		car2._moveFirst = true;
    		car2._movePosition_c = car2._movePosition;
    	}else{
			car2._moveFirst = false;
    	}

		// 设置下一页面的显示和位置
        if(car2._touchDeltaY<=0){
        	if($self.next('.m-page').length == 0){
        		car2._pageNext = 0;
        	} else {
        		car2._pageNext = car2._pageNow+1;
        	}

 			next = car2._page.eq(car2._pageNext)[0];
 		}else{
 			if($self.prev('.m-page').length == 0 ) {
 				if (car2._firstChange) {
 					car2._pageNext = car2._pageNum - 1;
 				} else {
 					return;
 				}
 			} else {
 				car2._pageNext = car2._pageNow-1;
 			}

 			next = car2._page.eq(car2._pageNext)[0];
 		}

 		now = car2._page.eq(car2._pageNow)[0];
 		let node = [next,now];

 		// move阶段根据方向设置页面的初始化位置--执行一次
 		if(car2._moveFirst) init_next(node);

 		function init_next(node){
 			var s,l,_translateZ = car2._translateZ();

 			car2._page.removeClass('action');
 			$(node[1]).addClass('action').removeClass('f-hide');
 			car2._page.not('.action').addClass('f-hide');

 			// 模版高度适配函数处理
	 		car2.height_auto(car2._page.eq(car2._pageNext),'false');

 			// 显示对应移动的page
			$(node[0]).removeClass('f-hide').addClass('active');

	 		// 设置下一页面的显示和位置
	        if(car2._movePosition=='up'){
 				s = parseInt($(window).scrollTop());
 				if(s>0) l = $(window).height()+s;
 				else l = $(window).height();
 				node[0].style[car2._prefixStyle('transform')] = 'translate(0,'+l+'px)'+_translateZ;
 				$(node[0]).attr('data-translate',l);

 				$(node[1]).attr('data-translate',0);
	 		}else{
 				node[0].style[car2._prefixStyle('transform')] = 'translate(0,-'+Math.max($(window).height(),$(node[0]).height())+'px)'+_translateZ;
 				$(node[0]).attr('data-translate',-Math.max($(window).height(),$(node[0]).height()));

 				$(node[1]).attr('data-translate',0);
	 		}
 		}

 		return node;
 	},

 	// page触摸移动设置函数
 	page_translate	: function(node){
 		// 没有传值返回
 		if(!node) return;

 		var _translateZ = car2._translateZ(),
 			y_1,y_2,scale,
 			y = car2._touchDeltaY;

 		// 切换的页面移动
 		if($(node[0]).attr('data-translate')) y_1 = y + parseInt($(node[0]).attr('data-translate'));
		node[0].style[car2._prefixStyle('transform')] = 'translate(0,'+y_1+'px)'+_translateZ;

		// 当前的页面移动
		if($(node[1]).attr('data-translate')) y_2 = y + parseInt($(node[1]).attr('data-translate'));
		scale = 1 - Math.abs(y*0.2/$(window).height());
		y_2 = y_2/5;
		node[1].style[car2._prefixStyle('transform')] = 'translate(0,'+y_2+'px)'+_translateZ+' scale('+scale+')';
 	},

 	// page触摸移动end
 	page_touch_end	: function(e){
 		car2._moveInit = false;
 		car2._mouseDown = false;
 		if(!car2._moveStart) return;
 		if(!car2._pageNext&&car2._pageNext!=0) return;

 		car2._moveStart = false;

 		// 确保移动了
 		if(Math.abs(car2._touchDeltaY)>10){
 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transition')] = 'all .3s';
 			car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transition')] = 'all .3s';
 		}

		// 页面切换
 		if(Math.abs(car2._touchDeltaY)>=100){		// 切换成功
 			car2.page_success();
 		}else if(Math.abs(car2._touchDeltaY)>10&&Math.abs(car2._touchDeltaY)<100){	// 切换失败
 			car2.page_fial();
 		}else{									// 没有切换
 			car2.page_fial();
 		}

 		// end事件
        car2._handleEvent('end');

        // 注销控制值
 		car2._movePosition = null;
 		car2._movePosition_c = null;
 		car2._touchStartValY = 0;


		 if($('#j-mengban').hasClass('z-show')){
			 if(car2._pageNext == mengvalue){
			  car2.page_stop();

		   }
		 }




 	},

 	// 切换成功
 	page_success	: function(){
 		var _translateZ = car2._translateZ();

 		// 下一个页面的移动
 		car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = 'translate(0,0)'+_translateZ;

 		// 当前页面变小的移动
 		var y = car2._touchDeltaY > 0 ? $(window).height()/5 : -$(window).height()/5;
 		var scale = 0.8;
 		car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = 'translate(0,'+y+'px)'+_translateZ+' scale('+scale+')';

 		// 成功事件
    	car2._handleEvent('success');
 	},

 	// 切换失败
 	page_fial	: function(){
 		var _translateZ = car2._translateZ();

 		// 判断是否移动了
		if(!car2._pageNext&&car2._pageNext!=0) {
			car2._moveStart = true;
			car2._moveFirst = true;
			return;
		}

 		if(car2._movePosition=='up'){
 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = 'translate(0,'+$(window).height()+'px)'+_translateZ;
 		}else{
 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = 'translate(0,-'+$(window).height()+'px)'+_translateZ;
 		}

 		car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = 'translate(0,0)'+_translateZ+' scale(1)';

 		// fial事件
    	car2._handleEvent('fial');
 	},

/**
 *  对象函数事件绑定处理
 *  -->start touch开始事件
 *  -->mov   move移动事件
 *  -->end   end结束事件
 */
 	haddle_envent_fn : function(){
 		// 当前页面移动，延迟加载以后的图片
		car2._on('start',car2.lazy_bigP);

		// 当前页面移动
		car2._on('move',function(){

		});

		// 切换失败事件
		car2._on('fial',function(){
			setTimeout(function(){
				car2._page.eq(car2._pageNow).attr('data-translate','');
 				car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = '';
 				car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transition')] = '';
 				car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = '';
	 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transition')] = '';

	 			car2._page.eq(car2._pageNext).removeClass('active').addClass('f-hide');
				car2._moveStart = true;
				car2._moveFirst = true;
				car2._pageNext = null;
				car2._touchDeltaY = 0;
				car2._page.eq(car2._pageNow).attr('style','');
	 		},300)
		})

		// 切换成功事件
		car2._on('success',function(){
			// 判断最后一页让，开启循环切换
			if (car2._pageNext == 0 && car2._pageNow == car2._pageNum -1) {
				car2._firstChange = true;
                //window.location.href="http://www.5.cn/magazine/822/1883/index.html";
			}

			// 判断是否是最后一页，让轻APP关联页面隐藏

			setTimeout(function(){

				// 判断是否为最后一页，显示或者隐藏箭头
				if(car2._pageNext == car2._pageNum-1 ) $('.u-arrow').addClass('f-hide');
				else  $('.u-arrow').removeClass('f-hide');

	 			car2._page.eq(car2._pageNow).addClass('f-hide');

				car2._page.eq(car2._pageNow).attr('data-translate','');
 				car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = '';
 				car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transition')] = '';
 				car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = '';
	 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transition')] = '';

	 			// 初始化切换的相关控制值
	 			$('.p-ct').removeClass('fixed');
	 			car2._page.eq(car2._pageNext).removeClass('active');
				car2._page.eq(car2._pageNext).removeClass('fixed');
				car2._pageNow = car2._pageNext;
				car2._moveStart = true;
				car2._moveFirst = true;
				car2._pageNext = null;
				car2._page.eq(car2._pageNow).attr('style','');
				car2._page.eq(car2._pageNow).removeClass('fixed');
				car2._page.eq(car2._pageNow).attr('data-translate','');
				car2._touchDeltaY = 0;

				// 切换成功后，执行当前页面的动画---延迟200ms
				setTimeout(function(){
					if(car2._page.eq(car2._pageNow).hasClass('z-animate')) return;
					car2._page.eq(car2._pageNow).addClass('z-animate');
				},20)
	 		},300)

		})
 	},

	// 开始加载前三个页面
	lazy_start : function(){
		// 前三个页面的图片延迟加载
		setTimeout(function(){
			for(var i=0;i<3;i++){
				var node = $(".m-page").eq(i);
				if(node.length==0) break;
				if(node.find('.lazy-img').length!=0){
					car2.lazy_change(node,false);
					// 飞出窗口的延迟
					if(node.attr('data-page-type')=='flyCon'){
						car2.lazy_change($('.m-flypop'),false);
					}
				}else continue;
			}
		},200)
	},

	// 加载当前后面第三个
	lazy_bigP : function(){
		for(var i=3;i<=5;i++){
			var node = $(".m-page").eq(car2._pageNow+i);
			if(node.length==0) break;
			if(node.find('.lazy-img').length!=0){
				car2.lazy_change(node,false);
				// 飞出窗口的延迟
				if(node.attr('data-page-type')=='flyCon'){
					car2.lazy_change($('.m-flypop'),false);
				}
			}else continue;
		}
	},

	// 图片延迟替换函数
	lazy_change : function(node,goon){
		// 3d图片的延迟加载
		if(node.attr('data-page-type')=='3d') car2.lazy_3d(node);

		// 飞出窗口的延迟
		if(node.attr('data-page-type')=='flyCon'){
			var img = $('.m-flypop').find('.lazy-img');
			img.each(function(){
				var self = $(this),
					srcImg = self.attr('data-src');

				$('<img />')
					.on('load',function(){
						if(self.is('img')){
							self.attr('src',srcImg)
						}
					})
					.attr("src",srcImg);
			})
		}

		// 其他图片的延迟加载
		var lazy = node.find('.lazy-img');
		lazy.each(function(){
			var self = $(this),
				srcImg = self.attr('data-src'),
				position = self.attr('data-position'),
				size = self.attr('data-size');

			if(self.attr('data-bg')!='no'){
				$('<img />')
					.on('load',function(){
						if(self.is('img')){
							self.attr('src',srcImg)
						}else{
							self.css({
								'background-image'	: 'url('+srcImg+')',
								'background-position'	: position,
								'background-size' : size
							})
						}

						// 判断下面页面进行加载
						if(goon){
							for(var i =0;i<$(".m-page").size();i++){
								var page = $(".m-page").eq(i);
								if($(".m-page").find('.lazy-img').length==0) continue
								else{
									car2.lazy_change(page,true);
								}
							}
						}
					})
					.attr("src",srcImg);

				self.removeClass('lazy-img').addClass('lazy-finish');
			}else{
				if(self.attr('data-auto')=='yes') self.css('background','none');
			}
		})
	},

	// 根据设备的高度，来适配每一个模版的高度，并且静止滑动
	// --文档初始化计算
	// --页面切换完成计算
	height_auto	: function(ele,val){
		ele.children('.page-con').css('height','auto');
		var height = $(window).height();

		// 需要解除固定高度的page卡片
		var vial = true;
		if(!vial){
			if(ele.height()<=height){
				ele.children('.page-con').height(height+2);
				if((!$('.p-ct').hasClass('fixed'))&&val=='true') $('.p-ct').addClass('fixed');
			}else{
				car2._scrollStart();
				if(val=='true') $('.p-ct').removeClass('fixed');
				ele.children('.page-con').css('height','100%');
				return;
			}
		}else{
			ele.children('.page-con').height(height+2);
			if((!$('.p-ct').hasClass('fixed'))&&val=='true') $('.p-ct').addClass('fixed');
		}
	},


	// 对象私有变量刷新
	refresh	: function(){
		//$(window).height() = $(window).height();
		car2._windowWidth = $(window).width();
	},

/**************************************************************************************************************/
/*  函数初始化
***************************************************************************************************************/
/**
 *  相关插件的启动
 */
	//插件启动函数
 	plugin : function(){
		car2.start_callback();
 	},

	// 蒙板插件回调函数处理
 	start_callback : function(){
 		// 开启window的滚动
 		car2._scrollStart();
 		// 开启页面切换
		car2.page_start();
		// 箭头显示
		$('.u-arrow').removeClass('f-hide');

 	},

/**
 * app初始化
 */
	// 样式适配
	styleInit : function(){
		// 禁止文版被拖动
		document.body.style.userSelect = 'none';
		document.body.style.mozUserSelect = 'none';
		document.body.style.webkitUserSelect = 'none';

		// 判断设备的类型并加上class

		// 判断是否有3d
		if(!car2._hasPerspective()){
			car2._rotateNode.addClass('transformNode-2d');
			$(document.body).addClass('no-3d');
		}
		else{
			car2._rotateNode.addClass('transformNode-3d');
			$(document.body).addClass('perspective');
			$(document.body).addClass('yes-3d');
		}

		// 模版提示文字显示

	},

	// 对象初始化
	init : function(){
		// 样式，标签的渲染
		// 对象操作事件处理
		this.styleInit();
		this.haddle_envent_fn();

		$('input[type="hidden"]').appendTo($('body'));

		// 图片预先加载
		$('<img />').attr('src',$('#r-cover').val());
		$('<img />').attr('src',$('.m-fengye').find('.page-con').attr('data-src'));

		// loading执行一次
		var loading_time = new Date().getTime();

		$(window).on('load',function(){
			var now = new Date().getTime();
			var loading_end = false;
			var time;
			var time_del = now - loading_time;

			if ( time_del >= 500 ) {
				loading_end = true;
			}

			if ( loading_end ) {
				time = 0;
			} else {
				time = 500 - time_del;
			}

			// loading完成后请求
			setTimeout(function(){

				// 模版提示隐藏
				setTimeout(function(){
					$('.m-alert').addClass('f-hide');
				},1000)
				car2.lazy_start();
				// 插件加载
		        car2.plugin();
				var channel_id = location.search.substr(location.search.indexOf("channel=") + 8);
				channel_id= channel_id.match(/^\d+/) ;
				if (!channel_id || isNaN(channel_id) || channel_id<0) {
				channel_id = 1;
				}
		 	 	var activity_id = $('#activity_id').val();

			 // 	$('.p-ct').height($(window).height());
				// $('.m-page').height($(window).height());
				// $('#j-mengban').height($(window).height());
				// $('.translate-back').height($(window).height());
			},time)
		})
	}
};
car2.init();