// Activity 6 has sorted, sliced horizontal bar plots 
// and there is a horizontal bar plot in the homework
// The homework also has a standard scatter plot
// Activity 8 will have some helpful info about how to use the dropdown for your homework.
// Also, Day 1 Activity 3 shows how to append HTML and data to the HTML.  
// You will need to do something similar to populate your dropdown in the homework 
// and to make the small meta-data table/list in the homework
                //HOW TO DEPLOY TO GITHUB
//go to settings tab on repo page
//go to "pages" on left side
//make sure branch is main
//save
//it'll take a couple minutes to launch the page


//read and log the samples.json
function init() {
    var selectorReader = d3.select("#selDataset");

    d3.json("../data/samples.json").then((data) => { 
        console.log(data);

        //grab name data
        var sampleNames = data.names;

        //add names to dropdown
        sampleNames.forEach((sample) => {
            selectorReader.append("option").text(sample).property("value", sample);
        });

        var firstPatient = sampleNames[0];
        buildCharts(firstPatient);
        buildData(firstPatient);
    });
}

//create horizontal bar chart and bubble chart
function buildCharts(patient) {
    d3.json("../data/samples.json").then((data) => {
        var bbSample = data.samples;

        var results = bbSample.filter(bbInfo =>
            bbInfo.id == patient);
        
        var firstResult = results[0];

        var ids = firstResult.otu_ids;
        var chartLabel = firstResult.otu_labels;
        var chartValues = firstResult.sample_values;

        //build horizontal chart
        var barData = [
            {
                y: ids.slice(0,10).map(otu => `OTU ${otu}`).reverse(),
                x: chartValues.slice(0,10).reverse(),
                text: chartLabel.slice(0,10).reverse(),
                type:'bar',
                orientation: 'h'
            }
        ];

        var barLayout = {
            title: 'Top 10 Bacteria Cultures Found',

        };

        Plotly.newPlot("bar", barData, barLayout);

        //build bubble chart
        var bubbleData = [
            {
                x: ids,
                y: chartValues,
                mode: 'markers',
                marker: {
                    color: ids,
                    size: chartValues
                }

            }
        ]

        var bubbleLayout = {
            xaxis: {
                title: 'OTU ID'
            },
            hovermode: 'closest'
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
}

//build metadata chart
function buildData(patient) {
    d3.json("../data/samples.json").then((data) => {
        var metadata = data.metadata;
        var results = metadata.filter(bbInfo =>
            bbInfo.id == patient);
        var firstResult = results[0];
        
        var chart = d3.select("#sample-metadata");
        chart.html("")
        Object.entries(firstResult).forEach(([key, value]) => {
            chart.append("h6").text(`${key}: ${value}`);
        });
    });
}

//respond to dropdown change
function optionChanged(newPatient) {
    buildCharts(newPatient);
    buildData(newPatient);
}

//intialize website
init();