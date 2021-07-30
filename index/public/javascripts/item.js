window.onload = function () {
    var num = window.localStorage.getItem('user');
    // 头部获取
    const xhr = new XMLHttpRequest();
    xhr.open('GET',
        'http://vueshop.glbuys.com/api/home/goods/info?gid=' + num +
        '&type=details&token=1ec949a15fb709370f');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                let res = JSON.parse(xhr.response);
                // console.log(res);
                var subPage = document.querySelector('.sub-page');
                subPage.innerHTML =
                    `
            <div class="page">
    <div class="swiper-container swpier-wrap">
        <div class="swiper-wrapper">
            ${res.data.images.map((v,i)=>{
                // console.log(v);
                return ` <div class="swiper-slide"><img src=${v}></div>`
            }).join(' ')}
        </div>
        <div class="swiper-pagination"  style="width: 100%;"></div>
    </div>
    <div class="goods-ele-main">
        <div class="goods-title">${res.data.title} </div>
        <div class="price">￥${res.data.price} </div>
        <ul class="sales-wrap">
            <li>快递：${res.data.freight} 元</li>
            <li>月销量${res.data.sales} 件</li>
        </ul>
    </div>
</div>
            `
            }
            var mySwiper = new Swiper('.swiper-container', {
                autoplay: true,
                loop: true,
                speed: 500,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            })
        }
    }


    // console.log(num);
    // 评价获取
    const evaluation = new XMLHttpRequest();
    evaluation.open('GET',
    'http://vueshop.glbuys.com/api/home/reviews/index?gid='+num+'&token=1ec949a15fb709370f&page=1');
    evaluation.send();
    evaluation.onreadystatechange = function(){
        if (evaluation.readyState === 4) {
            if (evaluation.status >= 200 && evaluation.status < 300){
                let res = JSON.parse(evaluation.response);
                let reviewsTitle = document.querySelector('.reviews-title');
                // console.log(res.data);
                var str = res.data;
                
                if(res.data != '没有数据'){
                // console.log(reviewsTitle);
                
                reviewsTitle.innerHTML = `
                商品评价（${res.pageinfo.total}） 
                `
                // res.data.map((v,i)=>{
                //     console.log(v);
                // });
                // 最开始的详细说明
                let reviewsWrap = document.querySelector('.reviews-wrap');
                reviewsWrap.innerHTML =`${res.data.map((v,i)=>{
                  return  `
                        <div class="reviews-list">
                            <div class="uinfo">
                                <div class="head"><img src=${v.head} alt=""></div>
                                <div class="nickname">${v.nickname}</div>
                            </div>
                            <div class="reviews-content">
                                ${v.content}
                            </div>
                            <div class="reviews-date">${v.times}</div>
                        </div>
                `
                }).join(" ")} `

            // 评价详细
            let reviewsMore = document.querySelector('.reviews-more');
            let tabName = document.querySelectorAll('.tab-name');
            let subPage = document.querySelector('.sub-page');
            let btn = document.querySelector('.bottom-btn-wrap');
            let reviewsMain = document.querySelector('.reviews-main');
            const number = reviewsWrap.children.length;
            // console.log(number);
            
            reviewsMore.onclick =function(){
                
                console.log(reviewsWrap.children.length);
                tabName[0].className = 'tab-name';
                tabName[2].className = 'tab-name active';
                // console.log(tabName[2].className  == 'tab-name active');//判断
                
                if(tabName[2].className  == 'tab-name active'){
                
                subPage.style.display = 'none';
                btn.style.display = 'none';
                reviewsMore.style.display = 'none';
                reviewsMain.style.marginTop = '1.5rem';
               
                // if(res.data)
                for(let i =1;i<res.pageinfo.pagenum;i++){
                    let more = new XMLHttpRequest();
                    more.open('GET',
                    'http://vueshop.glbuys.com/api/home/reviews/index?gid='+num+'&token=1ec949a15fb709370f&page='+(i+1)+'');
                    more.send();
                    more.onreadystatechange = function(){
                        if (more.readyState === 4) {
                            if (more.status >= 200 && more.status < 300){
                                let res = JSON.parse(more.response);
                                // console.log(res.data.length);
                               
                                // console.log(res);
                                // res.data.map((v,i)=>{
                                //     console.log(v);
                                // })
                                // console.log(res);
                               
                                reviewsWrap.innerHTML +=`${res.data.map((v,i)=>{
                                    return  `
                                          <div class="reviews-list">
                                              <div class="uinfo">
                                                  <div class="head"><img src=${v.head} alt=""></div>
                                                  <div class="nickname">${v.nickname}</div>
                                              </div>
                                              <div class="reviews-content">
                                                  ${v.content}
                                              </div>
                                              <div class="reviews-date">${v.times}</div>
                                          </div>
                                  `
                                        }).join(" ")} `
                                    }
                                }
                        
                            }
                        }
                    }
                                      
                }       
                // console.log(reviewsMore);
            }else{
               
                let noData = document.querySelector('.no-data');
                let reviewsMore = document.querySelector('.reviews-more');
                // console.log(noData.innerHTML);
                noData.style.display = 'block';
                reviewsMore.style.display = 'none';
            }
            
        }
    }
     // 头部选项卡
    // console.log(tabName.length);
    let reviewsMain = document.querySelector('.reviews-main');
    let content = document.querySelector('.content');
    let reviewsMore = document.querySelector('.reviews-more');
    let subPage = document.querySelector('.sub-page');
    let btn = document.querySelector('.bottom-btn-wrap');
    // let tabName = document.querySelectorAll('.tab-name');
    for(let i=0;i<tabName.length;i++){
        // let reviewsMore = document.querySelector('.reviews-more');
        // let reviewsMain = document.querySelector('.reviews-main');
        // let content = document.querySelector('.content');
        let noData = document.querySelector('.no-data');
        tabName[i].onclick = function(){
            
            // console.log(reviewsMore);
            // console.log(noData.innerHTML);
            if(i==0){
                let reviewsWrap = document.querySelector('.reviews-wrap');
                // console.log(reviewsWrap.children.length ==0);
                if(reviewsWrap.children.length ==0){
                    reviewsMore.style.display = 'none';
                }else{
                    reviewsMore.style.display = 'block';
                }
                    const evaluation = new XMLHttpRequest();
                    evaluation.open('GET',
                    'http://vueshop.glbuys.com/api/home/reviews/index?gid='+num+'&token=1ec949a15fb709370f&page=1');
                    evaluation.send();
                    evaluation.onreadystatechange = function(){
                        if (evaluation.readyState === 4) {
                            if (evaluation.status >= 200 && evaluation.status < 300){
                                let res = JSON.parse(evaluation.response);
                                let reviewsTitle = document.querySelector('.reviews-title');
                                if(res.data != '没有数据'){
                                // console.log(reviewsTitle);
                                // res.data.map((v,i)=>{
                                //     console.log(v);
                                // });
                                // console.log(res);
                                // 最开始的详细说明
                                let reviewsWrap = document.querySelector('.reviews-wrap');
                                reviewsWrap.innerHTML =`${res.data.map((v,i)=>{
                                return  `
                                        <div class="reviews-list">
                                            <div class="uinfo">
                                                <div class="head"><img src=${v.head} alt=""></div>
                                                <div class="nickname">${v.nickname}</div>
                                            </div>
                                            <div class="reviews-content">
                                                ${v.content}
                                            </div>
                                            <div class="reviews-date">${v.times}</div>
                                        </div>
                                `
                                }).join(" ")} `;
                            }
                        }
                    }
                }
               
                // console.log(noData.innerHTML);
                subPage.style.display = 'block';
                reviewsMain.style.display = 'block';
                // reviewsMore.style.display = 'block';
                content.style.display = 'none';
                btn.style.display = 'flex';
            }else if(i==1){
                subPage.style.display = 'none';
                reviewsMain.style.display = 'none';
                btn.style.display = 'none';
                content.style.display = 'block';
                const contents = new XMLHttpRequest();
                contents.open('GET',
                'http://vueshop.glbuys.com/api/home/goods/info?gid='+num+'&type=details&token=1ec949a15fb709370f');
                contents.send();
                contents.onreadystatechange = function(){
                    if (evaluation.readyState === 4) {
                        if (evaluation.status >= 200 && evaluation.status < 300){
                            let res = JSON.parse(contents.responseText);
                            // console.log(res.data.bodys);
                            content.innerHTML = res.data.bodys;
                        }
                    }
                   
                 }
            }else if(i==2){
                subPage.style.display = 'none';
                btn.style.display = 'none';
                reviewsMore.style.display = 'none';
                content.style.display = 'none';
                reviewsMain.style.display = 'block';
                reviewsMain.style.marginTop = '1.5rem';
            }
            for(var j=0;j<tabName.length;j++){
                tabName[j].className = 'tab-name';
            }
            this.className = 'tab-name active';
        }   
    }
    // 加入购物车 开始
    $.get(
        'http://vueshop.glbuys.com/api/home/goods/info?gid='+num+'&type=spec&token=1ec949a15fb709370f',
        function(res){
            // console.log(res.data.length);
            if(res.data.length ==2){
                $('.attr-wrap')[0].innerHTML =  `
                            <div class="attr-list">
                                <div class="attr-name">${res.data[0].title}</div>
                                <div class="val-wrap">
                                    ${res.data[0].values.map((v,i)=>{
                                        return `<span class="val">${v.value}</span>`
                                        }).join(' ')
                                    }
                                </div>
                            </div>
                            <div class="attr-list">
                                <div class="attr-name">${res.data[1].title}</div>
                                <div class="val-wrap">
                                    ${res.data[1].values.map((v,i)=>{
                                        return `<span class="val">${v.value}</span>`
                                        }).join(' ')
                                    }
                                </div>
                            </div>
                            `
            }else if(res.data.length==1){
                $('.attr-wrap')[0].innerHTML =  `
                            <div class="attr-list">
                                <div class="attr-name">${res.data[0].title}</div>
                                <div class="val-wrap">
                                    ${res.data[0].values.map((v,i)=>{
                                        return `<span class="val">${v.value}</span>`
                                        }).join(' ')
                                    }
                                </div>
                            </div>
                            `
            }
            
        },
        "json"
    )
    $.get(
        'http://vueshop.glbuys.com/api/home/goods/info?gid=' + num +
        '&type=details&token=1ec949a15fb709370f',
        function(res){
            $('.goods-info')[0].innerHTML = `
                <div class="close-panel-wrap">
                <div class="spot"></div>
                <div class="line"></div>
                <div class="close"></div>
            </div>
            <div class="goods-img"><img src=${res.data.images[0]} alt=""></div>
            <div class="goods-wrap">
                <div class="goods-title">${res.data.title}</div>
                <div class="price">${res.data.price}</div>
                <div class="goods-code">商品编码:${res.data.gid}</div>
            </div>
            `
        },
        "json"
    )
   
        $(".cart")[0].onclick = function(){
            $('.mask')[0].style.display = 'block';
            $('.cart-panel')[0].className  = 'cart-panel up';
        }
        $('.goods-info').on('click', '.close',function(){
            $('.mask')[0].style.display = 'none';
            $('.cart-panel')[0].className  = 'cart-panel down';
        })

    //   console.log($('.attr-wrap')[0].children);
      $(document).on('mouseenter','.val-wrap',function(){
        // console.log($(".val-wrap").length);
        if($(".val-wrap").length==2){
            for(let i=0;i<$(".val-wrap")[0].children.length;i++){
                $(".val-wrap")[0].children[i].onclick = function(){
                    for(let j=0;j<$(".val-wrap")[0].children.length;j++){
                        $(".val-wrap")[0].children[j].style.backgroundColor= '#efefef';
                        $(".val-wrap")[0].children[j].style.color = '#000';
                    }
                        $(".val-wrap")[0].children[i].style.backgroundColor= '#fda208';
                        $(".val-wrap")[0].children[i].style.color = '#fff';
                }
            }
            for(let i=0;i<$(".val-wrap")[1].children.length;i++){
                $(".val-wrap")[1].children[i].onclick = function(){
                    for(let j=0;j<$(".val-wrap")[1].children.length;j++){
                        $(".val-wrap")[1].children[j].style.backgroundColor= '#efefef';
                        $(".val-wrap")[1].children[j].style.color = '#000';
                            }
                        $(".val-wrap")[1].children[i].style.backgroundColor= '#fda208';
                        $(".val-wrap")[1].children[i].style.color = '#fff';
                }
            }
        }else if($(".val-wrap").length==1){
            for(let i=0;i<$(".val-wrap")[0].children.length;i++){
                $(".val-wrap")[0].children[i].onclick = function(){
                    for(let j=0;j<$(".val-wrap")[0].children.length;j++){
                        $(".val-wrap")[0].children[j].style.backgroundColor= '#efefef';
                        $(".val-wrap")[0].children[j].style.color = '#000';
                    }
                        $(".val-wrap")[0].children[i].style.backgroundColor= '#fda208';
                        $(".val-wrap")[0].children[i].style.color = '#fff';
                }
            }
        }
            
        });
        $('.amount-input-wrap .amount-input input')[0].value  =1;
        $('.amount-input-wrap .btn')[0].onclick = function(){
            if($('.amount-input-wrap .amount-input input')[0].value > 1){
                $('.amount-input-wrap .amount-input input')[0].value --;
                $('.amount-input-wrap .btn')[0].className = 'btn dec';
            }else{
                $('.amount-input-wrap .btn')[0].className = 'btn dec active';
                $('.amount-input-wrap .amount-input input')[0].value  =1;
            }
        }
        $('.amount-input-wrap .btn')[1].onclick = function(){
            $('.amount-input-wrap .amount-input input')[0].value ++;
        }
        // console.log($('.amount-input-wrap .btn')[0]);
        // console.log($('.sure-btn')[0]);
        

         // 按钮进入购物车
        var arr = [];
        $('.sure-btn')[0].onclick = function(){
            // console.log($('.val'));
            for(let i=0;i<$('.val').length;i++){
                if($('.val')[i].style.backgroundColor== 'rgb(253, 162, 8)'&& $('.val')[i].style.color == 'rgb(255, 255, 255)'){
                    // console.log($('.val')[i].innerText);
                    arr.push($('.val')[i].innerText);
                }
            }
            arr.push($('.amount-input')[0].children[0].value);
            arr.push($(".goods-img")[0].children[0].src);
            arr.push($(".goods-wrap .goods-title")[0].innerText);
            arr.push($(".goods-wrap .price")[0].innerText);


            // 提示添加成功
            $('.van-toast')[0].style.display = 'block';
            $('.van-toast')[0].children[0].innerHTML = '加入购物车成功';
            setTimeout(function(){
                $('.van-toast')[0].style.display = 'none';
                $('.van-toast')[0].children[0].innerHTML = '';
            },1500)

            window.localStorage.setItem(num,arr);
            // console.log(arr);
            
            // console.log($('.amount-input')[0].children[0].value);//数量
            // console.log($(".goods-img")[0].children[0].src);//图片
            // console.log($(".goods-wrap .goods-title")[0].innerText);//简介
            // console.log($(".goods-wrap .price")[0].innerText);//价格
            // console.log($('.attr-name')[0].nextElementSibling.children.length);
        }
        
        
       
        $('#cart-icon')[0].onclick = function(){
            location.href = 'cart.html';
            // console.log(num);
        }
        // 加入购物车结束


        

        // 点击收藏按钮 判断会员是否登录
        if(localStorage.getItem('ok')==1){
            $('.fav')[0].onclick = function(){
                axios({
                    method:'get',
                    url:'http://vueshop.glbuys.com/api/goods/fav?uid=484283066&gid='+num+'&token=1ec949a15fb709370f',
                }).then((res) => {
                    // console.log(res.data);
                    if(res.data.status==1){
                        $('.van-toast')[0].style.display = 'block';
                        $('.van-toast')[0].children[0].innerHTML = res.data.data;
                        setTimeout(function(){
                            $('.van-toast')[0].style.display = 'none';
                            $('.van-toast')[0].children[0].innerHTML = '';
                        },1500)
                    }else{
                        $('.van-toast')[0].style.display = 'block';
                        $('.van-toast')[0].children[0].innerHTML = res.data.data;
                        setTimeout(function(){
                            $('.van-toast')[0].style.display = 'none';
                            $('.van-toast')[0].children[0].innerHTML = '';
                        },1500)
                    }
                });
            }
        }else{
            $('.fav')[0].onclick = function(){
                $('.van-toast--text')[0].style.display = 'block';
                setTimeout(function(){
                    $('.van-toast--text')[0].style.display = 'none';
                },1000);
                $('.van-toast--text')[0].children[0].innerHTML = '请登录会员';
            }
        }
        
        // 点击收藏按钮 判断会员是否登录 结束
}



   

    // 返回上一个页面
    let back = document.querySelector('.back');
    back.addEventListener('click', () => {
        window.history.back();
    })

    // 选项卡功能
    let tabName = document.querySelectorAll('.tab-name');
    for(let i =0;i<tabName.length;i++){
        tabName[i].onclick = function(){
            for(let j=0;j<tabName.length;j++){
                tabName[j].className = 'tab-name';
            }
            this.className = 'tab-name active';
        }
    }
}