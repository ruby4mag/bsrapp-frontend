const RuleFeilds = {

    feilds: {

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
}


export default RuleFeilds;