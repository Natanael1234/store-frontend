import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public darkMode = false;

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    this.updateTheme();
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    this.darkMode = savedTheme === 'dark';
    this.updateTheme();
  }

  private updateTheme(): void {
    if (this.darkMode) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}
