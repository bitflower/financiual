export const fill = (data: any[], sortProp: string, fillProp: string) => {
  // Fill data
  return data.forEach(record => {
    if (!record[sortProp] || record[sortProp] === '') {
      record[sortProp] = record[fillProp];
    }
  });
};
