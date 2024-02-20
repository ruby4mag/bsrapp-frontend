import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ActivityRuleDetail from './ActivityRuleDetail'
import { toast } from 'react-toastify'
import { Utils as QbUtils, Query, Builder, BasicConfig } from '@react-awesome-query-builder/ui';
import {
    Table,
    Thead,
    Tbody,
    Grid,
    GridItem,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box
} from '@chakra-ui/react'
const ActivityRuleList = () => {
    const [rules, setRules] = useState([])
    const [rulename, setRulename] = useState([])
    const [rulerule, setRulerule] = useState({ id: QbUtils.uuid(), type: "group" })
    const [show, setShow] = useState(false)
    const [setq, setSetp] = useState("")
    const [setv, setSetv] = useState("")
    const [rid, setRid] = useState("")


    const showRule = (name, rule, setp, setv, rid) => {
        console.log("name is " + name)
        //setShowrule({ "id": "aa888889-0123-4456-b89a-b18d4456b3f9", "type": "group", "children1": [{ "type": "rule", "id": "a8aa9b89-cdef-4012-b456-718d44673f3a", "properties": { "fieldSrc": "field", "field": "price", "operator": "equal", "value": [18], "valueSrc": ["value"], "valueType": ["number"] } }, { "type": "rule", "id": "bab9bbba-89ab-4cde-b012-318d44675b9b", "properties": { "fieldSrc": "field", "field": "color", "operator": "select_equals", "value": ["blue"], "valueSrc": ["value"], "valueType": ["select"] } }] })
        setRulename(name)
        setRulerule(JSON.parse(rule))
        setShow(true)
        setSetp(setp)
        setSetv(setv)
        setRid(rid)
    }


    useEffect(() => {
        axios.get(`https://doapi.bsrsport.org/api/rules`, {
            withCredentials: true
        })
            .then(async function (response) {
                console.log(response.data)
                setRules(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])


    return (
        <div>
            <Box >
                <Grid templateColumns="repeat(8, 1fr)">
                    {/* sidebar */}
                    <GridItem
                        colSpan={{ base: 4, lg: 2, xl: 2 }}
                        minHeight={{ lg: "100vh" }}
                        pt={{ base: "20px", lg: "30px", xl: "30px" }}
                    >
                        <TableContainer px="40px">
                            <Table variant='simple'>

                                <Thead>
                                    <Tr>
                                        <Th>Name</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {rules?.map(rule => (
                                        <Tr key={rule._id} onClick={(e) => showRule(rule.name, rule.rule, rule.setParam, rule.setValue, rule._id)}>
                                            <Td className='border p-2'> {rule.name} </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </GridItem>
                    <GridItem colSpan={{ base: 8, lg: 6, xl: 6 }}>
                        <ActivityRuleDetail ruleq={rulerule} nameq={rulename} show={show} setpq={setq} setpv={setv} ruleid={rid} />
                    </GridItem>
                </Grid>
            </Box>
        </div>


    );
};

export default ActivityRuleList;