import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  isToggled: boolean = false; // Sidebar state
  isNavbarCollapsed: boolean = true; // Navbar collapse state
  activeItem: string = 'home'; // Active navigation item
  isSettingsDropdownOpen: boolean = false; // Track the state of settings dropdown

  constructor(private appComponent: AppComponent) {}

  // Toggle the sidebar visibility
  toggleSidebar(): void {
    this.isToggled = !this.isToggled;
  }

  // Toggle navbar collapse state
  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  // Update the active navigation item
  setActiveItem(item: string): void {
    this.activeItem = item;
  }

  // Toggle the settings dropdown visibility
  toggleSettingsDropdown(): void {
    this.isSettingsDropdownOpen = !this.isSettingsDropdownOpen;
  }

  // Sign out and navigate back to the login screen
  signOut(): void {
    this.appComponent.backToLogin();
  }
}
