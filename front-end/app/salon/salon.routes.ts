/**
 * Created by Galyna on 25.08.2016.
 */

import {SalonHomeComponentUrl} from "./components/salon.home.component";
import {IConstants} from "../core/core.config";
import {MasterComponentUrl} from "./components/salon.master.component";
import {ProductsComponentUrl} from "./components/products.component";
import {SalonContactsComponentUrl} from "./components/salon.contacts.component";
import {SalonTransformsComponentUrl} from "./components/salon.transforms.component";
import {FavorComponentUrl} from "./components/favor.component";
import {MastersComponentUrl} from "./components/masters.component";
import {FavorsMastersComponentUrl} from "./components/favors.masters.component";


salonRoutes.$inject = ['$routeProvider', 'constants'];
export function salonRoutes($routeProvider:ng.route.IRouteProvider, constants:IConstants) {
    if (constants.showSalon) {
        $routeProvider
            .when( SalonHomeComponentUrl, {
                template: '<pg-salon-home></pg-salon-home>',
            } )
            .when( FavorsMastersComponentUrl, {
                template: '<pg-favors-masters></pg-favors-masters>',
            } )
            .when( FavorComponentUrl, {
                template: '<pg-favor></pg-favor>',
            } )
            .when( MasterComponentUrl, {
                template: '<pg-master></pg-master>',
            } )
            .when( MastersComponentUrl, {
                template: '<pg-masters></pg-masters>',
            } )
            .when( ProductsComponentUrl, {
                template: '<pg-products></pg-products>',
            } )
            .when( SalonContactsComponentUrl, {
                template: '<pg-salon-contacts></pg-salon-contacts>',
            } )
            .when( SalonTransformsComponentUrl, {
                template: '<pg-salon-transforms></pg-salon-transforms>',
            } )
        ;
    }

}