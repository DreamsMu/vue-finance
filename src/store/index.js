import Vue from 'vue'
import Vuex from 'vuex'
import qs from 'qs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: qs.parse(sessionStorage.getItem("user")),
    //卡片数据
    card: {
      total: '',
      debt: '',

      incomeMouth: '',
      incomeYear: '',
      incomeTotal: '',

      expendMouth: '',
      expendYear: '',
      expendTotal: '',
    },
    //主页卡片列表
    cardList: [],
    //收入页表数据
    incomeList: [],
    //支出页表数据
    expendList: [],
    //图表数据：主表
    mainChart: [],
    //图表数据：收入途径
    incomeWayChart: [],
    //图表数据：支出方式
    expendPaywayChart: [],
    //图表数据：支出用途
    expendWayChart: []
  },
  getters: {
    incomeNet(state) {
      let value = state.card.incomeMouth - state.card.expendMouth
      return value
    }
  },
  actions: {
    //登录事件
    login(context, data){
      return Vue.axios.post('api/login', data);
    },
    logout(){
      return Vue.axios.get('api/logout')
    },
    //注册事件
    register(context, data){
      return Vue.axios.post('api/register', data);
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
    /**
     * 首页：收入和支出记录
     * @param {*} context 
     * @returns 
     */
    async queryIncomeExpend(context) {
      let res = await Vue.axios.get('api/getIncomeExpend?family_id='+context.state.user.family_id)
      context.state.cardList = res.data
      return res
    },
    /**
     * 图表数据：主表
     * @param {*} context 
     * @returns 
     */
    async queryMainData(context) {
      let res = await Vue.axios.get('api/getMainData?family_id='+context.state.user.family_id)
      context.state.mainChart = res.data
      return res
    },
    /**
     * 图表数据：收入途径
     * @param {*} context 
     * @returns 
     */
    async queryIncomeWay(context) {
      let res = await Vue.axios.get('api/getIncomeWay?family_id='+context.state.user.family_id)
      context.state.incomeWayChart = res.data
      return res
    },
    /**
     * 图表数据：支出方式
     * @param {*} context 
     * @returns 
     */
    async queryExpendPayway(context) {
      let res = await Vue.axios.get('api/getExpendPayway?family_id='+context.state.user.family_id)
      context.state.expendPaywayChart = res.data
      return res
    },
    /**
     * 图表数据：支出用途
     * @param {*} context 
     * @returns 
     */
    async queryExpendWay(context) {
      let res = await Vue.axios.get('api/getExpendWay?family_id='+context.state.user.family_id)
      context.state.expendWayChart = res.data
      return res
    },
    //income
    /**
     * 分页查询所有收入
     * @param {*} context 
     * @param {*} value 
     * @returns 
     */
    async queryIncomePage(context, value) {
      let res = await Vue.axios.get('api/getIncomePage?page='+value.page+"&&rows="+value.rows+"&&family_id="+context.state.user.family_id)
      context.state.incomeList = res.data.list
      return res
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
    /**
     * 获取年收入和月收入
     * @param {*} context 
     * @returns 
     */
    async queryYearMouthIncome(context) {
      let card = context.state.card
      let res = await Vue.axios.get('api/getYearMouthIncome?family_id='+context.state.user.family_id)
      card.incomeMouth = res.data.mouthIncome
      card.incomeYear = res.data.yearIncome
      return res
    },
    /**
      * 获取年支出和月支出
      * @param {*} context 
      * @returns 
      */
    async queryYearMouth(context) {
      let card = context.state.card
      let res = await Vue.axios.get('api/getYearMouthExpend?family_id='+context.state.user.family_id)
      card.expendMouth = res.data.mouthExpend
      card.expendYear = res.data.yearExpend
      return res
    },
    /**
     * 获取总资金表信息
     * @param {*} context 
     * @returns 
     */
    async queryCapital(context) {
      let res = await Vue.axios.get('api/getCapital?family_id='+context.state.user.family_id)
      context.state.card.total = res.data.total
      context.state.card.debt = res.data.debt
      context.state.card.incomeTotal = res.data.income
      context.state.card.expendTotal = res.data.expend
      return res
    },
    /**
     * 分页查询所有支出
     * @param {*} context 
     * @param {*} value 
     * @returns 
     */
    async queryExpendPage(context, value) {
      let res = await Vue.axios.get('api/getExpendPage?page='+value.page+"&&rows="+value.rows+"&&family_id="+context.state.user.family_id)
      context.state.expendList = res.data.list
      return res
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
