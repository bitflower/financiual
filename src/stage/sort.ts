export const sort = (data: any[], sortProp: string) => {
  data.sort((a, b) => (a[sortProp] > b[sortProp] ? 1 : a[sortProp] < b[sortProp] ? -1 : 0));
};
