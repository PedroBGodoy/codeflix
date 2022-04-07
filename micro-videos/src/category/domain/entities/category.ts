import ValidatorRules from '../../../@seedwork/validators/validator-rules';
import Entity from '../../../@seedwork/domain/entity/entity';
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';

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
    ValidatorRules.values(props.name, 'name').required().string().minLength(3).maxLength(255);
    ValidatorRules.values(props.description, 'description').string().minLength(3).maxLength(255);
    ValidatorRules.values(props.is_active, 'is_active').boolean();
  }

  public activate() {
    this.props.is_active = true;
  }

  public deactivate() {
    this.props.is_active = false;
  }
}
