import './index.css';
import './index.less';
import _ from 'lodash';

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
