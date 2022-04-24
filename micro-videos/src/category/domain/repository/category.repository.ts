import { RepositoryInterface, SearchableRepositoryInterface } from 'shared/domain/repository/repository-contracts';
import { Category } from '../entities/category';

export default interface CategoryRepository extends SearchableRepositoryInterface<Category, any, any> {}
