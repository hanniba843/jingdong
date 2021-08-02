window.onload = function(){
    // 返回上一个页面
    let back = document.querySelector('.back');
    back.addEventListener('click',()=>{
        window.history.back();
    })

    //获取订单编号
    axios({
        method:'get',
        url:'http://vueshop.glbuys.com/api/order/lastordernum?uid='+localStorage.getItem('uid')+'&token=1ec949a15fb709370f'
    }).then((res)=>{
        $('.ordernum')[0].innerHTML = `订单编号：${res.data.data.ordernum}`
    })


    // 查看订单
    let arr = [];
    let arrkey = [];
    for (let i = 0; i < localStorage.length; i++) {
         if(localStorage.key(i).length >8){
             var key = localStorage.key(i); //获取本地存储的Key
             arrkey.push(key);
             arr.push(localStorage.getItem(key));
         }
         
    }
    arr.reverse();
    $('.list')[2].onclick =function(){
        location.href = 'list.html';
    }
}