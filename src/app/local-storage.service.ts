import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  private readonly storageKey = 'users';  // Key used to store users array in local storage
  private readonly loggedInEmailKey = 'loggedInEmail';  // Key for the logged-in email

  constructor() {}

  // Fetch user data by email
  getUserData(email: string): any {
    const usersData = localStorage.getItem(this.storageKey);
    if (usersData) {
      const users = JSON.parse(usersData);
      const user = users.find((u: { email: string }) => u.email === email);
      if (user) {
        const { password, confirmPassword, ...userWithoutPasswords } = user;  // Remove password fields
        return userWithoutPasswords;
      }
    }
    return null;
  }

  // Save or update a user's registration data
  saveUserData(registerData: any): void {
    const usersData = localStorage.getItem(this.storageKey);
    const users = usersData ? JSON.parse(usersData) : [];
    
    const existingUserIndex = users.findIndex((u: { email: string }) => u.email === registerData.email);
    
    if (existingUserIndex >= 0) {
      users[existingUserIndex] = registerData; // Update existing user data
    } else {
      users.push(registerData); // Add new user data
    }

    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  // Set the logged-in email to local storage
  setLoggedInEmail(email: string): void {
    localStorage.setItem(this.loggedInEmailKey, email);
  }

  // Retrieve the logged-in email
  getLoggedInEmail(): string | null {
    return localStorage.getItem(this.loggedInEmailKey);
  }

  // Clear logged-in email from local storage (e.g., on sign-out)
  clearLoggedInEmail(): void {
    localStorage.removeItem(this.loggedInEmailKey);
  }
}
