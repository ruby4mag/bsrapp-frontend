import {
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Container
} from "@chakra-ui/react";

import ActivityRuleNew from './ActivityRuleNew';
import ActivityRuleList from './ActivityRuleList';

export default function ActivityRule() {

  return (
    <div>
      <Container maxW='container.xl' overflowY={"auto"}>
        <Heading my={"40px"}>Activity Rules</Heading>
        <Flex justifyContent={"left"}>

        </Flex>
        <Tabs p="20px" colorScheme="purple">
          <TabList>
            <Tab>All Rules</Tab>
            <Tab>New Rule</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ActivityRuleList />
            </TabPanel>
            <TabPanel>
              <ActivityRuleNew />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>

    </div>
  )


}
