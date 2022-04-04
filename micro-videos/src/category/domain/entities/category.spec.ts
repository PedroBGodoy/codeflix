import { omit } from 'lodash';
import { Category, CategoryProperties } from './category';
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';

describe('Category Unit Tests', () => {
  test('contructor of category', () => {
    let category = new Category({ name: 'Movie' });
    let props = omit(category.props, ['created_at']);
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
});
