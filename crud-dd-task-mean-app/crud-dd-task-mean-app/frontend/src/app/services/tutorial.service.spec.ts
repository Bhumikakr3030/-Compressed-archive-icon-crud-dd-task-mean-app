import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TutorialService } from './tutorial.service';
import { Tutorial } from '../models/tutorial.model';

describe('TutorialService', () => {
  let service: TutorialService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:8080/api/tutorials';

  const mockTutorial: Tutorial = {
    id: '1',
    title: 'Test Tutorial',
    description: 'Test Description',
    published: false
  };

  const mockTutorials: Tutorial[] = [
    { id: '1', title: 'Tutorial 1', description: 'Desc 1', published: true },
    { id: '2', title: 'Tutorial 2', description: 'Desc 2', published: false },
    { id: '3', title: 'Tutorial 3', description: 'Desc 3', published: true }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TutorialService]
    });
    service = TestBed.inject(TutorialService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return all tutorials', () => {
      service.getAll().subscribe(tutorials => {
        expect(tutorials.length).toBe(3);
        expect(tutorials).toEqual(mockTutorials);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockTutorials);
    });

    it('should handle empty response', () => {
      service.getAll().subscribe(tutorials => {
        expect(tutorials.length).toBe(0);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });
  });

  describe('get', () => {
    it('should return a tutorial by id', () => {
      const tutorialId = '1';

      service.get(tutorialId).subscribe(tutorial => {
        expect(tutorial).toEqual(mockTutorial);
      });

      const req = httpMock.expectOne(`${baseUrl}/${tutorialId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTutorial);
    });

    it('should handle error when tutorial not found', () => {
      const tutorialId = '999';

      service.get(tutorialId).subscribe({
        next: () => fail('should have failed with 404 error'),
        error: (error) => {
          expect(error.status).toBe(404);
        }
      });

      const req = httpMock.expectOne(`${baseUrl}/${tutorialId}`);
      expect(req.request.method).toBe('GET');
      req.flush('Tutorial not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('create', () => {
    it('should create a new tutorial', () => {
      const newTutorial = {
        title: 'New Tutorial',
        description: 'New Description'
      };

      service.create(newTutorial).subscribe(tutorial => {
        expect(tutorial).toEqual(mockTutorial);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newTutorial);
      req.flush(mockTutorial);
    });
  });

  describe('update', () => {
    it('should update an existing tutorial', () => {
      const updatedTutorial = { ...mockTutorial, title: 'Updated Title' };
      const tutorialId = '1';

      service.update(tutorialId, updatedTutorial).subscribe(response => {
        expect(response).toEqual(updatedTutorial);
      });

      const req = httpMock.expectOne(`${baseUrl}/${tutorialId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedTutorial);
      req.flush(updatedTutorial);
    });
  });

  describe('delete', () => {
    it('should delete a tutorial', () => {
      const tutorialId = '1';

      service.delete(tutorialId).subscribe(response => {
        expect(response).toEqual({});
      });

      const req = httpMock.expectOne(`${baseUrl}/${tutorialId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });

  describe('deleteAll', () => {
    it('should delete all tutorials', () => {
      service.deleteAll().subscribe(response => {
        expect(response).toEqual({});
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });

  describe('findByTitle', () => {
    it('should find tutorials by title', () => {
      const searchTitle = 'Test';
      const filteredTutorials = mockTutorials.filter(t => t.title.includes(searchTitle));

      service.findByTitle(searchTitle).subscribe(tutorials => {
        expect(tutorials).toEqual(filteredTutorials);
      });

      const req = httpMock.expectOne(`${baseUrl}?title=${searchTitle}`);
      expect(req.request.method).toBe('GET');
      req.flush(filteredTutorials);
    });

    it('should handle empty search results', () => {
      const searchTitle = 'Nonexistent';

      service.findByTitle(searchTitle).subscribe(tutorials => {
        expect(tutorials.length).toBe(0);
      });

      const req = httpMock.expectOne(`${baseUrl}?title=${searchTitle}`);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });
  });

  describe('error handling', () => {
    it('should handle server error for getAll', () => {
      service.getAll().subscribe({
        next: () => fail('should have failed with 500 error'),
        error: (error) => {
          expect(error.status).toBe(500);
        }
      });

      const req = httpMock.expectOne(baseUrl);
      req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    });
  });
});
