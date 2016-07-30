(function(root){
	function Factory(){
		this.config={
			url:'',
			type:'get',
			data:'',
			timeout:false,
			callback:'callback_ajax',
			jsonp:'callback',
			header:{
				type:'Content-Type',
				content:'application/x-www-form-urlencoded'
			},
			success:function(){},
			error:function(){}
		}
	}
	Factory.prototype.ajaxObjextFactory=function(){
		var xhr=false;
		try{
			xhr=new XMLHttpRequest()
		}catch(e){
			try {
				xhr=new ActiveXObjext('Msxml2.XMLHTTP')
			}catch(e){
				xhr=new ActiveXObjext('Microsoft.XMLHTTP')
			}
		}
		return xhr ? xhr : -1;
	}
	Factory.prototype.extend=function(a,b){
		for(i in b){
			a[i]=b[i]
		}
	}
	Factory.prototype.stringify=function(json){
		var str='';
		for(i in json){
			str+=i+'='+json[i]+'&';
		}
		return str.substr(0,str.length-1)	
	}
	Factory.prototype.ajax=function(json){
		this.extend(this.config,json);

		if(this.config.type!='jsonp'){

			var xhr=this.ajaxObjextFactory();
			var url=this.config.url;
			var sendData=null;
			var time='';
			var random=new Date()
			if(this.config.type=='get'){
				if(this.config.data!=''){
					if(this.config.url.indexOf('?')!=-1){
						url+='&'+this.stringify(this.config.data)+'&'+random.getTime()
					}else{
						url+='?'+this.stringify(this.config.data)+'&'+random.getTime()
					}
					
				}
			}else{
				if(this.config.data!=''){
					sendData=this.stringify(this.config.data)
				}
			}

			xhr.open(this.config.type,url,true);

			xhr.setRequestHeader(this.config.header.type,this.config.header.content);

			xhr.send(sendData);

			root=this;
			//to get datas
			if(this.config.timeout){

				time=setTimeout(function(){

					root.config.error('408','timeout')
					xhr.abort(); 

				},this.config.timeout)

			}


			xhr.onreadystatechange=function(){

				if(xhr.readyState==4){
					clearInterval(time)

					if(xhr.status==200){
						root.config.success(xhr.responseText,xhr.status)
					}else{
						root.config.error(xhr.status)
					}

				}

			}


		}else{
			var url=this.config.url;
			if(url.indexOf('?')!=-1){
				url+='&'+this.stringify(this.config.data)+'&'+this.config.jsonp+'='+this.config.callback;
			}else{
				url+='?'+this.stringify(this.config.data)+'&'+this.config.jsonp+'='+this.config.callback;
			}
			this.script=document.createElement('script');
			this.fnscript=document.createElement('script');
			this.fnscript.innerHTML='function '+this.config.callback+'(data){bjax.afterJsonp(data)}'

			this.script.src=url;
			document.body.appendChild(this.fnscript)
			document.body.appendChild(this.script)
		}
	}
	Factory.prototype.afterJsonp=function(data){
		this.config.success(data)
		document.body.removeChild(this.script);
		document.body.removeChild(this.fnscript);
	}
	window.bjax = new Factory();

})(window)
