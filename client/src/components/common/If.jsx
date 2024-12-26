const If = ({ condition, children, fallback = null }) => {
  return condition ? children : fallback;
};

export default If;
