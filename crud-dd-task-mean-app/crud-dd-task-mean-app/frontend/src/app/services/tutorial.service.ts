import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TutorialService } from './tutorial.service';
import { Tutorial } from '../models/tutorial.model';

const baseUrl = 'http://localhost:8080/api/tutorials';

describe('TutorialService', () => {
  let service: TutorialService;
  let httpMock: HttpTestingController;

  const mockTutorial: Tutorial = {
    id: '1',
    title: 'Test Tutorial',
    description: 'Test Description',
    published: false
  };

  const mockTutorials: Tutorial[] = [
    { id: '1', title: 'Tutorial 1', description: 'Desc 1', published: true },
    { id: '2', title: 'Tutorial 2', description: 'Desc 2', published: false },
    { id: '3', title: 'Angular Tutorial', description: 'Desc 3', published: true }
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
      // Act
      service.getAll().subscribe(tutorials => {
        // Assert
        expect(tutorials.length).toBe(3);
        expect(tutorials).toEqual(mockTutorials);
      });

      // Assert
      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockTutorials);
    });

    it('should return empty array when no tutorials exist', () => {
      service.getAll().subscribe(tutorials => {
        expect(tutorials).toEqual([]);
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
      req.flush('Tutorial not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('create', () => {
    it('should create a new tutorial', () => {
      const newTutorialData = {
        title: 'New Tutorial',
        description: 'New Description'
      };

      service.create(newTutorialData).subscribe(response => {
        expect(response).toEqual(mockTutorial);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newTutorialData);
      req.flush(mockTutorial);
    });
  });

  describe('update', () => {
    it('should update an existing tutorial', () => {
      const tutorialId = '1';
      const updatedData = { 
        title: 'Updated Tutorial', 
        description: 'Updated Description',
        published: true
      };

      const expectedResponse = { ...mockTutorial, ...updatedData };

      service.update(tutorialId, updatedData).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/${tutorialId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedData);
      req.flush(expectedResponse);
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
      const searchTitle = 'Angular';
      const expectedTutorials = mockTutorials.filter(t => t.title.includes(searchTitle));

      service.findByTitle(searchTitle).subscribe(tutorials => {
        expect(tutorials).toEqual(expectedTutorials);
      });

      const req = httpMock.expectOne(`${baseUrl}?title=${searchTitle}`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedTutorials);
    });

    it('should return empty array when no tutorials match search', () => {
      const searchTitle = 'Nonexistent';

      service.findByTitle(searchTitle).subscribe(tutorials => {
        expect(tutorials).toEqual([]);
      });

      const req = httpMock.expectOne(`${baseUrl}?title=${searchTitle}`);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('should handle search with special characters', () => {
      const searchTitle = 'Test & Tutorial';

      service.findByTitle(searchTitle).subscribe();

      const req = httpMock.expectOne(`${baseUrl}?title=Test%20%26%20Tutorial`);
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

    it('should handle network error', () => {
      service.getAll().subscribe({
        next: () => fail('should have failed with network error'),
        error: (error) => {
          expect(error.error).toBe('Network error');
        }
      });

      const req = httpMock.expectOne(baseUrl);
      req.error(new ErrorEvent('Network error'));
    });
  });
});
