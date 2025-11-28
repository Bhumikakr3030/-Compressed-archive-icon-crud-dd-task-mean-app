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
    // published remains default (false)
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
      expect(tutorial.published).toBe(false); // Default value
      expect(tutorial.id).toBeUndefined(); // Default value
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
    it('should have correct default values when created empty', () => {
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

    it('should handle partial override correctly', () => {
      const tutorial = new Tutorial({
        id: 'custom-id',
        description: 'Custom Description'
      });

      expect(tutorial.id).toBe('custom-id');
      expect(tutorial.description).toBe('Custom Description');
      expect(tutorial.title).toBe(''); // Default
      expect(tutorial.published).toBe(false); // Default
    });
  });

  describe('Property Types and Optionality', () => {
    it('should have correct property types', () => {
      const tutorial = new Tutorial(mockTutorialData);

      expect(typeof tutorial.id).toBe('string');
      expect(typeof tutorial.title).toBe('string');
      expect(typeof tutorial.description).toBe('string');
      expect(typeof tutorial.published).toBe('boolean');
    });

    it('should handle optional id property correctly', () => {
      const tutorialWithoutId = new Tutorial({
        title: 'No ID Tutorial',
        description: 'Description without ID'
      });

      expect(tutorialWithoutId.id).toBeUndefined();
      
      // Should be able to assign id later
      tutorialWithoutId.id = 'new-id';
      expect(tutorialWithoutId.id).toBe('new-id');
    });

    it('should maintain optional id as undefined when not provided', () => {
      const tutorial = new Tutorial();
      expect(tutorial.id).toBeUndefined();
    });
  });

  describe('Object.assign Behavior', () => {
    it('should use Object.assign for property merging', () => {
      const initialTutorial = new Tutorial({
        title: 'Initial Title',
        published: true
      });

      const updatedData = {
        title: 'Updated Title',
        description: 'New Description'
      };

      const updatedTutorial = new Tutorial(updatedData);
      
      // Should only have the properties from updatedData
      expect(updatedTutorial.title).toBe('Updated Title');
      expect(updatedTutorial.description).toBe('New Description');
      expect(updatedTutorial.published).toBe(false); // Back to default
    });

    it('should not mutate the original data object', () => {
      const originalData = { ...mockTutorialData };
      const tutorial = new Tutorial(originalData);

      // Modify the tutorial instance
      tutorial.title = 'Modified Title';
      tutorial.published = false;

      // Original data should remain unchanged
      expect(originalData.title).toBe(mockTutorialData.title);
      expect(originalData.published).toBe(mockTutorialData.published);
    });
  });

  describe('Null and Undefined Handling', () => {
    it('should handle null data parameter gracefully', () => {
      const tutorial = new Tutorial(null as any);
      expect(tutorial).toBeTruthy();
      expect(tutorial.id).toBeUndefined();
      expect(tutorial.title).toBe('');
      expect(tutorial.description).toBe('');
      expect(tutorial.published).toBe(false);
    });

    it('should handle undefined data parameter gracefully', () => {
      const tutorial = new Tutorial(undefined);
      expect(tutorial).toBeTruthy();
      expect(tutorial.id).toBeUndefined();
      expect(tutorial.title).toBe('');
      expect(tutorial.description).toBe('');
      expect(tutorial.published).toBe(false);
    });

    it('should handle explicit undefined values in data', () => {
      const tutorial = new Tutorial({
        title: undefined as any,
        description: 'Defined Description'
      });

      expect(tutorial.title).toBe(''); // Should use default, not undefined
      expect(tutorial.description).toBe('Defined Description');
    });
  });

  describe('Serialization and JSON Compatibility', () => {
    it('should serialize to JSON correctly', () => {
      const tutorial = new Tutorial(mockTutorialData);
      const jsonString = JSON.stringify(tutorial);
      const parsedTutorial = JSON.parse(jsonString);

      expect(parsedTutorial.id).toBe(mockTutorialData.id);
      expect(parsedTutorial.title).toBe(mockTutorialData.title);
      expect(parsedTutorial.description).toBe(mockTutorialData.description);
      expect(parsedTutorial.published).toBe(mockTutorialData.published);
    });

    it('should deserialize from JSON correctly', () => {
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

    it('should handle missing properties in JSON data', () => {
      const incompleteJsonData = {
        title: 'Incomplete Tutorial'
        // missing description and published
      };

      const tutorial = new Tutorial(incompleteJsonData);
      expect(tutorial.title).toBe('Incomplete Tutorial');
      expect(tutorial.description).toBe(''); // Default
      expect(tutorial.published).toBe(false); // Default
      expect(tutorial.id).toBeUndefined(); // Default
    });
  });

  describe('Edge Cases and Validation', () => {
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

  describe('Integration with Common JavaScript Patterns', () => {
    it('should work with Object.assign for updates', () => {
      const tutorial = new Tutorial(mockTutorialData);
      const updates = { title: 'Updated Title', published: false };
      
      Object.assign(tutorial, updates);
      
      expect(tutorial.title).toBe('Updated Title');
      expect(tutorial.published).toBe(false);
      // Other properties should remain unchanged
      expect(tutorial.id).toBe(mockTutorialData.id);
      expect(tutorial.description).toBe(mockTutorialData.description);
    });

    it('should work with spread operator', () => {
      const tutorial = new Tutorial(mockTutorialData);
      const spreadTutorial = { ...tutorial };

      expect(spreadTutorial.id).toBe(mockTutorialData.id);
      expect(spreadTutorial.title).toBe(mockTutorialData.title);
      expect(spreadTutorial.description).toBe(mockTutorialData.description);
      expect(spreadTutorial.published).toBe(mockTutorialData.published);
    });

    it('should be compatible with array operations', () => {
      const tutorials = [
        new Tutorial({ title: 'Tutorial 1' }),
        new Tutorial({ title: 'Tutorial 2' }),
        new Tutorial({ title: 'Tutorial 3' })
      ];

      const titles = tutorials.map(t => t.title);
      expect(titles).toEqual(['Tutorial 1', 'Tutorial 2', 'Tutorial 3']);
    });
  });

  describe('Instance Methods and Properties', () => {
    it('should allow property modification after creation', () => {
      const tutorial = new Tutorial();
      
      tutorial.title = 'New Title';
      tutorial.description = 'New Description';
      tutorial.published = true;
      tutorial.id = 'modified-id';

      expect(tutorial.title).toBe('New Title');
      expect(tutorial.description).toBe('New Description');
      expect(tutorial.published).toBe(true);
      expect(tutorial.id).toBe('modified-id');
    });

    it('should maintain separate instances', () => {
      const tutorial1 = new Tutorial({ title: 'First' });
      const tutorial2 = new Tutorial({ title: 'Second' });

      tutorial1.title = 'Modified First';

      expect(tutorial1.title).toBe('Modified First');
      expect(tutorial2.title).toBe('Second'); // Should remain unchanged
    });
  });
});
