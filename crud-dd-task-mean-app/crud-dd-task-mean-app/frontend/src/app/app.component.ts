import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

// Mock components for router testing
@Component({ selector: 'app-tutorials-list', template: '' })
class MockTutorialsListComponent {}

@Component({ selector: 'app-add-tutorial', template: '' })
class MockAddTutorialComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'tutorials', component: MockTutorialsListComponent },
          { path: 'add', component: MockAddTutorialComponent }
        ])
      ],
      declarations: [
        AppComponent,
        MockTutorialsListComponent,
        MockAddTutorialComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'DD Task'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('DD Task');
  });

  it('should render navigation brand with "DD Task"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const brandElement = compiled.querySelector('.navbar-brand');
    expect(brandElement?.textContent).toContain('DD Task');
  });

  it('should render tutorials navigation link', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const tutorialsLink = compiled.querySelector('a[routerLink="/tutorials"]');
    expect(tutorialsLink).toBeTruthy();
    expect(tutorialsLink?.textContent).toContain('Tutorials');
  });

  it('should render add navigation link', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const addLink = compiled.querySelector('a[routerLink="/add"]');
    expect(addLink).toBeTruthy();
    expect(addLink?.textContent).toContain('Add');
  });

  it('should have router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should have main content container', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.main-content')).toBeTruthy();
    expect(compiled.querySelector('.content-container')).toBeTruthy();
  });

  it('should have app container with correct class', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.app-container')).toBeTruthy();
  });

  it('should have navigation with correct structure', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    const navElement = compiled.querySelector('.app-navbar');
    expect(navElement).toBeTruthy();
    
    const navContainer = compiled.querySelector('.nav-container');
    expect(navContainer).toBeTruthy();
    
    const navItems = compiled.querySelectorAll('.nav-item');
    expect(navItems.length).toBe(2);
  });

  it('should have active route classes on navigation links', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    const tutorialsLink = compiled.querySelector('a[routerLink="/tutorials"]');
    const addLink = compiled.querySelector('a[routerLink="/add"]');
    
    expect(tutorialsLink?.getAttribute('routerLinkActive')).toBe('active');
    expect(addLink?.getAttribute('routerLinkActive')).toBe('active');
  });
});
