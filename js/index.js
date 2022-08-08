 window.onload = function(){
    //声明一共记录点击缩略图的下标
    var bigImgIndex = 0;



    //路径导航的数据渲染
    navPathDataBind();
    function navPathDataBind(){
        //1.获取页面导航的元素对象
        var navPath = document.querySelector('#wrapper #content .contentMain #navPath');

        //2.获取数据
        var path = goodData.path;

        //3.遍历数据
        for(var i = 0; i < path.length; i++){
            if(i == path.length-1){
                var aNode = document.createElement("a");
                aNode.innerText = path[i].title;
                navPath.appendChild(aNode);
            }else{
                //4创建a标签
            var aNode = document.createElement("a");
            aNode.href = path[i].url;
            aNode.innerText = path[i].title;

            //5.创建i标签
            var iNode = document.createElement("i");
            iNode.innerText = '/';

            //6.让navPath元素追加a和i
            navPath.appendChild(aNode);
            navPath.appendChild(iNode);
            }
        }
    }
   
    //放大镜的移入，移除效果
    bigClassBind();
    function bigClassBind(){
        //1.获取小图框元素和leftTop元素
        var smallPic =document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic');
        var leftTop = document.querySelector('#wrapper #content .contentMain #center #left #leftTop');
        //获取数据
        var imgessrc = goodData.imgessrc; 
        var maskDiv = document.createElement('div');
        var BigPic = document.createElement('div');
        var BigImg = document.createElement('img');
        
        //2.设置移入事件
        smallPic.onmouseenter= function(){
            //3.创建蒙版元素
            maskDiv.className = "mask";

            //4创建大图框元素
            BigPic.id = "bigPic";

            //5创建大图片元素
            BigImg.src = imgessrc[bigImgIndex].b;

            //6大图框追加大图片
            BigPic.appendChild(BigImg);

            //7.让小图框来追加蒙版元素
            smallPic.appendChild(maskDiv);

            //8让leftTop元素追加大图框
            leftTop.appendChild(BigPic);


        }

         //设置移动事件
        smallPic.onmousemove = function(event){
            //event.clientX:鼠标点距离浏览器左侧X轴的值
            //getBoundingClientRect().left :小图框元素距离浏览器左侧可视的left值
            //offsetWidth:为元素占位的宽度
            var left = event.clientX - smallPic.getBoundingClientRect().left - maskDiv .offsetWidth / 2;
            var top = event.clientY - smallPic.getBoundingClientRect().top - maskDiv .offsetHeight / 2;


            //控制蒙版元素的移动区域
            if(left < 0){
                left = 0;
            }else if(left > smallPic.clientWidth - maskDiv.offsetWidth){
                left = smallPic.clientWidth - maskDiv.offsetWidth;
            }
            if(top < 0){
                top = 0;
            }else if(top > smallPic.clientHeight - maskDiv.offsetHeight){
                top = smallPic.clientHeight - maskDiv.offsetHeight;
            }
            


            //设置left和top属性
            maskDiv.style.left = left + "px";
            maskDiv.style.top = top +"px";

            var scale = (smallPic.clientWidth -maskDiv.offsetWidth)/(BigImg.offsetWidth - BigPic.clientWidth);

            BigImg.style.left = -left / scale +"px";
            BigImg.style.top = -top / scale + "px";
        }
        //设置移出事件
        smallPic.onmouseleave = function(){

            //让小图框移除蒙版元素
            smallPic.removeChild(maskDiv);

            //让leftTop移除大图框
            leftTop.removeChild(BigPic);
        }

       
    }

    //动态渲染缩略图的数据
    thumbnailData();
    function thumbnailData(){

        //1.获取piclist下的ul
        var ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul');

        //2.获取imagessrc数据
        var imgessrc = goodData.imgessrc;
        
        //3.遍历数组
        for(var i = 0; i<imgessrc.length; i++){
            //4.创建li元素
            var newLi = document.createElement('li');

            //5.创建img元素
            var newImg = document.createElement('img');
            newImg.src = imgessrc[i].s;

            //6.让li追加img属性
            newLi.appendChild(newImg);

            //7.让ul追加li元素
            ul.appendChild(newLi);
        }

    }


    //点击缩略图的效果
    thumbnailClick();
    function thumbnailClick(){

        //1.获取所有的li元素
        var liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li');
        var smallPic_img = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic img');

        var imgessrc = goodData.imgessrc;

        smallPic_img.src = imgessrc[0].s;
        //2.循环点击这些li元素
        for(var i =0; i<liNodes.length; i++){
            liNodes[i].index = i;
            liNodes[i].onclick = function(){
                var idx = this.index;
                bigImgIndex = idx;

                //变换小图路径
                smallPic_img.src = imgessrc[idx].s;
            }
        }
    }

    //点击缩略图左右箭头切换图片的效果
    thumbnailLeftRightClick();
    function thumbnailLeftRightClick(){

        //1.获取箭头的a标签
        var prev = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.prev');
        var next = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.next');
        
        //2.获取可视的div以及ul元素和所有的Li元素
        var piclist = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist');

        var ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul');

        var liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li');

       //3.计算

       //发生起点
       var start = 0;

       //步长
       var step = (liNodes[0].offsetWidth + 20) *2;

       //可移动的距离(图片的总数 - div中显示的数量) *(li的宽度 + 20)
       var endPosition = (liNodes.length - 5) *(liNodes[0].offsetWidth + 20);

       //4.发生事件
       prev.onclick = function(){
        start-=step;
        if(start < 0){
            start = 0;
            }
        ul.style.left = -start + "px";      
       }

       next.onclick = function(){
            start+=step;
            if(start > endPosition){
                start = endPosition;
            }
            ul.style.left = -start + "px";
        }
    }

    //商品详情数据的动态渲染
    rightTopData();
    function rightTopData(){

        //1.查找元素
        var rightTop = document.querySelector('#wrapper #content .contentMain #center #right .rightTop');

        //2.查找数据
        var goodsDetail =goodData.goodsDetail;
        
        //3.生成模板
        var s = `<h3>${goodsDetail.title}</h3>
                 <p>${goodsDetail.recommend}</p>
                 <div class="priceWrap">
                        <div class="priceTop">
                            <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                            <div class="price">
                                <span>￥</span>
                                <p>${goodsDetail.price}</p>
                                <i>降价通知</i>
                            </div>
                            <p>
                                <span>累计评价</span>
                                <span>${goodsDetail.evaluateNum}</span>
                            </p>
                 </div>
                 <div class="priceBottom">
                        <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                        <p>
                            <span>${goodsDetail.promoteSales.type}</span>
                            <span>${goodsDetail.promoteSales.content}</span>
                        </p>
                    </div>
                 </div>
                 <div class="support">
                    <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
                    <p>${goodsDetail.support}</p>
                 </div>
                 <div class="address">
                    <span>配&nbsp;送&nbsp;至</span>
                    <p>${goodsDetail.address}</p>
                 </div>`;
            //4.重新渲染rightTop元素
            rightTop.innerHTML = s;
    }

    //商品参数数据的动态渲染
    rightBottomData();
    function rightBottomData(){

        //1.找rightBottom的元素对象
        var chooseWrap = document.querySelector('#wrapper #content .contentMain #center #right .rightBottom .chooseWrap');
        

        //2.查找数据
        var crumbData = goodData.goodsDetail.crumbData;
        
        //3.循环数据
        for(var i = 0; i < crumbData.length; i++){

            //4.创建dl元素
            var dlNode = document.createElement('dl');

            //5.创建dt元素
            var dtNode = document.createElement('dt');
            dtNode.innerText = crumbData[i].title;

            //6.dl追加dt
            dlNode.appendChild(dtNode);

            //7.创建dd
            for(var j =0; j<crumbData[i].data.length; j++){

                //创建dd
                var ddNode = document.createElement('dd');
                ddNode.innerText = crumbData[i].data[j].type;
                ddNode.setAttribute('price',crumbData[i].data[j].changePrice);

                //让dl追加dd
                dlNode.appendChild(ddNode);
            }

            //8.让chooseWrap追加dl
            chooseWrap.appendChild(dlNode);

        }

    }

    //点击商品参数之后的颜色排他效果
    clickddBind();
    function clickddBind(){
        //1.获取第一个的dl元素下的所有dd元素
        var dlNodes = document.querySelectorAll('#wrapper #content .contentMain #center #right .rightBottom .chooseWrap dl');

        var arr = new Array(dlNodes.length);

        var choose = document.querySelector('#wrapper #content .contentMain #center #right .rightBottom .choose');

        arr.fill(0);

        //2.循环遍历所有dl
        for(var i =0; i<dlNodes.length; i++){
            (function(i){
                //如果没有立即执行函数，每一次产生的dd都会被覆盖
                var ddNodes = dlNodes[i].querySelectorAll('dd');
        
                //2.遍历当前所有的dd元素
                for(var j = 0;j < ddNodes.length;j++){
        
                    ddNodes[j].onclick = function(){
                        //在点击之前清空之前choose中元素的文本
                        choose.innerHTML = "";
        
                        for(var k = 0;k<ddNodes.length;k++){
                            ddNodes[k].style.color = "#666";
                        }
                        this.style.color = "red";

                        //点击哪一个dd元素动态产生一个新的mark标记元素
                        arr[i] = this;

                        changePriceBind(arr); //实参
                        
                        
                        //遍历arr数组，将非0元素的值写入mark元素中
                        arr.forEach(function(value,index){
                            //动态创建mark标签
                            if(value){
                                //创建div标签
                                var markDiv = document.createElement('div');
                                //并设置class属性
                                markDiv.className = 'mark';
                                //并设置值
                                markDiv.innerText = value.innerText;
                                //创建a标签
                                var aNode = document.createElement('a');
                                //并设置值
                                aNode.innerText = 'X';
                                //并且设置a的下标,第二个index来自arr的index
                                aNode.setAttribute('index',index);
                                //让div追加a
                                markDiv.appendChild(aNode);
                                //让choose追加div
                                choose.appendChild(markDiv);

                            }
                        })
                        //获取所有的a标签元素，并且循环点击事件
                        var aNodes = document.querySelectorAll('#wrapper #content .contentMain #center #right .rightBottom .choose .mark a');
                        
                        for(var n = 0; n<aNodes.length;n++){
                            aNodes[n].onclick = function(){
                                //获取点击的a标签的index属性值
                                var idx1 = this.getAttribute('index');
                                
                                //恢复数组中对应下标中的值
                                arr[idx1] = 0;
                                
                                //定位到对应下标的那个dl行中的所有的dd元素
                                var ddlist = dlNodes[idx1].querySelectorAll('dd');
                                

                                //遍历所有的dd元素
                                for(var m = 0; m < ddlist.length; m++){
                                    //其余所有的dd文字颜色为灰色
                                    ddlist[m].style.color = "#666";
                                }

                                //默认的第一个dd文字恢复为红色
                                ddlist[0].style.color ='red';

                                //删除mark标签 this指的是aNodes[x]
                                choose.removeChild(this.parentNode);

                                //调用价格函数
                                changePriceBind(arr);
                            }
                        }
                    }
                }
            })(i)
        }
    }

    //价格价格的函数声明
    /**
     * 这个函数是需要在点击dd的时候以及删除mark标记的时候才需要被调用
     */

    function changePriceBind(arr){

        //1.原价格标签元素
        var oldPrice = document.querySelector('#wrapper #content .contentMain #center #right .rightTop .priceWrap .priceTop .price p');

        //取出默认的价格
        var price = goodData.goodsDetail.price;
        
        //2.遍历arr数组
        for(var i = 0; i < arr.length; i++){
            if(arr[i]){
                //由于price为字符串，此处要强制类型转化
                var changeprice = Number(arr[i].getAttribute('price'));
                //最终价格
                price += changeprice;
            }
            
        }
        oldPrice.innerText = price;

        //3.将变化后的价格写入到左侧的标签中
        var leftprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p');

        leftprice.innerText = '￥' + price;

        //4.遍历复选框是否有选中的
        var ipts = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input');

        var newprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i');

        for(var j = 0; j < ipts.length; j++){
            if(ipts[j].checked){
                price += Number(ipts[j].value);
            }
        }

        //5.右侧价格重新渲染
        newprice.innerText = '￥' +price;

    }

    //选择搭配中间区域复选框选中套餐价变动效果
    chooseprice();
    function chooseprice(){

        //1.获取复选框元素
        var ipts = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input');
        var leftprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p');
        var newprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i');
        //2.遍历复选框
        for(var i = 0; i<ipts.length; i++){
            ipts[i].onclick = function(){
                var oldprice = Number(leftprice.innerText.slice(1));
                for(var j = 0; j < ipts.length; j++){
                    if(ipts[j].checked){
                        
                        oldprice = oldprice + Number(ipts[j].value);

                    }
                }

                //3.重新写回到套餐价标签中
                newprice.innerText = '￥' + oldprice;
    
            }
        }

    }

    //封装一个公共的选项卡函数
    //tabBtns被点击的元素 tabConts被切换显示的元素
    function Tab(tabBtns,tabConts){
        for(var i = 0; i<tabBtns.length; i++){
            tabBtns[i].index = i;
            tabBtns[i].onclick = function(){
                for(var j = 0;j<tabBtns.length;j++){
                   tabBtns[j].className = '';
                   tabConts[j].className = ''
                }
                this.className = 'active';
                tabConts[this.index].className ='active';
            }
        }
    }

    //点击左侧选项卡
    leftTab();
    function leftTab(){
        //tabBtns的实参是h4s
        var h4s = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideTop h4');
        //被切换显示的元素
        var divs = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideContent>div');
        //调用函数
        Tab(h4s,divs);

    }

    //点击右侧选项卡
    rightTab();
    function rightTab(){
         //tabBtns的实参是lis
         var lis = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabBtns li');
         //被切换的显示元素
         var divs = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabContents div');
         //调用函数
         Tab(lis,divs);
    }

    //右边侧边栏的点击效果
    rightAsideBind();
    function rightAsideBind(){

        //1.找到按钮元素
        var btns = document.querySelector('#wrapper .rightAside .btns');

        //记录初始状态
        var flag = true; //关闭

        //查找侧边栏
        var rightAside = document.querySelector('#wrapper .rightAside');


        //2.发生点击事件
        btns.onclick = function(){
            if(flag){
                btns.className ="btns btnsOpen";
                rightAside.className = "rightAside asideOpen";
            }else{
               btns.className ="btns btnsClose";
               rightAside.className = "rightAside asideClose";
            }
            flag = !flag;
        }
    }
 }