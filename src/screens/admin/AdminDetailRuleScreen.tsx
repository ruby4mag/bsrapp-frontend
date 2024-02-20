import React, { useState, useCallback, useEffect } from "react";
import {
  Flex,
  Input,
  Button,
  useColorModeValue,
  Box,
  Center,
  Select,
  Text,
  useToast,
  Divider,
  Link as ChakraLink,
  FormLabel,
} from "@chakra-ui/react";
// >>>
import type {
  JsonGroup,
  Config,
  ImmutableTree,
  BuilderProps,
} from "@react-awesome-query-builder/ui";
import {
  Utils as QbUtils,
  Query,
  Builder,
  BasicConfig,
} from "@react-awesome-query-builder/ui";
import "@react-awesome-query-builder/ui/css/styles.css";
import "../../styles/queryBuilder.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const InitialConfig = BasicConfig;

const config: Config = {
  ...InitialConfig,
  fields: {
    distance: {
      label: "Distance",
      type: "number",
      fieldSettings: {
        min: 0,
      },
      valueSources: ["value"],
      preferWidgets: ["number"],
    },
    moving_time: {
      label: "Moving Time",
      type: "number",
      fieldSettings: {
        min: 0,
      },
      valueSources: ["value"],
      preferWidgets: ["number"],
    },
    elapsed_time: {
      label: "Elapsed Time",
      type: "number",
      fieldSettings: {
        min: 0,
      },
      valueSources: ["value"],
      preferWidgets: ["number"],
    },
    total_elevation_gain: {
      label: "Total Elevation Gain",
      type: "number",
      fieldSettings: {
        min: 0,
      },
      valueSources: ["value"],
      preferWidgets: ["number"],
    },
    average_cadence: {
      label: "Average Cadence",
      type: "number",
      fieldSettings: {
        min: 0,
      },
      valueSources: ["value"],
      preferWidgets: ["number"],
    },
    average_watts: {
      label: "Average Watts",
      type: "number",
      fieldSettings: {
        min: 0,
      },
      valueSources: ["value"],
      preferWidgets: ["number"],
    },
    weighted_average_watts: {
      label: "Weighted Average Watts",
      type: "number",
      fieldSettings: {
        min: 0,
      },
      valueSources: ["value"],
      preferWidgets: ["number"],
    },
    max_watts: {
      label: "Max Watts",
      type: "number",
      fieldSettings: {
        min: 0,
      },
      valueSources: ["value"],
      preferWidgets: ["number"],
    },
    elev_high: {
      label: "Highest Elevation",
      type: "number",
      fieldSettings: {
        min: 0,
      },
      valueSources: ["value"],
      preferWidgets: ["number"],
    },
    elev_low: {
      label: "Lowest Elevation",
      type: "number",
      fieldSettings: {
        min: 0,
      },
      valueSources: ["value"],
      preferWidgets: ["number"],
    },
    description: {
      label: "Description",
      type: "text",
      fieldSettings: {
        min: 0,
      },
      valueSources: ["value"],
      preferWidgets: ["number"],
    },
    calories: {
      label: "Total calories",
      type: "number",
      fieldSettings: {
        min: 0,
      },
      valueSources: ["value"],
      preferWidgets: ["number"],
    },
    average_speed: {
      label: "Average Speed",
      type: "number",
      fieldSettings: {
        min: 0,
      },
      valueSources: ["value"],
      preferWidgets: ["number"],
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
        min: 0,
      },
      valueSources: ["value"],
      preferWidgets: ["number"],
    },
    name: {
      label: "Name",
      type: "text",
    },
    type: {
      label: "Type",
      type: "text",
    },
  },
};

// You can load query value from your backend storage (for saving see `Query.onChange()`)
//const queryValue: JsonGroup = { id: QbUtils.uuid(), type: "group" };

const AdminDetailRuleScreen = ({
  ruleq,
  nameq,
  show,
  setpq,
  setpv,
  ruleid,
}) => {
  const queryValue: JsonGroup = { id: QbUtils.uuid(), type: "group" };
  const navigate = useNavigate();
  console.log("Name is " + nameq);
  console.log("setP is " + setpq);
  console.log("setV is " + setpv);
  //console.log("RULE is " + JSON.stringify(rule))

  useEffect(() => {
    setState({
      tree: QbUtils.checkTree(QbUtils.loadTree(ruleq), config),
      config: config,
    });
    setName(nameq);
    setSetp(setpq);
    setSetv(setpv);
    setRid(ruleid);
    //setRule(ruleq)
    console.log("Latest RULEQ " + ruleq);
  }, [ruleid]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://doapi.bsrsport.org/api/admin/rules/${ruleid}`,
        {
          name: name,
          setParam: setp,
          setValue: setv,
          rule: JSON.stringify(rule),
        },
        { withCredentials: true }
      )
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        navigate("/admin");
      });
  };

  const [rule, setRule] = useState("");
  const [name, setName] = useState(nameq);
  const [setp, setSetp] = useState(setpq);
  const [setv, setSetv] = useState(setpv);
  const [rid, setRid] = useState(ruleid);
  //setRule({ id: QbUtils.uuid(), type: "group" })

  const [state, setState] = useState({
    tree: QbUtils.checkTree(
      QbUtils.loadTree({ id: QbUtils.uuid(), type: "group" }),
      config
    ),
    config: config,
  });

  const onChange = useCallback(
    (immutableTree: ImmutableTree, config: Config) => {
      // Tip: for better performance you can apply `throttle` - see `examples/demo`
      setState((prevState) => ({
        ...prevState,
        tree: immutableTree,
        config: config,
      }));

      const jsonTree = QbUtils.getTree(immutableTree);
      console.log(jsonTree);
      //setRule(state)
      setRule(JSON.stringify(jsonTree));
      // `jsonTree` can be saved to backend, and later loaded to `queryValue`
    },
    []
  );

  const renderBuilder = useCallback(
    (props: BuilderProps) => (
      <div className="query-builder-container" style={{ padding: "10px" }}>
        <div className="query-builder ">
          <Builder {...props} />
        </div>
      </div>
    ),
    []
  );

  return (
    <>
      <Box
        bg={"white"}
        background={"white"}
        p="20px"
        minH={"400px"}
        overflowY="auto"
        alignContent={"center"}
        justifyContent={"center"}
      >
        {show == true && (
          <div>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="name"
              type="text"
              variant="filled"
              required={true}
              mb={3}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormLabel>Rule</FormLabel>
            <Query
              {...config}
              value={state.tree}
              onChange={onChange}
              renderBuilder={renderBuilder}
            />
            <FormLabel>Select an action</FormLabel>
            <Select
              placeholder="Choose action"
              value={setp}
              onChange={(e) => setSetp(e.target.value)}
            >
              <option value="setActivityProperty">Set KeyWord</option>
            </Select>
            <FormLabel mt="10px">Value</FormLabel>
            {setp == "muteAct" || setp == "delAct" ? (
              ""
            ) : (
              <Input
                placeholder="Value"
                type="text"
                variant="filled"
                required={true}
                mb={3}
                value={setv}
                onChange={(e) => setSetv(e.target.value)}
              />
            )}
            <Input
              placeholder="Value"
              type="hidden"
              variant="filled"
              required={true}
              mb={3}
              value={rid}
              onChange={(e) => setRid(e.target.value)}
            />

            <Button onClick={handleUpdate}>Update Rule</Button>
          </div>
        )}
        {show != true && <Center>Select a rule</Center>}
      </Box>
    </>
  );
};
export default AdminDetailRuleScreen;
