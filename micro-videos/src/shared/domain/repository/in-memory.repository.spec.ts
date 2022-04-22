import Entity from '../entity/entity';
import NotFoundError from '../errors/not-found.error';
import UniqueEntityId from '../value-objects/unique-entity-id.vo';
import InMemoryRepository from './in-memory.repository';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMeMoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository Unit Tests', () => {
  let repository: StubInMeMoryRepository;

  beforeEach(() => {
    repository = new StubInMeMoryRepository();
  });

  it('it should insert a new entity', async () => {
    const entity = new StubEntity({ name: 'test', price: 1 });
    await repository.insert(entity);
    expect(repository.items).toHaveLength(1);
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it('it should throw error when entity not found', async () => {
    expect(() => repository.findById('invalid-id')).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID invalid-id')
    );
    expect(() => repository.findById(new UniqueEntityId('cf8d322c-e3c4-4a81-b5f1-7c53f8bc16f5'))).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID cf8d322c-e3c4-4a81-b5f1-7c53f8bc16f5')
    );
  });

  it('should find entity by id', async () => {
    const entity = new StubEntity({ name: 'test', price: 1 });
    await repository.insert(entity);
    const foundEntity = await repository.findById(entity.id);
    expect(foundEntity.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should find all entities', async () => {
    const entity1 = new StubEntity({ name: 'test1', price: 1 });
    const entity2 = new StubEntity({ name: 'test2', price: 2 });
    await repository.insert(entity1);
    await repository.insert(entity2);
    const foundEntities = await repository.findAll();
    expect(foundEntities.length).toBe(2);
    expect(foundEntities[0].toJSON()).toStrictEqual(entity1.toJSON());
    expect(foundEntities[1].toJSON()).toStrictEqual(entity2.toJSON());
  });

  it('should throw error on update when entity not found', async () => {
    const entity = new StubEntity({ name: 'test', price: 1 });
    expect(() => repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${entity.id}`)
    );
  });

  it('should update entity', async () => {
    const entity = new StubEntity({ name: 'test', price: 1 });
    await repository.insert(entity);

    const updatedEntity = new StubEntity({ name: 'test2', price: 2 }, entity.uniqueEntityId);
    await repository.update(updatedEntity);
    expect(repository.items).toHaveLength(1);
    expect(updatedEntity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it('should throw error on delete when entity not found', async () => {
    expect(() => repository.delete('invalid-id')).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID invalid-id`)
    );
  });

  it('should delete entity', async () => {
    const entity = new StubEntity({ name: 'test', price: 1 });
    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);
  });
});
