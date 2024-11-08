import PropTypes from "prop-types";

const DoubleTickIcon = (props) => {
  const { color } = props;
  return (
    <svg
      fill={color || "#8a9197"}
      width="20px"
      height="20px"
      viewBox="0 0 256 256"
      id="Flat"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M153.65674,89.65686l-87.999,88a8.00062,8.00062,0,0,1-11.31347,0l-44.001-43.99805a7.99983,7.99983,0,0,1,11.3125-11.31445l38.34473,38.3418,82.3418-82.34375a8.00052,8.00052,0,0,1,11.31445,11.31445Zm92-11.31445a8.003,8.003,0,0,0-11.31445,0l-82.3418,82.34375-17.71778-17.71582a7.99983,7.99983,0,0,0-11.3125,11.31445l23.374,23.37207a8.00062,8.00062,0,0,0,11.31347,0l87.999-88A8.00121,8.00121,0,0,0,245.65674,78.34241Z" />
    </svg>
  );
};
export { DoubleTickIcon };

DoubleTickIcon.propTypes = {
  color: PropTypes.string,
};
