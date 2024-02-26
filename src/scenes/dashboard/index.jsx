import { Box } from "@mui/material";
import { Header } from "../../components";

function Dashboard() {
  return (
    <Box m="20px">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
    </Box>
  );
}

export default Dashboard;
