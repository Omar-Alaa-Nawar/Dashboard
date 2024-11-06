import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { LocalStorageService } from '../local-storage.service';
import { ResetPasswordComponent } from '../reset-password-home/reset-password-home.component';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule, ResetPasswordComponent],
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent {
  isToggled: boolean = false;
  isNavbarCollapsed: boolean = true;
  activeItem: string = 'home';
  userInfo: any = null;
  message: string | null = null;
  isSettingsDropdownOpen: boolean = false;
  showResetPassword: boolean = false;
  isChangePasswordFlow: boolean = false; // Determine the flow (Forgot or Change password)

  constructor(private appComponent: AppComponent, private localStorageService: LocalStorageService) {
    this.loadUserInfo();
  }

  private loadUserInfo(): void {
    const loggedInEmail = this.localStorageService.getLoggedInEmail();
    if (loggedInEmail) {
      this.userInfo = this.localStorageService.getUserData(loggedInEmail);
      if (!this.userInfo) {
        console.warn("User not found with the logged-in email.");
        this.message = 'User not found.';
      }
    } else {
      console.warn("No logged-in email found in localStorage.");
      this.message = 'No logged-in email found.';
    }
  }

  toggleSidebar(): void {
    this.isToggled = !this.isToggled;
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  setActiveItem(item: string): void {
    this.activeItem = item;
    if (item === 'profile') {
      this.loadUserInfo();
    }
  }

  signOut(): void {
    this.localStorageService.clearLoggedInEmail();
    this.appComponent.backToLogin();
  }

  toggleSettingsDropdown(): void {
    this.isSettingsDropdownOpen = !this.isSettingsDropdownOpen;
  }

  changePassword(): void {
    this.isChangePasswordFlow = true;  // Show ResetPasswordComponent with "Back to Home"
    this.showResetPassword = true; // Set flag to show ResetPasswordComponent
  }

  backToManagerDashboard(): void {
    this.isChangePasswordFlow = false; // Reset flow to change password
    this.showResetPassword = false; // Hide ResetPasswordComponent
  }

  // Handle the event to go back to the manager dashboard from ResetPasswordComponent
  handleBackToHome(): void {
    this.backToManagerDashboard();  // Reset and hide the ResetPasswordComponent
  }
}
