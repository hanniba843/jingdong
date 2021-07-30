window.onload = function(){
    // 返回上一个页面
    $('.back')[0].addEventListener('click',()=>{
        window.history.back();
    })

    // 获取收藏信息
    axios({
        url:'http://vueshop.glbuys.com//api/user/fav/index?uid='+localStorage.getItem('uid')+'&token=1ec949a15fb709370f&page=1'
    }).then((res) => {
        // console.log(res.data.pageinfo.pagenum);
        for(let i=0;i<res.data.pageinfo.pagenum;i++){
            axios({
                url:'http://vueshop.glbuys.com//api/user/fav/index?uid='+localStorage.getItem('uid')+'&token=1ec949a15fb709370f&page='+(i+1)
            }).then((res) => {
                $('.main')[0].innerHTML += res.data.data.map((v,i)=>{
                  return  `
                    <div class="goods-list">
                        <div class="image"><img src=${v.image} alt=""></div>
                        <div class="title">${v.title}</div>
                        <div class="price">¥${v.price}</div>
                        <div class="btn-wrap">
                            <div class="btn">购买</div>
                            <div class="btn">删除</div>
                        </div>
                    </div>
                    `
                }).join(' ')

                // 点击够买跳转
                // console.log(res.data.data);
                let btnWrap = document.querySelectorAll('.btn-wrap');
                // console.log(btnWrap[0].children[0]);
                for(let i=0;i<res.data.data.length;i++){
                    btnWrap[i].children[0].onclick = function(){
                        localStorage.setItem('user',res.data.data[i].gid);
                        location.href = 'http://127.0.0.1:8000/item.html';
                    }
                }
                // console.log(res.data.data);

                // 删除商品
                for(let i=0;i<res.data.data.length;i++){
                    btnWrap[i].children[1].onclick = function(){
                        // console.log(this.parentElement.parentElement.remove());
                        this.parentElement.parentElement.remove()
                        axios({
                            method:'post',
                            url:'http://vueshop.glbuys.com//api/user/fav/del?uid='+localStorage.getItem('uid')+'&fid='+res.data.data[i].fid+'&token=1ec949a15fb709370f'
                        }).then((res) => {
                            // console.log(res.data);  
                        });
                    }
                }
            });
        }
    });  
}