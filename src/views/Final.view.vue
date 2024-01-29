<template>
    <div class="final">
        <div class="final__header">
            <div class="final__header__btn">
                <button class="final__header__btn__homebtn" @click="$router.back()">
                    <span>Back home</span>
                    <svg viewBox="-5 -5 110 110" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0" />
                    </svg>
                </button>
            </div>
            <section class="wrapper">
                <div class="top">Life Expectency</div>
                <div class="bottom" aria-hidden="true">Life Expectency</div>
            </section>
        </div>
        <div class="final__section">
            <div class="final__section__title">
                Overview
            </div>
            <div class="final__section__desc">
                This section provides a compelling and informative overview of the data, utilizing the synergistic strengths
                of two complementary visualization techniques: choropleth maps and bubble charts. These charts seamlessly
                blend geographical representation with data intensity, enabling a comprehensive understanding of spatial
                patterns and relationships
            </div>
            <div class="final__section__chart">
                <h5 class="final__section__chart__title">Choropleth map</h5>
                <p class="final__section__chart__detail">The chart is a world map with countries shaded in varying colors to
                    represent different life expectancy levels. Brighter shades indicate higher life expectancy, while
                    darker shades indicate lower life expectancy. There's an interactive legend on the side, allowing users
                    to understand the range of life expectancies. Hovering over a country reveals specific life expectancy
                    data for that nation</p>
                <div id="choropleth"></div>
            </div>
            <div class="final__section__chart">
                <h5 class="final__section__chart__title">Bubble chart</h5>
                <p class="final__section__chart__detail">This chart plots life expectancy against GDP per capita. Countries
                    are categorized into two groups: Developed and Developing, each marked with distinct colors. Each
                    country is represented by a bubble, where the size of the bubble corresponds to the country's
                    population. The x-axis represents GDP per capita, while the y-axis shows life expectancy. The chart
                    includes a legend to distinguish between Developed and Developing countries and a size key to interpret
                    the population sizes represented by the bubbles.
                </p>
                <div id="my_dataviz"></div>
            </div>
        </div>
        <div class="final__section">
            <div class="final__section__title">
                Part of a whole
            </div>
            <div class="final__section__desc">
                This section breaks down complex health and economic data into more digestible parts. It features a Doughnut
                Chart illustrating alcohol consumption in various countries; and a Pie Chart displaying the distribution of
                government health expenditures. These visualizations help to understand the components that make up the
                bigger picture of global health and economics.
            </div>
            <div class="final__section__chart">
                <h5 class="final__section__chart__title">100% Stacked Bar Chart</h5>
                <p class="final__section__chart__detail">The chart consists of 10 horizontal bars, each representing a
                    different country. Each bar is segmented into four parts, corresponding to the years 2000, 2005, 2010,
                    and 2015. The length of each segment reflects the GDP per capita for that year as a percentage of the
                    total GDP across all four years. The colors for each year are consistent across all countries for easy
                    comparison. A legend is included to help identify which color corresponds to which year.</p>
                <div id="stack_legend"></div>
                <div id="stacked"></div>
            </div>
            <div class="final__section__chart">
                <h5 class="final__section__chart__title">Doughnut Chart</h5>
                <p class="final__section__chart__detail">This Doughnut Chart displays the alcohol consumption rates for ten
                    selected countries in the year 2010. Each segment of the doughnut represents a different country, with
                    varying colors for easy identification. The size of each segment corresponds to the level of alcohol
                    consumption in that country. The chart includes a legend indicating which color corresponds to which
                    country. Interactive elements may include tooltips showing specific consumption figures upon hovering
                    over each segment.</p>
                <div id="doughnut"></div>
            </div>
            <div class="final__section__chart">
                <h5 class="final__section__chart__title">Pie Chart</h5>
                <p class="final__section__chart__detail">This Pie Chart showcases the distribution of government health
                    expenditures as a percentage of total government expenditures across ten selected countries. Each slice
                    represents a different country, differentiated by unique colors. The size of each segment reflects the
                    proportion of the government's total expenditure that is allocated to health. A legend is included to
                    associate each color with its corresponding country. Interactive elements could show the exact
                    percentage of health expenditure upon hovering over each segment.
                </p>
                <div id="pie_legend"></div>
                <div id="pie"></div>
            </div>
        </div>
        <div class="final__section">
            <div class="final__section__title">
                Time Series
            </div>
            <div class="final__section__desc">
                The Time Series section focuses on the progression of health-related metrics over time. It includes a Line
                Chart that traces the trends in adult mortality rates in developed and developing countries from 2000 to
                2015. This chart is crucial for understanding how health outcomes have evolved over the years in different
                parts of the world.
            </div>
            <div class="final__section__chart">
                <h5 class="final__section__chart__title">Line chart</h5>
                <p class="final__section__chart__detail">This Line Chart features two lines, each representing a category of
                    countries: Developed and Developing. The x-axis spans from the year 2000 to 2015, while the y-axis
                    represents the average adult mortality rates. The lines for each category are color-coded for
                    distinction.
                </p>
                <div id="line_legend"></div>
                <div id="line"></div>
            </div>
        </div>
        <div class="final__section">
            <div class="final__section__title">
                Comparison
            </div>
            <div class="final__section__desc">
                In the Comparison section, differences and similarities between countries and categories are highlighted. It
                features a Grouped Bar Chart comparing the prevalence of diseases across countries, a Butterfly Chart
                showing adult mortality trends, and a Lollipop Chart that illustrates the range of adult mortality rates.
                These charts are instrumental in comparing health metrics across different dimensions.
            </div>
            <div class="final__section__chart">
                <h5 class="final__section__chart__title">Grouped Bar Chart</h5>
                <p class="final__section__chart__detail">This chart features 10 groups of bars, with each group
                    corresponding to one of the 10 selected countries. Within each group, there are four bars representing
                    the four different diseases. The x-axis categorizes the countries, while the y-axis represents the
                    prevalence of each disease. Each disease is represented by a different color within the group, allowing
                    for easy comparison across countries. The chart includes a legend to identify the colors associated with
                    each disease.
                </p>
                <div id="bar_legend"></div>
                <div id="bar"></div>
            </div>
            <div class="final__section__chart">
                <h5 class="final__section__chart__title">Butterfly chart</h5>
                <p class="final__section__chart__detail">The Butterfly Chart is structured with two mirrored bar graphs, one
                    on the left and one on the right, sharing a common central y-axis that represents the years from 2000 to
                    2015. The left side shows the adult mortality rates in developed countries, while the right side
                    displays the rates in developing countries. Each bar represents the average adult mortality rate for a
                    specific year. The bars are color-coded to distinguish between developed and developing countries. This
                    format allows for a direct year-by-year comparison between the two types of countries.
                </p>
                <div id="pyramid"></div>
            </div>
            <div class="final__section__chart">
                <h5 class="final__section__chart__title">Lollipop Chart</h5>
                <p class="final__section__chart__detail">The Lollipop Chart displays a vertical orientation with the y-axis
                    listing the names of the 10 selected countries and the x-axis representing the range of adult mortality
                    rates. For each country, two 'lollipops' are plotted: one for the minimum and one for the maximum adult
                    mortality rate observed from 2000 to 2015. The 'stick' of each lollipop highlights the range, while the
                    'head' marks the exact values of the min and max rates. Different colors are used for minimum and
                    maximum values for clarity. The chart may include an interactive feature that shows the specific year
                    for each minimum and maximum value when hovering over the lollipops.
                </p>
                <div id="lollipop_legend"></div>
                <div id="lollipop"></div>
            </div>
        </div>
        <div class="final__section">
            <div class="final__section__title">
                Correlation
            </div>
            <div class="final__section__desc">
                This section explores the relationships between various health and social factors. It includes a Scatter
                Plot analyzing the correlation between adult mortality and schooling, and a Heat Map showing BMI trends over
                15 years in selected countries. These visualizations are key to understanding how different factors
                interplay in the realm of public health.
            </div>
            <div class="final__section__chart">
                <h5 class="final__section__chart__title">Scatter Plot</h5>
                <p class="final__section__chart__detail">This Scatter Plot features many dots, each representing one of the
                    193 countries. The x-axis measures the level of schooling, while the y-axis represents the adult
                    mortality rate for the year 2015. Each dot's position on the graph indicates the schooling level and
                    adult mortality rate of a country. The plot may include a trend line to highlight the general
                    relationship between these two variables.</p>
                <div id="scatter"></div>
            </div>
            <div class="final__section__chart">
                <h5 class="final__section__chart__title">Heatmap</h5>
                <p class="final__section__chart__detail">The Heat Map is structured as a grid, with rows representing the 10
                    selected countries and columns corresponding to each year from 2000 to 2015. Each cell in the grid shows
                    the average BMI for a country in a particular year. The colors in the cells vary according to the BMI
                    value – a color gradient is used to indicate higher or lower BMI values. The map includes a color legend
                    that explains the BMI range each color represents. This format allows for an easy comparison of BMI
                    changes over time across different countries.</p>
                <svg id="colorBar"></svg>
                <div id="heatmap"></div>
            </div>
        </div>
        <div class="final__section">
            <div class="final__section__title">
                Distribution
            </div>
            <div class="final__section__desc">
                The Distribution section delves into the variability and range of health-related data. It features a Box
                Plot that provides insights into the distribution of government health expenditures in different countries.
                This chart is essential for examining the spread and central tendencies in health spending across various
                nations.
            </div>
            <div class="final__section__chart">
                <h5 class="final__section__chart__title">Box Plot</h5>
                <p class="final__section__chart__detail">The Box Plot displays 10 separate boxes, each corresponding to one
                    of the selected countries. The y-axis lists the names of the countries, and the x-axis represents the
                    range of total government health expenditures. Each box shows the distribution of expenditures within a
                    country, with the central line in the box indicating the median expenditure. The ends of the box
                    represent the lower and upper quartiles, while the 'whiskers' extend to show the full range of the data,
                    including any outliers.</p>
                <div id="boxplot"></div>
            </div>
        </div>
    </div>
