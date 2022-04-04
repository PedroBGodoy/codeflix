import InvalidUuidError from '../../../errors/invalid-uuid.error';
import UniqueEntityId from '../unique-entity-id.vo';
import { validate as uuidValidate } from 'uuid';

describe('UniqueEntityId Unit Tests', () => {
  it('should throw error when uuid is invalid', () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    expect(() => new UniqueEntityId('invalid-uuid')).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should accept a uuid passed in constructor', () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    const uuid = '6bdeea87-060f-4744-a93a-eddaa5b5ebe8';
    const uniqueEntityId = new UniqueEntityId(uuid);
    expect(uniqueEntityId.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it('should generate uuid when empty constructor', () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    const uniqueEntityId = new UniqueEntityId();
    expect(uuidValidate(uniqueEntityId.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
