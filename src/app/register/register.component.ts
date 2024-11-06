import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  step: number = 1; // Tracks the current step of the registration process
  registerData = {
    name: '',
    email: '',
    company: '',
    role: '',
    employees: '',
    industry: '',
    password: '',
    confirmPassword: ''
  };

  @Output() backToLogin = new EventEmitter<void>(); // Event emitter for back to login action

  nextStep() {
    if (this.step === 1) {
      if (this.registerData.name && this.registerData.email && this.registerData.company && this.registerData.role) {
        this.step++;
      } else {
        alert('Please fill all fields in Step 1.');
      }
    } else if (this.step === 2) {
      if (this.registerData.employees && this.registerData.industry) {
        this.step++;
      } else {
        alert('Please fill all fields in Step 2.');
      }
    } else if (this.step === 3) {
      if (this.registerData.password === this.registerData.confirmPassword) {
        if (this.isEmailRegistered(this.registerData.email)) {
          alert('This email is already registered. Please use a different email.');
        } else {
          this.register(); // Save to local storage when the last step is valid
        }
      } else {
        alert('Passwords do not match. Please try again.');
      }
    }
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  register() {
    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Add the new user to the array
    existingUsers.push(this.registerData);

    // Store the updated user array in localStorage
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Registration successful! Your information has been saved.');
    this.goToLogin(); // Automatically navigate to the login page
  }

  isEmailRegistered(email: string): boolean {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    // Check if the email matches any user's email
    return existingUsers.some((user: { email: string }) => user.email === email);
  }

  goToLogin() {
    this.backToLogin.emit(); // Emit the back to login event
  }
}
