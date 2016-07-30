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
**启动app `python app.py` **

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
