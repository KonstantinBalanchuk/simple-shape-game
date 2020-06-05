import { Graphics } from '../utils/pixi';
import setting from '../utils/default_settings';
import actions from '../utils/actions';

let _instance = null;

export default class AppController {
  constructor(app, view, model) {
    if (_instance) {
      return _instance
    }
    this.model = model
    this.view = view
    this.app = app
    this.init()
    this.background = null
    this.actionsInit()
    _instance = this;
  }

  init() {
    this.background = new Graphics();
    this.background.beginFill(0xFFFFFF);
    this.background.lineStyle(1, 0x000000);
    this.background.drawRect(0, 0, setting.app.width, setting.app.height);
    this.background.endFill();
    this.background.interactive = true;
    this.app.stage.addChild(this.background);
    this.background.on('pointerdown', this.onBackgroundClick.bind(this));
  }

  actionsInit() {
    actions.add('dropped', this.shapeDropped.bind(this));
    actions.add('increaseShape', this.increaseShape.bind(this));
    actions.add('decreaseShape', this.decreaseShape.bind(this));
    actions.add('increaseGravity', this.increaseGravity.bind(this));
    actions.add('decreaseGravity', this.decreaseGravity.bind(this));
  }

  startAction() {
    setInterval(() => {
      window.requestAnimationFrame(() => this.addPrimitive());
    }, 1000);

    this.app.ticker.add(delta => this.gameLoop(delta));
    this.view.elementCountChange(setting.shapesPerSecond);
  }

  addPrimitive(options, constructor, isOnClick) {
    if (isOnClick === 'click') {
      const newShape = this.model.addShape(options, constructor);

      this.app.stage.addChild(newShape);
      newShape.on('pointerdown', this.onShapeClick.bind(this));

      return;
    }
    if (setting.shapesPerSecond > 0) {
      for (let i = 0; i < setting.shapesPerSecond; i++) {
        const newShape = this.model.addShape(options, constructor);

        this.app.stage.addChild(newShape);
        newShape.on('pointerdown', this.onShapeClick.bind(this));
      }
    }
  }

  shapeDropped(options) {
    let shape = options.shape;

    this.model.deleteShapeFromMemmory(shape.delete())
  }

  increaseShape(options) {
    setting.shapesPerSecond++;

    this.view.elementCountChange(setting.shapesPerSecond);
  }

  decreaseShape() {
    if (setting.shapesPerSecond > 0) {
      setting.shapesPerSecond--;
    }

    this.view.elementCountChange(setting.shapesPerSecond);
  }

  increaseGravity() {
    setting.gravity += setting.gravityStep;
    this.view.increaseGravity(setting.gravity)
  }

  decreaseGravity() {
    if (setting.gravity > setting.gravityStep) {
      setting.gravity -= setting.gravityStep;
    }
    this.view.decreaseGravity(setting.gravity)
  }

  onBackgroundClick(event) {
    this.addPrimitive({x: event.data.global.x, y: event.data.global.y}, null, 'click');
    // this.view.elementCountChange('increase');
  }

  onShapeClick(event) {
    this.model.deleteShapeFromMemmory(event.currentTarget.delete());
    const newShapes = this.model.changeShapeColor(event.currentTarget.area);
    newShapes.map(el => this.addPrimitive(el.options, el.constructor, 'click'));
    // this.view.elementCountChange('decrease');
  }

  gameLoop() {
    const qntAndArea = this.model.shapesCountAndArea();

    this.view.gameLoop(qntAndArea);
  }
}