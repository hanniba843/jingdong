$(document).ready(function(){

//回退
$('.back')[0].onclick = function(){
    history.go(-1)
    localStorage.removeItem('keywords')
}

//渲染分类页面
var cid = [] //保存cid值
function kwords(){
    return axios({
        method:'get',
        url:'http://vueshop.glbuys.com/api/home/category/menu?token=1ec949a15fb709370f',
    }).then((res)=>{
       if(res.data.code==200){
           $('.item-wrap')[0].innerHTML = res.data.data.map((v,i)=>{
               cid.push(v.cid);
               return `
               <div class="item">${v.title}</div>
               `
           }).join('')
       }
       for (let i = 0; i < $('.item').length; i++) {
        $('.item')[i].onclick = function(){
            if($(this).hasClass('active')){
                $(this).removeClass('active')
            }else{
                $(this).addClass('active').siblings().removeClass('active')
            }
        }
    }
    })
} kwords()

//渲染分类属性
var pid = [] 
var param = [] //保存pid值
function key(){
    return axios({
        method:'get',
        url:'http://vueshop.glbuys.com/api/home/goods/param?kwords='+localStorage.getItem('keywords')+'&token=1ec949a15fb709370f',
    }).then((res)=>{
     if(res.data.code==200){
         $('.content')[0].innerHTML = res.data.data.map((v,i)=>{
             return `<div class="attr-wrap">
             <div class="attr-title-wrap">
                 <div class="attr-name">${v.title}</div>
                 <div class="attr-icon"></div>
             </div>
             <div class="item-wrap" style="">
             ${v.param.map((v,i)=>{
                pid.push(v.pid)
                 return `<div class="item">${v.title}</div> `
             }).join('')}
             </div>
         </div>`
         }).join('')
         for (let i = 0; i < $('.content').find('.item').length; i++) {
            $('.content').find('.item')[i].index = i
            $('.content').find('.item')[i].index = pid[i]
            $('.content').find('.item')[i].onclick = function(){
                if($(this).hasClass('active')){
                    $(this).removeClass('active')
                }else{
                    $(this).addClass('active');  
                }     
            }
           
          } 
     }
    })
}

//打开分类页面
$('.screen-btn').click(function(){
        param=[]
        $('.screen')[0].className = 'screen move'
        $('.mask').css('display','block')
       
        if(localStorage.getItem('keywords')){
            key()
        }

        //价格区间
        var pri = document.getElementsByClassName('item-wrap')[1]
        for (let i = 0; i < pri.children.length; i++) {
            pri.children[i].onclick = function(){
                if($(this).hasClass('active')){
                    $(this).removeClass('active')
                    $('.maxp')[0].value=""
                    $('.minp')[0].value=""
                }else{
                    $(this).addClass('active').siblings().removeClass('active')
                    $('.maxp')[0].value=(pri.children[i].innerHTML).split('-')[1];
                    $('.minp')[0].value=(pri.children[i].innerHTML).split('-')[0];
                }
            }
        }
        //全部重置
        $('.reset')[0].onclick=function(){  
              for (let i = 0; i < $('.item').length; i++) {
                  if($('.item')[i].className == 'item active'){
                     $('.item')[i].className = 'item'
                     result = ""
                  }
              }
        }
        //确认搜索
        $('.sure')[0].onclick = function(){
            //关闭筛选页面展示结果
            $('.screen')[0].className = 'screen unmove'
            $('.mask').css('display','none')
           //获取cid
           for (let i = 0; i < $('.item-wrap')[0].children.length; i++) {
               $('.item')[i].index = i
               if($('.active')[1]){
                var _index = $('.active')[1].index
               }
            }  
            
            for (let i = 0; i < $('.content').find('.item').length; i++) {
                $('.content').find('.item')[i].index = i
                if($('.content').find('.item')[i].className == 'item active'){
                    param.push(pid[i])
            }
         } 
            //进行各项传值
            result.cid = cid[_index]         
            result.param = JSON.stringify(param)
            result.price1 = $('.minp')[0].value
            result.price2 = $('.maxp')[0].value
            $('.goods-main')[0].innerHTML =""
            shopResult(result)//调用渲染方法
        }   
})

//关闭筛选
$('.mask').click(function(){
    if($('.screen')[0].className == 'screen move'){
        $('.screen')[0].className = 'screen unmove'
        $('.mask').css('display','none')
    }
})

//传参调用进行渲染
var gid = [] //保存gid
function shopResult(result){
    return axios({
        method:'get',
        url:"http://vueshop.glbuys.com/api/home/goods/search?token=1ec949a15fb709370f",
        params:result
    }).then((res)=>{
        if(res.data.code==200){
            for (let i = 1; i <= res.data.pageinfo.pagenum; i++) {
                axios({
                    method:'get',
                    url:"http://vueshop.glbuys.com/api/home/goods/search?token=1ec949a15fb709370f&page="+i,
                    params:result
                }).then((res)=>{
                   if(res.data.code==200){
                    $('.goods-main')[0].innerHTML += res.data.data.map((v,i)=>{
                        gid.push(v.gid);
                    return `
                    <div class="goods-list">
                    <div class="image"><img src="${v.image}"></div>
                    <div class="goods-content">
                        <div class="goods-title">${v.title}</div>
                        <div class="price">¥${v.price}</div>
                        <div class="sales">销量<span>${v.sales}</span>件</div>
                    </div>
                    </div>`
                }).join('')
                $('.item').children()[0].innerHTML = res.data.pageinfo.total
                }
                //点击商品进行跳转
                for (let i = 0; i < $('.goods-list').length; i++) {
                    $('.goods-list')[i].onclick =function(){
                        localStorage.setItem('gid',gid[i])
                        location.href = 'details.html'
                    }
                }
                })
            }
        }else{
            $('.no-data').css('display','block')
            $('.item').children()[0].innerHTML = 0
        }
    })
}


//判断是否从搜索关键字进入页面
if(localStorage.getItem('keywords')!=undefined){
    var result = {kwords:localStorage.getItem('keywords')}
    shopResult(result)
    $('.search-text')[0].innerHTML = localStorage.getItem('keywords')
}else{//渲染默认页面
    $('.goods-main')[0].innerHTML = ""
    $('.search-text')[0].innerHTML = "" //清空上一次搜索数据
    var result = {otype:'all'}
    shopResult(result)
}

//根据销量
$('.order-item')[1].onclick=function(){
    $(this).addClass('active').siblings().removeClass('active')
    $('.order-menu').css('display','none')
    if(localStorage.getItem('keywords')){
        $('.goods-main')[0].innerHTML =""
        result.otype = 'sales'
        result.kwords = localStorage.getItem('keywords')
        shopResult(result)
    }else{
        $('.goods-main')[0].innerHTML =""
        result.otype = "sales" 
        shopResult(result)
    }
}

//根据综合条件
$('.order-item')[0].onclick  = function(){
    if($(this).hasClass('active')){
        $(this).removeClass('active')
        $(this).find('.order-menu').css('display','none')
    }else{
        $(this).addClass('active').siblings().removeClass('active')
        $(this).find('.order-menu').css('display','block')
    }
}
var arr = ['all','up','down']
for (let i = 0; i < $('.order-menu li').length; i++) {
    $('.order-menu li')[i].onclick = function(){
        if ($(this).className == 'active') {
            $(this).removeClass('active')
        } else {
            $(this).addClass('active')
            $(this).siblings().removeClass('active');// 删除其他兄弟元素的样式 
        }
        $('.goods-main')[0].innerHTML =""
        result.otype = arr[i]
        result.kwords = localStorage.getItem('keywords')
        shopResult(result)
    }
}

//搜索框搜索
$('.search-wrap')[0].onclick=function(){
    localStorage.setItem('search','search')
    localStorage.removeItem('keywords')
    history.go(-1)
}

//上下滑动样式
function initBScroll(code) {
    var tag = document.querySelector(code);
    var bs = BetterScroll.createBScroll(tag, {
        pullDownRefresh: {
            threshold: 30,
        },
        pullUpLoad: {
            threshold: -30,
        },
        click: true,
    });
    bs.on("pullingDown", () => {
        bs.finishPullDown();
        bs.refresh();
    });
    bs.on("pullingUp", () => {
        bs.finishPullDown();
        bs.refresh();
    });
}
initBScroll('.screen')
})