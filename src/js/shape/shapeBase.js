import { Graphics } from '../utils/pixi';
import actions from '../utils/actions';
import setting from '../utils/default_settings';

export default class BaseShape extends Graphics {
  constructor(...arg) {
    super(...arg)
    this.tickCount = null;
    this.appData = null;
    this.isDelete = false;
    this.isDropped = false;
    this.interactive = true;
    this.id = count.id
  }

  init(options) {
    count.increase()
    this.tickCount = options && options.tickCount ? options.tickCount : 0;
    this.appData = (options && options.appData) || setting.app;
    this.isDropped = false;

    // RANDOM X AXIS SHAPE POSITION
    let { width, height } = this.getBounds()
    if (options && options.x) {
      this.x = this.calcPointedWidth(options.x)
    } else {
      this.x = Math.floor(Math.random()*(this.appData.width - width))
    }
    if (options && options.y) {
      this.y = options.y
    } else {
      this.y = -height
    }

    return this;
  }

  play() {
    this.tickCount +=1;
    this.y += setting.gravity * setting.gravityMultiply * this.tickCount * this.tickCount;
    this.checkIfDropped(this)
  }

  checkIfDropped(shape) {
    if (shape.y > (this.appData.height + this.getBounds().height)) {
      this.isDropped = true;
      actions.call('dropped', { shape: this });
    }
  }

  delete() {
    this.y = this.appData.height + this.getBounds().height;
    this.isDelete = true;

    return this.id
  }

  getRandomColor() {
    const hex = '0123456789ABCDEF';
    let color = '0x';
    for (let i = 0; i < 6; i++) {
      color += hex[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  calcPointedWidth(x) {
    let width = this.getBounds().width;

    if (x < width/2) {
      return Math.floor(width/2);
    }
    if (x > setting.app.width - width/2) {
      return Math.floor(setting.app.width - width/2);
    }

    return x
  }
}

class Counter {
  constructor() {
    this.id = 0
  }

  increase() {
    this.id++
  }
}

const count = new Counter;