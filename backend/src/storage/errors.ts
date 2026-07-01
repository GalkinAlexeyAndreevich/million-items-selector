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

export class DuplicateItemError extends Error {
  constructor(id: number) {
    super(`Item ${id} already exists`);
    this.name = 'DuplicateItemError';
  }
}

export class InvalidItemIdError extends Error {
  constructor() {
    super('Invalid item id');
    this.name = 'InvalidItemIdError';
  }
}

export class NotSelectedError extends Error {
  constructor(id: number) {
    super(`Item ${id} is not selected`);
    this.name = 'NotSelectedError';
  }
}
