System.register(["../../../resources/master.resource", "../../../ui/scheduler.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var master_resource_1, scheduler_service_1;
    var template, AppointmentSchedulerComponentController, AppointmentSchedulerComponentName, AppointmentSchedulerComponentOptions;
    return {
        setters:[
            function (master_resource_1_1) {
                master_resource_1 = master_resource_1_1;
            },
            function (scheduler_service_1_1) {
                scheduler_service_1 = scheduler_service_1_1;
            }],
        execute: function() {
            template = "\n <div layout=\"row\" class=\"master-scheduler\" layout-xs=\"column\">\n                <div hide show-gt-xs=\"true\"  layout=\"row\" layout-align=\"center center\">\n                    <daypilot-navigator  style=\" width: 280px\" id=\"navi\"\n                                        daypilot-config=\"$ctrl.navigatorConfig\"></daypilot-navigator>\n                   \n                </div>\n                <div hide-gt-xs=\"true\" class=\"md-padding \" layout=\"row\" layout-align=\"center center\">\n                   \n                    <daypilot-navigator  style=\" width: 280px\" id=\"navis\"\n                                        daypilot-config=\"$ctrl.navigatorSmallConfig\"></daypilot-navigator>\n                </div>\n                <div flex class=\"md-padding \">\n                    <daypilot-calendar id=\"week\" daypilot-config=\"$ctrl.weekConfig\"\n                                       daypilot-events=\"$ctrl.events\"></daypilot-calendar>\n                </div>\n\n            </div>";
            AppointmentSchedulerComponentController = (function () {
                function AppointmentSchedulerComponentController($log, $timeout, $mdDialog, MasterResource, $routeParams, $scope, SchedulerService) {
                    this.$log = $log;
                    this.$timeout = $timeout;
                    this.$mdDialog = $mdDialog;
                    this.MasterResource = MasterResource;
                    this.$routeParams = $routeParams;
                    this.$scope = $scope;
                    this.SchedulerService = SchedulerService;
                    this.events = [];
                    this.tasks = [];
                }
                AppointmentSchedulerComponentController.prototype.$onChanges = function (changesObj) {
                    console.log(changesObj);
                    if (changesObj.master.currentValue && changesObj.master.previousValue != changesObj.master.currentValue) {
                        this.masterId = changesObj.master.currentValue;
                        this.init();
                    }
                };
                ;
                AppointmentSchedulerComponentController.prototype.init = function () {
                    this.initWeekConfig();
                    this.initNavigatorConfig();
                    this.initNavigatorSmallConfig();
                    this.loadEvents(new Date());
                };
                AppointmentSchedulerComponentController.prototype.loadEvents = function (start) {
                    var _this = this;
                    if (this.masterId) {
                        var days = this.SchedulerService.getStartAndEndOfWeek(start);
                        var params = {
                            id: this.masterId,
                            start: days[0].toISOString(),
                            end: days[1].toISOString(),
                        };
                        this.MasterResource.getTasks(params).$promise.then(function (tasks) {
                            _this.tasks = tasks;
                            _this.events = _this.tasks.map(function (task) {
                                return angular.copy(task.scheduler);
                            });
                        }).catch(function (err) {
                            _this.$log.error(err);
                            _this.showErrorDialog();
                        });
                    }
                };
                AppointmentSchedulerComponentController.prototype.initWeekConfig = function () {
                    var _this = this;
                    this.weekConfig = this.SchedulerService.getWeekConfig();
                    this.weekConfig.onTimeRangeSelect = function (args) {
                        var params = {
                            appointment: angular.copy(_this.appointment),
                            scheduler: {
                                start: args.start.toString(),
                                end: args.end.toString(),
                                id: DayPilot.guid()
                            }
                        };
                        if (!params.appointment.isConsultation) {
                            params.appointment.favors = _this.getFavors();
                        }
                        _this.SchedulerService.updateTaskText(params);
                        _this.MasterResource.addTask({ id: _this.masterId }, params).$promise.then(function (task) {
                            _this.tasks.push(task);
                            _this.events.push(task.scheduler);
                            _this.$scope.week.update();
                        });
                    };
                    this.weekConfig.onEventResize = function (args) {
                        var event = {
                            id: args.e.id(),
                            start: args.newStart.toString(),
                            end: args.newEnd.toString(),
                            text: args.e.text(),
                            borderColor: args.e.borderColor,
                            barColor: args.e.barColor,
                        };
                        var originalTask;
                        var tasks = _this.tasks.filter(function (task) {
                            return task != null && task.scheduler.id === event.id;
                        });
                        if (tasks.length > 0 && event) {
                            var task = tasks[0];
                            originalTask = angular.copy(task);
                            task.scheduler = event;
                            _this.MasterResource.updateTask({ id: _this.masterId }, task).$promise.then(function (newTask) {
                                _this.tasks.splice(_this.tasks.indexOf(task), 1, newTask);
                            }).catch(function (err) {
                                _this.revertResize(originalTask);
                                _this.$scope.week.update();
                                _this.$log.error(err);
                                _this.showErrorDialog();
                            });
                        }
                    };
                };
                AppointmentSchedulerComponentController.prototype.initNavigatorSmallConfig = function () {
                    var _this = this;
                    this.navigatorSmallConfig = this.SchedulerService.getNavigatorSmallConfig();
                    this.navigatorSmallConfig.onTimeRangeSelected = function (args) {
                        _this.weekConfig.startDate = args.day;
                        _this.loadEvents(args.day);
                    };
                };
                AppointmentSchedulerComponentController.prototype.initNavigatorConfig = function () {
                    var _this = this;
                    this.navigatorConfig = this.SchedulerService.getNavigatorConfig();
                    this.navigatorConfig.onTimeRangeSelected = function (args) {
                        _this.weekConfig.startDate = args.day;
                        _this.loadEvents(args.day);
                    };
                };
                AppointmentSchedulerComponentController.prototype.getFavors = function () {
                    return this.appointment.favors.map(function (mf) {
                        return {
                            name: mf.favor.name,
                            id: mf._id,
                            price: mf.price,
                            photo: mf.favor.photo.url
                        };
                    });
                };
                AppointmentSchedulerComponentController.prototype.updateMaster = function (task) {
                    var _this = this;
                    this.SchedulerService.updateTaskText(task);
                    this.MasterResource.updateTask({ id: this.masterId }, task).$promise.then(function (newTask) {
                        _this.tasks.splice(_this.tasks.indexOf(task), 1, newTask);
                        var tempEvents = _this.events.filter(function (e) {
                            return e.id == newTask.scheduler.id;
                        });
                        if (tempEvents.length > 0 && event) {
                            _this.events.splice(_this.events.indexOf(tempEvents[0]), 1, newTask.scheduler);
                        }
                    }).catch(function (err) {
                        _this.$log.error(err);
                        _this.showErrorDialog();
                    });
                };
                AppointmentSchedulerComponentController.prototype.updateMasterOnResize = function (event) {
                    var _this = this;
                    var originalTask;
                    var tasks = this.tasks.filter(function (task) {
                        return task != null && task.scheduler.id === event.id;
                    });
                    if (tasks.length > 0 && event) {
                        var task = tasks[0];
                        originalTask = task;
                        task.scheduler = event;
                        this.MasterResource.updateTask({ id: this.masterId }, task).$promise.then(function (newTask) {
                            _this.tasks.splice(_this.tasks.indexOf(task), 1, newTask);
                        }).catch(function (err) {
                            _this.revertResize(originalTask);
                            _this.$log.error(err);
                            _this.showErrorDialog();
                        });
                    }
                };
                AppointmentSchedulerComponentController.prototype.revertResize = function (originalTask) {
                    var events = this.events.filter(function (e) {
                        return e.id == originalTask.scheduler.id;
                    });
                    if (events.length > 0) {
                        this.events.splice(this.events.indexOf(events[0]), 1, originalTask.scheduler);
                    }
                };
                AppointmentSchedulerComponentController.prototype.showErrorDialog = function () {
                    var confirm = this.$mdDialog.alert()
                        .title("Помилка")
                        .textContent("\u0421\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0431\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430 \u043F\u0456\u0437\u043D\u0456\u0448\u0435")
                        .ariaLabel("Помилка")
                        .ok('OK');
                    return this.$mdDialog.show(confirm);
                };
                AppointmentSchedulerComponentController.$inject = ["$log", '$timeout', "$mdDialog", master_resource_1.MasterResourceName,
                    "$routeParams", '$scope', scheduler_service_1.SchedulerServiceName];
                return AppointmentSchedulerComponentController;
            }());
            exports_1("AppointmentSchedulerComponentController", AppointmentSchedulerComponentController);
            exports_1("AppointmentSchedulerComponentName", AppointmentSchedulerComponentName = 'pgAppointmentScheduler');
            exports_1("AppointmentSchedulerComponentOptions", AppointmentSchedulerComponentOptions = {
                controller: AppointmentSchedulerComponentController,
                template: template,
                bindings: {
                    "appointment": '<',
                    'master': '<'
                }
            });
        }
    }
});
//# sourceMappingURL=appointment.scheduler.component.js.map