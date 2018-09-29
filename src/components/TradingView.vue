<template>
  <div id="tv_chart_container"></div>
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
    mounted() {
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
      });
    }
  }
</script>

<style scoped>

</style>
