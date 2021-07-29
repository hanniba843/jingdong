window.onload = function(){
    // 获取商品信息
    let arr = [];
    let arr1 = [];
    let arrkey = [];
    // var TotalPrice = 0;
    for (let i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i).length >8){
            var key = localStorage.key(i); //获取本地存储的Key
            arrkey.push(key);
            arr.push(localStorage.getItem(key));
        }
    }
    arr.reverse();
    if(arr.length !=0){
        for(var i=0;i<arr.length;i++){
                arr[i] = arr[i].split(',');
                arr1.push(arr[i]);
                $('.box')[0].innerHTML += `
                <div class="cart-list">
                    <div class="select-btn active"></div>
                    <div class="image-wrap">
                        <div class="image"><img src=${arr1[i][3]}></div>
                        <div class="del">删除</div>
                    </div>
                    <div class="goods-wrap">
                        <div class="goods-title">${arr1[i][4]}</div>
                        <div class="goods-attr"><span>颜色： ${arr1[i][0]}</span><span>尺码： ${arr1[i][1]}</span></div>
                        <div class="buy-wrap">
                            <div class="price">¥${arr1[i][5]}</div>
                            <div class="amount-input-wrap">
                                <div class="btn dec">- </div>
                                <div class="amount-input"><input type="tel" value=${arr1[i][2]}></div>
                                <div class="btn inc">+</div>
                            </div>
                        </div>
                    </div>
                </div> 
            `
            // 测试总价
            // console.log((arr1[i][5])*(arr1[i][2]));
            // TotalPrice += (arr1[i][5])*(arr1[i][2]); 
            // console.log(arrkey);
        }
       

        // 加减显示数字
        for(let i=0;i< $('.amount-input-wrap').length;i++){
            // 减法
            $(".amount-input-wrap .dec")[i].onclick = function(){
                if($('.amount-input-wrap .amount-input input')[i].value > 1){
                        $('.amount-input-wrap .amount-input input')[i].value--;
                        arr1[i][2]--;
                        localStorage.setItem(arrkey[i],arr[i]);
                        total()
                    }else{
                        $('.amount-input-wrap .amount-input input')[0].value  =1;
                        total()
                    }   
            }
            // 加法
            $('.amount-input-wrap .inc')[i].onclick = function(){
                $('.amount-input-wrap .amount-input input')[i].value ++;
                arr1[i][2]++
                localStorage.setItem(arrkey[i],arr[i]);
                // console.log((localStorage.getItem(arrkey[i])).split(',')[2]);
                total()
            }
        }
        // 总价
        function total() {
            var sum = 0;
            for (let i = 0; i <$('.amount-input-wrap').length; i++) {
                sum += (arr1[i][5])*$('.amount-input-wrap .amount-input input')[i].value;

            }
            $('.total')[0].children[1].innerHTML = '￥' + sum;
        }
        total()
        // TotalPrice = (arr1[i][5])*$('.amount-input-wrap .amount-input input')[i].value;
        // $('.total')[0].children[1].innerHTML = '￥' + TotalPrice;
        $('.total')[0].children[0].innerHTML = '￥'+ ($('.box')[0].children.length*10);
        // 加减显示数字 结束

        // 判断结算按钮是否亮起
        if($('.cart-list').length != null){
            $('.orderend-btn')[0].style.background = '#cc0004';
        }else{
            $('.orderend-btn')[0].style.background = '#bfbfbf';
        }
        // 判断结算按钮结束


        // 全选按钮
        // console.log($('.select-btn')[$('.select-btn').length-1]);//获取全选按钮节点
        
        var ofa= true;
        $('.select-btn')[$('.select-btn').length-1].onclick = function(){
            if(ofa){
                for(let i=0;i<$('.select-btn').length;i++){
                    $('.select-btn')[i].className = 'select-btn';
                }
            }else{
                for(let i=0;i<$('.select-btn').length;i++){
                    $('.select-btn')[i].className = 'select-btn active';
                }
            }
            ofa = !ofa;
            if($('.select-btn')[i].className == 'select-btn'){
                $('.orderend-btn')[0].style.background = '#bfbfbf';
                $('.total')[0].children[0].innerHTML = '￥0';
                $('.total')[0].children[1].innerHTML = '￥0';
            }else{
                $('.orderend-btn')[0].style.background = '#cc0004';
                $('.total')[0].children[0].innerHTML = '￥'+ ($('.box')[0].children.length*10);
                total();
            }
        }
        // 全选按钮结束
        

        // 点击单个按钮
        // console.log($('.box')[0].children.length);
        // console.log($('.box')[0].children[0].firstElementChild);//获取单个点击按钮
        for(let i=0;i<$('.box')[0].children.length;i++){
            let off = true;
            $('.box')[0].children[i].firstElementChild.onclick  = function(){
               if(off){
                $('.box')[0].children[i].firstElementChild.className = 'select-btn';
                if($('.box')[0].children[i].firstElementChild.className == 'select-btn'){
                    $('.select-wrap')[0].firstElementChild.className = 'select-btn';
                    ofa = false;
                }
               }else{
                    $('.box')[0].children[i].firstElementChild.className = 'select-btn active';
                    if($('.box')[0].children.length == $('.box .active').length){
                        $('.select-wrap')[0].firstElementChild.className = 'select-btn active';
                    }
               }
               off = !off;
            }
        }
        // 点击单个按钮 结束


        // 删除按钮
        arrkey.reverse();
        for(let i=0;i<arrkey.length;i++){
            $(".cart-list .del")[i].onclick = function(){
                    $(".box")[0].removeChild($(".box")[0].children[i]);
                    localStorage.removeItem(arrkey[i]);
                    parent.location.reload();
            }
        } 
        // 删除按钮结束 
    }
    // 获取商品信息 结束
    
    // 跳转页面
    $('.button-nav')[0].children[0].onclick = function(){
        location.href = 'index.html';
    }
    $('.button-nav')[0].children[2].onclick = function(){
        location.href = 'my.html';
    }
    // 跳转页面 结束
    

    // 点击结算
    $('.orderend-btn')[0].onclick = function(){
        location.href = 'order.html';
    }
}