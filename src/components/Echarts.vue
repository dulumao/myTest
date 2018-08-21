<template>
  <div id="main" class="echarts-main"></div>

</template>

<script>
  export default {
    name: "Echarts",
    mounted:function () {
      var echarts = require('echarts');
      var myChart = echarts.init($("#main")[0]);
      var option;
      $.get('./static/json.json', function (data) {
        myChart.setOption(option = {
          title: {
            text: 'Beijing AQI',
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            data: data.map(function (item) {
              return item[0];
            })
          },
          yAxis: {
            splitLine: {
              show: false
            }
          },
          dataZoom: [{
            startValue: '2014-06-01'
          }, {
            type: 'inside'
          }],
          visualMap: {
            top: 10,
            right: 10,
            pieces: [{
              gt: 0,
              lte: 50,
              color: '#096'
            }, {
              gt: 50,
              lte: 100,
              color: '#ffde33'
            }, {
              gt: 100,
              lte: 150,
              color: '#ff9933'
            }, {
              gt: 150,
              lte: 200,
              color: '#cc0033'
            }, {
              gt: 200,
              lte: 300,
              color: '#660099'
            }, {
              gt: 300,
              color: '#7e0023'
            }],
            outOfRange: {
              color: '#999'
            }
          },
          series: {
            name: 'Beijing',
            type: 'line',
            data: data.map(function (item) {
              return item[1];
            }),
            markLine: {
              silent: true,
              data: [{
                yAxis: 50
              }, {
                yAxis: 100
              }, {
                yAxis: 150
              }, {
                yAxis: 200
              }, {
                yAxis: 300
              }]
            }
          }
        });
      });
    }
  }
</script>

<style scoped>
  .echarts-main{
    width: 100%;
    height: 500px;
    border: 1px solid #000;
    margin: 20px auto;
  }
</style>
