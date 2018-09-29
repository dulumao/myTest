<template>
  <div id="main" class="echarts-main"></div>

</template>

<script>
  export default {
    name: "Echarts",
    mounted:function () {
      var echarts = require('echarts');
      var myChart = echarts.init($("#main")[0]);

      var timeData = [ '2009/6/12 2:00', '2009/6/12 3:00', '2009/6/12 4:00', '2009/6/12 5:00', '2009/6/12 6:00', '2009/6/12 7:00', '2009/6/12 8:00', '2009/6/12 9:00', '2009/6/12 10:00'];

      timeData = timeData.map(function (str) {
        return str.replace('2009/', '');
      });

      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        axisPointer: {
          link: {xAxisIndex: 'all'}
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 30,
            end: 70,
            xAxisIndex: [0, 1, 2]
          },
          {
            type: 'inside',
            realtime: true,
            start: 30,
            end: 70,
            xAxisIndex: [0, 1, 2]
          }
        ],
        grid: [{
          left: 50,
          right: 75,
          height: '32%',
          top: "5%",
        }, {
          left: 50,
          right: 75,
          top: '42%',
          height: '20%'
        }, {
          left: 50,
          right: 75,
          top: '67%',
          height: '20%'
        },
        ],
        xAxis : [
          {
            type : 'category',
            data: timeData,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: true
            }
          },
          {
            gridIndex: 1,
            type : 'category',
            data: timeData,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: true
            }
          },
          {
            gridIndex: 2,
            type : 'category',
            data: timeData,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true
            }
          }
        ],
        yAxis : [
          {
            name : '流量(m^3/s)',
            type : 'value',
            position: 'right',
            nameLocation : 'middle',
            nameGap : 35,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
          {
            gridIndex: 1,
            name : '降雨量(mm)',
            type : 'value',
            position: 'right',
            nameLocation : 'middle',
            nameGap : 35,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
          {
            gridIndex: 2,
            name : '降雨量(mm)',
            type : 'value',
            position: 'right',
            nameLocation : 'middle',
            nameGap : 35,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          }
        ],
        series : [
          {
            name:'流量',
            type:'line',
            symbolSize: 8,
            hoverAnimation: false,
            data:[3,2,1,3,2,1,3,2,1]
          },
          {
            name:'流量1',
            type:'line',
            symbolSize: 8,
            hoverAnimation: false,
            data:[1,2,3,1,2,3,1,2,3]
          },
          {
            name:'流量3',
            type:'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            symbolSize: 8,
            hoverAnimation: false,
            data: [-1,2,3,-1,2,3,1,2,-3]
          },
          {
            name:'降雨量',
            type:'bar',
            xAxisIndex: 2,
            yAxisIndex: 2,
            symbolSize: 8,
            hoverAnimation: false,
            data: [1,-2,3,1,2,-3,1,2,3]
          }
        ]
      };
      myChart.setOption(option)
    }
  }
</script>

<style scoped>
  .echarts-main{
    width: 100%;
    height: 500px;
    margin: 20px auto;
  }
</style>
