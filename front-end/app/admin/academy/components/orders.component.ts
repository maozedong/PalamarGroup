import {IOrderResource, IOrder, OrderResourceName} from "../../../resources/order.resource";
import {PagingServiceName, PagingService} from "../../../ui/admin.paging";
let template = `
<md-toolbar  ng-if="true">
    <div class="md-toolbar-tools">
      <pg-admin-paging
    params="$ctrl.paging"
    on-prev="$ctrl.prev()"
    on-next="$ctrl.next()"
    ></pg-admin-paging>
    </div>
  </md-toolbar>

<md-list flex>
    <md-subheader class="md-no-sticky">Записи на курс</md-subheader>
    <md-list-item class="md-2-line" ng-repeat="order in $ctrl.orders" ng-click="$ctrl.showEditOrderDialog($event, order)">
        <div class="md-list-item-text" layout="column">
            <h3>{{::order.name||'Анонім'}} {{::order.phone||order.email}}</h3>
            <p>{{::$ctrl.getOrderTitle(order)}}</p>
        </div>
        <div class="md-secondary md-margin">
        <md-checkbox  ng-model="order.answered" ng-click="$ctrl.saveOrder(order)"></md-checkbox>
        <md-tooltip >
         Замовнику передзвонили
        </md-tooltip>
         </div>
  
        <div class="md-secondary md-margin">
         <md-checkbox ng-model="order.booked" ng-click="$ctrl.saveOrder(order)"></md-checkbox>  
          <md-tooltip md-direction="top">
        Участь у заході підтверджено
        </md-tooltip>
        </div>
                
        <md-icon class="md-secondary "  ng-click="$ctrl.showEditOrderDialog($event, order)" md-svg-icon="communication:ic_message_24px"> 
         <md-tooltip > Деталі</md-tooltip></md-icon>
          
         <md-icon class="md-secondary " ng-disabled="::!$root.it.can('modifyAcademy')" ng-click="$ctrl.showDeleteDialog($event, order)" 
                     md-svg-icon="action:ic_delete_24px">
                <md-tooltip ng-if="::$root.it.can('modifyAcademy')">Видалити</md-tooltip>  
            </md-icon>

        <md-divider></md-divider>
    </md-list-item>
</md-list>

`;

let editOrderDialogTemplate = `<md-dialog aria-label="Order edit" ng-cloak>
    <form name="orderEditForm" ng-submit="$ctrl.save(orderEditForm)">
        <md-toolbar>
            <div class="md-toolbar-tools">
                <h2>{{$ctrl.order.event_name}}</h2>
                <span flex></span>
                <md-button class="md-icon-button" ng-click="$ctrl.cancel()">
                    <md-icon md-svg-src="navigation:ic_close_24px" aria-label="Close dialog"></md-icon>
                </md-button>
            </div>
            
        </md-toolbar>
        <md-dialog-content>
            <div class="md-dialog-content" layout="row">
                <md-subheader flex="1">
                    <p>{{$ctrl.order.date|date}}</p>
                    <p ng-if="$ctrl.order.name">
                        {{$ctrl.order.name}}
                    </p>
                    <p ng-if="$ctrl.order.phone">
                        {{$ctrl.order.phone}}
                    </p>
                    <p ng-if="$ctrl.order.email">
                        {{$ctrl.order.email}}
                    </p>
                    <p ng-if="$ctrl.order.comment">
                        {{$ctrl.order.comment}}
                    </p>
                </md-subheader>
                <div flex="2" layout="column" class="md-margin">
                    <md-checkbox ng-model="$ctrl.order.answered">Замовнику передзвонили</md-checkbox>                     
                    <md-checkbox ng-model="$ctrl.order.booked">Участь у заході підтверджено</md-checkbox>                    
                    <md-input-container>
                        <label>Коментар адміністратора</label>
                        <textarea ng-model="$ctrl.order.admin_comment"></textarea>
                    </md-input-container>
                </div>
            </div>
        </md-dialog-content>
        <md-dialog-actions layout="row">
            <span flex></span>
            <md-button ng-click="$ctrl.cancel()" aria-label="cancel">
                Відмінити
            </md-button>
            <md-button type="submit" aria-label="save">
                Зберегти
            </md-button>
        </md-dialog-actions>
    </form>
</md-dialog>
`;

