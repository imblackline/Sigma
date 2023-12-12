<template>
    <div class="assignment3">
        <div class="assignment3__header">
            <div class="assignment3__header__btn">
                <button class="assignment3__header__btn__homebtn" @click="$router.back()">
                    <span>Back home</span>
                    <svg viewBox="-5 -5 110 110" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0" />
                    </svg>
                </button>
            </div>
            <section class="wrapper">
                <div class="top">Timelines</div>
                <div class="bottom" aria-hidden="true">Timelines</div>
            </section>
        </div>
        <h2 class="assignment3__Title">-- Line Chart --</h2>
        <p class="assignment3__Detail">For this assignment, we applied a dataset containing temperature information in the
            United States spanning the
            years 1895 to 2023. In constructing the graph, we opted to use the Time scale function of d3 for the x-axis,
            enabling users to pick time intervals from the dropdown menu. Simultaneously, we employed a linear scale
            function for the y-axis to illustrate temperature. The graph visually displays three categories of data:
            Maximum, Average, and Minimum temperatures.
        </p>
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

        <div>
            <h2>{{ selectedState.label }} - {{ selectedYears }}</h2>
            <svg ref="chart" :width="width" :height="height"></svg>
        </div>
        <h2 class="assignment3__Title">-- Radar Chart --</h2>
        <p class="assignment3__Detail">The Radar chart layout we've opted for is a tool to illustrate the monthly
            temperature variations across several years for a chosen state. Each year is showcased as an individual group,
            making trend identification straightforward. Through the year legend, users can selectively enable or disable
            lines for specific years. The radial axis, spanning from 0 to 100, accentuates temperature values. Detailed
            hover labels, tailored to display the month and temperature upon interaction, add precision. This design
            guarantees a succinct and informative depiction of the annual temperature patterns.
        </p>
        <div class="radarCharts">
            <div class="radarChart">
                <h3>Min Temperature</h3>
                <div ref="radarChart"></div>
            </div>
            <div class="radarChart">
                <h3>Max Temperature</h3>
                <div ref="radarChart2"></div>
            </div>
            <div class="radarChart">
                <h3>Avg Temperature</h3>
                <div ref="radarChart3"></div>
            </div>
        </div>
        <h2 class="assignment3__Title">-- Ridgeline Chart --</h2>
        <p class="assignment3__Detail">Ridgeline is most effective when depicting distributions. To employ this plot, we
            needed to adjust the data. Initially, we computed the averages of minimum and maximum temperatures across all
            months for each selected year and state. Subsequently, we determined the Kernel Density Estimation for both mean
            minimum and maximum temperatures, plotting them on the x-axis. Meanwhile, the y-axis corresponds to the year or
            years chosen by the user.
        </p>
        <div ref="chartContainer"></div>
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
        const radarChart2 = ref(null);
        const radarChart3 = ref(null);
        const MINData = ref(undefined);
        const getMinData = async () => {
            await fetch('data/minData.txt').then((response) => {
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
                            w: 300,
                            h: 300,
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
                    w: 300
                    , h: 300
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
                    .attr("width", 600)
                    .attr("height", 300)
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
                    .attr("x", 300 - 8)
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
                    .attr("x", 300 + 3)
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
        const createRadarChart2 = (mindata, maxdata, avgdata) => {
            const chunkSize = 12;
            const chunks = [];

            for (let i = 0; i < maxdata.length; i += chunkSize) {
                const chunk = maxdata.slice(i, i + chunkSize);
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
                            w: 300,
                            h: 300,
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
                    w: 300
                    , h: 300
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

                RadarChart.draw(radarChart2.value, json, myOptions);


                var svg = d3.select(radarChart2.value)
                    .selectAll('svg')
                    .append('svg')
                    .attr("width", 600)
                    .attr("height", 300)
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
                    .attr("x", 300 - 8)
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
                    .attr("x", 300 + 3)
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
        const createRadarChart3 = (mindata, maxdata, avgdata) => {
            const chunkSize = 12;
            const chunks = [];

            for (let i = 0; i < avgdata.length; i += chunkSize) {
                const chunk = avgdata.slice(i, i + chunkSize);
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
                            w: 300,
                            h: 300,
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
                    w: 300
                    , h: 300
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

                RadarChart.draw(radarChart3.value, json, myOptions);


                var svg = d3.select(radarChart3.value)
                    .selectAll('svg')
                    .append('svg')
                    .attr("width", 600)
                    .attr("height", 300)
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
                    .attr("x", 300 - 8)
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
                    .attr("x", 300 + 3)
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

            createRadarChart(minProcessedDatas.value, maxProcessedDatas.value, avgProcessedDatas.value);
            createRadarChart2(minProcessedDatas.value, maxProcessedDatas.value, avgProcessedDatas.value);
            createRadarChart3(minProcessedDatas.value, maxProcessedDatas.value, avgProcessedDatas.value);
            drawRidgeChart(minProcessedDatas.value, maxProcessedDatas.value);

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
                .attr('stroke', 'red') // Set the line color to red
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
                .attr('fill', '#87CBB9');



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

        const chartContainer = ref(null);
        // This is what I need to compute kernel density estimation
        // function kernelDensityEstimator(kernel, X, data) {
        //     return X.map(function (x) {
        //         return [x, d3.mean(data, function (v) { return kernel(x - v); })];
        //     });
        // }

        // function kernelEpanechnikov(k) {
        //     return function (v) {
        //         return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
        //     };
        // }
        function kernelDensityEstimator(kernel, X) {
            return function (V) {
                return X.map(function (x) {
                    return [x, d3.mean(V, function (v) { return kernel(x - v); })];
                });
            };
        }
        function kernelEpanechnikov(k) {
            return function (v) {
                return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
            };
        }
        const drawRidgeChart = (mindata, maxdata) => {
            d3.select(chartContainer.value).select("svg").remove();
            const margin = { top: 80, right: 30, bottom: 50, left: 110 },
                width = 1000 - margin.left - margin.right,
                height = (selectedYears.value.length * 50) + (500 - margin.top - margin.bottom);

            // append the svg object to the body of the page
            const svg = d3.select(chartContainer.value)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    `translate(${margin.left}, ${margin.top})`);

            //read data

            let data = [];

            // Iterate over the selectedYears and group values by months for each year
            selectedYears.value.forEach((year, yearIndex) => {
                for (let i = 0; i < 12; i++) {
                    let dataIndex = yearIndex * 12 + i;
                    let monthData = {};
                    monthData[year] = mindata[dataIndex].toString();
                    data.push(monthData);
                }
            });

            let data2 = [];

            // Iterate over the selectedYears and group values by months for each year
            selectedYears.value.forEach((year, yearIndex) => {
                for (let i = 0; i < 12; i++) {
                    let dataIndex = yearIndex * 12 + i;
                    let monthData = {};
                    monthData[year] = maxdata[dataIndex].toString();
                    data2.push(monthData);
                }
            });
            console.log("ssssssssss", data);
            // Get the different categories and count them
            // const categories = ["Almost Certainly", "Very Good Chance", "We Believe", "Likely", "About Even", "Little Chance", "Chances Are Slight", "Almost No Chance"]
            const categories = selectedYears.value;
            const n = categories.length

            // Compute the mean of each group
            let allMeans = []
            for (let i in categories) {
                let currentGroup = categories[i]
                let mean = d3.mean(data, function (d) { return +d[currentGroup] })
                allMeans.push(mean)
            }

            let allMeans2 = []
            for (let i in categories) {
                let currentGroup = categories[i]
                let mean = d3.mean(data2, function (d) { return +d[currentGroup] })
                allMeans2.push(mean)
            }

            // Create a color scale using these means.
            const myColor = d3.scaleSequential()
                .domain([0, 100])
                .interpolator(d3.interpolateViridis);

            // Add X axis
            const x = d3.scaleLinear()
                .domain([-10, 120])
                .range([0, width]);
            svg.append("g")
                .attr("class", "xAxis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).tickValues([0, 25, 50, 75, 100]).tickSize(-height))
                .select(".domain").remove()

            // Add X axis label:
            svg.append("text")
                .attr("text-anchor", "end")
                .attr("x", width)
                .attr("y", height + 40)
                .text("Frequency");

            // Create a Y scale for densities
            const y = d3.scaleLinear()
                .domain([0, .1])
                .range([height, 0]);

            // Create the Y axis for names
            const yName = d3.scaleBand()
                .domain(categories)
                .range([0, height])
                .paddingInner(1)
            svg.append("g")
                .call(d3.axisLeft(yName).tickSize(0))
                .select(".domain").remove()

            // Compute kernel density estimation for each column:
            const kde = kernelDensityEstimator(kernelEpanechnikov(9), x.ticks(40)) // increase this 40 for more accurate density.
            const allDensity = []
            for (let i = 0; i < n; i++) {
                let key = categories[i]
                let density = kde(data.map(function (d) { return d[key]; }))
                allDensity.push({ key: key, density: density })
            }
            const allDensity2 = []
            for (let i = 0; i < n; i++) {
                let key = categories[i]
                let density = kde(data2.map(function (d) { return d[key]; }))
                allDensity2.push({ key: key, density: density })
            }

            // Add areas
            svg.selectAll("areas")
                .data(allDensity)
                .join("path")
                .attr("transform", function (d) { return (`translate(0, ${(yName(d.key) - height)})`) })
                .attr("fill", "rgba(0,100,255,0.5)")
                .datum(function (d) { return (d.density) })
                .attr("opacity", 0.7)
                .attr("stroke", "rgba(0,100,255,1)")
                .attr("stroke-width", 0.5)
                .attr("d", d3.line()
                    .curve(d3.curveBasis)
                    .x(function (d) { return x(d[0]); })
                    .y(function (d) { return y(d[1]); })
                )
            svg.selectAll("areas")
                .data(allDensity2)
                .join("path")
                .attr("transform", function (d) { return (`translate(0, ${(yName(d.key) - height)})`) })
                .attr("fill", "rgba(255,50,0,0.5)")
                .datum(function (d) { return (d.density) })
                .attr("opacity", 0.7)
                .attr("stroke", "rgba(255,50,0,1)")
                .attr("stroke-width", 0.5)
                .attr("d", d3.line()
                    .curve(d3.curveBasis)
                    .x(function (d) { return x(d[0]); })
                    .y(function (d) { return y(d[1]); })
                )


        };
        onMounted(() => {
            drawCharts();
        })
        const reloadChart = () => {
            drawCharts();

        }
        return {
            reloadChart,
            chartContainer,
            width,
            height,
            Years,
            radarChart,
            radarChart2,
            radarChart3,
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
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    &__Title {
        font-size: 2rem;
        color: #7C93C3;
        margin-top: 60px;
        margin-bottom: 10px;
    }

    &__Detail {
        width: 70%;
        text-align: justify;
        border-bottom: 2px solid black;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }

    &__header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-top: 20px;

        &__btn {
            position: absolute;
            left: 20px;
            top: 0;
            bottom: 0;
            margin: auto;
            height: fit-content;

            &__homebtn {
                // position: absolute;
                // left: 20px;
                // top: 0;
                // bottom: 0;
                margin: auto;
                appearance: none;
                background: transparent;
                border: 0;
                color: #c4c4c4;
                cursor: pointer;
                font: inherit;
                font-weight: 500;
                line-height: 1;
                padding: 1em 1.5em;
                position: relative;
                transition: filter 0.3s;


                &:hover {
                    filter: brightness(1.1);
                }

                &:active {
                    filter: brightness(0.9);
                }

                &>span {
                    display: block;
                    position: relative;
                    transition: transform 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
                    z-index: 1;
                }

                &:hover>span {
                    transform: scale(1.05);
                }

                &:active>span {
                    transform: scale(0.95);
                }

                &>svg {
                    fill: #22232A;
                    position: absolute;
                    top: -5%;
                    left: -5%;
                    width: 110%;
                    height: 110%;
                }

                &>svg>path {
                    transition: 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
                }

                &:hover>svg>path {
                    d: path("M0,0 C0,-5 100,-5 100,0 C105,0 105,100 100,100 C100,105 0,105 0,100 C-5,100 -5,0 0,0");
                }

                &:active>svg>path {
                    d: path("M0,0 C30,10 70,10 100,0 C95,30 95,70 100,100 C70,90 30,90 0,100 C5,70 5,30 0,0");
                }
            }
        }

        .wrapper {
            // font-size: 5rem;
            display: grid;
            place-content: center;
            // background-color: black;
            // min-height: 100vh;
            font-family: "Oswald", sans-serif;
            // font-size: clamp(1.5rem, 1rem + 18vw, 15rem);
            font-size: 4.5rem;
            font-weight: 700;
            text-transform: uppercase;
            color: hsl(0, 0%, 15%);


            &>div {
                grid-area: 1/1/-1/-1;
            }

            .top {
                clip-path: polygon(0% 0%, 100% 0%, 100% 48%, 0% 58%);
            }

            .bottom {
                clip-path: polygon(0% 60%, 100% 45%, 100% 100%, 0% 100%);
                color: transparent;
                background: -webkit-linear-gradient(179deg, #EEF5FF 53%, hsl(0, 0%, 25%) 65%);
                background: linear-gradient(179deg, #EEF5FF 53%, hsl(0, 0%, 25%) 65%);
                background-clip: text;
                -webkit-background-clip: text;
                transform: translateX(-0.02em);
            }

        }
    }
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

.radarCharts {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .radarChart {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}</style>
  