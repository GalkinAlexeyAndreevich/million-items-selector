export function matchesIdFilter(id: number, filter: string): boolean {
  if (!filter) {
    return true;
  }

  return String(id).includes(filter);
}
