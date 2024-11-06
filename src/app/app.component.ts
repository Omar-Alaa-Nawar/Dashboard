import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, LoginComponent, RegisterComponent, ResetPasswordComponent, EmployeeDashboardComponent, AdminDashboardComponent, ManagerDashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hrms-dashboard';
  currentView: 'login' | 'register' | 'resetPassword' | 'main' = 'login'; // Include 'main' as a possible value
  currentRole: 'employee' | 'manager' | 'admin' | null = null; // Track current user role

  // Method to show the login view
  showLogin() {
    this.currentView = 'login';
  }

  // Method to show the registration view
  registerClicked() {
    this.currentView = 'register';
  }

  // Method to show the reset password view
  forgotPassword() {
    this.currentView = 'resetPassword';
  }

  // Method to go back to the login view
  backToLogin() {
    this.currentView = 'login';
    this.currentRole = null; // Reset role on logout or back to login
  }

  // Handle successful login
  onLoginSuccess(role: 'employee' | 'manager' | 'admin') {
    this.currentRole = role; // Set the user role
    localStorage.setItem('role', role); // Store role in local storage for persistence
    this.currentView = 'main'; // Switch to main view upon successful login
  }

  // Dynamically load the correct dashboard based on role
  getCurrentDashboardComponent() {
    if (this.currentRole === 'employee') {
      return EmployeeDashboardComponent;
    } else if (this.currentRole === 'manager') {
      return ManagerDashboardComponent;
    } else if (this.currentRole === 'admin') {
      return AdminDashboardComponent;
    } else {
      return null;
    }
  }

  // Handle "Back to Home" action from ResetPasswordComponent
  handleBackToHome() {
    this.currentView = 'main'; // Switch to main view
    this.redirectToDashboard(); // Redirect to dashboard based on user role
  }

  // Role-based redirection after password reset or other actions
  redirectToDashboard() {
    const role = localStorage.getItem('role');
    if (role === 'employee') {
      this.currentRole = 'employee';
      this.currentView = 'main';
    } else if (role === 'manager') {
      this.currentRole = 'manager';
      this.currentView = 'main';
    } else if (role === 'admin') {
      this.currentRole = 'admin';
      this.currentView = 'main';
    } else {
      this.currentView = 'login'; // Redirect to login if no role found
    }
  }
}
