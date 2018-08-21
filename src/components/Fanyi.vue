<template>
    <div>
      这是一段测试文本
      <br>
      这也是一段测试文本
      <br>
      这是一段带English的测试文本
      <button @click="english">中文-英文</button>
      <button @click="english2">英文-中文</button>
    </div>
</template>

<script>
  export default {
    name: "Fanyi",
    methods: {
      english: function () {
        Microsoft.Translator.Widget.Translate('zh-CHS', 'en', onProgress, onError, onComplete, onRestoreOriginal, 4000);
        function onProgress(value) {
        }
        function onError(error) {
        }
        function onComplete() {
        }
        function onRestoreOriginal() {
        }
      },
      english2: function () {
        Microsoft.Translator.Widget.Translate('en', 'zh-CHS', onProgress, onError, onComplete, onRestoreOriginal, 4000);
        function onProgress(value) {
        }
        function onError(error) {
        }
        function onComplete() {
        }
        function onRestoreOriginal() {
        }
      }
    }
  }
</script>

<style scoped>

</style>
