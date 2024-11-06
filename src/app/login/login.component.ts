import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  @Output() registerClicked = new EventEmitter<void>();
  @Output() forgotPasswordClicked = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<'employee' | 'manager' | 'admin'>(); // Emit user role on successful login
  message: string = '';

  constructor() {}

  login() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === this.loginData.email && u.password === this.loginData.password);

    if (user) {
      console.log('Login successful', user);
      localStorage.setItem('currentUserRole', user.role); // Store user role in local storage
      this.loginSuccess.emit(user.role); // Emit the user role to the parent component
    } else {
      console.error('Login failed');
      this.message = 'Either email or password is not correct. Please try again.'; // Display error message
    }
  }

  forgotPassword() {
    this.forgotPasswordClicked.emit(); // Notify parent component for forgot password
  }

  onRegisterClick() {
    this.registerClicked.emit(); // Notify parent component to show registration
  }
}
