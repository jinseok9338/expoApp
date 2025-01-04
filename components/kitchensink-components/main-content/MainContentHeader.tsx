import React from "react";

import { Box, Heading, HStack } from "@/components/ui";

const MainContentHeader = () => {
  return (
    <Box className="pt-6 pb-2.5 px-4 md:px-0">
      <HStack className="w-full items-center justify-between">
        <Heading size="xl">New this week</Heading>
      </HStack>
    </Box>
  );
};

export default MainContentHeader;
