angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("admin/views/add.course.date.form.html","<md-dialog aria-label=\"Модуль\" flex=\"20\" >\r\n    <md-toolbar class=\"md-hue-2\">\r\n        <div class=\"md-toolbar-tools md-padding \">\r\n            <h2 class=\" md-padding \"> Додоти дату модуля</h2>\r\n            <span flex></span>\r\n        </div>\r\n    </md-toolbar>\r\n    <md-dialog-content>\r\n        <md-dialog-content-body>\r\n            <md-datepicker ng-model=\"vm.addModuleDateMolel\" ></md-datepicker>\r\n        </md-dialog-content-body>\r\n    </md-dialog-content>\r\n    <md-dialog-actions layout=\"row\" md-whiteframe=\"2\">\r\n        <md-button ng-click=\"vm.cancel()\">Cancel</md-button>\r\n        <md-button  class=\"md-raised md-accent\" ng-click=\"vm.saveModuleDate()\"> Зберегти</md-button>\r\n    </md-dialog-actions>\r\n</md-dialog>");
$templateCache.put("admin/views/admin.html","\r\n<md-content layout-xs=\"column\" layout=\"row\">\r\n    <div flex=\"12\">\r\n        <md-sidenav class=\"site-sidenav md-sidenav-left md-whiteframe-z2\"\r\n                    md-component-id=\"left\"\r\n                    aria-label=\"Адміністрування сайту\">\r\n\r\n            <md-toolbar class=\"md-whiteframe-z1\">\r\n                <div class=\"md-toolbar-tools\">\r\n                    <h3 class=\"md-padding\"></h3>\r\n                </div>\r\n            </md-toolbar>\r\n            <md-list>\r\n                <md-list-item>\r\n                    <md-button>\r\n                        Модулі\r\n                    </md-button>\r\n                </md-list-item>\r\n            </md-list>\r\n\r\n        </md-sidenav>\r\n    </div>\r\n    <div flex=\"75\">\r\n        <md-content>\r\n            <div ng-if=\"vm.showCourseEditForm\" ng-include=\"\'admin/views/course.edit.form.html\'\" ></div>\r\n\r\n            <md-list flex>\r\n                <md-subheader class=\"md-no-sticky\">Модулі</md-subheader>\r\n                <md-list-item class=\"md-2-line \" ng-repeat=\"item in vm.courses\" ng-click=\"null\">\r\n                    <img ng-src=\"{{item.hearFormsPhotos[0]}}?{{$index}}\" class=\"md-avatar\" />\r\n                    <div class=\"md-list-item-text\" layout=\"column\">\r\n                        <h3>{{ item.name }}</h3>\r\n                        <md-list layout=\"row\" layout-align=\"center center\">\r\n                            <md-list-item >\r\n                                <md-button class=\"  md-raised\" ng-click=\"vm.deleteCourse(item)\">Видалити</md-button>\r\n                            </md-list-item>\r\n                            <md-list-item >\r\n                                <md-button class=\" md-primary md-raised\" ng-click=\"vm.showEditForm(item)\">Редагувати</md-button>\r\n                            </md-list-item>\r\n\r\n                        </md-list>\r\n\r\n\r\n                    </div>\r\n                </md-list-item>\r\n\r\n\r\n            </md-list>\r\n        </md-content>\r\n    </div>\r\n    <div flex=\"12\">\r\n    </div>\r\n    </div>\r\n</md-content>\r\n");
$templateCache.put("admin/views/course.edit.form.html","<md-toolbar class=\"md-hue-2\">\r\n    <div class=\"md-toolbar-tools md-padding \">\r\n        <h2 class=\" md-padding \"> Редагувати модуль</h2>\r\n        <span flex></span>\r\n    </div>\r\n</md-toolbar>\r\n<form name=\"editCorseForm\" class=\"md-padding \" novalidate ng-submit=\"vm.editCourse(editCorseForm)\">\r\n    <md-content>\r\n        <md-input-container class=\"md-block \">\r\n            <md-checkbox ng-model=\"vm.editCourseModel.isVisible\" aria-label=\"Finished?\">\r\n                Показати на сайті\r\n            </md-checkbox>\r\n        </md-input-container>\r\n        <md-input-container class=\"md-block \">\r\n            <label for=\"name\">Назва</label>\r\n            <input id=\"name\" ng-model=\"vm.editCourseModel.name\" name=\"name\"\r\n                   required>\r\n            <div ng-messages=\"editCorseForm.name.$error\" role=\"alert\"\r\n                 ng-show=\"editCorseForm.name.$touched && editCorseForm.name.$invalid \">\r\n                <div ng-message=\"required\">\r\n                    Назва модуля на може бути пустою\r\n                </div>\r\n            </div>\r\n        </md-input-container>\r\n        <md-input-container class=\"md-block\">\r\n            <label>Опис</label>\r\n            <input ng-model=\"vm.editCourseModel.description\" id=\"description\" name=\"description\">\r\n        </md-input-container>\r\n        <md-input-container class=\"md-block \">\r\n            <label for=\"order\">Порядок відображення</label>\r\n            <input id=\"order\" ng-model=\"vm.editCourseModel.order\" name=\"order\" type=\"number\"/>\r\n\r\n        </md-input-container>\r\n        <md-input-container class=\"md-block \">\r\n            <label for=\"price\">Ціна</label>\r\n            <input id=\"price\" ng-model=\"vm.editCourseModel.price\" name=\"price\" type=\"number\"/>\r\n\r\n        </md-input-container>\r\n        <md-divider></md-divider>\r\n        <md-divider></md-divider>\r\n        <md-input-container class=\"md-block \">\r\n\r\n            <md-list flex>\r\n                <md-subheader class=\"md-no-sticky\">Дати модулів</md-subheader>\r\n                <md-list-item class=\"md-3-line\" ng-repeat=\"date in vm.editCourseModel.courseModulesDates\">\r\n                    <md-datepicker ng-model=\"date\" disabled></md-datepicker>\r\n                    <md-button class=\"  md-raised\"\r\n                               ng-click=\"vm.deleteCourseDate(vm.editCourseModel.courseModulesDates,item)\">Видалити\r\n                    </md-button>\r\n                </md-list-item>\r\n            </md-list>\r\n            <md-input-container class=\"md-block  \">\r\n                <md-button class=\"md-raised\" ng-click=\"vm.showAddDate()\">Додати дату\r\n                </md-button>\r\n            </md-input-container>\r\n\r\n        </md-input-container>\r\n        <md-divider></md-divider>\r\n        <md-divider></md-divider>\r\n        <md-input-container class=\"md-block \">\r\n            <label for=\"price\">Ім`я автора</label>\r\n            <input id=\"nameauthor\" ng-model=\"vm.editCourseModel.author.name\" name=\"nameauthor\"/>\r\n        </md-input-container>\r\n        <md-input-container class=\"md-block \">\r\n            <label for=\"price\">Фото автора</label>\r\n            <img ng-src=\"{{vm.editCourseModel.author.photourl}}\"/>\r\n            <md-button ng-click=\"vm.showImageUpload()\">змінити фото автора</md-button>\r\n        </md-input-container>\r\n        <md-divider></md-divider>\r\n        <md-divider></md-divider>\r\n        <md-input-container class=\"md-block\">\r\n            <md-list flex>\r\n                <md-subheader class=\"md-no-sticky\">Форми модулів</md-subheader>\r\n                <md-list-item class=\"md-3-line\" ng-repeat=\"item in vm.editCourseModel.hearFormsPhotos\" ng-click=\"null\">\r\n                    <img ng-src=\"{{item}}\"/>\r\n                    <div class=\"md-list-item-text\" layout=\"row\">\r\n                        <md-input-container class=\"md-block  \">\r\n\r\n                            <label for=\"name\">Назва форми</label>\r\n                            <input id=\"formname\" ng-model=\"item.name\" name=\"formname\"/>\r\n                        </md-input-container>\r\n                        <md-button class=\"  md-raised\" ng-click=\"vm.deleteFormPhotoCourse(editCourseModel.photos,item)\">\r\n                            Видалити\r\n                        </md-button>\r\n                    </div>\r\n                </md-list-item>\r\n            </md-list>\r\n            <md-input-container class=\"md-block  \">\r\n                <md-button class=\"  md-raised\" ng-click=\"vm.showImageUpload(editCourseModel.photos,item)\">Додати форму\r\n                </md-button>\r\n            </md-input-container>\r\n        </md-input-container>\r\n        <md-divider></md-divider>\r\n        <md-divider></md-divider>\r\n        <md-input-container class=\"md-block\">\r\n            <md-list flex>\r\n                <md-subheader class=\"md-no-sticky\">Форми історії попередніх модулів</md-subheader>\r\n                <md-list-item class=\"md-3-line\" ng-repeat=\"item in vm.editCourseModel.historyPhotos\" ng-click=\"null\">\r\n                    <img ng-src=\"{{item}}\"/>\r\n                    <div class=\"md-list-item-text\" layout=\"row\">\r\n                        <md-input-container class=\"md-block  \">\r\n\r\n                            <label for=\"name\">Назва форми</label>\r\n                            <input id=\"formname\" ng-model=\"item.name\" name=\"formname\"/>\r\n                        </md-input-container>\r\n                        <md-button class=\"  md-raised\" ng-click=\"vm.deleteFormPhotoCourse(editCourseModel.photos,item)\">\r\n                            Видалити\r\n                        </md-button>\r\n                    </div>\r\n                </md-list-item>\r\n            </md-list>\r\n            <md-input-container class=\"md-block  \">\r\n                <md-button class=\"  md-raised\" ng-click=\"vm.showImageUpload(editCourseModel.photos,item)\">Додати фото\r\n                    історії\r\n                </md-button>\r\n            </md-input-container>\r\n        </md-input-container>\r\n    </md-content>\r\n    <div layout=\"row\" md-whiteframe=\"4\">\r\n        <md-button class=\"md-raised md-primary\" ng-click=\"vm.closeEditCourseForm()\">Скасувати</md-button>\r\n        <md-button type=\"submit\"  class=\"md-raised md-accent\">Зберегти</md-button>\r\n    </div>\r\n</form>\r\n\r\n");
$templateCache.put("admin/views/couse.create.form.html","<md-dialog aria-label=\"Модуль\" flex-sm=\"40\" flex-xs=\"50\" flex-gt-sm=\"25\">\r\n    <md-toolbar class=\"md-hue-2\">\r\n        <div class=\"md-toolbar-tools md-padding \">\r\n            <md-icon md-svg-icon=\"social:ic_person_24px\"></md-icon>\r\n            <h2 class=\" md-padding \"> Редагувати модуль</h2>\r\n            <span flex></span>\r\n        </div>\r\n    </md-toolbar>\r\n    <form name=\"editCorseForm\" class=\"md-padding \" novalidate ng-submit=\"vm.editCourse(editCorseForm)\">\r\n        <md-dialog-content>\r\n            <md-dialog-content-body>\r\n                <md-input-container class=\"md-block  \">\r\n                    <label for=\"name\">Назва</label>\r\n                    <input id=\"name\" ng-model=\"vm.editCourseModel.name\" name=\"name\"\r\n                           required>\r\n                    <div ng-messages=\"editCorseForm.name.$error\" role=\"alert\"\r\n                         ng-show=\"editCorseForm.name.$touched && editCorseForm.name.$invalid \">\r\n                        <div ng-message=\"required\">\r\n                            Назва модуля на може бути пустою\r\n                        </div>\r\n                    </div>\r\n                </md-input-container>\r\n                <md-input-container class=\"md-block\">\r\n                    <label>Опис</label>\r\n                    <input ng-model=\"vm.editCourseModel.description\" id=\"description\" name=\"description\">\r\n                </md-input-container>\r\n                <md-input-container class=\"md-block\">\r\n                    <md-list flex>\r\n                        <md-subheader class=\"md-no-sticky\">Форми модулів</md-subheader>\r\n                        <md-list-item class=\"md-2-line\" ng-repeat=\"item in vm.editCourseModel.photos\" ng-click=\"null\">\r\n                            <img ng-src=\"{{item.url}}?{{$index}}\" class=\"md-avatar\"/>\r\n                            <!--<div class=\"md-list-item-text\" layout=\"column\">-->\r\n                            <!--<md-input-container class=\"md-block  \">-->\r\n\r\n                            <!--<label for=\"name\">Назва форми</label>-->\r\n                            <!--<input id=\"formname\" ng-model=\"item.name\" name=\"formname\"/>-->\r\n                            <!--</md-input-container>-->\r\n                            <!--<md-button ng-click=\"vm.deleteFormPhotoCourse(item.id)\">Видалити</md-button>-->\r\n                            <!--</div>-->\r\n                        </md-list-item>\r\n                    </md-list>\r\n                    <md-input-container class=\"md-block  \">\r\n                        <label for=\"name\">Додати фото</label>\r\n\r\n                    </md-input-container>\r\n                    <md-button ng-click=\"vm.deleteFormPhotoCourse(item._id)\">Видалити</md-button>\r\n                </md-input-container>\r\n            </md-dialog-content-body>\r\n        </md-dialog-content>\r\n\r\n        <md-dialog-actions layout=\"row\" md-whiteframe=\"4\">\r\n            <md-button class=\"md-raised md-primary\" ng-click=\"vm.closeDialog()\">Скасувати</md-button>\r\n            <md-button type=\"submit\" class=\"md-raised md-accent\">Зберегти</md-button>\r\n        </md-dialog-actions>\r\n    </form>\r\n</md-dialog>\r\n");
$templateCache.put("admin/views/upload.form.html","<md-dialog aria-label=\"Модуль\" flex=\"30\" >\r\n    <md-toolbar class=\"md-hue-2\">\r\n        <div class=\"md-toolbar-tools md-padding \">\r\n            <h2 class=\" md-padding \"> Завантажити фото</h2>\r\n            <span flex></span>\r\n        </div>\r\n    </md-toolbar>\r\n<form name=\"myForm\">\r\n    <fieldset>\r\n        <legend>Завантажте та збережіть</legend>\r\n        Назва файлу:\r\n        <input type=\"text\" name=\"userName\" ng-model=\"vm.photoName\" size=\"31\" required>\r\n        <i ng-show=\"myForm.userName.$error.required\">*обов`язкове поле</i>\r\n        <br>Photo:\r\n        <input type=\"file\" ngf-select ng-model=\"picFile\" name=\"file\"\r\n               accept=\"image/*\" ngf-max-size=\"2MB\" required\r\n               ngf-model-invalid=\"errorFile\">\r\n        <i ng-show=\"myForm.file.$error.required\">*обов`язкове поле</i><br>\r\n        <i ng-show=\"myForm.file.$error.maxSize\">Файл надто великий\r\n            {{errorFile.size / 1000000|number:1}}MB: max 2M</i>\r\n        <img ng-show=\"myForm.file.$valid\" ngf-thumbnail=\"picFile\"> <button ng-click=\"picFile = null\" ng-show=\"picFile\">Видалити</button>\r\n        <br>\r\n        <button ng-disabled=\"!myForm.$valid\"\r\n                ng-click=\"vm.uploadPic(picFile)\">Зберегти</button>\r\n      <span class=\"progress\" ng-show=\"picFile.progress >= 0\">\r\n        <div style=\"width:{{picFile.progress}}%\"\r\n             ng-bind=\"picFile.progress + \'%\'\"></div>\r\n      </span>\r\n        <span ng-show=\"picFile.result\">Завантажено успішно</span>\r\n        <span class=\"err\" ng-show=\"vm.upload.errorMsg\">{{errorMsg}}</span>\r\n    </fieldset>\r\n    <br>\r\n</form>\r\n\r\n</md-dialog>");
$templateCache.put("users/views/login.form.html","<md-dialog aria-label=\"LOGIN\" flex-sm=\"40\" flex-xs=\"50\" flex-gt-sm=\"25\">\r\n    <md-toolbar class=\"md-hue-2\">\r\n        <div class=\"md-toolbar-tools  \">\r\n            <md-icon md-svg-icon=\"social:ic_person_24px\"></md-icon>\r\n            <h2 class=\" md-padding \">LOGIN</h2>\r\n            <span flex></span>\r\n        </div>\r\n    </md-toolbar>\r\n    <form name=\"loginForm\" class=\"md-padding \" ng-submit=\"vm.login(loginForm)\">\r\n        <md-dialog-content>\r\n                <md-dialog-content-body>\r\n                <md-input-container class=\"md-block \">\r\n                    <md-icon md-svg-icon=\"communication:ic_email_24px\"></md-icon>\r\n                    <label for=\"email\">eMail</label>\r\n                    <input id=\"email\" ng-model=\"vm.loginModel.email\" type=\"email\" name=\"email\"\r\n                           minlength=\"10\" maxlength=\"100\" ng-pattern=\"/^.+@.+\\..+$/\" required>\r\n                    <div ng-messages=\"loginForm.email.$error\" role=\"alert\"\r\n                         ng-show=\"loginForm.email.$touched && loginForm.email.$invalid \">\r\n                        <div ng-message-exp=\"[\'minlength\', \'maxlength\']\">\r\n                            Your email must be between 10 and 100 characters long and look like an e-mail address.\r\n                        </div>\r\n                        <div ng-message=\"required\">\r\n                            Please tell us your email.\r\n                        </div>\r\n                        <div ng-message=\"pattern\">\r\n                            Your email must look like an e-mail address.\r\n                        </div>\r\n                    </div>\r\n                </md-input-container>\r\n                <md-input-container class=\"md-block\">\r\n                    <md-icon md-svg-icon=\"action:ic_lock_24px\"></md-icon>\r\n                    <label>Password</label>\r\n                    <input ng-model=\"vm.loginModel.password\" id=\"password\" type=\"password\" name=\"password\"\r\n                           required\r\n                           maxlength=\"20\">\r\n                    <div ng-messages=\"loginForm.password.$error\" role=\"alert\"\r\n                         ng-show=\"loginForm.password.$touched && loginForm.password.$invalid \">\r\n                        <div ng-message-exp=\"[\'required\']\">\r\n                            Please tell us your password.\r\n                        </div>\r\n                        <div ng-message-exp=\"[ \'minlength\', \'maxlength\']\">\r\n                            Your password must be between 5 and 20 characters long.\r\n                        </div>\r\n                    </div>\r\n                </md-input-container>\r\n            </md-dialog-content-body>\r\n        </md-dialog-content>\r\n        <md-dialog-actions layout=\"row\" md-whiteframe=\"2\">\r\n            <md-button ng-click=\"vm.cancel()\">Cancel</md-button>\r\n            <md-button type=\"submit\" class=\"md-raised md-accent\"> Login</md-button>\r\n        </md-dialog-actions>\r\n    </form>\r\n</md-dialog>\r\n");
$templateCache.put("users/views/registration.form.html","<md-dialog aria-label=\"SIGN UP\" flex-sm=\"40\" flex-xs=\"50\" flex-gt-sm=\"25\">\r\n    <md-toolbar class=\"md-hue-2\">\r\n        <div class=\"md-toolbar-tools md-padding \">\r\n            <md-icon md-svg-icon=\"social:ic_person_24px\"></md-icon>\r\n            <h2 class=\" md-padding \">SIGN UP</h2>\r\n            <span flex></span>\r\n        </div>\r\n    </md-toolbar>\r\n    <form name=\"registationForm\" class=\"md-padding \" novalidate ng-submit=\"vm.register(registationForm)\">\r\n        <md-dialog-content>\r\n            <md-dialog-content-body>\r\n                <md-input-container class=\"md-block  \">\r\n                    <md-icon md-svg-icon=\"communication:ic_email_24px\"></md-icon>\r\n                    <label for=\"email\">eMail</label>\r\n                    <input id=\"email\" ng-model=\"vm.registationModel.email\" type=\"email\" name=\"email\"\r\n                           minlength=\"10\" maxlength=\"100\" ng-pattern=\"/^.+@.+\\..+$/\" required>\r\n                    <div ng-messages=\"registationForm.email.$error\" role=\"alert\"\r\n                                               ng-show=\"registationForm.email.$touched && registationForm.email.$invalid \">\r\n                    <div ng-message-exp=\"[\'minlength\', \'maxlength\']\">\r\n                        Your email must be between 10 and 100 characters long and look like an e-mail address.\r\n                    </div>\r\n                    <div ng-message=\"required\">\r\n                        Please tell us your email.\r\n                    </div>\r\n                    <div ng-message=\"pattern\">\r\n                        Your email must look like an e-mail address.\r\n                    </div>\r\n                </div>\r\n                </md-input-container>\r\n                <md-input-container class=\"md-block\">\r\n                    <md-icon md-svg-icon=\"action:ic_lock_24px\"></md-icon>\r\n                    <label>Password</label>\r\n                    <input ng-model=\"vm.registationModel.password\" id=\"password\" type=\"password\" name=\"password\"\r\n                           required\r\n                           minlength=\"5\" maxlength=\"20\">\r\n                    <div ng-messages=\"registationForm.password.$error\" role=\"alert\"\r\n                         ng-show=\"registationForm.password.$touched && registationForm.password.$invalid \">\r\n                        <div ng-message-exp=\"[\'required\']\">\r\n                            Please tell us your password.\r\n                        </div>\r\n                        <div ng-message-exp=\"[ \'minlength\', \'maxlength\']\">\r\n                            Your password must be between 6 and 20 characters long.\r\n                        </div>\r\n                    </div>\r\n                </md-input-container>\r\n                <md-input-container class=\"md-block\">\r\n                    <md-icon md-svg-icon=\"action:ic_lock_24px\"></md-icon>\r\n                    <label>Confirm Password</label>\r\n                    <input type=\"password\" id=\"password_c\" name=\"password_c\" ng-model=\"vm.registationModel.password_c\"\r\n                           compare-to=\"vm.registationModel.password\"\r\n                           required>\r\n                    <div ng-messages=\"registationForm.password_c.$error\"\r\n                         ng-show=\"registationForm.password_c.$touched ||registationForm.password.$touched  && registationForm.password_c.$invalid  \">\r\n                        <div ng-message=\"compareTo\">\r\n                            Passwords do not match.\r\n                        </div>\r\n\r\n                    </div>\r\n                </md-input-container>\r\n            </md-dialog-content-body>\r\n        </md-dialog-content>\r\n\r\n        <md-dialog-actions layout=\"row\" md-whiteframe=\"2\">\r\n            <md-button ng-click=\"vm.cancel()\">Cancel</md-button>\r\n            <md-button type=\"submit\" class=\"md-raised md-accent\">SIGN UP</md-button>\r\n        </md-dialog-actions>\r\n    </form>\r\n</md-dialog>\r\n");}]);