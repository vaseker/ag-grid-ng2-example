import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { AppComponent } from './app.component'

@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS],
  template: `<nav>
    <span>Table type: </span>
    <a [routerLink]="['Table', { type: 'stock' }]">Stock</a>
    <a [routerLink]="['Table', { type: 'oil' }]">Oil</a>
  </nav>
  <router-outlet></router-outlet>`
})

@RouteConfig([
  { path: '/table/:type', name: 'Table',  component: AppComponent }
])

export class App {}
