import './index.css';
import './index.less';
import _ from 'lodash';

//配置webpack ignorePlugin,将moment的语言包去除，可减少 moment 模块打包后的大小
import moment from 'moment';
import 'moment/locale/zh-cn'; // 手动引入中文语言包
moment.locale('zh-cn');
const r = moment().endOf('day').fromNow();
console.log(r);

// 懒加载支持
setTimeout(() => {
  import('./common/js/dynamic-data').then((res) => {
    console.log(res.default.message);
  });
}, 1500);

const arr = [];
console.log('调用第三方模块方法 _.isArray(arr) :>> ', _.isArray(arr));

console.log(process.env);

const fn = () => {
  console.log('this is fn');
};

fn();

class SayHi {
  constructor(msg) {
    this.msg = msg;
  }
  sayHello() {
    console.log('this.msg :>> ', this.msg);
  }
}

new SayHi('Hi').sayHello();
