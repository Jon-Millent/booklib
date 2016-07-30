from flask import Flask,render_template,request,make_response,session,json
from mongo import easy
import time
from __builtin__ import int
from jinja2.lexer import integer_re


wentoop = easy.EasyDB('wenlist')
mon = easy.EasyDB('mainpass')

app = Flask(__name__)
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'


@app.route('/')
def home():
    res = make_response(render_template('home.html'))
    res.set_cookie('username', 'the username')  
    return res

@app.route('/wen')
def wen():
    return render_template('wen.html')

@app.route('/read/<id>')
def read(id):

    ioo = wentoop.getData('list',{'wenid':float(id)})
    for i in ioo:
        title = i[u'title']
        content = i[u'content']
    print(title,content)
    return render_template('read.html',title=title,content=content)

@app.route('/login')
def login():
        return render_template('login.html')

@app.route('/regexp',methods=['POST'])
def regexp():
    username = request.form['username']
    password = request.form['password']
    try:
        
        last = mon.getData('mainpass',{'username':username})[0]
    except  IndexError:
        return '50'
    if last:
        if last[u'password'] == password:
            session['username'] = username
            return '200'
        else:
            return '100'
@app.route('/logout',methods=['POST'])
def logout():
    if 'username' in session:
        session.pop('username', None)
        return 'ok'

@app.route('/setwen',methods=['POST'])
def setwen():
    title = request.form['title']
    content = request.form['content']

    if title and content:
        nowtime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) 
        
        nowindex = int(wentoop.getData('wenid',{'name':'wenid'})[0]['id'])
        
        wentoop.setData('list',{'title':title,'content':content,'begintime':nowtime,'wenid':nowindex})
        
        wentoop.upData('wenid',{'name':'wenid'},{'$set':{'id':nowindex+1}})
        
    return 'ok'

@app.route('/admin')
def admin():
    if 'username' in session:
        resp = make_response(render_template('admin.html'))
        resp.set_cookie('username','millent')
        return resp
    else:
        return '<h1>no login!!!</h1>'


@app.route('/getAllwen',methods=['POST'])
def getAllwen():
   alllists = wentoop.getData('list',{})
   lastArr = []
   for i in alllists:
       tguo = {}
       tguo['_id']=i[u'wenid']
       tguo['content']=i[u'content']
       tguo['title']=i[u'title']
       tguo['time']=i[u'begintime']
       lastArr.append(tguo)

   return json.dumps({
                        'data':lastArr
                   })

    
@app.route('/editwen',methods=['POST'])
def editwen():
    if 'username' in session:
        nowtime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) 
        edid = float(request.form['_id'])
        edtitle = request.form['title']
        edcontent = request.form['content']
        wentoop.upData('list',{'wenid':edid},{'$set':{'title':edtitle,'content':edcontent,'begintime':nowtime,'addhome':'0'}})

        return 'ok'
        
    else:
        return 'Error 0X263'
      
@app.route('/deletewen',methods=['POST'])
def deletewen():
    if 'username' in session:
        deid = float(request.form['_id'])
        wentoop.deleteData('list',{'wenid':deid})
        return 'ok'
    else:
        return 'Error 0X263'
    
@app.route('/gethomelist',methods=['POST'])
def gethomelist():
   alllists = wentoop.getData('list',{'addhome':'1'})
   lastArr = []
   for i in alllists:
       tguo = {}
       tguo['_id']=i[u'wenid']
       tguo['content']=i[u'content']
       tguo['title']=i[u'title']
       tguo['time']=i[u'begintime']
       lastArr.append(tguo)

   return json.dumps({
                        'data':lastArr
                   })
@app.route('/addhomelist',methods=['POST'])
def addhomelist():
    if 'username' in session:
        ttid = float(request.form['_id'])
        tttype = request.form['type']
        if tttype == 'add':
            wentoop.upData('list',{'wenid':ttid},{'$set':{'addhome':'1'}})
        elif tttype == 'remove':
            wentoop.upData('list',{'wenid':ttid},{'$set':{'addhome':'0'}})
        else:
            return 'Error'
        return 'ok'
    else:
        return 'Error 0X263'
    

##main def

if __name__=="__main__":
    app.run()
