import Vue from 'vue';
import VueI18n from 'vue-i18n';
import locale from 'element-ui/lib/locale';
import messages from './lang';


let JsSrc = localStorage.getItem('lang')
if (!JsSrc) {
    // JsSrc = (navigator.language || navigator.browserLanguage).toLowerCase();
    JsSrc = 'en'
}

if (JsSrc.indexOf('zh') !== -1) {
    //中文
    localStorage.setItem('lang', 'CN');
} else if (JsSrc.indexOf('ko') !== -1) {
    //韩文
    localStorage.setItem('lang', 'KO');
} else if (JsSrc.indexOf('en') !== -1) {
    //英文
    localStorage.setItem('lang', 'EN');
} else if (JsSrc.indexOf('ja') !== -1) {
    localStorage.setItem('lang', 'JP');
} else if (JsSrc.indexOf('es') !== -1) {
    localStorage.setItem('lang', 'ES');
} else if (JsSrc.indexOf('fr') !== -1) {
    localStorage.setItem('lang', 'FR');
} else if (JsSrc.indexOf('de') !== -1) {
    localStorage.setItem('lang', 'DE');
} else if (JsSrc.indexOf('it') !== -1) {
    localStorage.setItem('lang', 'IT');
} else if (JsSrc.indexOf('pt') !== -1) {
    localStorage.setItem('lang', 'PT');
} else if (JsSrc.indexOf('vi') !== -1) {
    localStorage.setItem('lang', 'VI')
}
console.log(navigator.language);

Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: localStorage.getItem('lang') || 'EN',
    messages,
});
locale.i18n((key, value) => i18n.t(key, value)); //重点：为了实现element插件的多语言切换

export default i18n;