</template>

<script>

import { onMounted, ref } from 'vue';
import * as d3 from 'd3';
import * as topojson from "https://cdn.skypack.dev/topojson@3.0.2";

export default {
    setup() {
        const Choropleth = {
            // Fields to be updated when another year is selected
            tooltip: null,
            world: null,
            path: null,
            colorScale: null,
            mouseLeave: null,

            initialize: function () {
                const legendWidth = 110;
                const legendHeight = 300;

                const width = 1228;
                const marginTop = 46;
                const height = width / 2 + marginTop;

                // Calculate the position for the legend
                const legendX = width - legendWidth;
                const legendY = height / 2 - legendHeight / 2 - 300;

                let projection = d3.geoEqualEarth().fitExtent([[2, marginTop + 2], [width - 2, height]], { type: "Sphere" });

                const self = this; // saving a reference to the Choropleth object

                this.mouseLeave = function () {
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke-width", "0.75px");
                    if (self.tooltip) {
                        self.tooltip.transition().duration(500)
                            .style("opacity", 0)
                            .remove();
                        self.tooltip = null; // Reset tooltip variable
                    }
                }

                this.path = d3.geoPath().projection(projection);

                // Define color scale
                this.colorScale = d3.scaleThreshold()
                    .domain([0, 20, 40, 60, 80, 100])
                    .range(d3.schemeGreens[6]);

                let svg = d3.select("#choropleth")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", `0 0 ${width} ${height}`);

                this.world = svg.append("g");

                // Add the stripe pattern to the SVG
                const defs = svg.append("defs");

                defs.append("pattern")
                    .attr("id", "stripe")
                    .attr("patternUnits", "userSpaceOnUse")
                    .attr("width", 8)
                    .attr("height", 8)
                    .attr("patternTransform", "rotate(45)")
                    .append("rect")
                    .attr("width", 4)
                    .attr("height", 8)
                    .attr("transform", "translate(0,0)")
                    .attr("opacity", 0.5)
                    .attr("fill", "grey");

                // Legend
                const x = d3.scaleLinear()
                    .domain([2.6, 75.1])
                    .rangeRound([600, 860]);

                const legend = svg.append("g")
                    .attr("class", "choropleth-legend")
                    .attr("transform", `translate(${legendX}, ${legendY})`);

                const legend_entry = legend.selectAll("g.legend")
                    .data(this.colorScale.range().map(function (d) {
                        d = self.colorScale.invertExtent(d);
                        if (d[0] == null) d[0] = x.domain()[0];
                        if (d[1] == null) d[1] = x.domain()[1];
                        return d;
                    }))
                    .enter().append("g")
                    .attr("class", "legend_entry");

                const ls_w = 30,
                    ls_h = 30;

                legend_entry.append("rect")
                    .attr("x", 10)
                    .attr("y", function (d, i) {
                        return height - (i * ls_h) - 6 * ls_h - 25;
                    })
                    .attr("width", ls_w)
                    .attr("height", ls_h)
                    .style("fill", function (d) {
                        return self.colorScale(d[0]);
                    });

                legend_entry.append("text")
                    .attr("x", 45)
                    .attr("y", function (d, i) {
                        return height - (i * ls_h) - 5 * ls_h - 35;
                    })
                    .text(function (d, i) {
                        if (i === 0) return "< " + d[1];
                        if (d[1] < d[0]) return d[0] + "+";
                        return d[0] + " - " + d[1];
                    });

                legend.append("text").attr("x", -10).attr("y", 290).text("Life expectancy");

                this.updateMap(0);
            },
            updateMap: function (yearIndex) {
                const self = this;
                let mouseOver = function (event, d) {
                    d3.selectAll(".Country")
                        .transition()
                        .duration(200)
                        .style("opacity", .3)
                        .style("stroke", "black")
                        .style("stroke-width", "0.75px");
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke-width", "2px");
                    // Create the tooltip if it doesn't exist
                    if (!self.tooltip) {
                        self.tooltip = d3.select("body").append("div")
                            .attr("class", "tooltip")
                            .style("opacity", 0);
                    }
                    let value = 300
                    let description = value != 0 ? ': ' + value + 'k' : '';
                    self.tooltip.html(`<b>${d.properties.name}</b>`)
                        .style("left", (event.pageX + 15) + "px")
                        .style("top", (event.pageY - 28) + "px")
                        .transition().duration(200)
                        .style("opacity", 1);
                }

                fetch("data/final.json")
                    .then(response => response.json())
                    .then(data => {
                        const dataFeatures = topojson.feature(data, data.objects.countries).features;
                        // self.world.selectAll(".Country").remove(); // Remove previous paths (if any)
                        self.world.selectAll(".country")
                            .data(dataFeatures)
                            .enter().append("path")
                            // Add a class, styling and mouseover/mouseleave
                            .attr("d", this.path)
                            .style("stroke", "black")
                            .attr("class", "Country")
                            .style("fill", function (d) {

                                let value = AllData.value.filter(ad => ad.Country === d.properties.name && ad.Year === '2015')[0] ? AllData.value.filter(ad => ad.Country === d.properties.name && ad.Year === '2015')[0]["Life expectancy "] : 0;

                                return value !== 0 ? self.colorScale(value) : "url(#stripe)";
                            })
                            .style("opacity", 1)
                            .style("stroke-width", "0.75px")
                            .on("mouseover", mouseOver)
                            .on("mousemove", function (event, d) {

                                // Move the tooltip with the mouse pointer
                                self.tooltip.style("left", (event.pageX + 10) + "px")
                                    .style("top", (event.pageY + 10) + "px");

                            })
                            .on("mouseleave", self.mouseLeave);
                    })
                    .catch(error => {
                        console.error("Error fetching the data:", error);
                    });
            }
        }

        const bubbleChart = () => {
            const margin = { top: 40, right: 150, bottom: 60, left: 30 },
                width = 900 - margin.left - margin.right,
                height = 520 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            const svg = d3.select("#my_dataviz")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            //Read the data
            // d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv").then(function (data) {
            d3.csv("data/Life Expectancy Data.csv").then(function (data) {

                // ---------------------------//
                //       AXIS  AND SCALE      //
                // ---------------------------//

                // Add X axis
                const x = d3.scaleLinear()
                    .domain([0, 70000])
                    .range([0, width]);
                svg.append("g")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x).ticks(3));

                // Add X axis label:
                svg.append("text")
                    .attr("text-anchor", "end")
                    .attr("x", width)
                    .attr("y", height + 50)
                    .text("GDP");

                // Add Y axis
                const y = d3.scaleLinear()
                    .domain([35, 90])
                    .range([height, 0]);
                svg.append("g")
                    .call(d3.axisLeft(y));

                // Add Y axis label:
                svg.append("text")
                    .attr("text-anchor", "end")
                    .attr("x", 0)
                    .attr("y", -20)
                    .text("Life expectancy")
                    .attr("text-anchor", "start")

                // Add a scale for bubble size
                const z = d3.scaleSqrt()
                    .domain([200000, 1310000000])
                    .range([2, 30]);

                // Add a scale for bubble color
                const myColor = d3.scaleOrdinal()
                    // .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
                    .domain(["Developed", "Developing"])
                    .range(d3.schemeSet1);


                // ---------------------------//
                //      TOOLTIP               //
                // ---------------------------//

                // -1- Create a tooltip div that is hidden by default:
                const tooltip = d3.select("#my_dataviz")
                    .append("div")
                    .style("opacity", 0)
                    .attr("class", "tooltip")
                    .style("background-color", "black")
                    .style("border-radius", "5px")
                    .style("padding", "10px")
                    .style("color", "white")

                // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
                const showTooltip = function (event, d) {
                    tooltip
                        .transition()
                        .duration(200)
                    tooltip
                        .style("opacity", 1)
                        .html("Country: " + d.Country)
                        .style("left", (event.x) / 2 + "px")
                        .style("top", (event.y) / 2 - 50 + "px")
                }
                const moveTooltip = function (event, d) {
                    tooltip
                        .style("left", (event.x) / 2 + "px")
                        .style("top", (event.y) / 2 - 50 + "px")
                }
                const hideTooltip = function (event, d) {
                    tooltip
                        .transition()
                        .duration(200)
                        .style("opacity", 0)
                }


                // ---------------------------//
                //       HIGHLIGHT GROUP      //
                // ---------------------------//

                // What to do when one group is hovered
                const highlight = function (event, d) {
                    // reduce opacity of all groups
                    d3.selectAll(".bubbles").style("opacity", .05)
                    // expect the one that is hovered
                    d3.selectAll("." + d).style("opacity", 1)
                }

                // And when it is not hovered anymore
                const noHighlight = function (event, d) {
                    d3.selectAll(".bubbles").style("opacity", 1)
                }


                // ---------------------------//
                //       CIRCLES              //
                // ---------------------------//

                // Add dots
                svg.append('g')
                    .selectAll("dot")
                    .data(data)
                    .join("circle")
                    .attr("class", function (d) { return "bubbles " + d.Status })
                    .attr("cx", d => x(d.GDP) + 30)
                    .attr("cy", d => y(d["Life expectancy "]))
                    .attr("r", d => z(d.Population))
                    .style("fill", d => d.Status === "Developed" ? '#ef7f23' : '#31a354')
                    .style("stroke", d => d.Status === "Developed" ? '#be4803' : '#23763d')
                    // -3- Trigger the functions for hover
                    .on("mouseover", showTooltip)
                    .on("mousemove", moveTooltip)
                    .on("mouseleave", hideTooltip)



                // ---------------------------//
                //       LEGEND              //
                // ---------------------------//

                // Add legend: circles
                const valuesToShow = [10000000, 100000000, 1000000000]
                const xCircle = 590
                const xLabel = 640
                svg
                    .selectAll("legend")
                    .data(valuesToShow)
                    .join("circle")
                    .attr("cx", xCircle)
                    .attr("cy", d => height - 100 - z(d))
                    .attr("r", d => z(d))
                    .style("fill", "none")
                    .attr("stroke", "black")

                // Add legend: segments
                svg
                    .selectAll("legend")
                    .data(valuesToShow)
                    .join("line")
                    .attr('x1', d => xCircle + z(d))
                    .attr('x2', xLabel)
                    .attr('y1', d => height - 100 - z(d))
                    .attr('y2', d => height - 100 - z(d))
                    .attr('stroke', 'black')
                    .style('stroke-dasharray', ('2,2'))

                // Add legend: labels
                svg
                    .selectAll("legend")
                    .data(valuesToShow)
                    .join("text")
                    .attr('x', xLabel)
                    .attr('y', d => height - 100 - z(d))
                    .text(d => d / 1000000)
                    .style("font-size", 10)
                    .attr('alignment-baseline', 'middle')

                // Legend title
                svg.append("text")
                    .attr('x', xCircle)
                    .attr("y", height - 100 + 30)
                    .text("Population (M)")
                    .attr("text-anchor", "middle")

                // Add one dot in the legend for each name.
                const size = 20
                const allgroups = ["Developed", "Developing"]
                svg.selectAll("myrect")
                    .data(allgroups)
                    .join("circle")
                    .attr("cx", 590)
                    .attr("cy", (d, i) => 10 + i * (size + 5) + 170) // 100 is where the first dot appears. 25 is the distance between dots
                    .attr("r", 7)
                    .style("fill", d => d === "Developed" ? '#ef7f23' : '#31a354')
                    .on("mouseover", highlight)
                    .on("mouseleave", noHighlight)

                // Add labels beside legend dots
                svg.selectAll("mylabels")
                    .data(allgroups)
                    .enter()
                    .append("text")
                    .attr("x", 590 + size * .8)
                    .attr("y", (d, i) => i * (size + 5) + (size / 2) + 170) // 100 is where the first dot appears. 25 is the distance between dots
                    .style("fill", d => d === "Developed" ? '#ef7f23' : '#31a354')
                    .text(d => d)
                    .attr("text-anchor", "left")
                    .style("alignment-baseline", "middle")
                    .on("mouseover", highlight)
                    .on("mouseleave", noHighlight)
            })
        }

        const stackedChart = () => {
            const margin = { top: 10, right: 30, bottom: 20, left: 50 },
                width = 860 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            const svg = d3.select("#stacked")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            // Parse the Data
            d3.csv("data/Life Expectancy Data.csv").then(function (data) {
                const selectedCountry = ref(['Italy', 'Ireland', 'Japan', 'Libya', 'Netherlands', 'Russian Federation', 'Senegal', 'France', 'Spain', 'China'])
                data = data.filter(item => selectedCountry.value.includes(item.Country) && (item.Year === "2000" || item.Year === "2005" || item.Year === "2010" || item.Year === "2015"));

                var legendContainer = d3.select("#stack_legend");

                // Data for legend items
                var legendData = [{
                    level: '2000',
                    color: '#ef7f23'
                },
                {
                    level: '2005',
                    color: '#f39f5a'
                },
                {
                    level: '2010',
                    color: '#f7bf91'
                },
                {
                    level: '2015',
                    color: '#fbdfc8'
                }
                ];

                // Create legend items
                var legendItems = legendContainer.selectAll(".legend-item")
                    .data(legendData)
                    .enter()
                    .append("div")
                    .attr("class", "legend-item");

                // Add color boxes to legend
                legendItems.append("div")
                    .attr("class", "legend-color-box")
                    .style("background-color", function (d) {
                        return d.color;
                    });

                // Add level names to legend
                legendItems.append("div")
                    .attr("class", "legend-text")
                    .text(function (d) {
                        return d.level;
                    });

                let stackData = ref([]);
                selectedCountry.value.forEach((c) => {
                    stackData.value.push({
                        Country: c,
                        Year2000: data.find(d => d.Country === c && d.Year === "2000").GDP,
                        Year2005: data.find(d => d.Country === c && d.Year === "2005").GDP,
                        Year2010: data.find(d => d.Country === c && d.Year === "2010").GDP,
                        Year2015: data.find(d => d.Country === c && d.Year === "2015").GDP
                    })
                })
                const subgroups = ['Year2000', 'Year2005', 'Year2010', 'Year2015']

                // List of groups = species here = value of the first column called group -> I show them on the X axis
                const groups = stackData.value.map(d => d.Country)
                // Add X axis
                const x = d3.scaleBand()
                    .domain(groups)
                    .range([0, width])
                    .padding([0.2])
                svg.append("g")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x).tickSizeOuter(0));

                // Add Y axis
                const y = d3.scaleLinear()
                    .domain([0, 100])
                    .range([height, 0]);
                svg.append("g")
                    .call(d3.axisLeft(y));

                // color palette = one color per subgroup
                const color = d3.scaleOrdinal()
                    .domain(subgroups)
                    .range(['#ef7f23', '#f39f5a', '#f7bf91', '#fbdfc8'])

                // Normalize the data -> sum of each group must be 100!
                let dataNormalized = []
                stackData.value.forEach(function (d) {
                    // Compute the total
                    let tot = 0
                    for (let i in subgroups) { let name = subgroups[i]; tot += +d[name] }
                    // Now normalize
                    for (let i in subgroups) { let name = subgroups[i]; d[name] = d[name] / tot * 100 }
                })

                //stack the data? --> stack per subgroup
                const stackedData = d3.stack()
                    .keys(subgroups)(stackData.value)

                // Show the bars
                svg.append("g")
                    .selectAll("g")
                    // Enter in the stack data = loop key per key = group per group
                    .data(stackedData)
                    .join("g")
                    .attr("fill", d => color(d.key))
                    .selectAll("rect")
                    // enter a second time = loop subgroup per subgroup to add all rectangles
                    .data(d => d)
                    .join("rect")
                    .attr("x", d => {
                        return x(d.data.Country)
                    })
                    .attr("y", d => y(d[1]))
                    .attr("height", d => y(d[0]) - y(d[1]))
                    .attr("width", x.bandwidth())
            })

        }

        const doughnutChart = () => {
            // set the dimensions and margins of the graph
            const width = 750,
                height = 550,
                margin = 70;

            // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
            const radius = Math.min(width, height) / 2 - margin

            // append the svg object to the div called 'my_dataviz'
            const svg = d3.select("#doughnut")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2},${height / 2})`);

            // Create dummy data
            // const data = { a: 9, b: 20, c: 30, d: 8, e: 12, f: 3, g: 7, h: 14 }
            d3.csv("data/Life Expectancy Data.csv").then(function (data) {
                // console.log(data)
                const selectedCountry = ref(['Italy', 'Ireland', 'Japan', 'Libya', 'Netherlands', 'Russian Federation', 'Cuba', 'France', 'Spain', 'China'])

                let filteredData = data.filter(item => selectedCountry.value.includes(item.Country) && item.Year === "2010");
                // let countryNames = data.map(item => item.Country);
                // Transform the filtered data into the desired object format
                let alcoholByCountry = filteredData.reduce((acc, item) => {
                    acc[item.Country] = parseFloat(item.Alcohol);
                    return acc;
                }, {});
                function sortObjectByValues(obj) {
                    // Convert object into an array of [key, value] pairs
                    let entries = Object.entries(obj);

                    // Sort the array based on the value
                    entries.sort((a, b) => a[1] - b[1]);

                    // Convert the sorted array back into an object
                    let sortedObj = Object.fromEntries(entries);

                    return sortedObj;
                }
                alcoholByCountry = sortObjectByValues(alcoholByCountry)
                // set the color scale
                const color = d3.scaleOrdinal()
                    .domain(selectedCountry.value)
                    .range(d3.schemeSet1);

                // Compute the position of each group on the pie:
                const pie = d3.pie()
                    .sort(null) // Do not sort group by size
                    .value(d => d[1])
                const data_ready = pie(Object.entries(alcoholByCountry))

                // The arc generator
                const arc = d3.arc()
                    .innerRadius(radius * 0.5)         // This is the size of the donut hole
                    .outerRadius(radius * 0.8)

                // Another arc that won't be drawn. Just for labels positioning
                const outerArc = d3.arc()
                    .innerRadius(radius * 0.9)
                    .outerRadius(radius * 0.9)

                // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
                svg
                    .selectAll('allSlices')
                    .data(data_ready)
                    .join('path')
                    .attr('d', arc)
                    .attr('fill', d => color(d.data[1]))
                    .attr("stroke", "white")
                    .style("stroke-width", "2px")
                    .style("opacity", 0.7)

                // Add the polylines between chart and labels:
                svg
                    .selectAll('allPolylines')
                    .data(data_ready)
                    .join('polyline')
                    .attr("stroke", "black")
                    .style("fill", "none")
                    .attr("stroke-width", 1)
                    .attr('points', function (d) {
                        const posA = arc.centroid(d) // line insertion in the slice
                        const posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
                        const posC = outerArc.centroid(d); // Label position = almost the same as posB
                        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                        // console.log(d)
                        if (d.data[0] === "Libya") {
                            posC[1] -= 15;
                        }
                        return [posA, posB, posC]
                    })

                // Add the polylines between chart and labels:
                svg
                    .selectAll('allLabels')
                    .data(data_ready)
                    .join('text')
                    .text(d => d.data[0] + ` (${d.data[1]}%)`)
                    .attr('transform', function (d) {
                        const pos = outerArc.centroid(d);
                        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                        if (d.data[0] === "Libya") {
                            pos[1] -= 15;
                        }
                        return `translate(${pos})`;
                    })
                    .style('text-anchor', function (d) {
                        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                        return (midangle < Math.PI ? 'start' : 'end')
                    })
            })

        }

        const pieChart = () => {
            // set the dimensions and margins of the graph
            const width = 450,
                height = 450,
                margin = 40;

            // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
            const radius = Math.min(width, height) / 2 - margin

            // append the svg object to the div called 'my_dataviz'
            const svg = d3.select("#pie")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2}, ${height / 2})`);

            // Create dummy data
            // const data = { a: 9, b: 20, c: 30, d: 8, e: 12 }
            d3.csv("data/Life Expectancy Data.csv").then(function (data) {
                // console.log(data)
                const selectedCountry = ref(['Italy', 'Ireland', 'Japan', 'Libya', 'Netherlands', 'Russian Federation', 'Cuba', 'France', 'Spain', 'China'])
                var legendContainer = d3.select("#pie_legend");
                // set the color scale
                const color = d3.scaleOrdinal()
                    .domain(selectedCountry.value)
                    .range(d3.schemeSet3);
                // Data for legend items
                var legendData = [{
                    level: 'Italy',
                    color: color('Italy')
                },
                {
                    level: 'Ireland',
                    color: color('Ireland')
                },
                {
                    level: 'Japan',
                    color: color('Japan')
                },
                {
                    level: 'Libya',
                    color: color('Libya')
                },
                {
                    level: 'Netherlands',
                    color: color('Netherlands')
                },
                {
                    level: 'Russian Federation',
                    color: color('Russian Federation')
                },
                {
                    level: 'Cuba',
                    color: color('Cuba')
                },
                {
                    level: 'France',
                    color: color('France')
                },
                {
                    level: 'Spain',
                    color: color('Spain')
                },
                {
                    level: 'China',
                    color: color('China')
                }
                ];

                // Create legend items
                var legendItems = legendContainer.selectAll(".legend-item")
                    .data(legendData)
                    .enter()
                    .append("div")
                    .attr("class", "legend-item");

                // Add color boxes to legend
                legendItems.append("div")
                    .attr("class", "legend-color-box")
                    .style("background-color", function (d) {
                        return d.color;
                    });

                // Add level names to legend
                legendItems.append("div")
                    .attr("class", "legend-text")
                    .text(function (d) {
                        return d.level;
                    });
                let filteredData = data.filter(item => selectedCountry.value.includes(item.Country) && item.Year === "2010");
                // let countryNames = data.map(item => item.Country);
                // Transform the filtered data into the desired object format
                let alcoholByCountry = filteredData.reduce((acc, item) => {
                    acc[item.Country] = parseFloat(item['Total expenditure']);
                    return acc;
                }, {});
                function sortObjectByValues(obj) {
                    // Convert object into an array of [key, value] pairs
                    let entries = Object.entries(obj);

                    // Sort the array based on the value
                    entries.sort((a, b) => a[1] - b[1]);

                    // Convert the sorted array back into an object
                    let sortedObj = Object.fromEntries(entries);

                    return sortedObj;
                }
                alcoholByCountry = sortObjectByValues(alcoholByCountry)


                // Compute the position of each group on the pie:
                const pie = d3.pie()
                    .value(function (d) { return d[1] })
                const data_ready = pie(Object.entries(alcoholByCountry))
                // Now I know that group A goes from 0 degrees to x degrees and so on.

                // shape helper to build arcs:
                const arcGenerator = d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius)

                // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
                svg
                    .selectAll('mySlices')
                    .data(data_ready)
                    .join('path')
                    .attr('d', arcGenerator)
                    .attr('fill', function (d) { return (color(d.data[0])) })
                    .attr("stroke", "black")
                    .style("stroke-width", "2px")
                    .style("opacity", 0.7)

                // Now add the annotation. Use the centroid method to get the best coordinates
                svg
                    .selectAll('mySlices')
                    .data(data_ready)
                    .join('text')
                    .text(function (d) { return d.data[1] + "%" })
                    .attr("transform", function (d) { return `translate(${arcGenerator.centroid(d)})` })
                    .style("text-anchor", "middle")
                    .style("font-size", 13)
            })
        }

        const lineChart = () => {
            // set the dimensions and margins of the graph
            const margin = { top: 20, right: 30, bottom: 40, left: 70 },
                width = 860 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            const svg = d3.select("#line")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            //Read the data
            // d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered.csv").then(function (data) {
            d3.csv("data/Life Expectancy Data.csv").then(function (data) {
                let DevelopedCountry = data.filter(item => item.Status === 'Developed');
                let DevelopingCountry = data.filter(item => item.Status === 'Developing');
                let developing = {};
                let developed = {};
                DevelopedCountry.forEach((d) => {
                    developed[d.Year] = (developed[d.Year] ? developed[d.Year] : 0) + parseFloat(d["Adult Mortality"])
                })
                DevelopingCountry.forEach((d) => {
                    developing[d.Year] = (developing[d.Year] ? developing[d.Year] : 0) + parseFloat(d["Adult Mortality"])
                })

                Object.entries(developed).forEach(([year, value]) => {
                    developed[year] = value / DevelopedCountry.length
                })
                Object.entries(developing).forEach(([year, value]) => {
                    developing[year] = value / DevelopingCountry.length
                })

                var legendContainer = d3.select("#line_legend");

                // Data for legend items
                var legendData = [{
                    level: 'Developed',
                    color: '#ef7f23'
                },
                {
                    level: 'Developing',
                    color: '#31a354'
                }
                ];

                // Create legend items
                var legendItems = legendContainer.selectAll(".legend-item")
                    .data(legendData)
                    .enter()
                    .append("div")
                    .attr("class", "legend-item");

                // Add color boxes to legend
                legendItems.append("div")
                    .attr("class", "legend-color-box")
                    .style("background-color", function (d) {
                        return d.color;
                    });

                // Add level names to legend
                legendItems.append("div")
                    .attr("class", "legend-text")
                    .text(function (d) {
                        return d.level;
                    });


                const years = Object.keys(developed)
                let readyData = { developed, developing }

                const sumstat = d3.group(readyData);

                // Add Y axis
                const y = d3.scaleLinear()
                    .domain([0, d3.max(Object.entries(readyData.developing), function ([year, value]) { return value })])
                    .range([height, 0]);
                svg.append("g")
                    .call(d3.axisLeft(y));
                svg.append("text")
                    .attr("class", "axis-label")
                    .attr("x", width - 20)
                    .attr("y", height + margin.bottom - 5) // Adjusted the y-coordinate
                    .style("text-anchor", "middle")
                    .style("fill", "black")
                    .style("font-size", 10)
                    .text("Year");
                svg.append("text")
                    .attr("class", "axis-label")
                    .attr("x", -10)
                    .attr("y", -5)
                    .style("text-anchor", "middle")
                    .style("fill", "black")
                    .style("font-size", 10)
                    .text("Adult Mortality Avarage");
                // color palette
                const color = d3.scaleOrdinal()
                    .range(Object.entries(readyData.developing))

                let transformedData = [];

                Object.keys(sumstat.developed).forEach(year => {
                    transformedData.push({
                        key: year,
                        values: [sumstat.developed[year], sumstat.developing[year]]
                    });
                });

                var xScale = d3.scaleTime()
                    .domain(d3.extent(transformedData, function (d) { return d3.timeParse("%Y")(d.key); }))
                    .range([0, width]); // Make sure 'width' is defined

                var yScale = d3.scaleLinear()
                    .domain([0, d3.max(transformedData, function (d) { return d.values[1]; })])
                    .range([height, 0]); // Make sure 'height' is defined

                // Append X axis
                svg.append("g")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(xScale));

                var lineGenerator = d3.line()
                    .x(function (d) { return xScale(d3.timeParse("%Y")(d.key)); })
                    .y(function (d) { return yScale(d.values[0]); });

                var lineGenerator1 = d3.line()
                    .x(function (d) { return xScale(d3.timeParse("%Y")(d.key)); })
                    .y(function (d) { return yScale(d.values[1]); });

                // Draw the line
                svg.append("path")
                    .datum(transformedData) // Use datum for a single line (whole dataset)
                    .attr("fill", "none")
                    .attr("stroke", '#ef7f23') // Example: set a fixed color or use your color scale
                    .attr("stroke-width", 1.5)
                    .attr("d", lineGenerator);

                svg.append("path")
                    .datum(transformedData) // Use datum for a single line (whole dataset)
                    .attr("fill", "none")
                    .attr("stroke", '#31a354') // Example: set a fixed color or use your color scale
                    .attr("stroke-width", 1.5)
                    .attr("d", lineGenerator1);

            })

        }

        const barChart = () => {
            // set the dimensions and margins of the graph
            const margin = { top: 10, right: 30, bottom: 20, left: 50 },
                width = 760 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            const svg = d3.select("#bar")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            // Parse the Data
            d3.csv("data/Life Expectancy Data.csv").then(function (data) {
                const selectedCountry = ref(['Italy', 'Ireland', 'Australia', 'Bangladesh', 'Netherlands', 'Spain'])
                data = data.filter(item => selectedCountry.value.includes(item.Country) && item.Year === '2015');

                const subgroups = ["Measles ", "Hepatitis B", "Diphtheria ", "Polio"]


                // Add X axis
                const x = d3.scaleBand()
                    .domain(selectedCountry.value)
                    .range([0, width])
                    .padding([0.2])
                svg.append("g")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x).tickSize(0));

                // Add Y axis
                const y = d3.scaleLinear()
                    .domain([0, 260])
                    .range([height, 0]);
                svg.append("g")
                    .call(d3.axisLeft(y));

                // Another scale for subgroup position?
                const xSubgroup = d3.scaleBand()
                    .domain(subgroups)
                    .range([0, x.bandwidth()])
                    .padding([0.05])

                // color palette = one color per subgroup
                const color = d3.scaleOrdinal()
                    .domain(subgroups)
                    .range(['#ef7f23', '#31a354', '#4F709C', '#C63D2F'])

                var legendContainer = d3.select("#bar_legend");

                // Data for legend items
                var legendData = [{
                    level: "Measles ",
                    color: color("Measles ")
                },
                {
                    level: "Hepatitis B",
                    color: color("Hepatitis B")
                },
                {
                    level: "Diphtheria ",
                    color: color("Diphtheria ")
                },
                {
                    level: "Polio",
                    color: color("Polio")
                }
                ];

                // Create legend items
                var legendItems = legendContainer.selectAll(".legend-item")
                    .data(legendData)
                    .enter()
                    .append("div")
                    .attr("class", "legend-item");

                // Add color boxes to legend
                legendItems.append("div")
                    .attr("class", "legend-color-box")
                    .style("background-color", function (d) {
                        return d.color;
                    });

                // Add level names to legend
                legendItems.append("div")
                    .attr("class", "legend-text")
                    .text(function (d) {
                        return d.level;
                    });

                // Show the bars
                svg.append("g")
                    .selectAll("g")
                    // Enter in data = loop group per group
                    .data(data)
                    .join("g")
                    .attr("transform", d => {
                        return `translate(${x(d.Country)}, 0)`
                    })
                    .selectAll("rect")
                    .data(function (d) {
                        return subgroups.map(function (key) {
                            // console.log({ key: d.Country, value: d[key], type: `${key}` })
                            return { key: d.Country, value: d[key], type: `${key}` };
                        });
                    })
                    .join("rect")
                    .attr("x", d => {
                        // console.log(d , xSubgroup(d.value))
                        return xSubgroup(d.type)
                    })
                    .attr("y", d => y(d.value))
                    .attr("width", xSubgroup.bandwidth())
                    .attr("height", d => {
                        // console.log(y(d.value));
                        return height - y(d.value)
                    })
                    .attr("fill", d => color(d.type));

            })

        }

        const Butterfly = {
            initialize: function (selectedDataset) {
                // Set the dimensions and margins of the graph
                var margin = {
                    top: 20,
                    right: 90,
                    bottom: 40,
                    left: 90
                },
                    width = 800 - margin.left - margin.right,
                    height = 550 - margin.top - margin.bottom;

                d3.csv(selectedDataset).then(function (data) {
                    let DevelopedCountry = data.filter(item => item.Status === 'Developed');
                    let DevelopingCountry = data.filter(item => item.Status === 'Developing');
                    let developing = {};
                    let developed = {};
                    DevelopedCountry.forEach((d) => {
                        developed[d.Year] = (developed[d.Year] ? developed[d.Year] : 0) + parseFloat(d["Adult Mortality"])
                    })
                    DevelopingCountry.forEach((d) => {
                        developing[d.Year] = (developing[d.Year] ? developing[d.Year] : 0) + parseFloat(d["Adult Mortality"])
                    })
                    let fixedData = []
                    Object.entries(developed).forEach(([year, value]) => {
                        developed[year] = value / DevelopedCountry.length
                        fixedData.push({ Year: year, value: developed[year], Status: 'developed' })
                    })
                    Object.entries(developing).forEach(([year, value]) => {
                        developing[year] = value / DevelopingCountry.length
                        fixedData.push({ Year: year, value: developed[year], Status: 'developing' })
                    })



                    // Append the svg object to the div of the chart
                    const svg = d3.select("#pyramid")
                        .append("svg")
                        .attr("viewBox", [0, 0, width, height])
                        .attr("font-size", 10)
                        .attr("id", "pyramid_svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", `translate(${margin.left - 70}, ${margin.top})`);

                    var len = fixedData.length;

                    var xM = d3.scaleLinear()
                        .domain([0, d3.max(fixedData.filter(d => d.Status === 'developed'), d => +d.value)])
                        .rangeRound([width / 2, margin.left]);

                    var xF = d3.scaleLinear()
                        .domain([0, d3.max(fixedData.filter(d => d.Status === 'developing'), d => +d.value)])
                        .rangeRound([width / 2, width - margin.right]);

                    var y = d3.scaleBand()
                        .domain(fixedData.map(d => d.Year))
                        .rangeRound([height - margin.bottom, margin.top])
                        .padding(0.1);

                    var xAxis = g => g
                        .attr("transform", `translate(0,${height - margin.bottom})`)
                        .call(g => g.append("g")
                            .attr("transform", `translate(-50,0)`)
                            .call(d3.axisBottom(xM).ticks(5, "s").tickSizeOuter(0))
                            .selectAll(".tick line")
                            .attr("stroke", "black"))
                        .call(g => g.selectAll(".tick text")
                            .attr("fill", "black")
                            .text(d => d))
                        .call(g => g.append("g")
                            .attr("transform", `translate(50,0)`)
                            .call(d3.axisBottom(xF).ticks(5, "s").tickSizeOuter(0))
                            .selectAll(".tick line")
                            .attr("stroke", "black"))
                        .call(g => g.selectAll(".tick text")
                            .attr("fill", "black")
                            .text(d => d))
                        // Add X axis label
                        .call(g => g.append("text")
                            .attr("class", "axis-label")
                            .attr("x", width - 309)
                            .attr("y", height - 474)
                            .style("text-anchor", "middle")
                            .style("fill", "black")
                            .style("font-size", 10)
                            .text("Years"));

                    var yAxisF = g => g
                        .attr("transform", `translate(${xF(0) + 50}, 0)`)
                        .call(d3.axisRight(y).tickSize(-5).tickFormat(''))
                        .call(g => g.selectAll(".tick line").attr("stroke", "black"));

                    var yAxisM = g => g
                        .attr("transform", `translate(${xM(0) - 50}, 0)`)
                        .call(d3.axisRight(y).tickSize(5).tickFormat(''))
                        .call(g => g.selectAll(".tick line").attr("stroke", "black"));

                    // Append the rectangles without width initially
                    const bars = svg.append("g")
                        .selectAll("rect")
                        .data(fixedData)
                        .enter()
                        .append("rect")
                        .attr("transform", d => d.Status === "developing" ? `translate(50,0)` : `translate(-50,0)`)
                        .attr("x", d => d.Status === "developed" ? xM(0) : xF(0))
                        .attr("y", d => y(d.Year))
                        .attr("width", 0) // Initially set width to 0
                        .attr("height", y.bandwidth())
                        .attr("stroke", "black")
                        .attr("stroke-width", 0.5)
                        .attr("fill", d => d.Status === "developing" ? '#31a354' : '#ef7f23')
                        .style("opacity", 0.7);

                    // Transition to gradually increase width for each bar pair
                    bars.transition()
                        .duration(1000)
                        .delay((d, i) => i * 20) // Add delay for each bar pair
                        .attr("x", d => d.Status === "developed" ? xM(+d.value) : xF(0)) // Set initial x position
                        .attr("width", d => d.Status === "developed" ? xM(0) - xM(+d.value) : xF(+d.value) - xF(0)); // Set width based on percentage

                    svg.append("g")
                        .selectAll("text")
                        .data(fixedData)
                        .enter()
                        .append("text")
                        .attr("text-anchor", "middle")
                        .attr("x", (xF(0) + xM(0)) / 2) // Placing text in the middle of the space
                        .attr("y", d => y(d.Year) + y.bandwidth() / 2)
                        .attr("dy", "0.35em")
                        .attr("fill", "black")
                        .text(d => d.Year);

                    svg.append("g")
                        .attr("fill", "white")
                        .selectAll("text")
                        .data(fixedData)
                        .join("text")
                        .attr("text-anchor", d => d.Status === "developed" ? "start" : "end")
                        .attr("x", d => d.Status === "developed" ? xM(+d.value) - 46 : xF(+d.value) + 46)
                        .attr("y", d => y(d.Year) + y.bandwidth() / 2)
                        .attr("dy", "0.35em")
                        .text(d => d.value);

                    svg.append("text")
                        .attr("transform", `translate(-50,-10)`)
                        .attr("text-anchor", "end")
                        .attr("fill", "black")
                        .attr("dy", "0.35em")
                        .attr("x", xM(0) - 4)
                        .attr("y", y(fixedData[len - 1].Year) - y.bandwidth() / 2)
                        .text("developed");

                    svg.append("text")
                        .attr("transform", `translate(50,-10)`)
                        .attr("text-anchor", "start")
                        .attr("fill", "black")
                        .attr("dy", "0.35em")
                        .attr("x", xF(0) + 4)
                        .attr("y", y(fixedData[len - 1].Year) - y.bandwidth() / 2)
                        .text("developing");

                    svg.append("g")
                        .call(xAxis);

                    svg.append("g")
                        .call(yAxisF);

                    svg.append("g")
                        .call(yAxisM);

                });
            },

            destroy: function () {
                const existingSvg = document.querySelectorAll("[id='pyramid_svg']");
                existingSvg.forEach(svg => svg.parentNode.removeChild(svg));

                // Remove the reference from the global object
                delete window.Butterfly;
            }
        }

        const lollipopChart = () => {
            // set the dimensions and margins of the graph
            const margin = { top: 10, right: 30, bottom: 40, left: 100 },
                width = 760 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            const svg = d3.select("#lollipop")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

            // Parse the Data
            // d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_cleveland.csv").then(function (data) {
            d3.csv("data/Life Expectancy Data.csv").then(function (data) {
                // console.log(data)
                const selectedCountry = ref(['Italy', 'Ireland', 'Japan', 'Austria', 'Netherlands', 'Belgium', 'Cuba', 'France', 'Spain', 'China'])

                let groupedData = {};
                let filteredData = data.filter(item => selectedCountry.value.includes(item.Country));
                filteredData.forEach(item => {
                    let country = item.Country;
                    // let gdp = parseFloat(item['Alcohol']); // Replace 'GDP' with the actual key for GDP in your data
                    let gdp = +item['Adult Mortality']; // Replace 'GDP' with the actual key for GDP in your data

                    if (!groupedData[country]) {
                        groupedData[country] = { min: gdp, max: gdp };
                    } else {
                        if (gdp < groupedData[country].min) {
                            groupedData[country].min = gdp;
                        }
                        if (gdp > groupedData[country].max) {
                            groupedData[country].max = gdp;
                        }
                    }
                });
                let result = Object.keys(groupedData).map(country => ({
                    Country: country,
                    Min: groupedData[country].min,
                    Max: groupedData[country].max
                }));
                // console.log(result)

                let maxValues = result.map(item => item.Max);
                let highestMax = Math.max(...maxValues);
                // Add X axis
                const x = d3.scaleLinear()
                    .domain([0, highestMax])
                    .range([0, width]);
                svg.append("g")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x))

                // Y axis
                const y = d3.scaleBand()
                    .range([0, height])
                    .domain(result.map(function (d) { return d.Country; }))
                    .padding(1);
                svg.append("g")
                    .call(d3.axisLeft(y))
                svg.append("text")
                    .attr("class", "axis-label")
                    .attr("x", width - 20)
                    .attr("y", height + margin.bottom - 5) // Adjusted the y-coordinate
                    .style("text-anchor", "middle")
                    .style("fill", "black")
                    .style("font-size", 10)
                    .text("Adult Mortality");
                // Lines
                svg.selectAll("myline")
                    .data(result)
                    .join("line")
                    .attr("x1", function (d) { return x(d.Min); })
                    .attr("x2", function (d) { return x(d.Max); })
                    .attr("y1", function (d) { return y(d.Country); })
                    .attr("y2", function (d) { return y(d.Country); })
                    .attr("stroke", "grey")
                    .attr("stroke-width", "1px")

                // Circles of variable 1
                svg.selectAll("mycircle")
                    .data(result)
                    .join("circle")
                    .attr("cx", function (d) { return x(d.Min); })
                    .attr("cy", function (d) { return y(d.Country); })
                    .attr("r", "6")
                    .style("fill", "#69b3a2")

                // Circles of variable 2
                svg.selectAll("mycircle")
                    .data(result)
                    .join("circle")
                    .attr("cx", function (d) { return x(d.Max); })
                    .attr("cy", function (d) { return y(d.Country); })
                    .attr("r", "6")
                    .style("fill", "#4C4082")
            })
        }

        const scatterPlot = () => {
            // set the dimensions and margins of the graph
            const margin = { top: 20, right: 40, bottom: 50, left: 110 },
                width = 760 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            const svg = d3.select("#scatter")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

            //Read the data
            // d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv").then(function (data) {
            d3.csv("data/Life Expectancy Data.csv").then(function (data) {
                data = data.filter(item => item.Year === "2015");

                // Add X axis
                let maxSchooling = data.map(item => item.Schooling);
                let MaxX = Math.max(...maxSchooling);

                let maxMorality = data.map(item => item["Adult Mortality"]);
                let MaxY = Math.max(...maxMorality);

                const x = d3.scaleLinear()
                    .domain([0, MaxX])
                    .range([0, width]);
                svg.append("g")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x));
                svg.append("text")
                    .attr("class", "axis-label")
                    .attr("x", width - 20)
                    .attr("y", height + margin.bottom - 10) // Adjusted the y-coordinate
                    .style("text-anchor", "middle")
                    .style("fill", "black")
                    .style("font-size", 10)
                    .text("Schooling");
                // Add Y axis
                const y = d3.scaleLinear()
                    .domain([0, MaxY])
                    .range([height, 0]);
                svg.append("g")
                    .call(d3.axisLeft(y));
                // Add Y axis label
                svg.append("text")
                    .attr("class", "axis-label")
                    .attr("x", -10)
                    .attr("y", -5)
                    .style("text-anchor", "middle")
                    .style("fill", "black")
                    .style("font-size", 10)
                    .text("Adult Mortality");
                // Add dots
                // console.log(data)
                svg.append('g')
                    .selectAll("dot")
                    .data(data)
                    .join("circle")
                    .attr("cx", function (d) { return x(d.Schooling); })
                    .attr("cy", function (d) { return y(d["Adult Mortality"]); })
                    .attr("r", 4)
                    .style("fill", "#69b3a2")

            })
        }

        const heatmap = () => {
            // set the dimensions and margins of the graph
            const margin = { top: 30, right: 30, bottom: 30, left: 30 },
                width = 750 - margin.left - margin.right,
                height = 700 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            const svg = d3.select("#heatmap")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);
            // create a tooltip
            const tooltip = d3.select("#heatmap")
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "2px")
                .style("border-radius", "5px")
                .style("padding", "5px")

            // Three function that change the tooltip when user hover / move / leave a cell
            const mouseover = function (event, d) {
                tooltip.style("opacity", 1)
            }
            const mousemove = function (event, d) {
                tooltip
                    .html("The exact value of<br>this cell is: " + d[" BMI "])
                    .style("left", (event.x) / 2 + "px")
                    .style("top", (event.y) / 2 + "px")
            }
            const mouseleave = function (d) {
                tooltip.style("opacity", 0)
            }


            //Read the data
            d3.csv("data/Life Expectancy Data.csv").then(function (data) {
                // console.log(data)
                const selectedCountry = ref(['Italy', 'Ireland', 'Japan', 'Austria', 'Netherlands', 'Belgium', 'Cuba', 'France', 'Spain', 'China'])
                const myVars = data.filter(item => item.Country === "Italy").map(x => x.Year).reverse();
                let filteredData = data.filter(item => selectedCountry.value.includes(item.Country));
                // console.log(myGroups)

                // Labels of row and columns
                const myGroups = selectedCountry.value.sort();

                // Build X scales and axis:
                const x = d3.scaleBand()
                    .range([0, width])
                    .domain(myGroups)
                    .padding(0.01);
                svg.append("g")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x))

                // Build X scales and axis:
                const y = d3.scaleBand()
                    .range([height, 0])
                    .domain(myVars)
                    .padding(0.01);
                svg.append("g")
                    .call(d3.axisLeft(y));

                // Build color scale
                const myColor = d3.scaleLinear()
                    .range(["white", "#69b3a2"])
                    .domain([1, 100])
                const colorBarSvg = d3
                    .select("#colorBar")
                    .attr('width', width + margin.left + margin.right - 100)
                    .attr('height', 50)
                    .append('g')
                    .attr('transform', `translate(${margin.left},${5})`);
                // Draw the color bar
                colorBarSvg
                    .selectAll('rect')
                    .data(d3.range(0, 70, 7))
                    .enter()
                    .append('rect')
                    .attr('x', (d, i) => i * (width / 10 - 15))
                    .attr('width', width / 10)
                    .attr('height', 20)
                    .attr('fill', (d) => myColor(d));

                // Add range numbers below each color
                colorBarSvg
                    .selectAll('text')
                    .data(d3.range(0, 70, 7))
                    .enter()
                    .append('text')
                    .text((d) => d.toFixed(2)) // Adjust decimal places as needed
                    .attr('x', (d, i) => i * (width / 10 - 15))
                    .attr('y', 40)
                    .attr('text-anchor', 'middle')
                    .style('font-size', '12px')
                    .style('fill', '#000');
                svg.selectAll()
                    .data(filteredData, function (d) { return d.Country + ':' + d.Year; })
                    .join("rect")
                    .attr("x", function (d) { return x(d.Country) })
                    .attr("y", function (d) { return y(d.Year) })
                    .attr("width", x.bandwidth())
                    .attr("height", y.bandwidth())
                    .style("fill", function (d) {
                        return myColor(d[" BMI "])
                    })
                    // return myColor(d.Schooling) })
                    .on("mouseover", mouseover)
                    .on("mousemove", mousemove)
                    .on("mouseleave", mouseleave)

            })
        }

        const BoxPlot = {
            initialize: function () {
                // Set the dimensions and margins of the graph
                var margin = {
                    top: 50,
                    right: 30,
                    bottom: 50,
                    left: 70
                },
                    width = 750 - margin.left - margin.right,
                    height = 1100 - margin.top - margin.bottom;

                var tooltip = null;

                // Append the svg object to the div of the chart
                var svg = d3.select("#boxplot")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

                // Read the data and compute summary statistics for each country
                d3.csv("data/Life Expectancy Data.csv").then(function (data) {
                    const selectedCountry = ref(['Italy', 'Ireland', 'Japan', 'Austria', 'Netherlands', 'Belgium', 'Cuba', 'France', 'Spain', 'China'])
                    data = data.filter(item => selectedCountry.value.includes(item.Country));

                    let maxTP = data.map(item => item["Total expenditure"]);
                    let MaxX = Math.max(...maxTP);

                    var sumstat = d3.group(data, d => d.Country);
                    sumstat = Array.from(sumstat, ([key, values]) => {
                        let q1 = d3.quantile(values.map(g => g["Total expenditure"]).sort(d3.ascending), 0.25);
                        let median = d3.quantile(values.map(g => g["Total expenditure"]).sort(d3.ascending), 0.5);
                        let q3 = d3.quantile(values.map(g => g["Total expenditure"]).sort(d3.ascending), 0.75);
                        let interQuantileRange = q3 - q1;

                        // Find the minimum and maximum values in the dataset
                        var datasetMin = d3.min(values, d => d["Total expenditure"]);
                        var datasetMax = d3.max(values, d => d["Total expenditure"]);

                        // Calculate min and max while considering the dataset boundaries
                        let min = Math.max(q1 - 1.5 * interQuantileRange, datasetMin);
                        let max = Math.min(q3 + 1.5 * interQuantileRange, datasetMax);

                        let mean = d3.mean(values, d => d["Total expenditure"]); // Calculate mean for each country

                        return {
                            key: key,
                            points: values,
                            n_values: values.length,
                            value: {
                                q1: q1,
                                median: median,
                                q3: q3,
                                interQuantileRange: interQuantileRange,
                                min: min,
                                max: max,
                                mean: mean
                            }
                        }
                    });

                    // Show the Y scale
                    var y = d3.scaleBand()
                        .range([0, height])
                        .domain(data.map(d => d.Country).filter((value, index, self) => self.indexOf(value) === index))
                        .paddingInner(1)
                        .paddingOuter(.5)
                    svg.append("g")
                        .attr("class", "axis")
                        .call(d3.axisLeft(y))
                        .selectAll("text")
                        .attr("fill", "black")
                        .style("text-anchor", "end");

                    // Show the X scale
                    var x = d3.scaleLinear()
                        .domain([0, MaxX])
                        .range([0, width])
                    svg.append("g").attr("class", "axis").attr("transform", "translate(0," + height + ")")
                        .call(d3.axisBottom(x).tickFormat((d) => (d === 0 ? d : d)))
                        .selectAll("text")
                        .attr("fill", "black");

                    // Add X axis label
                    svg.append("text")
                        .attr("class", "axis-label")
                        .attr("x", width - 20)
                        .attr("y", height + margin.bottom - 20) // Adjusted the y-coordinate
                        .style("text-anchor", "middle")
                        .style("fill", "black")
                        .style("font-size", 10)
                        .text("Total expenditure");

                    // Add a second X-axis at the top
                    svg.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(0, 0)")
                        .call(d3.axisTop(x).tickFormat((d) => (d === 0 ? d : d)))
                        .selectAll("text")
                        .attr("fill", "black");

                    // Add second X axis label
                    svg.append("text")
                        .attr("class", "axis-label")
                        .attr("x", width - 30)
                        .attr("y", margin.top - 75) // Adjusted the y-coordinate
                        .style("text-anchor", "middle")
                        .style("fill", "black")
                        .style("font-size", 10)
                        .text("Total expenditure");

                    // Select lines of X,Y axes
                    svg.selectAll(".axis")
                        .selectAll("line")
                        .attr("stroke", "black");

                    svg.selectAll("line.grid-line")
                        .data(y.domain()) // Use y.domain() to get the unique values for the band scale
                        .enter()
                        .append("line")
                        .attr("class", "grid-line")
                        .attr("x1", 0)
                        .attr("x2", width)
                        .attr("y1", d => y(d) + y.bandwidth() / 2)
                        .attr("y2", d => y(d) + y.bandwidth() / 2)
                        .attr("stroke", "rgba(0, 0, 0, 0.1)");

                    svg.selectAll("line.grid-line-x")
                        .data(x.ticks())
                        .enter()
                        .append("line")
                        .attr("class", "grid-line-x")
                        .attr("x1", d => x(d))
                        .attr("x2", d => x(d))
                        .attr("y1", 0)
                        .attr("y2", height)
                        .attr("stroke", "rgba(0, 0, 0, 0.1)");

                    // Show the main horizontal line
                    svg
                        .selectAll("horizLines")
                        .data(sumstat)
                        .enter()
                        .append("line")
                        .attr("x1", function (d) {
                            return (x(d.value.min))
                        })
                        .attr("x2", function (d) {
                            return (x(d.value.max))
                        })
                        .attr("y1", function (d) {
                            return (y(d.key) + y.bandwidth() / 2)
                        })
                        .attr("y2", function (d) {
                            return (y(d.key) + y.bandwidth() / 2)
                        })
                        .attr("stroke", "black")
                        .style("width", 40)

                    // Rectangle for the main box
                    var boxHeight = 35
                    svg
                        .selectAll("boxes")
                        .data(sumstat)
                        .enter()
                        .append("rect")
                        .attr("x", function (d) {
                            return (x(d.value.q1))
                        })
                        .attr("y", function (d) {
                            return (y(d.key) - boxHeight / 2)
                        })
                        .attr("width", function (d) {
                            return (x(d.value.q3) - x(d.value.q1))
                        })
                        .attr("height", boxHeight)
                        .attr("stroke", "black")
                        .attr("stroke-width", 1)
                        .style("fill", "#ef7f23")
                        .on("mouseover", function (event, d) {
                            d3.select(this).attr("stroke-width", 2);

                            if (!tooltip) {
                                tooltip = d3.select("body").append("div")
                                    .attr("class", "tooltip")
                                    .style("opacity", 0);
                            }

                            // Show the tooltip
                            tooltip.transition()
                                .duration(200)
                                .style("opacity", 1);

                            tooltip.html(`Computed on ${d.n_values} points<br>
                                  <i>Mean</i>: ${d.value.mean.toFixed(1)}%<br><br>
                                  <b>Lower bound</b>: ${d.value.min.toFixed(1)}%<br>
                                  <b>Median</b>: ${d.value.median.toFixed(1)}%<br>
                                  <b>Upper bound</b>: ${d.value.max.toFixed(1)}%`)
                                .style("left", (event.pageX + 10) + "px")
                                .style("top", (event.pageY - 20) + "px");
                        })
                        .on("mousemove", function (event, d) {
                            // Move the tooltip with the mouse pointer
                            tooltip.style("left", (event.pageX + 10) + "px")
                                .style("top", (event.pageY + 10) + "px");
                        })
                        .on("mouseout", function (d) {
                            d3.select(this).attr("stroke-width", 1);

                            if (tooltip) {
                                tooltip.transition()
                                    .duration(500)
                                    .style("opacity", 0)
                                    .remove();
                                tooltip = null; // Reset tooltip variable
                            }
                        });

                    // Show the median
                    svg
                        .selectAll("medianLines")
                        .data(sumstat)
                        .enter()
                        .append("line")
                        .attr("x1", function (d) {
                            return (x(d.value.median))
                        })
                        .attr("x2", function (d) {
                            return (x(d.value.median))
                        })
                        .attr("y1", function (d) {
                            return (y(d.key) - boxHeight / 2)
                        })
                        .attr("y2", function (d) {
                            return (y(d.key) + boxHeight / 2)
                        })
                        .attr("stroke", "red")
                        .style("width", 80)
                });
            }

        }
        const AllData = ref();
        onMounted(async () => {
            d3.csv("data/Life Expectancy Data.csv").then(function (data) {
                AllData.value = data;
                Choropleth.initialize();
            });
            bubbleChart();
            stackedChart();
            doughnutChart();
            pieChart();
            lineChart()
            barChart()
            Butterfly.initialize("data/Life Expectancy Data.csv");
            lollipopChart()
            scatterPlot()
            heatmap();
            BoxPlot.initialize();
        });
        return {}
    }
}
</script>

