# booklib
一个基于flask的文章系统

##如何开始

###首先确保你已经安装这些
* python 2.7.x
* mongodb 2.6.x
* pip 8.1.x
* pymongo 3.3.x
* Jinja2  2.8.x

**也可以进入项目目录`cd booklib` 然后 `pip install`**


##配置数据库
###启动数据库
```cmd
mongod --dbpath  d:\mongodbdata

mongo 127.0.0.1:27017
```


###创建默认表结构
```cmd
|---mainpass 
  |--mainpass
    |--{username:'',password:''}//在这里设置管理员密码
   
|---wenlist
  |--list
  |--wenid
    |--{name:'wenid',id:'0'}
```
###默认监听端口配置
```cmd
booklib\mongo\easy.py
```
```python
  from pymongo import MongoClient
  client = MongoClient("127.0.0.1",27017)//在这里配置
```

###默认网址目录
```cmd
/
/admin/
/wen/
/login/
/read/:id
```
###项目中使用到的javascript
```cmd
angular 1.3.x
jquery 2.2.x
bjax 1.0.x https://github.com/Jon-Millent/bjax
jquery.slide 1.0.x https://github.com/Jon-Millent/jqueryTool/tree/master/jqurey.slide
```
##启动你的项目

```cmd
mongod --dbpath  d:\mongodbdata

mongo 127.0.0.1:27017

cd booklib

python app.py
```
![cmd](https://github.com/Jon-Millent/booklib/blob/master/test/show5.png?raw=true)  
###主页
![cmd](https://github.com/Jon-Millent/booklib/blob/master/test/show1.png?raw=tru)  
###登录页
![cmd](https://github.com/Jon-Millent/booklib/blob/master/test/show2.png?raw=true)  
###文章设置页
![cmd](https://github.com/Jon-Millent/booklib/blob/master/test/show3.png?raw=true)  
###首页设置页
![cmd](https://github.com/Jon-Millent/booklib/blob/master/test/show4.png?raw=true)  



##授权
**本项目属于个人学习项目，用于学习交流，切勿用于商业用途**<br />
**本项目中所用到的图片来自互联网**<br />
**@jon-millent https://github.com/Jon-Millent**<br />
