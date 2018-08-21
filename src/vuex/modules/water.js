const state = {
  waterName: "milk"
}
const mutations={
  //state为当前状态对象，v为按收的值
  SET_WATERNAME(state,v){
    state.advName = v;
  }
}
const getters = {
  sumWaterName: state => {
    return state.waterName + "1";
  }
};
export default {state,mutations,getters}
