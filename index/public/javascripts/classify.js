window.onload = function(){
       // 点击搜索框
       let searchWrap = document.querySelector('.search');
       let searchComponent = document.querySelector('.search-component');
       let close = document.querySelector('.close');
       searchWrap.addEventListener('click',()=>{
         searchComponent.style.display = 'block';
       })
       close.addEventListener('click',()=>{
         searchComponent.style.display = 'none';
       })

    //    回退按钮
    let back = document.querySelector('.back');
    back.onclick = function(){
        window.history.back();
    }
   
    // 获取左侧信息
    var classifyWrap = document.querySelector('.classify-wrap');
    axios.get('/Left-menu').then((res) => {
      
        classifyWrap.innerHTML = template('classify-item', res.data)
        // console.log(classifyWrap.children[0]); //获取节点
        classifyWrap.children[0].className = 'classify-item active';
        // 没有点击获取右侧
        var num = window.localStorage.getItem('user');
      //  console.log(num);
        $.get(
          'http://vueshop.glbuys.com/api/home/category/show?cid='+num+'&token=1ec949a15fb709370f',
          function(res){
            // console.log(res.data.length);
            for(let i=0;i<res.data.length;i++){
              // console.log(`${res.data[0].title}`);
              $('.goods-wrap')[0].innerHTML +=`<div class="classify-name">${res.data[i].title}</div>
              <div class="goods-items-wrap"></div>`
              // console.log(res.data[i].goods.length);
              for(let j=0;j<$('.goods-items-wrap').length;j++){
                if(res.data[j].goods!=null){
                  $('.goods-items-wrap')[j].innerHTML = res.data[j].goods.map((v,i)=>{
                      return `<ul>
                          <li><img src='${v.image}' alt=""></li>
                          <li>${v.title}</li>
                      </ul>`
                  }).join(' ')
                }
              } 
            }
          },
          'json'
        )
        for(let i=0;i<$('.classify-item').length;i++){
          $('.classify-item')[i].className = 'classify-item';
        }
        
        $('.classify-item')[num-492].className = 'classify-item active';
        // console.log($('.classify-item')[1]);
        // 没有点击获取右侧 结束
        for (let i = 0; i < classifyWrap.children.length; i++) {
            classifyWrap.children[i].onclick = function () {
              // console.log(this);
                for (let j = 0; j < classifyWrap.children.length; j++) {
                    classifyWrap.children[j].className = 'classify-item';
                }
                this.className = 'classify-item active';
                   num = res.data.ids[i].cid;
                  //  console.log(res.data.ids[i].cid);
                   localStorage.setItem('user',res.data.ids[i].cid)
                // 获取右侧信息开始
                $.get(
                  'http://vueshop.glbuys.com/api/home/category/show?cid=' + num +
                    '&token=1ec949a15fb709370f',
                    function(res){
                      // console.log(res);
                      if(res.code!=201){
                        $('.goods-wrap')[0].innerHTML = res.data.map((v,i)=>{
                        return `<div class="classify-name">${v.title}</div>
                        <div class="goods-items-wrap"></div>`
                        }).join(' ')
                        for(let i=0;i<$('.goods-items-wrap').length;i++){
                          if(res.data[i].goods == null){
                            $('.goods-items-wrap')[i].innerHTML = '';
                          }else{
                            $('.goods-items-wrap')[i].innerHTML = res.data[i].goods.map((v,i)=>{
                            return `<ul>
                            <li><img src='${v.image}' alt=""></li>
                            <li>${v.title}</li>
                        </ul>`
                          }).join(' ')
                          }
                        // console.log($('ul')[0]);
                        var arr = [];
                        res.data.map((v, i) => {
                          if(v.goods!=null){v.goods.map((s,i)=>{
                          arr.push(s.gid);
                          })};
                        })
                        // console.log(arr);

                        for(let i = 0;i<$('ul').length;i++){
                          $('ul')[i].onclick = function(){
                            
                              window.localStorage.setItem('users',arr[i])
                              location.href = 'item.html'
                          }
                      }
                        }
                      }else{
                        $('.goods-wrap')[0].innerHTML = '<div class="classify-name" style="text-align : center">没有商品</div>';
                      }
                      
                    },
                    'json'
                )

                // 获取右侧信息结束
                
            }
        }
    })

    
}