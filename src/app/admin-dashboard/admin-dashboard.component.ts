import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component'; // Import AppComponent to access the backToLogin method

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  isToggled: boolean = false; // Track the state of the sidebar
  isNavbarCollapsed: boolean = true; // Track the state of the navbar collapse
  activeItem: string = 'dashboard'; // Track the active navbar item (default to 'dashboard')

  constructor(private appComponent: AppComponent) {} // Inject AppComponent

  // Toggle the sidebar's visibility
  toggleSidebar(): void {
    this.isToggled = !this.isToggled; // Toggle the sidebar state
  }

  // Toggle the navbar's collapsed state
  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed; // Toggle the navbar state
  }

  // Set the active item based on the selected navbar or sidebar link
  setActiveItem(item: string): void {
    this.activeItem = item; // Update the active item to the selected one
  }

  // Method to sign out the user
  signOut(): void {
    this.appComponent.backToLogin(); // Call the method from AppComponent to go back to login
  }
}
