window.onload=function(){

    $('.back')[0].onclick = function(){//返回上一页
        location.href = 'http://127.0.0.1:8000/order.html'
    }
    
    
    $('.address-nav-name-2')[0].onclick=function(){//添加地址
        location.href = 'add.html'
    }
    
    
    function address(){//渲染地址栏
        var arr = []
        axios({
                method:'get',
                url:'http://vueshop.glbuys.com/api/user/address/index?uid='+localStorage.getItem('uid')+'&token=1ec949a15fb709370f'
        }).then((res)=>{
            var result = res.data.data 
            if(res.data.status==1){
                $('.box')[0].innerHTML=addressResult(result)
            }else{
                $('.box')[0].innerHTML=""
                $('.no-data').css('display','block')
            }
            for (let i = 0; i < $('.edit').length; i++) {
                console.log(result[i].aid);
                arr.push(result[i].aid)
                //修改收货地址
                $('.edit')[i].onclick = function(){
                    localStorage.setItem('aid',arr[i])
                    location.href='mod.html?mod='+res.data.data[i].aid
                } 
                //删除收货地址
                $('.del')[i].onclick = function(){
                    var M = {};//确认框
                    if(M.dialog4){
                        return M.dialog4.show();
                    }
                    M.dialog4 = jqueryAlert({
                        'title'   : '确认要删除吗',
                        'modal'   : true,
                        'animateType' : '',
                        'buttons' :{
                            '确定' : function(){
                                axios({
                                    method: 'get',
                                    url: 'http://vueshop.glbuys.com/api/user/address/del?uid='+localStorage.getItem('my')+'&aid='+arr[i]+'&token=1ec949a15fb709370f',
                                }).then((res) => {
                                    if (res.data.code == 200) {
                                        if(res.data.code == 200){
                                        address()
                                    }
                                }
                                })
                                M.dialog4.close();
                            },
                            '取消' : function(){
                                M.dialog4.close();
                            }
                        }
                    })
                    } 
                //渲染默认地址样式
                if(res.data.data[i].isdefault==1){
                    $('.address-info-wrap')[i].className = 'address-info-wrap change';
                    $('.address')[i].className = 'address change';
                }
                //选择地址
                $('.address-info-wrap')[i].onclick = function(){
                    localStorage.setItem('aid',arr[i])
                    location.href = 'http://127.0.0.1:8000/order.html'
                }
            }
        })
    }
    address()
    
    
    function addressResult(result){ 
        return  result.map((v,i)=>{
        return `
        <div class="address-list">
        <div class="address-info-wrap">
            <div class="address-info">
                <div class="person">
                    <span>${v.name}</span>
                    <span>${v.cellphone}</span></div>
                <div class="address">
                    <span class="text">${v.province} ${v.city} ${v.area}</span>
                </div>
            </div>
        </div>
        <div class="handle-wrap">
            <div class="edit"></div>
            <div class="del"></div>
        </div>
    </div>`
        }
    ).join('')
    } 
    
    
    }