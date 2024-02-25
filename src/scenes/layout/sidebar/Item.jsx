/* eslint-disable react/prop-types */
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const Item = ({ selected, setSelected, title, path, icon, colors }) => {
  return (
    <MenuItem
      component={<Link to={path} />}
      onClick={() => {
        setSelected(title);
      }}
      to={path}
      icon={icon}
      rootStyles={{
        backgroundColor:
          selected === title ? colors.primary[500] : "transparent",
        color: colors.gray[100],
      }}
    >
      {title}
    </MenuItem>
  );
};

export default Item;
