import React from "react";
import { Box } from "@/components/ui";

import MainContent from "./main-content/MainContent";
import { ScrollView } from "react-native";

const Explorepage = () => {
  return (
    <>
      <ScrollView className="h-[1px] md:hidden">
        <Box className={`flex`}>
          <MainContent />
        </Box>
      </ScrollView>
    </>
  );
};

export default Explorepage;
