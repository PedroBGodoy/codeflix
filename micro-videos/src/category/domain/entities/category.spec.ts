import { omit } from 'lodash';
import { Category, CategoryProperties } from './category';
import UniqueEntityId from '../../../shared/domain/value-objects/unique-entity-id.vo';

describe('Category Unit Tests', () => {
  test('contructor of category', () => {
    Category.validate = jest.fn();
    let category = new Category({ name: 'Movie' });
    let props = omit(category.props, ['created_at']);
    expect(Category.validate).toHaveBeenCalled();
    expect(props).toStrictEqual({
      name: 'Movie',
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at,
    });
    expect(category.props).toStrictEqual({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at,
    });

    category = new Category({
      name: 'Movie',
      description: 'other description',
    });
    expect(category.props).toMatchObject({
      name: 'Movie',
      description: 'other description',
    });

    category = new Category({
      name: 'Movie',
      is_active: true,
    });
    expect(category.props).toMatchObject({
      name: 'Movie',
      is_active: true,
    });

    category = new Category({
      name: 'Movie',
      created_at,
    });
    expect(category.props).toMatchObject({
      name: 'Movie',
      created_at,
    });
  });

  test('id field', () => {
    type CategoryData = { props: CategoryProperties; id?: UniqueEntityId };
    const data: CategoryData[] = [
      { props: { name: 'Movie' } },
      { props: { name: 'Movie' }, id: null },
      { props: { name: 'Movie' }, id: undefined },
      { props: { name: 'Movie' }, id: new UniqueEntityId() },
      { props: { name: 'Movie' }, id: new UniqueEntityId('6bdeea87-060f-4744-a93a-eddaa5b5ebe8') },
    ];

    data.forEach((i) => {
      const category = new Category(i.props, i.id);
      expect(category.uniqueEntityId).not.toBeNull();
      expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
  });

  it('should update a category', () => {
    let category = new Category({ name: 'Movie' });
    category.update('Movie 2', 'some description');
    expect(Category.validate).toHaveBeenCalledTimes(2);
    expect(category).toMatchObject({
      name: 'Movie 2',
      description: 'some description',
    });

    category = new Category({ name: 'Movie' });
    category.update('Movie 2', null);
    expect(category).toMatchObject({
      name: 'Movie 2',
      description: null,
    });
  });

  test('should activate categoty', () => {
    const category = new Category({ name: 'Movie', is_active: false });
    category.activate();
    expect(category.is_active).toBe(true);
  });

  test('should deactivate categoty', () => {
    const category = new Category({ name: 'Movie', is_active: true });
    category.deactivate();
    expect(category.is_active).toBe(false);
  });
});
