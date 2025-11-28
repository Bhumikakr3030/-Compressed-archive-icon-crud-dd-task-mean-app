import { Tutorial } from './tutorial.model';

describe('Tutorial Model', () => {
  // Test data
  const mockTutorialData = {
    id: '1',
    title: 'Test Tutorial',
    description: 'This is a test tutorial description',
    published: true
  };

  const mockPartialTutorialData = {
    title: 'Partial Tutorial',
    description: 'Partial description'
  };

  describe('Basic Instantiation', () => {
    it('should create an instance with no parameters', () => {
      const tutorial = new Tutorial();
      expect(tutorial).toBeTruthy();
      expect(tutorial).toBeInstanceOf(Tutorial);
    });

    it('should create an instance with partial data', () => {
      const tutorial = new Tutorial(mockPartialTutorialData);
      expect(tutorial).toBeTruthy();
      expect(tutorial.title).toBe(mockPartialTutorialData.title);
      expect(tutorial.description).toBe(mockPartialTutorialData.description);
    });

    it('should create an instance with complete data', () => {
      const tutorial = new Tutorial(mockTutorialData);
      expect(tutorial).toBeTruthy();
      expect(tutorial.id).toBe(mockTutorialData.id);
      expect(tutorial.title).toBe(mockTutorialData.title);
      expect(tutorial.description).toBe(mockTutorialData.description);
      expect(tutorial.published).toBe(mockTutorialData.published);
    });
  });

  describe('Property Default Values', () => {
    it('should have default values when created empty', () => {
      const tutorial = new Tutorial();
      
      expect(tutorial.id).toBeUndefined();
      expect(tutorial.title).toBe('');
      expect(tutorial.description).toBe('');
      expect(tutorial.published).toBe(false);
    });

    it('should override default values when provided', () => {
      const tutorial = new Tutorial({
        title: 'Custom Title',
        published: true
      });

      expect(tutorial.title).toBe('Custom Title');
      expect(tutorial.published).toBe(true);
      expect(tutorial.description).toBe(''); // Should remain default
      expect(tutorial.id).toBeUndefined(); // Should remain default
    });
  });

  describe('Property Types', () => {
    it('should have correct property types', () => {
      const tutorial = new Tutorial(mockTutorialData);

      expect(typeof tutorial.id).toBe('string');
      expect(typeof tutorial.title).toBe('string');
      expect(typeof tutorial.description).toBe('string');
      expect(typeof tutorial.published).toBe('boolean');
    });

    it('should handle optional id property', () => {
      const tutorialWithoutId = new Tutorial({
        title: 'No ID Tutorial',
        description: 'Description without ID'
      });

      expect(tutorialWithoutId.id).toBeUndefined();
    });
  });

  describe('Data Integrity', () => {
    it('should not mutate original data object', () => {
      const originalData = { ...mockTutorialData };
      const tutorial = new Tutorial(originalData);

      // Modify the tutorial instance
      tutorial.title = 'Modified Title';

      // Original data should remain unchanged
      expect(originalData.title).toBe(mockTutorialData.title);
    });

    it('should handle null and undefined values gracefully', () => {
      const tutorialWithNull = new Tutorial({
        id: null as any,
        title: null as any,
        description: null as any,
        published: null as any
      });

      // Should fall back to default values or accept null based on your model definition
      expect(tutorialWithNull).toBeTruthy();
    });
  });

  describe('Serialization and Deserialization', () => {
    it('should work with JSON serialization', () => {
      const tutorial = new Tutorial(mockTutorialData);
      const jsonString = JSON.stringify(tutorial);
      const parsedTutorial = JSON.parse(jsonString);

      expect(parsedTutorial.id).toBe(mockTutorialData.id);
      expect(parsedTutorial.title).toBe(mockTutorialData.title);
      expect(parsedTutorial.description).toBe(mockTutorialData.description);
      expect(parsedTutorial.published).toBe(mockTutorialData.published);
    });

    it('should create instance from JSON data', () => {
      const jsonData = {
        id: 'json-1',
        title: 'JSON Tutorial',
        description: 'From JSON data',
        published: false
      };

      const tutorial = new Tutorial(jsonData);
      expect(tutorial.id).toBe(jsonData.id);
      expect(tutorial.title).toBe(jsonData.title);
      expect(tutorial.description).toBe(jsonData.description);
      expect(tutorial.published).toBe(jsonData.published);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty strings', () => {
      const tutorial = new Tutorial({
        title: '',
        description: '',
        published: false
      });

      expect(tutorial.title).toBe('');
      expect(tutorial.description).toBe('');
      expect(tutorial.published).toBe(false);
    });

    it('should handle very long strings', () => {
      const longTitle = 'A'.repeat(1000);
      const longDescription = 'B'.repeat(5000);

      const tutorial = new Tutorial({
        title: longTitle,
        description: longDescription
      });

      expect(tutorial.title).toBe(longTitle);
      expect(tutorial.description).toBe(longDescription);
    });

    it('should handle special characters in strings', () => {
      const specialTutorial = new Tutorial({
        title: 'Tutorial @#$%^&*()',
        description: 'Description with <html> & "quotes"'
      });

      expect(specialTutorial.title).toContain('@#$%^&*()');
      expect(specialTutorial.description).toContain('<html> & "quotes"');
    });
  });

  describe('Method Compatibility', () => {
    it('should work with Object.assign', () => {
      const tutorial = new Tutorial();
      const updated = Object.assign(tutorial, { title: 'Updated Title' });

      expect(updated.title).toBe('Updated Title');
      expect(updated).toBeInstanceOf(Tutorial);
    });

    it('should work with spread operator', () => {
      const tutorial = new Tutorial(mockTutorialData);
      const spreadTutorial = { ...tutorial };

      expect(spreadTutorial.id).toBe(mockTutorialData.id);
      expect(spreadTutorial.title).toBe(mockTutorialData.title);
    });
  });
});
