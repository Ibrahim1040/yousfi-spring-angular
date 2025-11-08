import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatDivider,
    MatCardContent,
    MatFormFieldModule,
    MatLabel,
    MatCardActions,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatButton,
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control('')
    });
  }

  login(): void {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    const auth = this.authService.login(username, password);
    if (auth) {
      this.router.navigateByUrl('/admin');
    } else {
      alert('Nom d’utilisateur ou mot de passe incorrect.');
    }
  }

}
