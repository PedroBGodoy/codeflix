import { deepFreeze } from './object';

describe('Object Unit Tests', () => {
  it('should not freeze a scalar value', () => {
    const str = deepFreeze('a');
    expect(typeof str).toBe('string');

    const boolean = deepFreeze(true);
    expect(typeof boolean).toBe('boolean');

    const number = deepFreeze(1);
    expect(typeof number).toBe('number');
  });

  it('should make object immutable', () => {
    const obj = deepFreeze({ prop1: 'a', deep: { prop2: 'value2', prop3: new Date() } });
    expect(() => {
      (obj as any).prop1 = 'aaaaa';
    }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");

    expect(() => {
      (obj as any).deep.prop2 = 'aaaaa';
    }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");

    expect(obj.deep.prop3).toBeInstanceOf(Date);
  });
});
