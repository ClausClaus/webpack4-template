export const isPlainObject = (val) =>
  !!val && typeof val === 'object' && val.constructor === Object;
