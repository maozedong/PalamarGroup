import {CoursesController} from './controllers/courses.controller';
import {CourseController} from './controllers/course.controller';
import {CourseCalendarComponentUrl} from "./components/course.calendar.component";
import {AcademyContactComponentUrl} from "./components/academy.contacts.component";

coursesRoutes.$inject = ['$routeProvider'];
export function coursesRoutes($routeProvider:ng.route.IRouteProvider) {
    $routeProvider
        .when('/courses', {
            templateUrl: 'app/courses/views/coursrs.cards.html',
            controller: CoursesController.componentName,
            controllerAs: "vm"
        })
        .when('/course/:id', {
            templateUrl: 'app/courses/views/courses.details.html',
            controller: CourseController.componentName,
            controllerAs: "vm"
        })
        .when(CourseCalendarComponentUrl, {
            template: '<pg-course-calendar></pg-course-calendar>',
        })
        .when(AcademyContactComponentUrl, {
            template: '<pg-academy-contact></pg-academy-contact>',
        })
        .when('/test', {
            templateUrl: 'app/courses/views/test.html',
            controller: 'TestController',
            controllerAs: "vm"
        });
}