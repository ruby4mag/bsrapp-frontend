import React from 'react';
import {
    Flex,
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Box,
    Container
} from "@chakra-ui/react";
import AdminAddRuleScreen from './AdminAddRuleScreen';
import AdminListRuleScreen from './AdminListRuleScreen';

const AdminScreen = () => {
    return (
        <>
            <Box m="30px">
                <Heading my={"20px"}>Admin Controls</Heading>
                <Flex justifyContent={"left"}>

                </Flex>
                <Tabs p="10px" colorScheme="purple" >
                    <TabList mt="10px">
                        <Tab>Name Enrichment Rules</Tab>
                        <Tab>New Name Enrichment Rule</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <AdminListRuleScreen />
                        </TabPanel>
                        <TabPanel>
                            <AdminAddRuleScreen />
                        </TabPanel>

                    </TabPanels>
                </Tabs>
            </Box>

        </>
    );
};

export default AdminScreen;