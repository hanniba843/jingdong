window.onload = function(){
    // 返回上一个页面
    let back = document.querySelector('.back');
    back.addEventListener('click',()=>{
        window.history.back();
    })

    // 选项卡
    // console.log($('.tags-wrap')[0].children.length);//长度
    for(let i=0;i<$('.tags-wrap')[0].children.length;i++){
        $('.tags-wrap')[0].children[i].onclick = function(){
            for(let j=0;j<$('.tags-wrap')[0].children.length;j++){
                $('.tags-wrap')[0].children[j].className = 'tags';
            }
            $(this)[0].className = 'tags active';
            $('.title')[0].innerHTML = $(this)[0].innerHTML;
        }
    }
    var arr = location.search.split('=')
    // console.log(arr[1] == undefined);
    // console.log(parseInt(arr[1])+1);
    let num = parseInt(arr[1])+1;
    if(arr[1] != undefined){
        for(let j=0;j<$('.tags-wrap')[0].children.length;j++){
            $('.tags-wrap')[0].children[j].className = 'tags';
        }
        $('.tags')[num].className = 'tags active';
        $('.title')[0].innerHTML = $('.tags')[num].innerHTML;
    }

    // 获取订单

    for(let i=0;i<localStorage.length;i++){
        if(localStorage.key(i).length >8){
            var Order = localStorage.key(i);
            console.log(Order);
        }
    }


    // let str= localStorage.key(localStorage.length-1);
    // console.log(localStorage.key(9));
    let obj = [];
    obj.push(localStorage.getItem(Order).split(','))
    // console.log(localStorage.getItem(str).split(','));
    // console.log(obj[0]);
    $('.main div')[0].innerHTML = `
    <div class="order-list">
        <div class="ordernum-wrap">
            <div class="ordernum">订单编号：${Order}</div>
            <div class="status">已收货</div>
        </div>
        <div class="item-list">
            <div class="image"><img src=${obj[0][3]}></div>
            <div class="title">${obj[0][4]}</div>
            <div class="amount">x ${obj[0][2]}</div>
        </div>
        <div class="total-wrap">
            <div class="total">实付金额：¥333</div>
            <div class="status-wrap">
                <div class="status-btn">取消订单</div>
                <div class="status-btn">去付款</div>
            </div>
        </div>
    </div>
    `

    // 获取评价
    var gid = []
    $('.main')[0].innerHTML = '' //先清空页面数据
    return axios({
        method: 'get',
        url: 'http://vueshop.glbuys.com/api/user/myorder/reviewOrder?uid=' + localStorage.getItem('uid') + '&page=1&token=1ec949a15fb709370f'
    }).then((res) => {
        if (res.data.code == 200) {
            for (let i = 1; i <= res.data.pageinfo.pagenum; i++) {
                axios({//遍历渲染所有数据
                    method: 'get',
                    url: 'http://vueshop.glbuys.com/api/user/myorder/reviewOrder?uid=' + localStorage.getItem('uid') + '&page=' + i + '&token=1ec949a15fb709370f'
                }).then((res) => {
                    if (res.data.code == 200) {
                        $('.main')[0].innerHTML += res.data.data.map((v, i) => {
                            if (v.status == 0) v.status = '待付款' //判断付款状态
                            else v.status = '已收货'
                            return `
        <div class="order-list">
        <div class="ordernum-wrap">
        <div class="ordernum">订单编号：${v.ordernum}</div>
        <div class="status">${v.status}</div>
        </div>
        ${v.goods.map((v, i) => {
                                gid.push(v.gid)
                                if (v.isreview == 0) v.isreview = '评价'
                                else v.isreview = '追加评价'
                                return `
            <div class="item-list">
            <div class="image"><img src="${v.image}" alt=""></div>
            <div class="title">${v.title}</div>
            <div class="amount">x ${v.amount}</div>
            <div class="status-btn">${v.isreview}</div>
            </div>
            `
                            }).join('')}      
        </div>`}
                        ).join('')
                        // $('.item-list').css('height', '5.2rem')
                        $('.amount').css('bottom', '2rem')
                        for (let i = 0; i < $('.order-list').length; i++) {
                            //跳转详情页面
                            $('.title')[i].onclick = function () {
                                // localStorage.setItem('ordernum', arr[i])
                                // location.href = 'orderdls.html'
                            }
                            //去评价
                            $('.status-btn')[i].onclick = function () {
                                // localStorage.setItem('ordernum', arr[i])
                                // localStorage.setItem('gid', gid[i])
                                // location.href = 'review.html'
                            }

                        }
                    }
                }
                )
            }
        }
    })
}