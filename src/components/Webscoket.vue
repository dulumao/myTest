<template>
  <div>
    <h1>bitfinexData</h1>
    <table class="table">
      <tbody>
      <tr>
        <th></th>
        <th>价格</th>
        <th>数量</th>
        <th>累计</th>
      </tr>
      <tr v-for="(val, index) in bitfinexData2" v-if="index > bitfinexData2.length - 6">
        <td class="redfont">卖{{bitfinexData2.length - index}}</td>
        <td>{{val[0]}}</td>
        <td>{{val[1]}}</td>
        <td>{{val[2]}}</td>
      </tr>
      <tr v-for="(val, index) in bitfinexData1" v-if="index < 5">
        <td class="greenfont">买{{index + 1}}</td>
        <td>{{val[0]}}</td>
        <td>{{val[1]}}</td>
        <td>{{(val[2])}}</td>
      </tr>
      </tbody>
    </table>
    <h1>火币</h1>
    <table class="table">
      <tbody>
      <tr>
        <th></th>
        <th>价格</th>
        <th>数量</th>
        <th>累计</th>
      </tr>
      <tr v-for="(val, index) in hbData2">
        <td class="redfont">卖{{5 - index}}</td>
        <td>{{val[0]}}</td>
        <td>{{val[1]}}</td>
        <td>{{addHbNum(index, hbData2)}}</td>
      </tr>
      <tr  v-for="(val, index) in hbData1">
        <td class="greenfont">买{{index + 1}}</td>
        <td>{{val[0]}}</td>
        <td>{{val[1]}}</td>
        <td>{{addHbNum(index, hbData1)}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "Webscoket",
    data: function(){
      return {
        chanId: null, // bitfinex数据标识
        bitfinexData: [],
        bitfinexData1: [],  //买
        bitfinexData2: [],  //卖
        hbData1: [],        // 买
        hbData2: [],        //卖
      }
    },
    methods: {
      //加法
      addHbNum:function(i, arr){
        function add (num1, num2){
          var r1,r2,m;
          try{r1=num1.toString().split(".")[1].length}catch(e){r1=0}
          try{r2=num2.toString().split(".")[1].length}catch(e){r2=0}
          m=Math.pow(10,Math.max(r1,r2))
          return Math.round(num1*m+num2*m)/m
        }
        let num = 0;
        for(let j = 0; j <= i; j++){
          num = add(num, arr[j][1]);
        }
        return num;
      },
      initBitfinexWs: function () {
        const _this = this;
        const bitfinexWs = new WebSocket("wss://api.bitfinex.com/ws/2");
        bitfinexWs.onopen = function () {
          bitfinexWs.send(JSON.stringify({
            "event": "subscribe",
            "channel": "book",
            "pair": "BTCUSD",
            "prec": "P1",
            "freq": "F0"
          }));
        }
        bitfinexWs.onmessage = function (evt) {
          var data = eval("(" + evt.data + ")")
          if (_this.chanId == null) {
            if (data.event == "subscribed" && data.channel == "book")
              _this.chanId = data.chanId
          } else {
            if (data[0] == _this.chanId) {
              if (_this.bitfinexData.length == 0) {
                _this.bitfinexData = data[1];
              }
              else {
                let i = _this.bitfinexData.findIndex((value, index, arr) => value[0] == data[1][0]);
                if (i != -1) {
                  _this.bitfinexData[i] = data[1]
                } else {
                  let i = _this.bitfinexData.findIndex((value, index, arr) => value[0] == data[1][0]);
                  if (typeof data[1] != "string") {
                    _this.bitfinexData.push(data[1]);
                  }
                }
              }
              _this.bitfinexData1 = [];
              _this.bitfinexData2 = []
              _this.bitfinexData.sort((x, y) => {
                if (x[0] < y[0]) {
                  return 1;
                } else if (x[0] > y[0]) {
                  return -1;
                } else {
                  return 0;
                }
              });
              for (let i = 0; i < _this.bitfinexData.length; i++) {
                let val = _this.bitfinexData[i];
                if (val[2] > 0) {
                  let j = _this.bitfinexData1.findIndex(v => v[0] < val[0]);
                  if (j != -1) {
                    _this.bitfinexData1.splice(j, 0, val);
                  } else {
                    _this.bitfinexData1.push(val)
                  }
                  if (_this.bitfinexData1.length > 25) {
                    _this.bitfinexData1.pop();
                  }
                } else {
                  let j = _this.bitfinexData2.findIndex(v => v[0] < val[0]);
                  if (j != -1) {
                    _this.bitfinexData2.splice(j, 0, val);
                  } else {
                    _this.bitfinexData2.push(val)
                  }
                  if (_this.bitfinexData2.length > 25) {
                    _this.bitfinexData2.shift()
                  }
                }
              }
            }
          }
        };
        bitfinexWs.onclose = function () {
          console.log("bitfinexWs连接已关闭...");
          _this.initBitfinexWs();
        };
        _this.closeBWs = function () {
          bitfinexWs.close();
        }
      },
      initHbWs: function () {
        const _this = this;
        const hbWs = new WebSocket("wss://api.huobi.pro/ws"); //火币
        const pako = require('pako');
        hbWs.onopen = function () {
          hbWs.send(JSON.stringify({
            "id": 2,
            "sub": "market.btcusdt.depth.step0"
          }));
        };
        hbWs.onmessage = function (evt) {
          let data = evt.data;
          let reader = new FileReader();
          reader.readAsArrayBuffer(data);
          reader.onload = function (e) {
            let buf = new Uint8Array(reader.result);
            let strData = pako.inflate(buf, {to: 'string'});
            let arrData = eval("(" + strData + ")");
            if (arrData.ch == "market.btcusdt.depth.step0" && arrData.tick) {
              _this.hbData2 = arrData.tick.asks.slice(0, 5).reverse();
              _this.hbData1 = arrData.tick.bids.slice(0, 5);
            }
            if (arrData.ping) {
              hbWs.send(JSON.stringify({
                "pong": arrData.ping
              }));
            }
          }
        };
        hbWs.onclose = function () {
          console.log("hbWs连接已关闭...");
          _this.initHbWs();
        };
        _this.closeHbWs = function () {
          hbWs.close();
        }
      },
      closeHbWs: function () {

      },
      closeBWs: function () {
      }
    },
    mounted: function () {
      this.initBitfinexWs();
      this.initHbWs();
    }
  }
</script>

<style>
  .table tr:nth-child(6) td{
    padding-bottom: 50px;
  }
</style>
