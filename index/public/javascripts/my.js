window.onload = function(){
    //切换
    let buttonNav = document.querySelector('.button-nav');
    let buttonNavUl = buttonNav.children;
    let arr = ['url(images/common/home2.png)','url(images/common/cart2.png)','url(images/common/my2.png)'];
    let arr2 = ['url(images/common/home1.png)','url(images/common/cart1.png)','url(images/common/my1.png)'];
    let href = ['index.html','cart.html','my.html']
    for(let i = 0;i<buttonNavUl.length;i++){
        // console.log(i);
        buttonNavUl[i].onclick = function(){
            for(let j=0;j<buttonNavUl.length;j++){
                // console.log(j);
                buttonNavUl[j].children[0].style.backgroundImage = arr2[j];
                buttonNavUl[j].style.color = "black";
            }
            window.location.href = href[i];
        }
    }

    


    // 点击所有按钮判断是否登录会员
    let btn = document.querySelector('.btn');
    // console.log(localStorage.getItem('ok')==1);
    // 已登录用户的状态
    if(localStorage.getItem('ok')==1){
        // 添加昵称
        $('.nickname')[0].innerHTML = localStorage.getItem('nickname')

        $('.btn')[0].innerHTML = '安全退出';
        // 点击退出用户
        $('.btn')[0].onclick = function(){
            localStorage.clear();
            $('.btn')[0].innerHTML = '登录/注册';
        }
        $('.show-order')[0].onclick = function(){
            location.href = 'list.html';
        }
        for(let i=0;i<$('.item').length;i++){
            $('.item')[i].onclick = function(){
                location.href = 'list.html' + '?status='+i;
            } 
        }

        // 进入个人资料页
        $(".menu-list-wrap")[0].children[0].onclick = function(){
            location.href = 'user/profile.html';
        }

        // 进入收获地址
        $(".menu-list-wrap")[0].children[1].onclick = function(){
            location.href = 'user/address.html';
        }

        // 进入绑定手机
        $(".menu-list-wrap")[0].children[2].onclick = function(){
            location.href = 'user/bind_cellphone.html';
        }

        // 进入修改密码
        $(".menu-list-wrap")[0].children[3].onclick = function(){
            location.href = 'user/mod_password.html';
        }

         // 进入我的收藏
         $(".menu-list-wrap")[0].children[4].onclick = function(){
            location.href = 'user/fav.html';
        }
        
    }else{
        // 添加昵称
        $('.nickname')[0].innerHTML = '昵称'

        // 判断未登录用户的状态
        //进入登陆页面
        btn.addEventListener('click',()=>{
            window.location.href = 'login.html';
        })
        $('.show-order')[0].onclick = function(){
            if(localStorage.getItem('name')==null){
                location.href = 'login.html';
            }
        }
        // console.log($('.item'));
        for(let i=0;i<$('.item').length;i++){
            $('.item')[i].onclick = function(){
                if(localStorage.getItem('name')==null){
                    location.href = 'login.html';
                }
            }
        }
        for(let i=0;i<$('.menu-list-wrap ul').length;i++){
            $('.menu-list-wrap ul')[i].onclick = function(){
                if(localStorage.getItem('name')==null){
                    location.href = 'login.html';
                }
            }
        }
    }
    // 点击所有按钮判断是否登录会员 结束

   
}