class EditOrderDialogController {

    private order:IOrder;
    private originalOrder:IOrder;

    constructor(private $mdDialog:ng.material.IDialogService, order:IOrder) {
        this.order = angular.copy(order);
        this.originalOrder = order;
    }

    save($form:ng.IFormController) {
        if ($form.$valid) {
            angular.extend(this.originalOrder, this.order);
            this.$mdDialog.hide(this.originalOrder);
        }
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}

export class AdminOrdersController {

    static $inject = ["$filter", "$mdDialog", "$mdToast", "$mdMedia", OrderResourceName, PagingServiceName];

    orders:IOrder[];
    paging:any;

    constructor(private $filter:ng.IFilterService, private $mdDialog:ng.material.IDialogService, private $mdToast:ng.material.IToastService,
                private $mdMedia:ng.material.IMedia, private orderResource:IOrderResource,
                private pagingService: PagingService) {

    }

    $onInit() {
        this.showPage();
    }

    showEditOrderDialog(ev:MouseEvent, order:IOrder) {
        this.$mdDialog.show({
            template: editOrderDialogTemplate,
            controller: EditOrderDialogController,
            controllerAs: '$ctrl',
            bindToController: true,
            locals: {
                order: order
            },
            parent: angular.element(document.body),
            targetEvent: ev,
        }).then((order) => this.saveOrder(order));
    }

    saveOrder(order:IOrder) {

        order.$save().then(() => {
            this.$mdToast.showSimple(`Запис збережено`);
        }).catch((err) => {
            this.$mdToast.showSimple(err.message);
        });
    }

    showDeleteDialog(ev, order:IOrder) {
        let confirm = this.$mdDialog.confirm()
            .title("Підтвердження дії")
            .textContent(`Ви дійсно бажаєте видалити Запис ${order.name}?`)
            .ariaLabel("Підтвердження дії")
            .targetEvent(ev)
            .ok('Так')
            .cancel('Ні');

        return this.$mdDialog.show(confirm)
            .then(() => {
                return this.deleteOrder(order);
            });
    }
    deleteOrder(order:IOrder) {

        order.$delete().then(() => {
            this.$mdToast.showSimple(`Замовлення видалено`);
        }).catch((err) => {
            this.$mdToast.showSimple(err.message);
        }).finally(()=> {
            this.showPage(this.pagingService.currentPage());
        });;
    }

    getOrderTitle(order:IOrder) {
        let format = "dd.MM.yyyy";
        let firstDate = this.$filter('date')(order.event_dates[0], format);
        let lastDate = this.$filter('date')(order.event_dates[order.event_dates.length - 1], format);
        return order.event_name + " " + firstDate + "-" + lastDate;
    }

    prev() {
        this.showPage(this.pagingService.prevPage());
    }

    next() {
        this.showPage(this.pagingService.nextPage());
    }

    private showPage(page = 1) {
        this.orders = this.orderResource.query({page: page, sort: {"answered":1, "date": -1}},
            (res, headers) => {
                let {total, page, perPage} = this.pagingService.parseHeaders(headers);
                this.pagingService.update({page: page, perPage: perPage, total: total});
                this.paging = angular.copy(this.pagingService.params());
            });
    }
}

export let AdminOrdersComponentUrl = '/academy/orders';
export let AdminOrdersComponentName = 'pgAdminOrders';
export let AdminOrdersComponentOptions:ng.IComponentOptions = {
    controller: AdminOrdersController,
    template: template
};