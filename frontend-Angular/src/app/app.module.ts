import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

// Tes composants
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AuthGuard} from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    AdminTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // Material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    LoginComponent,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem
  ],
  providers: [
    provideAnimationsAsync(),AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
