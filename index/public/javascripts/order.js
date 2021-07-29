window.onload = function(){
    // 返回上一个页面
    let back = document.querySelector('.back');
    back.addEventListener('click',()=>{
        window.history.back();
    })
    
    // 获取购物车信息
     let arr = [];
     let arr1 = [];
     let arrkey = [];
     let TotalMerchandise =0;//商品总额
     for (let i = 0; i < localStorage.length; i++) {
         if(localStorage.key(i).length >8){
             var key = localStorage.key(i); //获取本地存储的Key
             arrkey.push(key);
             arr.push(localStorage.getItem(key));
         }
     }
     arr.reverse();
     for(var i=0;i<arr.length;i++){
        arr[i] = arr[i].split(',');
        arr1.push(arr[i]);
        $('.goods-wrap')[0].innerHTML += `
        <div class="goods-list">
            <div class="image"><img src=${arr1[i][3]} alt=""></div>
                <div class="goods-param">
                    <div class="title">${arr1[i][4]}</div>
                    <div class="attr"><span>颜色： ${arr1[i][0]}</span><span>尺码： ${arr1[i][1]}</span></div>
                    <div class="amount">x ${arr1[i][2]}</div>
                    <div class="price">￥${arr1[i][5]}</div>
            </div>
        </div> 
    `
    TotalMerchandise += parseFloat(arr[i][5]*arr1[i][2]);
    }
    // console.log(arr);
    $('.total-wrap')[0].innerHTML =`
        <li>商品总额</li>
        <li>￥${TotalMerchandise}</li>
    `
    $('.total-wrap')[1].innerHTML = `
        <li>运费</li>
        <li>￥${arr1.length*10}</li>
    `
    $('.price-wrap span')[1].innerHTML = '￥'+(TotalMerchandise+(arr1.length*10))

    // 提交订单
    $('.balance-btn')[0].onclick = function(){
        // 随机编号
        let str = Math.random().toString().slice(-7);
        localStorage.setItem(str,arr);
        location.href = 'end.html';
        
    }
}