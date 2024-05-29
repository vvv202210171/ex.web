import tradingView from './tradingView'

const TradingView = {
    install(Vue){
        Vue.component('tradingView',tradingView)
    }
}
export default  TradingView