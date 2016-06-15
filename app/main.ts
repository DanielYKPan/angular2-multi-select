import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { LocationStrategy,
    PathLocationStrategy } from '@angular/common';
import { provide }           from '@angular/core';
import { AppComponent } from './app.component';
import 'rxjs/Rx';
bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: PathLocationStrategy})]);
