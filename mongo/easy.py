from pymongo import MongoClient
client = MongoClient("127.0.0.1",27017)


class EasyDB():
    def __init__(self,port,*nor):
        self.db=client[port]
        
    def getData(self,name,data):
        return self.db[name].find(data)
    
    def setData(self,name,data):
       self. db[name].insert_one(data)
    
    def upData(self,name,data,todata):
       self. db[name].update_one(data,todata)
       
    def upDataAll(self,name,data,todata):
        self. db[name].update_many(data,todata)
        
    def deleteData(self,name,data):
        self. db[name].delete_one(data)
        
    def deleteDataAll(self,name,data):
        self. db[name].delete_many(data)
        
        
        


    
    
    
