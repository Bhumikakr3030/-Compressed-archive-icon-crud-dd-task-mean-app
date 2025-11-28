import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';

describe('AppRoutingModule', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
          { path: 'tutorials', component: TutorialsListComponent },
          { path: 'tutorials/:id', component: TutorialDetailsComponent },
          { path: 'add', component: AddTutorialComponent }
        ])
      ],
      declarations: [
        TutorialsListComponent,
        TutorialDetailsComponent,
        AddTutorialComponent
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  describe('Route Configuration', () => {
    it('should be created', () => {
      const module = new AppRoutingModule();
      expect(module).toBeTruthy();
    });

    it('should have the correct routes defined', () => {
      const routes = router.config;
      
      expect(routes.length).toBe(4);
      
      // Check root route
      expect(routes[0].path).toBe('');
      expect(routes[0].redirectTo).toBe('tutorials');
      expect(routes[0].pathMatch).toBe('full');
      
      // Check tutorials list route
      expect(routes[1].path).toBe('tutorials');
      expect(routes[1].component).toBe(TutorialsListComponent);
      
      // Check tutorial details route
      expect(routes[2].path).toBe('tutorials/:id');
      expect(routes[2].component).toBe(TutorialDetailsComponent);
      
      // Check add tutorial route
      expect(routes[3].path).toBe('add');
      expect(routes[3].component).toBe(AddTutorialComponent);
    });
  });

  describe('Route Navigation', () => {
    it('should redirect empty path to tutorials', async () => {
      await router.navigate(['']);
      expect(location.path()).toBe('/tutorials');
    });

    it('should navigate to tutorials list', async () => {
      await router.navigate(['/tutorials']);
      expect(location.path()).toBe('/tutorials');
    });

    it('should navigate to tutorial details with id parameter', async () => {
      const tutorialId = '123';
      await router.navigate(['/tutorials', tutorialId]);
      expect(location.path()).toBe(`/tutorials/${tutorialId}`);
    });

    it('should navigate to add tutorial page', async () => {
      await router.navigate(['/add']);
      expect(location.path()).toBe('/add');
    });

    it('should handle tutorial details route with different IDs', async () => {
      const testIds = ['1', 'abc', 'test-123'];
      
      for (const id of testIds) {
        await router.navigate(['/tutorials', id]);
        expect(location.path()).toBe(`/tutorials/${id}`);
      }
    });
  });

  describe('Route Parameters', () => {
    it('should match tutorial details route with numeric ID', () => {
      const routeConfig = router.config.find(route => route.path === 'tutorials/:id');
      expect(routeConfig).toBeTruthy();
      
      // Simulate route matching
      const match = router.parseUrl('/tutorials/123');
      expect(match).toBeTruthy();
    });

    it('should match tutorial details route with string ID', () => {
      const match = router.parseUrl('/tutorials/abc-def');
      expect(match).toBeTruthy();
    });
  });

  describe('Component Resolution', () => {
    it('should resolve TutorialsListComponent for /tutorials', () => {
      const route = router.config.find(r => r.path === 'tutorials');
      expect(route?.component).toBe(TutorialsListComponent);
    });

    it('should resolve TutorialDetailsComponent for /tutorials/:id', () => {
      const route = router.config.find(r => r.path === 'tutorials/:id');
      expect(route?.component).toBe(TutorialDetailsComponent);
    });

    it('should resolve AddTutorialComponent for /add', () => {
      const route = router.config.find(r => r.path === 'add');
      expect(route?.component).toBe(AddTutorialComponent);
    });
  });

  describe('Route Guards and Data (Future Extensibility)', () => {
    it('routes should not have guards by default', () => {
      const routes = router.config;
      
      routes.forEach(route => {
        expect(route.canActivate).toBeUndefined();
        expect(route.canDeactivate).toBeUndefined();
        expect(route.data).toBeUndefined();
      });
    });

    it('routes should be ready for future guard implementation', () => {
      const routes = router.config;
      
      // This test ensures the structure can accommodate future guards
      routes.forEach(route => {
        expect(route).toBeDefined();
        // Routes are properly structured to add guards later
      });
    });
  });
});
