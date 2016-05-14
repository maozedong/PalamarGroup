/**
 * Created by Galyna on 08.04.2016.
 */
System.register(['./admin.routes', './academy/controllers/orders.controller', './academy/controllers/courses.controller', './academy/controllers/models.controller', './academy/controllers/delivery.controller', './controllers/admin.controller', './academy/controllers/left.menu.controller', "../services/course.service", "../services/order.service", "../services/contact.service", "../services/model.service", "./academy/services/salon.client.service", "./academy/services/delivery.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var admin_routes_1, orders_controller_1, courses_controller_1, models_controller_1, delivery_controller_1, admin_controller_1, left_menu_controller_1, course_service_1, order_service_1, contact_service_1, model_service_1, salon_client_service_1, delivery_service_1;
    var app, adminModule;
    return {
        setters:[
            function (admin_routes_1_1) {
                admin_routes_1 = admin_routes_1_1;
            },
            function (orders_controller_1_1) {
                orders_controller_1 = orders_controller_1_1;
            },
            function (courses_controller_1_1) {
                courses_controller_1 = courses_controller_1_1;
            },
            function (models_controller_1_1) {
                models_controller_1 = models_controller_1_1;
            },
            function (delivery_controller_1_1) {
                delivery_controller_1 = delivery_controller_1_1;
            },
            function (admin_controller_1_1) {
                admin_controller_1 = admin_controller_1_1;
            },
            function (left_menu_controller_1_1) {
                left_menu_controller_1 = left_menu_controller_1_1;
            },
            function (course_service_1_1) {
                course_service_1 = course_service_1_1;
            },
            function (order_service_1_1) {
                order_service_1 = order_service_1_1;
            },
            function (contact_service_1_1) {
                contact_service_1 = contact_service_1_1;
            },
            function (model_service_1_1) {
                model_service_1 = model_service_1_1;
            },
            function (salon_client_service_1_1) {
                salon_client_service_1 = salon_client_service_1_1;
            },
            function (delivery_service_1_1) {
                delivery_service_1 = delivery_service_1_1;
            }],
        execute: function() {
            app = angular.module('admin', ['ngMaterial', 'ngFileUpload'])
                .config(admin_routes_1.coursesRoutes)
                .controller(admin_controller_1.AdminController.componentName, admin_controller_1.AdminController)
                .controller(courses_controller_1.AcademyCoursesController.componentName, courses_controller_1.AcademyCoursesController)
                .controller(orders_controller_1.AcademyOrdersController.componentName, orders_controller_1.AcademyOrdersController)
                .controller(models_controller_1.AcademyModelController.componentName, models_controller_1.AcademyModelController)
                .controller(delivery_controller_1.AcademyDeliveryController.componentName, delivery_controller_1.AcademyDeliveryController)
                .controller(left_menu_controller_1.LeftMenuController.componentName, left_menu_controller_1.LeftMenuController)
                .service(course_service_1.CourseService.componentName, course_service_1.CourseService)
                .service(order_service_1.OrderService.componentName, order_service_1.OrderService)
                .service(model_service_1.ModelService.componentName, model_service_1.ModelService)
                .service(contact_service_1.ContactService.componentName, contact_service_1.ContactService)
                .service(salon_client_service_1.SalonClientService.componentName, salon_client_service_1.SalonClientService)
                .service(delivery_service_1.DeliveryService.componentName, delivery_service_1.DeliveryService);
            exports_1("adminModule", adminModule = app);
        }
    }
});
//# sourceMappingURL=admin.module.js.map