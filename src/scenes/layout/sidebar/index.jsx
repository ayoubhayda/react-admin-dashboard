/* eslint-disable react/prop-types */
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  BarChartOutlined,
  CalendarTodayOutlined,
  ContactsOutlined,
  DashboardOutlined,
  HelpOutlineOutlined,
  MapOutlined,
  MenuOutlined,
  PeopleAltOutlined,
  PersonOutlined,
  PieChartOutlineOutlined,
  ReceiptOutlined,
  TimelineOutlined,
} from "@mui/icons-material";
import avatar from "../../../assets/images/avatar.png";
import Item from "./Item";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Sidebar
      backgroundColor={colors.primary[400]}
      rootStyles={{
        border: 0,
        height: "100vh",
      }}
      collapsed={collapsed}
    >
      <Menu
        menuItemStyles={{ button: { ":hover": { background: "transparent" } } }}
      >
        <MenuItem
          rootStyles={{
            margin: "10px 0 20px 0",
            color: colors.gray[100],
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {!collapsed && (
              <Typography variant="h3" fontWeight="400" ml="15px">
                ADMINS
              </Typography>
            )}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>
      {!collapsed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            mb: "25px",
          }}
        >
          <Avatar
            alt="avatar"
            src={avatar}
            sx={{ width: "100px", height: "100px" }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h2" fontWeight="bold" color={colors.gray[100]}>
              Ed Roh
            </Typography>
            <Typography
              variant="h5"
              fontWeight="500"
              color={colors.greenAccent[500]}
            >
              VP Fancy Admin
            </Typography>
          </Box>
        </Box>
      )}

      <Box>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": { background: colors.primary[500] },
            },
          }}
        >
          <Item
            title="Dashboard"
            path="/"
            colors={colors}
            selected={selected}
            setSelected={setSelected}
            icon={<DashboardOutlined />}
          />
        </Menu>
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          Data
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": { background: colors.primary[500] },
            },
          }}
        >
          <Item
            title="Manage Team"
            path="/team"
            colors={colors}
            selected={selected}
            setSelected={setSelected}
            icon={<PeopleAltOutlined />}
          />
          <Item
            title="Contacts Information"
            path="/contacts"
            colors={colors}
            selected={selected}
            setSelected={setSelected}
            icon={<ContactsOutlined />}
          />
          <Item
            title="Invoices Balances"
            path="/invoices"
            colors={colors}
            selected={selected}
            setSelected={setSelected}
            icon={<ReceiptOutlined />}
          />
        </Menu>
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          Pages
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": { background: colors.primary[500] },
            },
          }}
        >
          <Item
            title="Profile Form"
            path="/form"
            colors={colors}
            selected={selected}
            setSelected={setSelected}
            icon={<PersonOutlined />}
          />
          <Item
            title="Calendar"
            path="/calendar"
            colors={colors}
            selected={selected}
            setSelected={setSelected}
            icon={<CalendarTodayOutlined />}
          />
          <Item
            title="FAQ Page"
            path="/faq"
            colors={colors}
            selected={selected}
            setSelected={setSelected}
            icon={<HelpOutlineOutlined />}
          />
        </Menu>
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          Charts
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": { background: colors.primary[500] },
            },
          }}
        >
          <Item
            title="Bar Chart"
            path="/bar"
            colors={colors}
            selected={selected}
            setSelected={setSelected}
            icon={<BarChartOutlined />}
          />
          <Item
            title="Pie Chart"
            path="/pie"
            colors={colors}
            selected={selected}
            setSelected={setSelected}
            icon={<PieChartOutlineOutlined />}
          />
          <Item
            title="Line Chart"
            path="/line"
            colors={colors}
            selected={selected}
            setSelected={setSelected}
            icon={<TimelineOutlined />}
          />
          <Item
            title="Geography Chart"
            path="/geography"
            colors={colors}
            selected={selected}
            setSelected={setSelected}
            icon={<MapOutlined />}
          />
        </Menu>
      </Box>
    </Sidebar>
  );
};

export default SideBar;
