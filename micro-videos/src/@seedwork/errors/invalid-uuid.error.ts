export default class InvalidUuidError extends Error {
  constructor(message?: string) {
    super(message || 'ID mus be a valid UUID');
    this.name = 'InvalidUuidError';
  }
}
