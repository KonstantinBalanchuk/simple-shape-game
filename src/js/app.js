import { Application } from './utils/pixi';
import setting from './utils/default_settings';
import AppController from './controller/Controller';
import ViewController from './view/View';
import ModelController from './model/Model';

let app;

setting.app = setting.app || {};
setting.app.width = Math.floor(0.55 * window.innerWidth);
setting.app.height = Math.floor(0.45 * window.innerHeight);

app = new Application({
    width: setting.app.width,
    height: setting.app.height,
    antialias: true,
    transparent: true,
    resolution: 1
  }
);

const view = new ViewController();
const model = new ModelController();
const controller = new AppController(app, view, model);
controller.startAction()

export default app;