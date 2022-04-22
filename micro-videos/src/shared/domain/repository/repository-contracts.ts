import Entity from '../entity/entity';
import UniqueEntityId from '../value-objects/unique-entity-id.vo';

export interface RepositoryInterface<E extends Entity> {
  insert(entity: Entity): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  update(entity: Entity): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}
