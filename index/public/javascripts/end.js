window.onload = function(){
    // 返回上一个页面
    let back = document.querySelector('.back');
    back.addEventListener('click',()=>{
        window.history.back();
    })

   console.log(localStorage.key(1).length ==8);
    $('.ordernum')[0].innerHTML = '订单编号：'+localStorage.key(localStorage.length-1);
    for(let i=0;i<localStorage.length;i++){
        if(localStorage.key(i).length ==7){
            var Order = localStorage.key(i);
            console.log(Order);
        }
    }


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