

angular.module('myApp',[])
                  .controller('ngng', ['$scope','$http', function($scope,$http){

                              $http.post('http://127.0.0.1:5000/getAllwen')
                                        .success(function(data){

                                                 $scope.wen=angular.fromJson(data)
                                              
                                        })
                              $http.post('http://127.0.0.1:5000/gethomelist')
                                        .success(function(data){

                                                 $scope.home=angular.fromJson(data)
                                              
                                        })
                              $scope.view ={
                              	home:true,
                              	wen:false
                              }
                              $scope.mainview={
                              	edit:false
                              }
                              $scope.username='歡迎您'+document.cookie.split('=')[1];

                              //主页选项卡切换
                              $scope.showview=function(type){

                              	for(var i in $scope.view){
                              	     $scope.view[i]=false;
                              	}
                              	$scope.view[type]=true;
                              	$scope.mainview.edit=false;

                              }

                              //退出登录
                              $scope.logout=function(){
                                    $http.post('http://127.0.0.1:5000/logout')
                                              .success(function(){
                                                      document.location.href="http://127.0.0.1:5000"
                                              })
                              }

                              //创建文章
                              $scope.dbsubmit=function(){
                                    if($scope.dbtitle!=''&&$scope.dbcontent!=''){
                                          //http://127.0.0.1:5000/setwen
                                                bjax.ajax({
                                                    type:'post',
                                                    url:'http://127.0.0.1:5000/setwen',
                                                    timeout:1000,
                                                    data:{
                                                        title:$scope.dbtitle,
                                                        content:$scope.dbcontent
                                                    },
                                                    success:function(data){
                                                        
                                                        
                                                        $scope.$apply(function(){
                                                                  $scope.dbtitle =' ';
                                                                  $scope.dbcontent = ' ';   
                                                       })

                                                        alert(data)
                                                    },
                                                    error:function(data){
                                                        alert(data)
                                                    }
                                                })

                                    }
                                    
                              }

                              //编辑文章按钮
                              $scope.edit=function(x,index){
                                    $scope.mainview.edit=true;
                                    $scope.edtitle= x.title;
                                    $scope.edcontent= x.content;
                                    $scope._edid = x._id;
                                    $scope.edindex = index;
                              }
                              $scope.addhome=function(id){
                                    bjax.ajax({
                                          type:'post',
                                          url:'http://127.0.0.1:5000/addhomelist',
                                          data:{
                                                _id:id,
                                                type:'add'
                                          },
                                          success:function(){
                                                alert('ok')
                                          },
                                          error:function(data){
                                                alert(data)
                                          }
                                    })
                              }
                              //编辑文章按钮 > 提交按钮
                              $scope.submit=function(){
                                    $scope.mainview.edit=false
                                    bjax.ajax({
                                          type:'post',
                                          url:'http://127.0.0.1:5000/editwen',
                                          data:{
                                                _id : $scope._edid,
                                                title : $scope.edtitle,
                                                content : $scope.edcontent
                                          },
                                          success:function(){
                                                $scope.$apply(function(){
                                                      $scope.wen.data[$scope.edindex]={
                                                            _id : $scope._edid,
                                                            title :  $scope.edtitle,
                                                            content :  $scope.edcontent
                                                      }
                                                })
                                                alert('ok')
                                          },
                                          error:function(data){
                                                alert(data)
                                          }
                                    })
                              }
                              $scope.delete=function(id,index){
                                    if(confirm('确认删除？')){
                                          bjax.ajax({
                                                type:'post',
                                                url:'http://127.0.0.1:5000/deletewen',
                                                data:{
                                                      _id:id
                                                },
                                                success:function(){
                                                      $scope.$apply(function(){
                                                            $scope.wen.data.splice(index,1)
                                                      })
                                                },
                                                error:function(data){
                                                      alert(data)
                                                }
                                          })
                                    }
                              }
                              $scope.removehome=function(id,index){
                                    if(confirm('确认删除？')){
                                          bjax.ajax({
                                                type:'post',
                                                url:'http://127.0.0.1:5000/addhomelist',
                                                data:{
                                                      _id:id,
                                                      type:'remove'
                                                },
                                                success:function(){
                                                      $scope.$apply(function(){
                                                            $scope.home.data.splice(index,1)
                                                            alert('ok')
                                                      })
                                                },
                                                error:function(data){
                                                      alert(data)
                                                }
                                          })
                                    }
                              }
                  }])
                  
