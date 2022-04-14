import { EntityValidationError } from '../../../shared/domain/errors/validation-erros';
import Entity from '../../../shared/domain/entity/entity';
import UniqueEntityId from '../../../shared/domain/value-objects/unique-entity-id.vo';
import CategoryValidatorFactory from '../validators/category.validator';

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class Category extends Entity<CategoryProperties> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get is_active() {
    return this.props.is_active;
  }

  get created_at() {
    return this.props.created_at;
  }

  constructor(props: CategoryProperties, id?: UniqueEntityId) {
    super(props, id);
    Category.validate({ name: props.name, description: props.description, is_active: props.is_active });
    this.props.description = this.props.description ?? null;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  public update(name: string, description: string) {
    Category.validate({ name, description });
    this.props.name = name ?? this.props.name;
    this.props.description = description ?? this.props.description;
  }

  static validate(props: Omit<CategoryProperties, 'created_at'>) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public activate() {
    this.props.is_active = true;
  }

  public deactivate() {
    this.props.is_active = false;
  }
}
