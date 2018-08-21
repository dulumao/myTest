export const CHANGEUSERNAME = (state, val) => {
  state.userName = val;
};
export const ADDNUM1 = (state, n = 1) => {
  console.log(n);
  state.num1 += n;
};
export const ADDNUM2 = (state, n = 1) =>{
  state.num2 += n;
};
