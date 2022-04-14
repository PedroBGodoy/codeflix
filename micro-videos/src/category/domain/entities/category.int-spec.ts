import ValidationError from '../../../shared/domain/errors/validation-erros';
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
      expect(() => new Category({ name: null })).toThrow(new ValidationError(`The name is required`));
      expect(() => new Category({ name: '' })).toThrow(new ValidationError(`The name is required`));
      expect(() => new Category({ name: 'ab' })).toThrow(
        new ValidationError(`The name must be grather or equal than 3 characters`)
      );
      expect(() => new Category({ name: 'a'.repeat(256) })).toThrow(
        new ValidationError(`The name must be less or equal than 255 characters`)
      );
      expect(() => new Category({ name: 5 as any })).toThrow(new ValidationError(`The name must be a string`));
    });

    it('should throw validation error when description is invalid', () => {
      expect(() => new Category({ name: 'Movie', description: 'ab' })).toThrow(
        new ValidationError(`The description must be grather or equal than 3 characters`)
      );
      expect(() => new Category({ name: 'Movie', description: 'a'.repeat(256) })).toThrow(
        new ValidationError(`The description must be less or equal than 255 characters`)
      );
      expect(() => new Category({ name: 'Movie', description: 5 as any })).toThrow(
        new ValidationError(`The description must be a string`)
      );
    });

    it('should throw validation error when is_active is invalid', () => {
      expect(() => new Category({ name: 'Movie', description: 'some description', is_active: 5 as any })).toThrow(
        new ValidationError(`The is_active must be a boolean`)
      );
    });
  });

  describe('Update method', () => {
    it('should throw validation error when updating category with invalid data', () => {
      const category = new Category({ name: 'Movie' });
      expect(() => category.update(null, null)).toThrow(new ValidationError(`The name is required`));
      expect(() => category.update('Movie', 5 as any)).toThrow(new ValidationError(`The description must be a string`));
    });
  });
});