<style lang="scss" scoped>
.final {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    font-family: Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

    ::v-deep() {
        .link {
            fill: none;
            stroke: #161616;
            stroke-opacity: .2;
        }

        .link:hover {
            stroke: #000000;
            stroke-opacity: 1;
        }


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

    &__section {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 30px;

        &__title {
            font-size: 2rem;
            font-weight: bold;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
                margin-left: 20px;
                width: 250px;
                border-radius: 50px;
                height: 20px;
                background-color: rgb(49, 163, 84);
            }

            &::before {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
                margin-left: -270px;
                width: 250px;
                border-radius: 50px;
                height: 20px;
                background-color: rgb(49, 163, 84);
            }
        }

        &__desc {
            width: 60%;
            margin-top: 10px;
            text-align: justify;
        }

        &__chart {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            margin-top: 40px;

            &__title {
                font-size: 1.5rem;
                font-weight: 400;
                position: relative;

                &::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    margin-left: 20px;
                    width: 210px;
                    border-radius: 50px;
                    height: 5px;
                    background-color: rgb(161, 217, 155);
                }

                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    margin-left: -230px;
                    width: 210px;
                    border-radius: 50px;
                    height: 5px;
                    background-color: rgb(161, 217, 155);
                }
            }

            &__detail {
                width: 60%;
                margin-top: 10px;
                text-align: justify;
                color: rgb(104, 104, 104);

            }
        }
    }
}

.tooltip {
    position: absolute;
    z-index: 1070;
    display: block;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;
    text-align: start;
    text-decoration: none;
    text-shadow: none;
    text-transform: none;
    letter-spacing: normal;
    word-break: normal;
    word-spacing: normal;
    white-space: normal;
    line-break: auto;
    font-size: 0.875rem;
    word-wrap: break-word;
    opacity: 0;
}

.tooltip.show {
    opacity: 0.9;
}

::v-deep() {
    #stack_legend {
        margin: 10px 0;
        width: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .legend-item {
        display: inline-block;
        padding-right: 40px;
        vertical-align: middle;
        margin-top: 10px;
    }

    .legend-color-box {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-right: 5px;
    }
}

.tooltip .arrow {
    position: absolute;
    display: block;
    width: 0.8rem;
    height: 0.4rem;
}

.tooltip .arrow::before {
    position: absolute;
    content: "";
    border-color: transparent;
    border-style: solid;
}</style>