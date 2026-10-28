// Склейка CSS-классов с пропуском пустых значений
export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');
