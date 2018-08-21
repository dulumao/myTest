<template>
  <div>
    <div class="myWindow-con">
      <div class="myWindow">
        <div class="myWindow-header" @mousedown="moveWindowDown">
          title1
        </div>
        <div class="myWindow-body">
          ceshi1
        </div>
        <div class="myWindow-move" @mousedown="moveZoom"></div>
      </div>
      <div class="myWindow"style="height: 300px;" >
        <div class="myWindow-header" @mousedown="moveWindowDown">
          title2
        </div>
        <div class="myWindow-body">
          ceshi1
        </div>
        <div class="myWindow-move" @mousedown="moveZoom"></div>
      </div>
      <div class="myWindow">
        <div class="myWindow-header" @mousedown="moveWindowDown">
          title3
        </div>
        <div class="myWindow-body">
          ceshi1
        </div>
        <div class="myWindow-move" @mousedown="moveZoom"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Block",
    data: function(){
      return {
        jianju: 10,
        startZoomPageX: 0,
        startZoomPageY: 0,
        startWindowPageX: 0,
        startWindowPageY: 0,
        myWinDTL: []
      }
    },
    methods: {
      //获取当前窗口的最小top值
      computedTop: function(i,nowI){  //i是要计算的窗口，nowI是当前移动的窗口
        const _this = this;
        let myWinI = this.myWinDTL[nowI],
          minTop = myWinI.top,
          maxTop = myWinI.top + myWinI.height + 2 + _this.jianju,
          minLeft = myWinI.left,
          maxLeft = myWinI.left + myWinI.width + 2 + _this.jianju,
          top = 0,
          a = true;
        this.myWinDTL.forEach(function (val, index) {
          if(i != index) {
            let thisMinTop = val.top,
              thisMinLeft = val.left,
              thisMaxTop = val.top + val.height + 2  + _this.jianju,
              thisMaxLeft = val.left + val.width + 2 + _this.jianju;
            if (!(maxLeft <= thisMinLeft || minLeft >= thisMaxLeft)) {
              console.log(1);
              //if(minTop > thisMinTop)
                top += val.height + 2 + _this.jianju;
            }
          }
        })
        if(top == 0) top = 10;
        return top;
      },
      //自动移动其他窗口
      autoMove: function(i){
        const _this = this;
        let myWinI = this.myWinDTL[i],
          minTop = myWinI.top,
          maxTop = myWinI.top + myWinI.height + 2  + _this.jianju,
          minLeft = myWinI.left,
          maxLeft = myWinI.left + myWinI.width + 2  + _this.jianju;
        this.myWinDTL.forEach(function (val, index) {
          if(i != index){
            $(".myWindow").eq(index).css("top", _this.computedTop(index, i))
          }
        })
        console.log(_this.myWinDTL);
      },
      //点击顶部移动整体
      moveWindowDown: function(e){
        const _this = this;
        let thisDiv = $(e.currentTarget);
        _this.startWindowPageX = e.pageX;
        _this.startWindowPageY = e.pageY;
        thisDiv.parent().css("transition", "none");
        $("html").on("mousemove", function(e1){
          e1.stopPropagation();
          e1.preventDefault();
          let thisDivP = thisDiv.parent(),
            left = parseInt(thisDivP.css("left")) + e1.pageX - _this.startWindowPageX,
            top = parseInt(thisDivP.css("top")) + e1.pageY - _this.startWindowPageY,
            maxWidth = thisDivP.parent().width() - _this.jianju,
            width = thisDivP.width(),
            index = thisDivP.index();
          left = left < _this.jianju ? _this.jianju : left + width > maxWidth ? maxWidth - width : left;
          top = top < _this.jianju ? _this.jianju : top;
          _this.myWinDTL[index].left = left;
          _this.myWinDTL[index].top = top;
          thisDivP.css({
            left: left,
            top: top
          })
          _this.startWindowPageX = e1.pageX;
          _this.startWindowPageY = e1.pageY;
          _this.autoMove(index);

        });
        $("html").on("mouseup", function(){
          thisDiv.parent().css({
            transition: "all .1s linear",
            top: _this.computedTop(thisDiv.parent().index(), thisDiv.parent().index())
          });
          _this.autoMove(thisDiv.parent().index());

          $("html").off("mousemove").off("mouseup");
        })
      },
      //点击右下角放大缩小
      moveZoom: function (e) {
        const _this = this;
        let thisDiv = $(e.currentTarget)
        _this.startZoomPageX = e.pageX;
        _this.startZoomPageY = e.pageY;
        thisDiv.parent().css("transition", "none");
        $("html").on("mousemove", function(e1){
          e1.stopPropagation();
          e1.preventDefault();
          let thisDivP = thisDiv.parent(),
            width = thisDivP.width() + (e1.pageX - _this.startZoomPageX),
            height = thisDivP.height() + (e1.pageY - _this.startZoomPageY),
            left = parseInt(thisDivP.css("left")),
            maxWidth = thisDivP.parent().width() - _this.jianju - left,
            index = thisDivP.index();
          width = width > maxWidth ? maxWidth : width;
          thisDivP.width(width);
          thisDivP.height(height);
          _this.myWinDTL[index].width = width;
          _this.myWinDTL[index].height = height;
          _this.startZoomPageX = e1.pageX;
          _this.startZoomPageY = e1.pageY;
          _this.autoMove(index);
        });
        $("html").on("mouseup", function(){
          $("html").off("mouseup").off("mousemove");
        })
      },
    },
    mounted: function () {
      const _this = this;
      let startTop = _this.jianju,
        startLeft = _this.jianju,
        row = 1,
        col = 1,
        rowWidth = 0;
      $(".myWindow").each(function (i, el) {
        let thisDiv = $(el),
          conW = thisDiv.parent().width(),
          conH = thisDiv.parent().height();
        rowWidth += thisDiv.width() + _this.jianju;
        if(rowWidth > conW){
          rowWidth = thisDiv.width() + _this.jianju;
          col = 1;
          row++;
        }
        thisDiv.css({
          top: startTop + (row - 1) * (400 + _this.jianju),
          left: startLeft + (col - 1) * (400 + _this.jianju),
        })
        col++;
        _this.myWinDTL.push({
          width: parseInt(thisDiv.width()),
          height: parseInt(thisDiv.height()),
          left: parseInt(thisDiv.css("left")),
          top: parseInt(thisDiv.css("top"))
        })
      })

    }
  }
</script>
<style lang="less" scoped>
  .myWindow-con{
    position: relative;
  }
  .myWindow{
    width: 400px;
    height: 400px;
    border:1px solid #e3e3e3;
    border-radius: 4px;
    position: absolute;
    box-shadow: 0 3px 7px 1px #e3e3e3;
    overflow: hidden;
    box-sizing: border-box;
    transition: all .1s linear;
    .myWindow-header{
      width: 100%;
      font-weight: bold;
      text-align: center;
      border-bottom: 1px solid #e3e3e3;
      cursor: move;
    }
    .myWindow-move{
      width: 20px;
      height: 20px;
      background: url(../assets/imgs/jiao.png) no-repeat;
      position: absolute;
      right: 2px;
      bottom: 2px;
      cursor: nw-resize;
    }
  }
</style>
