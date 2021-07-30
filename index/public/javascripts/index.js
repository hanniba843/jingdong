window.onload  = function(){
      // 尾部
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
    //进入登录页
    if(localStorage.getItem('ok')==1){
      $('.login')[0].innerHTML = '';
      $('.login')[0].style.width = '0.8rem';
      $('.login')[0].style.height = '0.8rem';
      $('.login')[0].style.backgroundImage =  'url( ../images/common/my1.png )';
      $('.login')[0].style.backgroundSize = '100%';
      $('.login')[0].style.backgroundPosition = '50%';
      $('.login')[0].onclick = function(){
        location.href = 'my.html';
      }
    }else{
      let login = document.querySelector('.login');
      login.addEventListener('click',()=>{
        window.location.href = 'login.html';
      })
    }
    


    // 点击搜索框
    let searchWrap = document.querySelector('.search-wrap');
    let searchComponent = document.querySelector('.search-component');
    let close = document.querySelector('.close');
    searchWrap.addEventListener('click',()=>{
      searchComponent.style.display = 'block';
    })
    close.addEventListener('click',()=>{
      searchComponent.style.display = 'none';
    })

    // 点击分类
    let classifyIcon = document.querySelector('.classify-icon');
    classifyIcon.addEventListener('click',function(){
      window.location.href = 'classify.html';
      localStorage.setItem('users',492);
    })  


    // 轮播图
    var mySwiper = new Swiper ('.swiper-container', {
      autoplay: true,
      loop: true,
      speed: 500,
      pagination: {
            el: '.swiper-pagination',
            clickable:true,
          },
  })
}
       