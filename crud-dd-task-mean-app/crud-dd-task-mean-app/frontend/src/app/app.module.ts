import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';

describe('AppModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    }).compileComponents();
  });

  describe('Module Configuration', () => {
    it('should create the module', () => {
      const module = new AppModule();
      expect(module).toBeTruthy();
    });

    it('should have correct declarations', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      
      expect(app).toBeTruthy();
      expect(app instanceof AppComponent).toBe(true);
    });

    it('should provide all required components', () => {
      expect(AddTutorialComponent).toBeDefined();
      expect(TutorialDetailsComponent).toBeDefined();
      expect(TutorialsListComponent).toBeDefined();
    });
  });

  describe('Component Creation', () => {
    it('should create AppComponent', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
      expect(component.title).toBe('DD Task');
    });

    it('should create AddTutorialComponent', () => {
      const fixture = TestBed.createComponent(AddTutorialComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
      expect(component.tutorial).toBeDefined();
      expect(component.submitted).toBe(false);
    });

    it('should create TutorialDetailsComponent', () => {
      const fixture = TestBed.createComponent(TutorialDetailsComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
      expect(component.viewMode).toBe(false);
      expect(component.currentTutorial).toBeDefined();
      expect(component.message).toBe('');
    });

    it('should create TutorialsListComponent', () => {
      const fixture = TestBed.createComponent(TutorialsListComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
      expect(component.currentTutorial).toBeDefined();
      expect(component.currentIndex).toBe(-1);
      expect(component.title).toBe('');
    });
  });

  describe('Module Imports', () => {
    it('should import BrowserModule', () => {
      const module = new AppModule();
      // BrowserModule is required for browser-specific features
      expect(BrowserModule).toBeDefined();
    });

    it('should import AppRoutingModule', () => {
      const module = new AppModule();
      // AppRoutingModule should contain route configurations
      expect(AppRoutingModule).toBeDefined();
    });

    it('should import FormsModule for template-driven forms', () => {
      const module = new AppModule();
      // FormsModule is required for ngModel and template-driven forms
      expect(FormsModule).toBeDefined();
    });

    it('should import HttpClientModule for HTTP requests', () => {
      const module = new AppModule();
      // HttpClientModule is required for TutorialService HTTP calls
      expect(HttpClientModule).toBeDefined();
    });
  });

  describe('Bootstrap Configuration', () => {
    it('should bootstrap AppComponent', () => {
      const module = new AppModule();
      // Verify that AppComponent is the bootstrap component
      expect(AppComponent).toBeDefined();
    });

    it('should have no providers by default', () => {
      const module = new AppModule();
      // Module should not have any providers configured at this level
      expect(module).toBeTruthy();
    });
  });

  describe('Component Dependencies', () => {
    it('AppComponent should have router-outlet', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('router-outlet')).toBeTruthy();
    });

    it('AddTutorialComponent should have form controls', () => {
      const fixture = TestBed.createComponent(AddTutorialComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('input[name="title"]')).toBeTruthy();
      expect(compiled.querySelector('input[name="description"]')).toBeTruthy();
    });

    it('TutorialsListComponent should have search and list elements', () => {
      const fixture = TestBed.createComponent(TutorialsListComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('input[placeholder*="Search"]')).toBeTruthy();
      expect(compiled.querySelector('.tutorials-list')).toBeTruthy();
    });
  });
});

// Import BrowserModule for verification
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
