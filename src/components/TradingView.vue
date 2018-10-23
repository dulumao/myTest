<template>
  <div>
    <div id="BAcoinKchart"></div>
  </div>
</template>
<script>
  import { widget } from '../../static/charting_library/charting_library.min';
  function getLanguageFromURL() {
    const regex = new RegExp('[\\?&]lang=([^&#]*)');
    const results = regex.exec(window.location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
  export default {
    name: "TradingView",
    data: function(){
      return {
        fcoinWs: null,
        tvWidget: "",
      }
    },
    mounted() {
      const _this = this;
      _this.fcoinWs = new WebSocket("wss://api.fcoin.com/v2/ws");
      _this.fcoinWs.onopen = function(){
        if(_this.fcoinWs != null && _this.fcoinWs.readyState == 1) {
        }
      }
      _this.fcoinWs.onmessage = function (evt) {
        let obj = eval("(" + evt.data + ")");
        _this.showFcoinTVData(obj);
        _this.showFcoinTVData1(obj);
        // let data = obj.data;

      };
      _this.fcoinWs.onerror = function () {
        _this.initFcoinWs();
      };
      _this.$router.afterEach(function () {
        if(_this.fcoinWs != null) {
          _this.fcoinWs.onerror = function(){}
          _this.fcoinWs.close();
          _this.fcoinWs = null;
        }
      });
      this.initTradingView(
        function(symbolInfo, resolution, from, to, first, limit, history, onHistoryCallback){

          var timerFCTV = setInterval(function(){
            if(_this.fcoinWs != null && _this.fcoinWs.readyState == 1) {
              clearInterval(timerFCTV);
              _this.fcoinWs.send(JSON.stringify({
                args:["candle.M1.btcusdt", 1500, to],
                cmd: "req",
                id: "kline_btcusdt",
              }));
              let count = 0;
              _this.showFcoinTVData = function(obj) {
                if(obj.id == "kline_btcusdt"){
                  if(!Array.isArray(obj.data)){
                    onHistoryCallback([], {noData: true})
                    return
                  }
                  if(obj.data.length != 0){
                    let bars = [];
                    for(let i = 0; i < obj.data.length; i++){
                      let el = obj.data[i];
                      if(el.high >= 1000000){
                        continue;
                      }
                      bars.push({
                        time: el.id * 1000, //TradingView requires bar time in ms
                        low: (el.low),
                        high: (el.high),
                        open: (el.open),
                        close: (el.close),
                        volume: (el.count)
                      });
                    }
                    if (first) {
                      var lastBar = bars[bars.length - 1];
                      history[symbolInfo.name] = {lastBar: lastBar}
                    }
                    onHistoryCallback(bars, {noData: false})
                  }else{
                    onHistoryCallback([], {noData: true})
                  }

                }
              }
            }
          })
        },
        function(symbolInfo, resolution, historyProvider, onRealtimeCallback){
          var timerFcoinTV = setInterval(function(){
            if(_this.fcoinWs != null && _this.fcoinWs.readyState == 1) {
              clearInterval(timerFcoinTV);
              _this.fcoinWs.send(JSON.stringify({
                args:["candle.M1.btcusdt"],
                cmd: "sub",
              }));
              _this.showFcoinTVData1 = function(obj){
                var arrData = obj;
                if(obj.type == "candle.M1.btcusdt"){
                  let datai = arrData;
                  let newBar = _this.updateBar({
                    time: datai.id * 1000, //TradingView requires bar time in ms
                    low: parseFloat(datai.low),
                    high: parseFloat(datai.high),
                    open: parseFloat(datai.open),
                    close: parseFloat(datai.close),
                    volume: parseFloat(datai.count),
                    price: parseFloat(datai.close)
                  }, historyProvider.history[symbolInfo.name], resolution, datai.id * 1000);

                  onRealtimeCallback(newBar);
                  historyProvider.history[symbolInfo.name].lastBar = newBar;
                }
              };
            }
          },100)

        }
      );
      /*
      const widgetOptions = {
        symbol: "AAPL",
        // BEWARE: no trailing slash is expected in feed URL
        datafeed: new window.Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
        interval: 'D',
        container_id: 'tv_chart_container',
        library_path: '/static/charting_library/',

        locale: getLanguageFromURL() || 'en',
        disabled_features: ['use_localstorage_for_settings'],
        enabled_features: ['study_templates'],
        charts_storage_url: 'https://saveload.tradingview.com',
        charts_storage_api_version: '1.1',
        client_id: 'tradingview.com',
        user_id: 'public_user_id',
        fullscreen: true,
        autosize: true,
      };

      const tvWidget = new widget(widgetOptions);

      tvWidget.onChartReady(() => {
        const button = tvWidget.createButton()
          .attr('title', 'Click to show a notification popup')
          .addClass('apply-common-tooltip')
          .on('click', () => tvWidget.showNoticeDialog({
            title: 'Notification',
            body: 'TradingView Charting Library API works correctly',
            callback: () => {
              // eslint-disable-next-line no-console
              console.log('Noticed!');
            },
          }));

        button[0].innerHTML = 'Check API';
        tvWidget.chart().createStudy('Moving average', false, false, [5, 'close', 0]);
        tvWidget.chart().createStudy('Moving average', false, false, [10, 'close', 0]);
        tvWidget.chart().createShape({time: new Date(), price: 6600});
      });*/
    },
    methods: {
      updateBar:  function (data, lastBar1, resolution1, time) {
        var lastBar = lastBar1.lastBar;
        let resolution = resolution1;
        if (resolution.includes('D')) {
          // 1 day in minutes === 1440
          resolution = 1440
        } else if (resolution.includes('W')) {
          // 1 week in minutes === 10080
          resolution = 10080
        }
        var coeff = resolution * 60;
        var rounded = Math.floor(parseInt(time / 1000) / coeff) * coeff
        var lastBarSec = lastBar.time / 1000
        var _lastBar

        if (rounded > lastBarSec) {
          // create a new candle, use last close as open **PERSONAL CHOICE**
          _lastBar = {
            time: rounded * 1000,
            open: data.open,
            high: data.high,
            low: data.low,
            close: data.price,
            volume: data.volume
          }
        } else {
          // update lastBar candle!
          lastBar.low = data.low
          lastBar.high = data.high
          lastBar.volume = data.volume
          lastBar.close = data.price
          _lastBar = lastBar;
        }
        return _lastBar
      },
      initTradingView: function(initDataFun, updateFun){
        const _this = this;
        const supportedResolutions = ["1","5", "15", "30", "60", "240", "1D", "2D", "1W"]
        const config = {
          supported_resolutions: supportedResolutions
        };
        const api_root = 'https://min-api.cryptocompare.com'
        const history = {}
        let historyProvider = {
          history: history,

          // getBars: function(symbolInfo, resolution, from, to, first, onHistoryCallback, onErrorCallback) {
          getBars: function(symbolInfo, resolution, from, to, first, limit, onHistoryCallback) {
            initDataFun(symbolInfo, resolution, from, to, first, limit, history, onHistoryCallback);
          }
        };
        let objDataFeed = {
          onReady: cb => {
            setTimeout(() => cb(config), 0)
          },
          searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {

          },
          resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
            // expects a symbolInfo object in response

            var split_data = symbolName.split(/[:/]/);
            var symbol_stub = {
              name: symbolName,
              ticker: "",
              description: symbolName,
              session: '24x7',
              minmov: 1,
              pricescale: 100,
              timezone: 'Asia/Shanghai',     //时区
              has_intraday: true,
              has_daily: !0,
              has_weekly_and_monthly: !0,
            }

            setTimeout(function() {
              onSymbolResolvedCallback(symbol_stub)
            }, 0)
            // onResolveErrorCallback('Not feeling it today')
          },
          getBars: function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
            historyProvider.getBars(symbolInfo, resolution, from, to, firstDataRequest, 2000, onHistoryCallback);
          },
          subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
            // stream.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback)
            updateFun(symbolInfo, resolution, historyProvider, onRealtimeCallback);

          },
          unsubscribeBars: subscriberUID => {
            // stream.unsubscribeBars(subscriberUID)

          },
          calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
            //optional
            // while optional, this makes sure we request 24 hours of minute data at a time
            // CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data

            // return resolution < 60 ? {resolutionBack: 'D', intervalBack: '1'} : undefined
          },
          getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
            //optional

          },
          getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
            //optional

          },
          getServerTime: cb => {

          }
        }
        let widgetOptions = {
          debug: !1,
          symbol: "BTC/USDT",
          timezone: "Asia/Shanghai",
          datafeed: objDataFeed,
          interval: "1",
          container_id: 'BAcoinKchart',
          library_path: '/static/charting_library/',
          locale: 'en',
          disabled_features: ["compare_symbol", "display_market_status", "go_to_date", "header_chart_type", "header_resolutions", "header_compare", "header_interval_dialog_button", "header_symbol_search", "header_undo_redo", "legend_context_menu", "show_hide_button_in_legend", "show_interval_dialog_on_key_press", "snapshot_trading_drawings", "symbol_info", "timeframes_toolbar", "use_localstorage_for_settings", "volume_force_overlay"],
          enabled_features: ["dont_show_boolean_study_arguments", "hide_last_na_study_output", "move_logo_to_main_pane", "same_data_requery", "side_toolbar_in_fullscreen_mode", "disable_resolution_rebuild"],
          // charts_storage_url: "https://saveload.tradingview.com",
          charts_storage_api_version: "1.1",
          // client_id: "tradingview.com",
          // user_id: "public_user_id",
          fullscreen: true,
          autosize: true,
          studies_overrides: {},
        };
        _this.tvWidget = window.tvWidget = new widget(widgetOptions);
        _this.tvWidget.onChartReady(function() {
          // It's now safe to call any other methods of the widget
          _this.tvWidget.chart().createStudy('Moving average', false, false, [5, 'close', 0]);
          _this.tvWidget.chart().createStudy('Moving average', false, false, [10, 'close', 0]);
          console.log((new Date().getTime()) / 1000);
          _this.tvWidget.chart().createShape(
            {
              time: (new Date().getTime()) / 1000,
            }, {
              shape: "price_label",
              extendLeft: "true",
              icon: "0x263A",
              text: 6000,
              color: "#000",
              size: 12})
          _this.tvWidget.chart().createShape(
            {
              time: (new Date().getTime() - 6000000)/1000,
            }, {
              shape: "price_label",
              extendLeft: "true",
              icon: "0x263A",
              text: 6000,
              color: "#000",
              size: 12})
          _this.tvWidget.chart().createShape(
            {
              time: (new Date().getTime() - 3000000) / 1000,
            }, {
              shape: "price_label",
              extendLeft: "true",
              icon: "0x263A",
              text: 6000,
              color: "#000",
              size: 12})


          // 添加一根订单线
          let line =_this.tvWidget.chart().createOrderLine()
          console.log(line);
          console.log(line.getTooltip());
          line.onMove(function(){
            this.setText("move");
          }).onModify({Tooltip: "aaa"},function(data) {
            this.setText("3333")
          })
          .setTooltip("test")
          .setText("STOP: 73.5 (5,64%)")
          .setQuantity("2");
          // 创建一个位置线
          // _this.tvWidget.chart().createPositionLine()
          //   .onModify(function() {
          //     this.setText("onModify called");
          //   })
          //   .onReverse("onReverse called", function(text) {
          //     this.setText(text);
          //   })
          //   .onClose("onClose called", function(text) {
          //     this.setText(text);
          //   })
          //   .setText("PROFIT: 71.1 (3.31%)")
          //   .setQuantity("100")
          //   .setPrice(6743)     //y
          //   .setLineStyle(1)    // 横线间隔
          //   .setLineLength(5); // 右侧边距
        });


      },
      showFcoinTVData: function(){},
      showFcoinTVData1: function(){},
    }
  }
</script>

<style scoped>

</style>
