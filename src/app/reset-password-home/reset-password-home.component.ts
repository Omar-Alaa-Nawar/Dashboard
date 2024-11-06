import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './reset-password-home.component.html',
  styleUrls: ['./reset-password-home.component.css']
})
export class ResetPasswordComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';

  @Input() isChangePasswordFlow: boolean = false; // To determine if it's a change password flow or reset password flow
  @Output() backToDashboard = new EventEmitter<void>(); // Event emitter for navigating back to dashboard
  @Output() backToHome = new EventEmitter<void>(); // Event emitter for back to home action

  constructor() {}

  resetPassword() {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.message = 'Please fill in all fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match.';
      return;
    }

    // Retrieve users from local storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === this.email);

    if (user) {
      user.password = this.password; // Update the user's password
      localStorage.setItem('users', JSON.stringify(users));
      this.message = 'Password reset successful. You can now log in.';
      this.goToDashboard(); // Go to the dashboard after a successful reset
    } else {
      this.message = 'Email not found.';
    }
  }

  // Emit an event to go back to the dashboard
  goToDashboard() {
    this.backToDashboard.emit(); // Trigger the event to go back to the dashboard
  }

  // Emit an event to go back to the home page
  goToHome() {
    this.backToHome.emit(); // Trigger the event to go back to the home
  }
}
