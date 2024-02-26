/* eslint-disable react/prop-types */
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const Item = ({ selected, setSelected, title, path, icon }) => {
  return (
    <MenuItem
      component={<Link to={path} />}
      onClick={() => {
        setSelected(title);
      }}
      to={path}
      icon={icon}
      rootStyles={{
        color: selected === title && "#6870fa",
      }}
    >
      {title}
    </MenuItem>
  );
};

export default Item;
