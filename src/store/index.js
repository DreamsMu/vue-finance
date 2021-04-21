import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user: {
    //   id: 1,
    //   name: '海绵宝宝',
    //   power: 1,
    //   master: 1,
    //   family_id: 'hmfamily'
    // },
    user: {
      id: localStorage.getItem("id"),
      name: localStorage.getItem("name"),
      power: localStorage.getItem("power"),
      master: localStorage.getItem("master"),
      family_id: localStorage.getItem("family_id")
    },
    // user: {}
  },
  actions: {
    //登录事件
    async login(context, data){
      let res = await Vue.axios.post('api/login', data);
      if(res.data.code == 200) {
        context.state.user = res.data.data
        localStorage.setItem("token", 'true');
        localStorage.setItem("id", res.data.data.id)
        localStorage.setItem("name", res.data.data.name)
        localStorage.setItem("power", res.data.data.power)
        localStorage.setItem("master", res.data.data.master)
        localStorage.setItem("family_id", res.data.data.family_id)
      }
      return res
    },
    //注册事件
    async register(context, data){
      let res = Vue.axios.post('api/register', data);
      // context.state.user.name = data.name
      console.log(res);
      // return 200;
    },
    //HOME部分
    /**
     * 添加收入记录
     * @param {*} context 
     * @returns 
     */
    insertIncomeData(context, value){
      return Vue.axios.post('api/insertIncomeData', value)
    },
    /**
     * 添加支出记录
     * @param {*} context 
     * @returns 
     */
    insertExpendData(context, value){
      return Vue.axios.post('api/insertExpendData', value)
    },
    /*报表部分*/
    queryMainData(context) {
      return Vue.axios.get('api/getMainData?family_id='+context.state.user.family_id)
    },
    queryIncomeWay(context) {
      return Vue.axios.get('api/getIncomeWay?family_id='+context.state.user.family_id)
    },
    queryExpendPayway(context) {
      return Vue.axios.get('api/getExpendPayway?family_id='+context.state.user.family_id)
    },
    queryExpendWay(context) {
      return Vue.axios.get('api/getExpendWay?family_id='+context.state.user.family_id)
    },
    //main
    queryIncomeExpend(context) {
      return Vue.axios.get('api/getIncomeExpend?family_id='+context.state.user.family_id)
    },
    //income
    //1.分页
    queryIncomePage(context, value) {
      return Vue.axios.get('api/getIncomePage?page='+value.page+"&&rows="+value.rows+"&&family_id="+context.state.user.family_id)
    },
    //2.修改数据
    updateIncome(context, value) {
      return Vue.axios.post('api/setIncome', value)
    },
    //3.删除数据
    delIncome(context, value) {
      return Vue.axios.post('api/delIncome', value)
    },
    //4
    queryYearMouthIncome(context) {
      return Vue.axios.get('api/getYearMouthIncome?family_id='+context.state.user.family_id)
    },
    //expend
    queryCapital(context) {
      return Vue.axios.get('api/getCapital?family_id='+context.state.user.family_id)
    },
    //分页查询支出数据
    queryExpendPage(context, value) {
      return Vue.axios.get('api/getExpendPage?page='+value.page+"&&rows="+value.rows+"&&family_id="+context.state.user.family_id)
    },
    queryYearMouth(context) {
      return Vue.axios.get('api/getYearMouthExpend?family_id='+context.state.user.family_id);
    },
    updateExpend(context, value) {
      return Vue.axios.post('api/setExpend', value)
    },
    delExpend(context, value) {
      return Vue.axios.post('api/delExpend', value)
    },
    //family
    //1.查询全部家庭成员
    queryUser(context, value) {
      return Vue.axios.post('api/getUser',value)
    },
    updateUser(context, value) {
      return Vue.axios.post('api/setUser', value)
    },
    //UserSet
    //0.查询管理员信息和家庭资产
    queryUserId(context,value) {
      return Vue.axios.post('api/getUserId', value)
    },
    updateUserSet(context, value) {
      return Vue.axios.post('api/setUserSet', value)
    }
  }
})
