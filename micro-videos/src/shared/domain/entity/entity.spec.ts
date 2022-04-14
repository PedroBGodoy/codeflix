import UniqueEntityId from '../value-objects/unique-entity-id.vo';
import Entity from './entity';

class StubEntity extends Entity<{ prop1: string; prop2: number }> {}

describe('Entity Unit Tests', () => {
  it('should set props and id', () => {
    const arrange = { prop1: 'prop1 value', prop2: 10 };
    const entity = new StubEntity(arrange);
    expect(entity.props).toStrictEqual({ prop1: 'prop1 value', prop2: 10 });
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBeDefined();
  });

  it('should accept a valid uuid', () => {
    const arrange = { prop1: 'prop1 value', prop2: 10 };
    const uniqueEntityId = new UniqueEntityId('6bdeea87-060f-4744-a93a-eddaa5b5ebe8');
    const entity = new StubEntity(arrange, uniqueEntityId);
    expect(entity.props).toStrictEqual({ prop1: 'prop1 value', prop2: 10 });
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe('6bdeea87-060f-4744-a93a-eddaa5b5ebe8');
  });

  it('should convert a entity to a JavaScript Object', () => {
    const arrange = { prop1: 'prop1 value', prop2: 10 };
    const entity = new StubEntity(arrange);
    expect(entity.toJSON()).toStrictEqual({
      id: entity.id,
      ...arrange,
    });
  });
});
