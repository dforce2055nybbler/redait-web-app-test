export const formatDataSelect = (data, value, label) => {
  return data.map(d => ({ value: d.node[value], label: d.node[label] }));
};
