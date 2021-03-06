import {adminModule} from "../../../../app/admin/admin.module";
import {
    AdminOrdersComponentName,
    AdminOrdersController
} from "../../../../app/admin/academy/components/orders.component";
import {IOrder, OrderResourceName, IOrderResource} from "../../../../app/resources/order.resource";
import {testData} from "testData";


describe(adminModule.name + " module", () => {
    describe(AdminOrdersComponentName, () => {
        let $componentController:ng.IComponentControllerService,
            component:AdminOrdersController, orderResource:IOrderResource,
            orders:IOrder[];

        beforeEach(() => {
            angular.mock.module(adminModule.name);
        });

        beforeEach(inject(($injector) => {
            $componentController = $injector.get('$componentController');
            orderResource = $injector.get(OrderResourceName);
            orders = testData.Order.map((rawOrder) => {
                return new orderResource(rawOrder);
            });
        }));

        it("getOrderTitle should return name + start date + end date", () => {
            component = $componentController<AdminOrdersController, {orders:IOrder[]}>(AdminOrdersComponentName,
                null,
                {orders: []}
            );
            let title = component.getOrderTitle(orders[0]);
            expect(title).toBe('Геометрія стрижки 16.4.13-16.4.19');
        });
    });
});