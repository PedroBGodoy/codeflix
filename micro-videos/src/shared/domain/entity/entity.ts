import UniqueEntityId from '../value-objects/unique-entity-id.vo';

export default abstract class Entity<Props = any> {
  public props: Props;
  public readonly uniqueEntityId: UniqueEntityId;

  constructor(props: Props, id?: UniqueEntityId) {
    this.uniqueEntityId = id || new UniqueEntityId();
    this.props = props;
  }

  get id() {
    return this.uniqueEntityId.value;
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
