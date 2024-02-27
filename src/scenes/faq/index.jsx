import { Box } from "@mui/material";
import { Header, AccordionItem } from "../../components";
import { mockAccordionData } from "../../data/mockData";

const FAQ = () => {
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />
      {mockAccordionData.map((accordion, index) => (
        <AccordionItem key={index} {...accordion} />
      ))}
    </Box>
  );
};

export default FAQ;
