window.onload = function(){
    
    // 尾部
    let buttonNav = document.querySelector('.button-nav');
    let buttonNavUl = buttonNav.children;
    // let arr = ['url(images/common/home2.png)','url(images/common/cart2.png)','url(images/common/my2.png)'];
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

}