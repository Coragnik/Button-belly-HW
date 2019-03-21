function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  var url = `/metadata/${sample}`;
  d3.json(url).then(function(response) {

  // Use `d3.json` to fetch the metadata for a sample
  var bData = d3.select("#sample-metadata");
  // use html
  bData.html("");
  var data = Object.entries(response);
  data.forEach(function(item) {
  bData.append("div").text(item);
  });
})}


function buildCharts(sample) {
 var url_1 = `/samples/${sample}`;
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(url_1).then(function(response){
    var _id = response.otu_ids.slice(0,10);
    var _labels= response.otu_labels.slice(0,10);
    // @TODO: Build a Bubble Chart using the sample data
    var tSampleValues = response.sample_values.slice(0,10);

    // @TODO: Build a Pie Chart
    var data = {
      x: _id,
      y: _labels,
      type: "pie"
    };
    Plotly.newPlot('pie', data);


    d3.json(sampleData).then(function(response){
    var _Ids = response.otu_ids;
    var _Labels = response.otu_labels;
    var _Values = response.sample_values;

    var chartData = {
      mode: 'markers',
      x: _Ids,
      y: _Values,
      text: b_Labels,
      marker: {color: _Ids, colorscale: 'Rainbow', size: bubbleSampleValues}
    };
    var bjData = [bData];

        var layout = {
          showlegend: false
          height: 600,
          width: 1200
          };

        Plotly.newPlot('bubble', bjData, layout);
      })
    })
  };

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data
  buildCharts(newSample);
  buildMetadata(newSample);
}
init();

// Initialize the dashboard
init();
