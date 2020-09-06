import './index.css';
import './index.less';

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
