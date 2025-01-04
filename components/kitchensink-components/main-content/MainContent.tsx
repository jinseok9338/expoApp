import React from "react";

import HomestayInformationFold from "./HomestayInformationFold";
import MainContentHeader from "./MainContentHeader";
import NewThisWeekFold from "./NewThisWeekFold";
import { Box } from "@/components/ui";

const MainContent = () => {
  return (
    <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
      {/* explore page main content header */}
      <MainContentHeader />
      {/* explore page new this week fold 1 */}
      <NewThisWeekFold />
      {/* explore page homestay info fold 2 */}
      <HomestayInformationFold />
    </Box>
  );
};
export default MainContent;
