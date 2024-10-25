import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './core/auth/auth.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
import { HomeModule } from './modules/home/home.module';
import { TableModule } from './modules/table/table.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HomeModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
