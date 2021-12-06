import validate from "./validator";
import generateApp from './generator';
import * as componentController from './controller/component';
import * as postsController from './controller/posts';
import * as themeController from './controller/theme';
import * as distController from './controller/dist';

export {
    validate,
    componentController,
    postsController,
    themeController,
    distController,
    generateApp
};