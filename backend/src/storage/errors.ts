export class ItemNotFoundError extends Error {
  constructor(id: number) {
    super(`Item ${id} not found`);
    this.name = 'ItemNotFoundError';
  }
}

export class AlreadySelectedError extends Error {
  constructor(id: number) {
    super(`Item ${id} is already selected`);
    this.name = 'AlreadySelectedError';
  }
}
