<template>
    <div class="assignment3">
        <div class="selection">
            <div class="stateContainer">
                <label for="stateSelect">Select State:</label>
                <select id="stateSelect" v-model="selectedState" @change="reloadChart">
                    <option v-for="state in States" :key="state" :value="state">{{ state.label }}</option>
                </select>
            </div>

            <div class="yearContainer">
                <div class="selectYearContainer" @click="openList = !openList">
                    <input value="Select Years" class="selectYear" />
                    <i class="fa fa-angle-down icon"></i>
                </div>
                <div class="yearsList" :class="{ 'showList': openList }">
                    <div @click="updateSelectedYears(year)" class="year"
                        :class="{ 'selectedYear': selectedYears.includes(year) }" v-for="year in Years" :key="year"> {{ year
                        }}</div>
                </div>
            </div>

        </div>
        <!-- <div>Selected Years: {{ selectedYears }}</div> -->

        <div>
            <h2>{{ selectedState.label }} - {{ selectedYears }}</h2>
            <svg ref="chart" :width="width" :height="height"></svg>
        </div>
        <div ref="radarChart"></div>

    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';
import axios from 'axios';

export default {
    props: {
        data: Object, // Your data should be passed as a prop
    },
    setup(props) {
        const openList = ref(false);
        const radarChart = ref(null);
        const MINData = ref(undefined);
        const getMinData = async () => {
            await fetch('data/minData.txt').then((response) => {
                return response.text();
            }).then((content) => {
                // console.log("aaaaaaaaaaaaa", content);
                const lines = content.split('\n');
                const processedData = {};
                lines.pop();

                lines.forEach((line) => {
                    const [stateYear, ...monthlyTemps] = line.split(/\s+/).filter(Boolean);
                    const state = stateYear.slice(0, 3);
                    const year = stateYear.slice(6);

                    if (!processedData[state]) {
                        processedData[state] = {};
                    }

                    if (!processedData[state][year]) {
                        processedData[state][year] = { min: [] };
                    }

                    processedData[state][year].min = monthlyTemps.map(temp => parseFloat(temp));
                });

                MINData.value = processedData;
            })
            // await axios.get(`https://www.ncei.noaa.gov/pub/data/cirs/climdiv/climdiv-tminst-v1.0.0-20231106`).then((res) => {
            //     const lines = res.data.split('\n');
            //     const processedData = {};
            //     lines.pop();

            //     lines.forEach((line) => {
            //         const [stateYear, ...monthlyTemps] = line.split(/\s+/).filter(Boolean);
            //         const state = stateYear.slice(0, 3);
            //         const year = stateYear.slice(6);

            //         if (!processedData[state]) {
            //             processedData[state] = {};
            //         }

            //         if (!processedData[state][year]) {
            //             processedData[state][year] = { min: [] };
            //         }

            //         processedData[state][year].min = monthlyTemps.map(temp => parseFloat(temp));
            //     });

            //     MINData.value = processedData;
            // })
        }
        const updateSelectedYears = (year) => {
            if (selectedYears.value.includes(year)) {
                selectedYears.value = selectedYears.value.filter((y) => y !== year);
            } else {
                selectedYears.value.push(year);
            }
            reloadChart();
        }
        const MAXData = ref(undefined);
        const getMaxData = async () => {
            await fetch('data/maxData.txt').then((response) => {
                return response.text();
            }).then((content) => {
                const lines = content.split('\n');
                const processedData = {};
                lines.pop();

                lines.forEach((line) => {
                    const [stateYear, ...monthlyTemps] = line.split(/\s+/).filter(Boolean);
                    const state = stateYear.slice(0, 3);
                    const year = stateYear.slice(6);

                    if (!processedData[state]) {
                        processedData[state] = {};
                    }

                    if (!processedData[state][year]) {
                        processedData[state][year] = { max: [] };
                    }

                    processedData[state][year].max = monthlyTemps.map(temp => parseFloat(temp));
                });

                MAXData.value = processedData;
            })
            // await axios.get(`https://www.ncei.noaa.gov/pub/data/cirs/climdiv/climdiv-tmaxst-v1.0.0-20231106`).then((res) => {
            //     const lines = res.data.split('\n');
            //     const processedData = {};
            //     lines.pop();

            //     lines.forEach((line) => {
            //         const [stateYear, ...monthlyTemps] = line.split(/\s+/).filter(Boolean);
            //         const state = stateYear.slice(0, 3);
            //         const year = stateYear.slice(6);

            //         if (!processedData[state]) {
            //             processedData[state] = {};
            //         }

            //         if (!processedData[state][year]) {
            //             processedData[state][year] = { max: [] };
            //         }

            //         processedData[state][year].max = monthlyTemps.map(temp => parseFloat(temp));
            //     });

            //     MAXData.value = processedData;
            // })
        }
        const createRadarChart = (mindata, maxdata, avgdata) => {
            const chunkSize = 12;
            const chunks = [];

            for (let i = 0; i < mindata.length; i += chunkSize) {
                const chunk = mindata.slice(i, i + chunkSize);
                chunks.push(chunk);
            }
            var legendOptions = [];
            var textSizeLevels = "10px !important";
            var textSizeTooltip = "13px !important";
            var textSizeLegend = "11px !important";
            var circleSize = 5;
            var strokeWidthPolygon = "2px";
            var g = undefined;
            // Use scaleOrdinal instead of category10
            const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
            // Create a new color scale for each chunk
            colorScale.domain(d3.range(1 * chunks[0].length, (1 + 1) * chunks[0].length));
            chunks.forEach((chunk, index) => {
                legendOptions.push(selectedYears.value[index]);
                let months = [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ]
                var json = [
                    chunk.map((value, index) => ({ "axis": months[index], "value": value }))
                ];



                var RadarChart = {
                    draw: function (id, data, options) {
                        var cfg = {
                            radius: circleSize,
                            w: 400,
                            h: 400,
                            factor: 1,
                            factorLegend: .85,
                            levels: 3,
                            maxValue: 0,
                            radians: 2 * Math.PI,
                            opacityArea: 0.001,
                            ToRight: 5,
                            TranslateX: 80,
                            TranslateY: 30,
                            ExtraWidthX: 10,
                            ExtraWidthY: 100,
                            color: () => colorScale(index)
                        };

                        if ('undefined' !== typeof options) {
                            for (var i in options) {
                                if ('undefined' !== typeof options[i]) {
                                    cfg[i] = options[i];
                                }
                            }
                        }

                        cfg.maxValue = Math.max(cfg.maxValue, d3.max(data, function (i) { return d3.max(i.map(function (o) { return o.value; })); }));
                        // console.log("fixxxxxx",data,chunks)
                        var allAxis = (data[0].map(function (i, j) { return i.axis; }));
                        var total = allAxis.length;
                        var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
                        if (index === 0) {
                            d3.select(id)
                                .select("svg").remove();
                        }
                        d3.select(id).selectAll(".legend").remove();
                        if (g === undefined) {
                            g = d3.select(id)
                                .append("svg")
                                .attr("width", cfg.w + cfg.ExtraWidthX)
                                .attr("height", cfg.h + cfg.ExtraWidthY)
                                .attr("class", "graph-svg-component")
                                .append("g")
                                .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
                        }

                        var tooltip;

                        // Circular segments
                        for (var j = 0; j < cfg.levels - 1; j++) {
                            var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
                            g.selectAll(".levels")
                                .data(allAxis)
                                .enter()
                                .append("svg:line")
                                .attr("x1", function (d, i) { return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
                                .attr("y1", function (d, i) { return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
                                .attr("x2", function (d, i) { return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total)); })
                                .attr("y2", function (d, i) { return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total)); })
                                .attr("class", "line")

                                .style("stroke", "grey")
                                .style("stroke-opacity", "0.75")
                                .style("stroke-width", "0.3px")
                                .attr("transform", "translate(" + (cfg.w / 2 - levelFactor) + ", " + (cfg.h / 2 - levelFactor) + ")");
                        }

                        // Text indicating at what % each level is
                        for (var j = 0; j < cfg.levels; j++) {
                            var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
                            g.selectAll(".levels")
                                .data([1]) //dummy data
                                .enter()
                                .append("svg:text")
                                .attr("x", function (d) { return levelFactor * (1 - cfg.factor * Math.sin(0)); })
                                .attr("y", function (d) { return levelFactor * (1 - cfg.factor * Math.cos(0)); })
                                .attr("class", "legend")
                                .style("font-family", "sans-serif")
                                .style("font-size", textSizeLevels)
                                .attr("transform", "translate(" + (cfg.w / 2 - levelFactor + cfg.ToRight) + ", " + (cfg.h / 2 - levelFactor) + ")")
                                .attr("fill", "#737373")
                                .text(((j + 1) * cfg.maxValue / cfg.levels).toFixed(2));
                        }

                        let series = 0;

                        var axis = g.selectAll(".axis")
                            .data(allAxis)
                            .enter()
                            .append("g")
                            .attr("class", axis);

                        axis.append("line")
                            .attr("x1", cfg.w / 2)
                            .attr("y1", cfg.h / 2)
                            .attr("x2", function (d, i) { return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
                            .attr("y2", function (d, i) { return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
                            .attr("class", "line")
                            .style("stroke", "grey")
                            .style("stroke-width", "1px");

                        axis.append("text")
                            .attr("class", "legend")
                            .text(function (d) { return d; })
                            .style("font-family", "sans-serif")
                            .style("font-size", textSizeLegend)
                            .attr("text-anchor", "middle")
                            .attr("dy", "1.5em")
                            .attr("transform", function (d, i) { return "translate(0, -10)"; })
                            .attr("x", function (d, i) { return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total); })
                            .attr("y", function (d, i) { return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total); });

                        let dataValues = [];
                        console.log("ooooooooooo", data)
                        data.forEach(function (y, x) {
                            g.selectAll(".nodes")
                                .data(y, function (j, i) {
                                    dataValues.push([
                                        cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
                                        cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
                                    ]);
                                });
                            dataValues.push(dataValues[0]);
                            g.selectAll(".area")
                                .data([dataValues])
                                .enter()
                                .append("polygon")
                                .attr("class", "radar-chart-series_" + series)
                                .style("stroke-width", strokeWidthPolygon)
                                .style("stroke", cfg.color(series))
                                .attr("points", function (d) {
                                    var str = "";
                                    for (var pti = 0; pti < d.length; pti++) {
                                        str = str + d[pti][0] + "," + d[pti][1] + " ";
                                    }
                                    return str;
                                })
                                .style("fill", function (j, i) {
                                    return cfg.color(series);
                                })
                                .style("fill-opacity", cfg.opacityArea)
                                .on('mouseover', function (d) {
                                    let z = "polygon." + d3.select(this).attr("class");
                                    g.selectAll("polygon")
                                        .transition(200)
                                        .style("fill-opacity", 0.1);
                                    g.selectAll(z)
                                        .transition(200)
                                        .style("fill-opacity", 0.7);
                                })
                                .on('mouseout', function () {
                                    g.selectAll("polygon")
                                        .transition(200)
                                        .style("fill-opacity", cfg.opacityArea);
                                });

                            series++;
                        });

                        series = 0;

                        data.forEach(function (y, x) {
                            g.selectAll(".nodes")
                                .data(y).enter()
                                .append("svg:circle")
                                .attr("class", "radar-chart-series_" + series)
                                .attr('r', cfg.radius)
                                .attr("alt", function (j) { return Math.max(j.value, 0); })
                                .attr("cx", function (j, i) {
                                    dataValues.push([
                                        cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
                                        cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
                                    ]);
                                    return cfg.w / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total));
                                })
                                .attr("cy", function (j, i) {
                                    return cfg.h / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total));
                                })
                                .attr("data-id", function (j) {
                                    return j.axis;
                                })
                                .style("fill", cfg.color(series)).style("fill-opacity", .9)
                                .on('mouseover', function (d) {
                                    let newX = parseFloat(d3.select(this).attr('cx')) - 10;
                                    let newY = parseFloat(d3.select(this).attr('cy')) - 5;

                                    tooltip.attr('x', newX)
                                        .attr('y', newY)
                                        .text(d.value)
                                        .transition(200)
                                        .style('opacity', 1);

                                    let z = "polygon." + d3.select(this).attr("class");
                                    g.selectAll("polygon")
                                        .transition(200)
                                        .style("fill-opacity", 0.1);
                                    g.selectAll(z)
                                        .transition(200)
                                        .style("fill-opacity", 0.7);
                                })
                                .on('mouseout', function () {
                                    tooltip.transition(200)
                                        .style('opacity', 0);
                                    g.selectAll("polygon")
                                        .transition(200)
                                        .style("fill-opacity", cfg.opacityArea);
                                })
                                .append("svg:title")
                                .text(function (j) {
                                    return Math.max(j.value, 0);
                                });

                            series++;
                        });

                        //Tooltip
                        tooltip = g.append('text')
                            .style('opacity', 0)
                            .style('font-family', 'sans-serif')
                            .style('font-size', textSizeTooltip);
                    }
                };

                // Options for the Radar chart, other than default
                var myOptions = {
                    w: 400
                    , h: 400
                    , ExtraWidthX: 180
                    , labelScale: 0.7
                    , levels: 5
                    , levelScale: 0.85
                    , facetPaddingScale: 1.9
                    , maxValue: 0.6
                    , showAxes: true
                    , showAxesLabels: true
                    , showLegend: true
                    , showLevels: true
                    , showLevelsLabels: false
                    , showPolygons: true
                    , showVertices: true
                };

                RadarChart.draw(radarChart.value, json, myOptions);


                var svg = d3.select(radarChart.value)
                    .selectAll('svg')
                    .append('svg')
                    .attr("width", 700)
                    .attr("height", 400)
                    .style("font-size", textSizeLegend);


                // Initiate Legend
                var legend = svg.append("g")
                    .attr("class", "legend")
                    .attr("height", 100)
                    .attr("width", 200)
                    .attr('transform', 'translate(90,20)');

                // Create colour squares
                legend.selectAll('rect')
                    .data(legendOptions)
                    .enter()
                    .append("rect")
                    .attr("x", 400 - 8)
                    .attr("y", function (d, i) {
                        return i * 20;
                    })
                    .attr("width", 10)
                    .attr("height", 10)
                    .style("fill", function (d, i) {
                        return colorScale(i);
                    });

                // Create text next to squares
                legend.selectAll('text')
                    .data(legendOptions)
                    .enter()
                    .append("text")
                    .attr("x", 400 + 3)
                    .attr("y", function (d, i) {
                        return i * 20 + 9;
                    })
                    .attr("font-size", textSizeLegend)
                    .attr("fill", "#737373")
                    .text(function (d) {
                        return d;
                    });


            });
            ////////////////////////////////////////////
            /////////// Initiate legend ////////////////
            ////////////////////////////////////////////



        }
        const AVGData = ref(undefined);
        const getAvgData = async () => {
            await fetch('data/avgData.txt').then((response) => {
                return response.text();
            }).then((content) => {
                const lines = content.split('\n');
                const processedData = {};
                lines.pop();

                lines.forEach((line) => {
                    const [stateYear, ...monthlyTemps] = line.split(/\s+/).filter(Boolean);
                    const state = stateYear.slice(0, 3);
                    const year = stateYear.slice(6);

                    if (!processedData[state]) {
                        processedData[state] = {};
                    }

                    if (!processedData[state][year]) {
                        processedData[state][year] = { avg: [] };
                    }

                    processedData[state][year].avg = monthlyTemps.map(temp => parseFloat(temp));
                });

                AVGData.value = processedData;
            })
            // await axios.get(`https://www.ncei.noaa.gov/pub/data/cirs/climdiv/climdiv-tmpcst-v1.0.0-20231106`).then((res) => {
            //     const lines = res.data.split('\n');
            //     const processedData = {};
            //     lines.pop();

            //     lines.forEach((line) => {
            //         const [stateYear, ...monthlyTemps] = line.split(/\s+/).filter(Boolean);
            //         const state = stateYear.slice(0, 3);
            //         const year = stateYear.slice(6);

            //         if (!processedData[state]) {
            //             processedData[state] = {};
            //         }

            //         if (!processedData[state][year]) {
            //             processedData[state][year] = { avg: [] };
            //         }

            //         processedData[state][year].avg = monthlyTemps.map(temp => parseFloat(temp));
            //     });

            //     AVGData.value = processedData;
            // })
        }

        const width = 800;
        const height = 400;
        const chart = ref();
        const drawCharts = async () => {
            await getMinData();
            await getMaxData();
            await getAvgData();
            let minProcessedDatas = ref([]);
            let minProcessedData = Object.keys(MINData.value).filter(key => key.startsWith(selectedState.value.value)).reduce((obj, key) => {
                obj[key] = MINData.value[key];
                return obj;
            }, {});
            selectedYears.value.forEach((selectedYear) => {
                minProcessedDatas.value.push(...minProcessedData[Object.keys(minProcessedData)[0]][selectedYear]?.min)
                // console.log("llllll2", minProcessedDatas.value)
            });

            let maxProcessedDatas = ref([]);
            let maxProcessedData = Object.keys(MAXData.value).filter(key => key.startsWith(selectedState.value.value)).reduce((obj, key) => {
                obj[key] = MAXData.value[key];
                return obj;
            }, {});
            selectedYears.value.forEach((selectedYear) => {
                maxProcessedDatas.value.push(...maxProcessedData[Object.keys(maxProcessedData)[0]][selectedYear].max)
            });

            let avgProcessedDatas = ref([]);
            let avgProcessedData = Object.keys(AVGData.value).filter(key => key.startsWith(selectedState.value.value)).reduce((obj, key) => {
                obj[key] = AVGData.value[key];
                return obj;
            }, {});
            selectedYears.value.forEach((selectedYear) => {
                avgProcessedDatas.value.push(...avgProcessedData[Object.keys(avgProcessedData)[0]][selectedYear].avg)
            });

            // console.log("rrrrrrrrr", maxProcessedDatas.value)
            createRadarChart(minProcessedDatas.value, maxProcessedDatas.value, avgProcessedDatas.value);

            // Set up the chart dimensions
            const margin = { top: 20, right: 20, bottom: 50, left: 50 };
            const width = 1000 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            d3.select(chart.value).select("svg").remove();
            // Create SVG element
            const svg = d3
                .select(chart.value)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            // Create scales
            const months = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ];

            let xScalej = 0;
            const xScale = d3
                .scaleBand()
                .domain(minProcessedDatas.value.map((_, index) => {
                    if (index % 12 === 0 && index != 0) {
                        xScalej++;
                    }
                    return `${selectedYears.value[xScalej].toString().slice(2, 4)} ${months[index % 12]}`;
                }))
                .range([0, width - 170 - (minProcessedDatas.value.length % 7)])
                .padding(0.1);


            const yScale = d3.scaleLinear().domain([0, d3.max(maxProcessedDatas.value)]).range([height, 0]);

            // Create x-axis
            const xAxis = d3.axisBottom(xScale);

            // Create y-axis
            const yAxis = d3.axisLeft(yScale);

            // Draw x-axis
            svg.append('g').attr('transform', 'translate(0,' + height + ')').call(xAxis);

            // Draw y-axis
            svg.append('g').call(yAxis);

            // Create line generator
            let linej = 0;
            const line = d3
                .line()
                .x((d, i) => {
                    if (i % 12 === 0 && i != 0) {
                        linej++;
                    }
                    return xScale(`${selectedYears.value[linej].toString().slice(2, 4)} ${months[i % 12]}`) + xScale.bandwidth() / 2
                })
                .y((d) => yScale(d));

            // Draw the line
            svg
                .append('path')
                .data([minProcessedDatas.value])
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .attr('stroke', '#2B3499') // Set the line color to red
                .attr('stroke-width', 2)
                .attr('d', line);
            linej = 0;
            svg
                .append('path')
                .data([maxProcessedDatas.value])
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .attr('stroke', '#A0E9FF') // Set the line color to red
                .attr('stroke-width', 2)
                .attr('d', line);

            // svg.selectAll("dot")
            //     .data()
            //     .enter().append("circle")
            //     .attr("class", "dot")
            //     .attr("cx", d => xScale(d))
            //     .attr("cy", d => yScale(d))
            //     .attr("r", 3)
            //     .style("fill", "green");
            // console.log("bbbbb", avgProcessedDatas.value)

            // Create circles for each data point
            let circlej = 0;
            svg
                .selectAll('circle')
                .data(avgProcessedDatas.value)
                .enter()
                .append('circle')
                .attr('cx', (d, i) => {
                    if (i % 12 === 0 && i != 0) {
                        circlej++;
                    }
                    return xScale(`${selectedYears.value[circlej].toString().slice(2, 4)} ${months[i % 12]}`) + xScale.bandwidth() / 2
                })
                .attr('cy', (d) => yScale(d))
                .attr('r', 4) // Set the radius of the dots
                .attr('fill', '#FACBEA');


            // svg
            //     .selectAll('circle')
            //     .data(maxProcessedDatas.value)
            //     .enter()
            //     .append('circle')
            //     .attr('cx', (d, i) => xScale2(i) + xScale2.bandwidth() / 2)
            //     .attr('cy', (d) => yScale(d))
            //     .attr('r', 5)
            //     .attr('fill', 'green')
            //     .on('mouseover', (event, d, i) => {
            //         console.log(Math.max(...maxProcessedDatas.value) - d)
            //         svg.append('text')
            //             .attr('class', 'tooltip-text')
            //             .attr('y', Math.max(...maxProcessedDatas.value) - d)
            //             .style('font-size', '12px')
            //             .style('fill', '#333333')
            //             .selectAll('tspan')
            //             .data([`Count: ${d}`]) // Define an array of lines
            //             .enter()
            //             .append('tspan')
            //             .attr('x', maxProcessedDatas.value.indexOf(d))
            //             .text(d => d);
            //     })
            //     .on('mouseout', () => {
            //         svg.select('.tooltip-text').remove();
            //     });
            // svg
            //     .selectAll('circle')
            //     .data(minProcessedDatas.value)
            //     .enter()
            //     .append('circle')
            //     .attr('cx', (d, i) => xScale(i) + xScale.bandwidth() / 2)
            //     .attr('cy', (d) => yScale(d))
            //     .attr('r', 5)
            //     .attr('fill', 'yellow')
            //     .on('mouseover', (event, d, i) => {
            //         console.log(Math.max(...minProcessedDatas.value) - d)
            //         svg.append('text')
            //             .attr('class', 'tooltip-text')
            //             .attr('x', minProcessedDatas.value.indexOf(d) * 10)
            //             .attr('y', Math.max(...minProcessedDatas.value) - d)
            //             .style('font-size', '12px')
            //             .style('fill', '#333333')
            //             .selectAll('tspan')
            //             .data([`Count: ${d}`]) // Define an array of lines
            //             .enter()
            //             .append('tspan')
            //             .attr('x', minProcessedDatas.value.indexOf(d) * 25)
            //             .text(d => d);
            //     })
            //     .on('mouseout', () => {
            //         svg.select('.tooltip-text').remove();
            //     });

        }


        const Years = Array.from({ length: 2023 - 1895 + 1 }, (_, index) => 1895 + index);
        ;
        const States = [
            { value: "001", label: "Alabama" },
            // { value: "050", label: "Alaska" },
            { value: "002", label: "Arizona" },
            { value: "003", label: "Arkansas" },
            { value: "004", label: "California" },
            { value: "005", label: "Colorado" },
            { value: "006", label: "Connecticut" },
            { value: "007", label: "Delaware" },
            { value: "008", label: "Florida" },
            { value: "009", label: "Georgia" },
            { value: "010", label: "Idaho" },
            { value: "011", label: "Illinois" },
            { value: "012", label: "Indiana" },
            { value: "013", label: "Iowa" },
            { value: "014", label: "Kansas" },
            { value: "015", label: "Kentucky" },
            { value: "016", label: "Louisiana" },
            { value: "017", label: "Maine" },
            { value: "018", label: "Maryland" },
            { value: "019", label: "Massachusetts" },
            { value: "020", label: "Michigan" },
            { value: "021", label: "Minnesota" },
            { value: "022", label: "Mississippi" },
            { value: "023", label: "Missouri" },
            { value: "024", label: "Montana" },
            { value: "025", label: "Nebraska" },
            { value: "026", label: "Nevada" },
            { value: "027", label: "New Hampshire" },
            { value: "028", label: "New Jersey" },
            { value: "029", label: "New Mexico" },
            { value: "030", label: "New York" },
            { value: "031", label: "North Carolina" },
            { value: "032", label: "North Dakota" },
            { value: "033", label: "Ohio" },
            { value: "034", label: "Oklahoma" },
            { value: "035", label: "Oregon" },
            { value: "036", label: "Pennsylvania" },
            { value: "037", label: "Rhode Island" },
            { value: "038", label: "South Carolina" },
            { value: "039", label: "South Dakota" },
            { value: "040", label: "Tennessee" },
            { value: "041", label: "Texas" },
            { value: "042", label: "Utah" },
            { value: "043", label: "Vermont" },
            { value: "044", label: "Virginia" },
            { value: "045", label: "Washington" },
            { value: "046", label: "West Virginia" },
            { value: "047", label: "Wisconsin" },
            { value: "048", label: "Wyoming" }
        ];
        const selectedState = ref(States[0]);
        const selectedYears = ref([Years[0]]);
        console.log(Years)
        onMounted(() => {
            drawCharts();
        })
        const reloadChart = () => {
            console.log("start")
            drawCharts();

        }
        return {
            reloadChart,
            width,
            height,
            Years,
            radarChart,
            States,
            selectedYears,
            selectedState,
            chart,
            States,
            MINData,
            openList,
            updateSelectedYears
        };
    },
};
</script>
  
<style lang="scss" scoped>
/* Add your styles here */
.selection {
    width: 70%;
    display: flex;
    align-items: center;
    height: 50px;
    justify-content: space-around;
}

.assignment3 {
    width: 100%;
    display: flex;
    height: 100%;
    overflow-y: auto;
    align-items: center;
    flex-direction: column;
}

.selectYear {
    cursor: pointer;
    pointer-events: none;
    user-select: none;
}

.selectYearContainer {
    position: relative;
    user-select: none;
    width: fit-content;

    .icon {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 10px;
        height: fit-content;
        margin: auto;
    }
}

.yearsList {
    display: flex;
    width: 160px;
    max-height: 0px;
    transition: 0.3s;
    background-color: white;
    flex-direction: column;
    overflow-y: auto;
    position: absolute;

    .year {
        &:hover {
            background-color: rgb(221, 221, 252);
            cursor: pointer;
        }
    }
}

.showList {
    max-height: 200px;
}

.selectedYear {
    background-color: rgb(170, 170, 220);

    &:hover {
        background-color: rgb(170, 170, 220);

    }
}
</style>
  