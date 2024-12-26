const Switch = ({ value, cases }) => {
  const Case = cases?.[value];
  return Case || null;
};

export default Switch;
