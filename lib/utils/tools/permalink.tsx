export function permalink(id: string) {
  if (!id) {
    return id;
  } /* Lowercase letters, numbers and dash*/
  id = id.replace(/^[^a-zA-Z0-9]/g, '');
  return id.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
}
