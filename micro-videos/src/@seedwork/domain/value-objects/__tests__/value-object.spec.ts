import ValueObject from '../value-object';

class StubValueObject extends ValueObject {}

describe('ValueObject Unit Tests', () => {
  it('should set value', () => {
    const vo = new StubValueObject('string value');
    expect(vo.value).toBe('string value');

    const vo2 = new StubValueObject({ prop1: 'value1' });
    expect(vo2.value).toStrictEqual({ prop1: 'value1' });

    const vo3 = new StubValueObject(Number.MAX_SAFE_INTEGER);
    expect(vo3.value).toBe(Number.MAX_SAFE_INTEGER);
  });

  it('should convert to a string', () => {
    const date = new Date();
    let arrange = [
      { received: '', expected: '' },
      { received: 'fake test', expected: 'fake test' },
      { received: 0, expected: '0' },
      { received: 1, expected: '1' },
      { received: {}, expected: '{}' },
      { received: true, expected: 'true' },
      { received: false, expected: 'false' },
      { received: [] as any, expected: '' },
      { received: date, expected: date.toString() },
      { received: { prop1: 'value1' }, expected: JSON.stringify({ prop1: 'value1' }) },
    ];

    arrange.forEach((value) => {
      const vo = new StubValueObject(value.received);
      expect(`${vo}`).toBe(value.expected);
    });
  });

  it('should be immutable', () => {
    const obj = { prop1: 'a', deep: { prop2: 'value2', prop3: new Date() } };
    const vo = new StubValueObject(obj);

    expect(() => {
      vo.value.prop1 = 'aaaaa';
    }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");

    expect(() => {
      vo.value.deep.prop2 = 'aaaaa';
    }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");

    expect(obj.deep.prop3).toBeInstanceOf(Date);
  });
});
