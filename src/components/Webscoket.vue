<template>
  <div>
    <button @click="initWS">初始化webscoket</button>
    <button @click="sendMsg">发送数据</button>
    <button @click="closeWS">断开连接</button>

  </div>
</template>

<script>
  export default {
    name: "Webscoket",
    data: function(){
      return {
        ws : ""
      }
    },
    methods: {
      initWS: function () {
        const _this = this;
        this.ws = new WebSocket("ws://192.168.2.140:8080/ws");
        this.ws.onmessage = function (evt) {
          var data = evt.data;
          console.log(data);
          alert("数据已接收...");
        };
        this.ws.onclose = function () {
          alert("连接已关闭...");
        };
      },
      sendMsg: function () {
        console.log(this.ws)
        this.ws.send("发送数据");
        alert("数据发送中...");

      },
      closeWS: function () {
        this.ws.close();
      }
    },
    mounted: function () {

    }
  }
</script>

<style scoped>

</style>
