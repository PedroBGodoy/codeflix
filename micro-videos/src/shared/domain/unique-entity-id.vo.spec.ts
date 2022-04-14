import InvalidUuidError from './errors/invalid-uuid.error';
import UniqueEntityId from './unique-entity-id.vo';

describe('UniqueEntityId Unit Tests', () => {
  it('should throw error when uuid is invalid', () => {
    expect(() => new UniqueEntityId('invalid-uuid')).toThrow(new InvalidUuidError());
  });
});
