// import ValidationError from '../../../shared/domain/errors/validation-erros';
import { Category } from './category';

describe('Category Integration Tests', () => {
  describe('Create method', () => {
    it('should create category with valid data', () => {
      const category = new Category({ name: 'Movie' });
      expect(category.props).toMatchObject({
        name: 'Movie',
        description: null,
        is_active: true,
      });
      expect(category.props.created_at).toBeInstanceOf(Date);
    });

    it('should throw validation error when create with invalid name', () => {
      expect(() => new Category({ name: null })).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });
      expect(() => new Category({ name: '' })).containsErrorMessages({
        name: ['name should not be empty'],
      });
      expect(() => new Category({ name: 'a'.repeat(256) })).containsErrorMessages({
        name: ['name must be shorter than or equal to 255 characters'],
      });
      expect(() => new Category({ name: 5 as any })).containsErrorMessages({
        name: ['name must be a string', 'name must be shorter than or equal to 255 characters'],
      });
    });

    it('should throw validation error when description is invalid', () => {
      expect(() => new Category({ name: 'Movie', description: 5 as any })).containsErrorMessages({
        description: ['description must be a string'],
      });
    });

    it('should throw validation error when is_active is invalid', () => {
      expect(() => new Category({ name: 'Movie', is_active: 5 as any })).containsErrorMessages({
        is_active: ['is_active must be a boolean value'],
      });
    });
  });

  describe('Update method', () => {
    it('should throw validation error when updating category with invalid data', () => {
      const category = new Category({ name: 'Movie' });
      expect(() => category.update(null, null)).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });
      expect(() => category.update('Movie', 5 as any)).containsErrorMessages({
        description: ['description must be a string'],
      });
    });
  });
});
