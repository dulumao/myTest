<template>
  <div>
    <div>userName: {{userName}}</div>
    <div>userPwd: {{userPwd}}</div>
    <div>num1: {{num1}}</div>
    <div>num2: {{num2}}</div>
    <button @click="ADDNUM1()">ADDNUM1</button>
    <br>
    <br>
    <button @click="ADDNUM2(2)">ADDNUM2</button>
    <br>
    <br>
    <div>sumNum: {{sumNum}}</div>
    <input type="text" @blur="update">
    <div>waterName: {{waterName}}</div>
    <div>sumWaterName: {{sumWaterName}}</div>

  </div>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from "vuex"
  export default {
    name: "vuexCs",
    data: function () {
      return {
        dauserName: this.$store.state.userName,
      }
    },
    mounted: function () {
    },
    // computed: Object.assign(
    //   mapState(['userName', 'userPwd']),
    //   {
    //     userPwd1: () => {
    //       return 1-1;
    //     }
    //   }
    // ),
    computed: {
      // ...mapState(['userName', 'userPwd', 'num1', "num2"]),
      ...mapState(
        {
          userName(state){return state.userName},
          userPwd(state){return state.userPwd},
          num1(state){return state.num1},
          num2(state){return state.num2},
          waterName(state){return state.water.waterName},
        }
        // ['userName', 'userPwd', 'num1', "num2"]
      ),
      ...mapGetters(["sumNum", "sumWaterName"]),
      ...{
        userPwd1(){
          return 1-1;
        }
      }
    },
    methods: {
      ...mapMutations(["ADDNUM1", "ADDNUM2"]),
      ...{
        update(e) {
          console.log(this);
          let thisIptVal = $(e.currentTarget).val();
          console.log(thisIptVal);
          //this.$store.commit("changeUserName", thisIptVal);
          this.CHANGEUSERNAME(thisIptVal);
        }
      }
  }


  }
</script>

<style scoped>

</style>
