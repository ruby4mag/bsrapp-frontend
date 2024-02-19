import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuItem,
    MenuButton,
    MenuList,
    Show,
    Hide
} from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import NavHoverBox from '../components/NavHoverBox'

export default function NavItem({ icon, title, description, active, navSize, target }) {
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <ReactRouterLink
                    as={ReactRouterLink} to={target}
                    backgroundColor={active && "#AEC8CA"}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
                    w={navSize == "large" && "100%"}
                >
                    <MenuButton w="100%" >
                        <MenuItem>
                            <Flex>

                                <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.500"} />
                                <Show above='sm'>
                                    <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                                </Show>
                            </Flex>
                        </MenuItem>
                    </MenuButton>
                </ReactRouterLink>

            </Menu>
        </Flex>
    )
}