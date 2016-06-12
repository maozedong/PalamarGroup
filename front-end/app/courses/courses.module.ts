/**
 * Created by Galyna on 13.04.2016.
 */
//modules
import 'angular';
import 'angular-material';
import {resourcesModule} from "../resources/resources.module";

//components
import {coursesRoutes} from './courses.routes';
import {CoursesController} from './controllers/courses.controller';
import {TestController} from './controllers/test.controller';
import {CourseController} from "./controllers/course.controller";


let app = angular.module('courses', [ 'ngMaterial', resourcesModule.name])
    .config(coursesRoutes)
    .controller(CoursesController.componentName, CoursesController)
    .controller(CourseController.componentName, CourseController)
    .controller(TestController.componentName, TestController);

export let coursesModule = app;