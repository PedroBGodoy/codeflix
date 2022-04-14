import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import InvalidUuidError from './errors/invalid-uuid.error';

export default class UniqueEntityId {
  constructor(public readonly value?: string) {
    this.value = value || uuidv4();
    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this.value);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
