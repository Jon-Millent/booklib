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

		this.configs();
		
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
