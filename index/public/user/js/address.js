window.onload = function(){
    // 返回上一个页面
    $('.back')[0].addEventListener('click',()=>{
        window.history.back();
    })


    // 显示添加收获地址
    $('.add-btn')[0].onclick = function(){
        location.href = 'add.html';
    }   

    // 显示收获地址
    axios({
        url:'http://vueshop.glbuys.com//api/user/address/index?uid='+localStorage.getItem('uid')+'&token=1ec949a15fb709370f',
    }).then((res) => {
        // console.log(res.data.data);
        $('.main')[0].innerHTML = res.data.data.map((v,i)=>{
            return `
                <div class="list">
                    <div class="name-wrap"><span>${v.name}</span><span>${v.cellphone}</span></div>
                    <div class="address">${v.province}${v.city}${v.area}${v.address}</div>
                    <div class="right-arrow"></div>
                </div>
            `
        }).join(' ')
        // console.log($('.list')); 
        for(let i =0;i<$('.list').length;i++){
            // console.log(i);
            $('.list')[i].onclick = function(){
                
                axios({
                    url:'http://vueshop.glbuys.com//api/user/address/index?uid='+localStorage.getItem('uid')+'&token=1ec949a15fb709370f',
                }).then((res) => {
                    console.log(res.data.data[i].aid);  
                    location.href = 'mod.html?mod='+res.data.data[i].aid
                });
            }
        }
    });
    
}