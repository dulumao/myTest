<template>
  <div class="hello">
    <div v-html="msg"></div>
    <input type="text" v-model="msg" number/>
    <br>
    <div class="btn btn-danger" ref="divCeShi" data-yes="true">ceshi</div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" style="background: red;">slider1</div>
        <div class="swiper-slide" style="background: blue;">slider2</div>
        <div class="swiper-slide" style="background: black;">slider3</div>
      </div>
    </div>
    <ul>
      <div>{{list[0]}}</div>
      <div>{{list[1]}}</div>
      <div>{{list[2]}}</div>
      <div>{{list[3]}}</div>
      <div>{{list[4]}}</div>
      <div>{{list[5]}}</div>
      <template v-for="s in list">
        <li>{{s}}</li>
        <li>{{s.bb}}</li>
      </template>
    </ul>
    <input type="date">
    <b-btn v-b-modal.modal1>Launch demo modal</b-btn>
    <br>
    <br>
    <br>
    <br>
    <label for="ipt">aaaaaa</label>
    <br>
    <br>
    <br>
    <br><br>
    <br>
    <br>
    <br><br>
    <br>
    <br>
    <br>
    <input type="checkbox" onclick="return false" id="ipt">

    <!-- Modal Component -->
    <b-modal id="modal1" title="Bootstrap-Vue">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
  </div>
</template>

<script>
  import Swiper from "swiper"
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        vueColor: "red",
        list: [{aaa:"aa", bb: "bb"}, 1, 2, 3],
      }
    },
    mounted: function() {
      console.log(window.bgColor)
      // $(document).ready(function(){
      //   $.ajax({
      //     type          : 'get',
      //     async         : false,
      //     url           : 'http://api.k780.com/?app=finance.rate&scur=USD&tcur=CNY&appkey=36605&sign=8929d0f0d84848a431447d4072835600&format=json&jsoncallback=data',
      //     dataType      : 'jsonp',
      //     jsonp         : 'callback',
      //     jsonpCallback : 'data',
      //     success       : function(data){
      //       if(data.success!='1'){
      //         alert(data.msgid+' '+data.msg);
      //         exit;
      //       }
      //       console.log(data);
      //       //遍历
      //       var description = "";
      //       for(var i in data.result){
      //         var property=data.result[i];
      //         description+=i+" = "+property+"\n";
      //       }
      //       console.log(description);
      //     },
      //     error:function(){
      //       alert('fail');
      //     }
      //   });
      // });
      // jsonp实现跨域
      // this.axios.get("https://api.bitfinex.com/v2/tickers?symbols=ALL").then(req => {
      //   let  data = req.data;
      //   console.log(data);
      // }).catch((req) => {
      //   console.log(req);
      // })
      // var mySwiper = new Swiper('.swiper-container', {
      //   autoplay: {
      //     disableOnInteraction: false,
      //   }
      // })
      // 回调执行函数
      const _this = this;
      // function getUserAccount() {
      //   return _this.axios.get('/static/beauty10gt10.csv');
      // }
      //
      // function getUserPermissions() {
      //   return _this.axios.get('/static/addr.csv');
      // }

      // this.axios.all([getUserAccount(), getUserPermissions()])
      //   .then(_this.axios.spread(function (data1, data2) {
      //     // 两个请求现在都执行完成
      //     let  data = data1.data;
      //     let arr = data.split("\r");
      //     arr.shift();
      //     let arr1 = [];
      //     for(let i = 0; i < arr.length; i++){
      //       let arr2 = arr[i].split(",");
      //       arr2[0] = "'" + arr2[0].trim() + "'";
      //       arr1.push(arr2);
      //     }
      //
      //     console.log(arr1);
      //     let  data3 = data2.data;
      //     let arr3 = data3.split("\r");
      //     arr3.shift();
      //     let arr4 = [];
      //     for(let i = 0; i < arr3.length; i++){
      //       let arr5 = arr3[i].split(",");
      //       arr4.push("'" + arr5[1] + "'");
      //     }
      //
      //     var addrNum = [];
      //     var addrList = [];
      //     for(let i = 0; i < arr1.length; i++){
      //       if(arr4.indexOf(arr1[i][0]) == -1){
      //         addrNum[arr1[i][0]] = "";
      //       }else{
      //         if(addrNum[arr1[i][0]] == undefined){
      //           addrNum[arr1[i][0]] = 1;
      //           addrList.push(arr1[i][0]);
      //         }else{
      //           addrNum[arr1[i][0]] = parseInt(addrNum[arr1[i][0]]) + 1;
      //         }
      //       }
      //     }
      //     console.log(addrList);
      //     let num = 0;
      //     for(let i = 0; i < arr1.length; i++){
      //       let index = addrList.indexOf(arr1[i][0]);
      //       if(index != -1){
      //         arr.splice(index, 1);
      //         num++;
      //       }
      //     }
      //     console.log(num);
      //     document.write(arr1.join("],<br/>["));
      //   }));
      // this.axios.get("/static/10.csv").then(req => {
      //   let  data = req.data;
      //   let arr = data.split("\r");
      //   arr.shift();
      //   let arr1 = [];
      //   for(var i = 0; i < arr.length; i++){
      //     let arr2 = arr[i].split(",");
      //     arr2[0] = "'" + arr2[0].trim() + "'";
      //     arr1.push(arr2);
      //   }
      // }).catch((req) => {
      //   console.log(req);
      // })
      // this.axios.post("http://worldcup.ethcontract.win/getGameList"}).then(req => {
      //   console.log(req)
      // }).catch((req) => {
      //   console.log(2);
      //   console.log(req);
      // })
      //利用script标签实现jsonp
      // var script = document.createElement('script');
      // script.type = 'text/javascript';
      //
      // // 传参并指定回调执行函数为onBack
      // window.onBack = (res) =>{
      //   console.log("script");
      //   console.log(res);
      // }
      // script.src = 'https://m.douban.com/rexxar/api/v2/recommend_feed?alt=json&next_date=&loc_id=108288&gender=&birthday=&udid=9fcefbf2acf1dfc991054ac40ca5114be7cd092f&for_mobile=1&callback=onBack';
      // document.head.appendChild(script);
      //
      // //vue-resource实现跨域
      // this.$http.jsonp("https://m.douban.com/rexxar/api/v2/recommend_feed?alt=json&next_date=&loc_id=108288&gender=&birthday=&udid=9fcefbf2acf1dfc991054ac40ca5114be7cd092f&for_mobile=1")
      //   .then((res) => {
      //     console.log("vue-resource")
      //     console.log(res)
      //   }).catch((res) => {
      //     console.log("err")
      //     console.log(res)
      // })
      //
      // //ajax实现跨域
      // $.ajax({
      //   url: 'https://m.douban.com/rexxar/api/v2/recommend_feed?alt=json&next_date=&loc_id=108288&gender=&birthday=&udid=9fcefbf2acf1dfc991054ac40ca5114be7cd092f&for_mobile=1',
      //   type: 'get',
      //   dataType: 'jsonp',  // 请求方式为jsonp
      //   success: (res)=>{
      //     console.log("$ajax")
      //     console.log(res)
      //   },
      //   data: {}
      // });
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../assets/css/swiper.min.css";
  @a: e('window.bgColor');
  .hello{
    .btn{
      color: @a
    }
  }
  .swiper-slide{
    height: 100px;
    color: #fff;
  }
</style>
