(function($){
	function Factory(element,opation){
		this.now=0;
		this.element=$(element);
		this.config={
			type:'fade',//fade | slide | 
			time:600,
			round:true, // if type is slide you can change it to true
			controller:true,
			controllerClass:'active'
		}
		//main
		this.init(opation)
	};

	Factory.prototype.init=function(opation){
		
		$.extend(this.config,opation||{})

		this.configs();html,body,div,p,input,ul,li,h1,textarea,table,tr,td{
	padding: 0;
	margin: 0;
}
ul{
	list-style: none;
}
a{
	text-decoration: none;
}
a:link,a:visited,a:hover,a:active{
	color: #333;
}
#header{
	width: 100%;
	height: 40px;
	background-color: #000;
}
#header .cen{
	width: 1000px;
	height: 40px;
	margin: 0 auto;
	color: #fff;
	line-height: 40px;
}
#nav{
	width: 99%;
	height: 41px;
	border-bottom: 1px solid #ccc;
	margin-top: 2px;
	margin: 0 auto;
}
#nav li{
	width: 100px;
	height: 40px;
	line-height: 40px;
	float: left;
	border: 1px solid #fff;
	border-bottom: 0 none;
	text-align: center;
	border-radius: 5px 5px 0 0;
	color: #333;
	cursor: pointer;
}
#nav .active{
	border: 1px solid #ccc;
	border-bottom: 1px solid #fff;
}
#content{
	width: 99%;
	margin: 0 auto;
}
#content h1{
	font-size: 18px;
	color: #333;
	line-height: 40px;
}
#content .show{
	width: 100%;

	border: 1px solid #ccc;
	border-top: 0 none;
	border-radius: 0 0 5px 5px;
}
#content .active{
	display: block;
}
.table{
	width: 99%;
	margin: 0 auto;
	border-collapse: collapse;
	font-size: 13px;
}
.table thead th,.table thead  td{
	background-color: #000;
	color: #fff;
}
.table, .table th, .table td{
	border: 1px solid #ccc;
	text-align: center;
}
.table th, .table td{
	height: 40px;
	line-height: 40px;
}
.table .btn{
	padding: 8px 30px;
	text-align: center;
	border-radius: 4px;
	color: #fff;
}
.table .btn.delete{
	background-color: #d9534f;
}
.table .btn.delete:hover{
	background-color:#C9302C;
}
.table .btn.edit{
	background-color: #5CB85C;
}
.table .btn.edit:hover{
	background-color:#449D44;
}
.table.submit input{
	width: 98%;
	height: 30px;
	border: 1px solid #ccc;
	border-radius: 4px;
}
.table.submit textarea{
	width: 98%;
	padding: 10px 1%;
	height: 400px;
	border: 0 none;
	font-size: 16px;
	color: #333;
	outline: none;
}
.table.submit .btn{
	display: block;
	padding: 0;
	width: 100%;
	margin: 0 auto;
}
#edit{
	width: 980px;
	height: 640px;
	background-color: #333;
	opacity: 0.9;
	position: fixed;
	top:50%;
	left:50%;
	margin-left:-490px; 
	margin-top: -300px;
}
#edit h1{
	color: #fff;
	text-align: center;
}
#edit input{
	width: 99%;
	height: 30px;
	text-indent: 10px;
	border-radius: 10px;
	background-color: #eee;
}
#edit textarea{
	width: 97%;
	padding: 10px 1%;
	height: 450px;
}
#edit input,#edit textarea{
	display: block;
	margin: 0 auto;
	border: 1px solid #ccc;
}
#edit .btn{
	width: 90%;
	margin: 0 auto;
}
#edit button{
	width: 45%;
	height: 40px;
	background-color: #ccc;
	border: 0 none;
}
#edit button.no{
	background-color: #C9302C;
}
#edit button.ok{
	background-color: #5CB85C;
}
		
	};
	Factory.prototype.configs=function(){
		
		if(this.config.type=='fade'){
			
			this.element.find('.views').children('li').eq(0).fadeIn().siblings().hide();
			this.element.find('.views').children('li').css({
				'position':'absolute',
				'top':0,
				'left':0
			})
		}else{
			if(this.config.round){
				var first=this.element.find('.views').children('li').first();
				var last=this.element.find('.views').children('li').last();
				first.before(last.clone())
				last.after(first.clone())
				this.element.find('.views').css('left',-this.element.width())
				this.now=1;
			}
			var element=this.element.find('.views')
			element.css('width',element.children('li').length*this.element.width())
			element.children('li').css('float','left')
		}

	};
	//
	Factory.prototype.next=function(){
		if(this.config.type=='fade'){
			var element=this.element.find('.views');
			var tLilist =element.find('li');
			this.now++;
			if(this.now>=element.children('li').length){
				this.now=0;
			}
			tLilist.eq(this.now).fadeIn(this.config.time).siblings().fadeOut(this.config.time)
			if(this.config.controller){
				this.controllerbar(this.now+1)
			}

		}else{
			var element=this.element.find('.views');
			var speed=this.element.width();
			this.now++;
			if(this.config.round){
				element.stop().animate({
					left:-this.now*speed+'px'
				},this.config.time,$.proxy(function(){

					//console.log(this.now) 1 2 3 4 5
					if(this.config.controller){
						this.controllerbar(this.now)
					}

					if(this.now>=element.children('li').length-2){
						this.now=0
						element.css('left',0)
					}

				},this))	
			}else{
				if(this.now>=element.children('li').length){
					this.now=0
				}
				element.stop().animate({
					left:-this.now*speed+'px'
				},this.config.time,$.proxy(function(){
					if(this.config.controller){
						this.controllerbar(this.now+1)
					}

				},this))	

			}
			
		}
	};
	Factory.prototype.prev=function(){
		if(this.config.type=='fade'){
			var element=this.element.find('.views');
			var tLilist =element.find('li');
			this.now--;
			if(this.now<0){
				this.now=element.children('li').length-1;
			}
			tLilist.eq(this.now).fadeIn(this.config.time).siblings().fadeOut(this.config.time)
			if(this.config.controller){
				this.controllerbar(this.now+1)
			}
		}else{
			var element=this.element.find('.views');
			var speed=this.element.width();
			this.now--;
			if(this.config.round){
				element.stop().animate({
					left:-this.now*speed+'px'
				},this.config.time,$.proxy(function(){

					

					if(this.now<=0){
						this.now=4;
						this.now=element.children('li').length-2
						element.css('left',-this.now*speed)
					}

					console.log(this.now) 
					if(this.config.controller){
						this.controllerbar(this.now)
					}
					

				},this))	
			}else{
				if(this.now<0){
					this.now=element.children('li').length-1;
				}
				element.stop().animate({
					left:-this.now*speed+'px'
				},this.config.time,$.proxy(function(){
					this.index=this.now;
					if(this.config.controller){
						this.controllerbar(this.now+1)
					}


				},this))	

			}
			
		}
	};
	Factory.prototype.controllerbar=function(index){
		
		this.element.find('.controllerbar').find('li').eq(index-1).addClass(this.config.controllerClass).siblings().removeClass(this.config.controllerClass)
	};
	Factory.prototype.jumpTo=function(index){
		if(this.config.type=='fade'){
			var elementList=this.element.find('.views').children();
			elementList.eq(index).fadeIn(this.config.time).siblings().fadeOut(this.config.time)

			if(this.config.controller){
				this.controllerbar(index+1)

			}
		}else{
			var element=this.element.find('.views');
			var speed=this.element.width();
			if(this.config.round){

				element.stop().animate({

					left:-(index+1)*speed

				},this.config.time,$.proxy(function(){
					if(this.config.controller){
						this.controllerbar(index+1)
					}
				},this))

			}else{
				element.stop().animate({
					left:-index*speed
				},this.config.time,$.proxy(function(){
					if(this.config.controller){
						this.controllerbar(index+1)
					}
				},this))
			}
		}
		this.now=index;
	};

	$.fn.slide=function(opacity){
		return new Factory(this,opacity)
	}
})(jQuery)
