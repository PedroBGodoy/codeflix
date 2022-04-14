import ValidationError from '../errors/validation-erros';
import ValidatorRules from './validator-rules';

type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  param?: [any];
};

function assertIsInvalid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected);
  }).toThrow(expected.error);
}

function assertIsValid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected);
  }).not.toThrow(expected.error);
}

function runRule(expected: ExpectedRule) {
  const validator = ValidatorRules.values(expected.value, expected.property);
  const method = validator[expected.rule];
  method.apply<ValidatorRules, any, Partial<ValidatorRules>>(validator, expected.param);
}

describe('ValidatorRules Unit Tests', () => {
  test('values method', () => {
    const validator = ValidatorRules.values('some value', 'field');
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator['value']).toBe('some value');
    expect(validator['property']).toBe('field');
  });

  test('required validation rules', () => {
    const error = new ValidationError(`The field is required`);
    const rule = 'required';
    const property = 'field';
    const arrangeInvalid: ExpectedRule[] = [
      { value: null, property, rule, error },
      { value: undefined, property, rule, error },
      { value: '', property, rule, error },
    ];
    for (const assertionData of arrangeInvalid) {
      assertIsInvalid(assertionData);
    }

    const arrangeValid: ExpectedRule[] = [
      { value: 5, property, rule, error },
      { value: 0, property, rule, error },
      { value: 'some value', property, rule, error },
      { value: true, property, rule, error },
      { value: [] as any, property, rule, error },
      { value: {}, property, rule, error },
    ];
    for (const assertionData of arrangeValid) {
      assertIsValid(assertionData);
    }
  });

  test('string validation rules', () => {
    const error = new ValidationError(`The field must be a string`);
    const rule = 'string';
    const property = 'field';
    const arrangeInvalid: ExpectedRule[] = [
      { value: 0, property, rule, error },
      { value: {}, property, rule, error },
      { value: [], property, rule, error },
      { value: true, property, rule, error },
      { value: false, property, rule, error },
    ];
    for (const assertionData of arrangeInvalid) {
      assertIsInvalid(assertionData);
    }

    const arrangeValid: ExpectedRule[] = [
      { value: '', property, rule, error },
      { value: 'some value', property, rule, error },
      { value: null, property, rule, error },
      { value: undefined, property, rule, error },
    ];
    for (const assertionData of arrangeValid) {
      assertIsValid(assertionData);
    }
  });

  test('maxLength validation rules', () => {
    const error = new ValidationError(`The field must be less or equal than 5 characters`);
    const rule = 'maxLength';
    const property = 'field';
    const arrangeInvalid: ExpectedRule[] = [{ value: '123456', property, rule, error, param: [5] }];
    for (const assertionData of arrangeInvalid) {
      assertIsInvalid(assertionData);
    }

    const arrangeValid: ExpectedRule[] = [
      { value: '', property, rule, error, param: [5] },
      { value: '1234', property, rule, error, param: [5] },
      { value: '12345', property, rule, error, param: [5] },
    ];
    for (const assertionData of arrangeValid) {
      assertIsValid(assertionData);
    }
  });

  test('minLength validation rules', () => {
    const error = new ValidationError(`The field must be grather or equal than 3 characters`);
    const rule = 'minLength';
    const property = 'field';
    const arrangeInvalid: ExpectedRule[] = [
      { value: '', property, rule, error, param: [3] },
      { value: '1', property, rule, error, param: [3] },
      { value: '12', property, rule, error, param: [3] },
    ];
    for (const assertionData of arrangeInvalid) {
      assertIsInvalid(assertionData);
    }

    const arrangeValid: ExpectedRule[] = [
      { value: '123', property, rule, error, param: [3] },
      { value: '1234', property, rule, error, param: [3] },
    ];
    for (const assertionData of arrangeValid) {
      assertIsValid(assertionData);
    }
  });

  test('boolean validation rules', () => {
    const property = 'field';
    const rule = 'boolean';
    const error = new ValidationError(`The ${property} must be a boolean`);
    const arrangeInvalid: ExpectedRule[] = [
      { value: 1, property, rule, error },
      { value: 0, property, rule, error },
      { value: 50, property, rule, error },
      { value: '123456', property, rule, error },
      { value: '123456', property, rule, error },
      { value: [], property, rule, error },
      { value: {}, property, rule, error },
    ];
    for (const assertionData of arrangeInvalid) {
      assertIsInvalid(assertionData);
    }

    const arrangeValid: ExpectedRule[] = [
      { value: true, property, rule, error },
      { value: false, property, rule, error },
      { value: null, property, rule, error },
      { value: undefined, property, rule, error },
    ];
    for (const assertionData of arrangeValid) {
      assertIsValid(assertionData);
    }
  });

  it('should throw a validation error when combine two or more valition rules with invalid data', () => {
    const validator = ValidatorRules.values(null, 'field');
    expect(() => validator.required().string()).toThrow(new ValidationError(`The field is required`));

    const validator2 = ValidatorRules.values(5, 'field');
    expect(() => validator2.required().string()).toThrow(new ValidationError(`The field must be a string`));

    const validator3 = ValidatorRules.values('123456', 'field');
    expect(() => validator3.required().string().maxLength(5)).toThrow(
      new ValidationError(`The field must be less or equal than 5 characters`)
    );

    const validator4 = ValidatorRules.values('true', 'field');
    expect(() => validator4.required().boolean()).toThrow(new ValidationError(`The field must be a boolean`));
  });

  it("shouldn't throw a validation error when combine two or more valition rules with valid data", () => {
    const validator2 = ValidatorRules.values('5', 'field');
    expect(() => validator2.required().string()).not.toThrow();

    const validator3 = ValidatorRules.values('12345', 'field');
    expect(() => validator3.required().string().maxLength(5)).not.toThrow();

    const validator4 = ValidatorRules.values(true, 'field');
    expect(() => validator4.required().boolean()).not.toThrow();
  });
});
