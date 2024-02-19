import {
    List,
    ListItem,
    ListIcon,
    Box,
    useColorModeValue,
} from "@chakra-ui/react";
import { CalendarIcon, EditIcon, AtSignIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <List
            paddingTop={"100px"}
            fontSize="1.2em"
            spacing={4}
            textAlign={"left"}

        >
            <ListItem>
                <NavLink to="/">
                    <ListIcon as={CalendarIcon} />
                    Home
                </NavLink>
            </ListItem>
            <ListItem>
                <NavLink to="/activities">
                    <ListIcon as={AtSignIcon} />
                    Activities
                </NavLink>
            </ListItem>
            <ListItem>
                <NavLink to="/activityrule">
                    <ListIcon as={AtSignIcon} />
                    Rule
                </NavLink>
            </ListItem>
        </List>
    );
}
