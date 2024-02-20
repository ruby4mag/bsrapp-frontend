import React, { Component, useState } from 'react';
import axios from 'axios';
import {
    Flex,
    Input,
    Button,
    useColorModeValue,
    Box,
    Center,
    useToast,
    Divider,
    Select,
    Link as ChakraLink
} from "@chakra-ui/react";
import { Utils as QbUtils, Query, Builder, BasicConfig } from '@react-awesome-query-builder/ui';
import '@react-awesome-query-builder/ui/css/compact_styles.css';
const InitialConfig = BasicConfig;
const config = {
    ...InitialConfig,
    fields: {
        distance: {
            label: "Distance",
            type: "number",
            fieldSettings: {
                min: 0
            },
            valueSources: ["value"],
            preferWidgets: ["number"]
        },
        moving_time: {
            label: "Moving Time",
            type: "number",
            fieldSettings: {
                min: 0
            },
            valueSources: ["value"],
            preferWidgets: ["number"]
        },
        elapsed_time: {
            label: "Elapsed Time",
            type: "number",
            fieldSettings: {
                min: 0
            },
            valueSources: ["value"],
            preferWidgets: ["number"]
        },
        total_elevation_gain: {
            label: "Total Elevation Gain",
            type: "number",
            fieldSettings: {
                min: 0
            },
            valueSources: ["value"],
            preferWidgets: ["number"]
        },
        average_cadence: {
            label: "Average Cadence",
            type: "number",
            fieldSettings: {
                min: 0
            },
            valueSources: ["value"],
            preferWidgets: ["number"]
        },
        average_watts: {
            label: "Average Watts",
            type: "number",
            fieldSettings: {
                min: 0
            },
            valueSources: ["value"],
            preferWidgets: ["number"]
        },
        weighted_average_watts: {
            label: "Weighted Average Watts",
            type: "number",
            fieldSettings: {
                min: 0
            },
            valueSources: ["value"],
            preferWidgets: ["number"]
        },
        max_watts: {
            label: "Max Watts",
            type: "number",
            fieldSettings: {
                min: 0
            },
            valueSources: ["value"],
            preferWidgets: ["number"]
        },
        elev_high: {
            label: "Highest Elevation",
            type: "number",
            fieldSettings: {
                min: 0
            },
            valueSources: ["value"],
            preferWidgets: ["number"]
        },
        elev_low: {
            label: "Lowest Elevation",
            type: "number",
            fieldSettings: {
                min: 0
            },
            valueSources: ["value"],
            preferWidgets: ["number"]
        },
        description: {
            label: "Description",
            type: "text",
            fieldSettings: {
                min: 0
            },
            valueSources: ["value"],
            preferWidgets: ["number"]
        },
        calories: {
            label: "Total calories",
            type: "number",
            fieldSettings: {
                min: 0
            },
            valueSources: ["value"],
            preferWidgets: ["number"]
        },
        device_name: {
            label: "Device Name",
            type: "text",
            valueSources: ["value"],
        },
        gear_id: {
            label: "Gear ID",
            type: "number",
            fieldSettings: {
                min: 0
            },
            valueSources: ["value"],
            preferWidgets: ["number"]
        },
        name: {
            label: 'Name',
            type: 'text',
        },
        color: {
            label: "Color",
            type: "select",
            valueSources: ["value"],
            fieldSettings: {
                listValues: [
                    { value: "yellow", title: "Yellow" },
                    { value: "green", title: "Green" },
                    { value: "orange", title: "Orange" }
                ]
            }
        }
    }
};


const queryValue = { id: QbUtils.uuid(), type: "group" }



class ActivityRuleNew extends Component {

    handleAddition = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(this.state.rule))

        const testtree = QbUtils.loadTree(this.state.rule)
        const { logic } = QbUtils.jsonLogicFormat(testtree, config);

        console.log("Logic is " + JSON.stringify(logic))

        axios.post('https://doapi.bsrsport.org/api/rules', {
            name: this.state.name,
            setParam: this.state.configparam,
            setValue: this.state.configvalue,
            rule: JSON.stringify(this.state.rule)
        },
            { withCredentials: true })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    state = {
        tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
        config: config,
        name: "",
        configparam: "",
        configvalue: "",
        rule: ""
    };

    render() {
        return (
            <div>
                <Input
                    placeholder="name"
                    type="text"
                    variant="filled"
                    required={true}
                    mb={3}
                    value={this.name}
                    onChange={e => this.setState({ name: e.target.value })}
                />
                <Query
                    {...config}
                    value={this.state.tree}
                    onChange={this.onChange}
                    renderBuilder={this.renderBuilder}
                />

                <Select placeholder='Select an action'
                    value={this.configparam}
                    onChange={e => this.setState({ configparam: e.target.value })}
                >
                    <option value='setTitle'>Set Title</option>
                    <option value='setDesc'>Set Description</option>
                    <option value='muteAct'>Mute Activity</option>
                    <option value='delAct'>Delete Activity</option>
                </Select>
                {(this.configparam == "muteAct" || this.configparam == "delAct") ? '' :
                    <Input
                        placeholder="Value"
                        type="text"
                        variant="filled"
                        required={true}
                        mb={3}
                        value={this.configvalue}
                        onChange={e => this.setState({ configvalue: e.target.value })}
                    />
                }

                <Button onClick={this.handleAddition}>Add</Button>

            </div>
        )
    }

    renderBuilder = (props) => (
        <div className="query-builder-container" style={{ padding: '10px' }}>
            <div className="query-builder">
                <Builder {...props} />
            </div>
        </div>
    )

    renderResult = ({ tree: immutableTree, config }) => (
        <div className="query-builder-result">
            <div>Query string: <pre>{JSON.stringify(QbUtils.queryString(immutableTree, config))}</pre></div>
            <div>MongoDb query: <pre>{JSON.stringify(QbUtils.mongodbFormat(immutableTree, config))}</pre></div>
            <div>SQL where: <pre>{JSON.stringify(QbUtils.sqlFormat(immutableTree, config))}</pre></div>
            <div>JsonLogic: <pre>{JSON.stringify(QbUtils.jsonLogicFormat(immutableTree, config))}</pre></div>
        </div>
    )

    onChange = (immutableTree, config) => {
        // Tip: for better performance you can apply `throttle` - see `examples/demo`
        this.setState({ tree: immutableTree, config: config });

        const jsonTree = QbUtils.getTree(immutableTree);
        console.log(jsonTree);

        this.setState({ rule: jsonTree })
        //this.setState({ rule: QbUtils.jsonLogicFormat(immutableTree, config) })
        // `jsonTree` can be saved to backend, and later loaded to `queryValue`
    }
}
export default ActivityRuleNew;