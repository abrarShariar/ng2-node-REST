import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {Ng2PaginationModule} from 'ng2-pagination'; 


//components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AllVideoComponent } from './components/all-video/all-video.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';
import { SettingsComponent } from './components/settings/settings.component';


@NgModule({
  declarations: [
  AppComponent,
  NavbarComponent,
  HomeComponent,
  SidebarComponent,
  AllVideoComponent,
  VideoDetailComponent,
  SettingsComponent
  ],
  imports: [
  BrowserModule,
  FormsModule,
  HttpModule,
  Ng2PaginationModule,
  RouterModule.forRoot([
  {
    path: 'admin/home',
    component: HomeComponent
  },
  {
    path: 'admin/all-video',
    component: AllVideoComponent
  },
  {
    path: 'admin/video/details/:id',
    component: VideoDetailComponent
  },
  {
    path: 'admin/video/settings',
    component: SettingsComponent
  },
  {
    path: '',
    redirectTo: 'admin/home',
    pathMatch: 'full'
  }
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
