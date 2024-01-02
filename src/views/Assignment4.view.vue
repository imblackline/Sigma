<template>
    <div class="assignment4">
        <div class="assignment4__header">
            <div class="assignment4__header__btn">
                <button class="assignment4__header__btn__homebtn" @click="$router.back()">
                    <span>Back home</span>
                    <svg viewBox="-5 -5 110 110" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0" />
                    </svg>
                </button>
            </div>
            <section class="wrapper">
                <div class="top">Maps</div>
                <div class="bottom" aria-hidden="true">Maps</div>
            </section>
        </div>
        <h2 class="assignment4__Title">-- Dot Density Map --</h2>
        <p class="assignment4__Detail">This map, designed with a dot density approach, visualizes tree populations across
            various U.S. states. In this representation, every dot stands for a specified quantity of trees. It effectively
            displays the differing densities of trees, providing an immediate grasp of tree distribution trends regionally.
            Such a visual tool is valuable for environmental and forestry studies, offering crucial data about tree density
            for strategic conservation and land management planning.
        </p>
        <div class="container" ref="container">
            <div ref="mapContainer"></div>
        </div>
        <h2 class="assignment4__Title">-- Choropleth Map --</h2>
        <p class="assignment4__Detail">For the creation of our Choropleth map, we utilized GeoJson data detailing the
            geographical layout of the states in the United States. This data was sourced from publicly accessible
            databases. To represent tree abundance, we aggregated the total number of trees present in each state.
            Additionally, we calculated the total land area occupied by these trees within each respective state. This
            comprehensive data, encompassing both the count of trees and the area they cover, is conveniently displayed in a
            tooltip. This tooltip activates and provides detailed information when a user hovers over any state on the map,
            offering an interactive and informative experience.
        </p>
        <div id="choropleth"></div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import * as d3 from 'd3';
import * as topojson from "https://cdn.skypack.dev/topojson@3.0.2";
import * as turf from '@turf/turf';

const mapContainer = ref(null);
const container = ref(null);
const loadchart = ref(true);

const initializeChoropleth = () => {
    var margin = { top: 60, right: 70, bottom: 70, left: 100 },
        width = 1435 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    const legendWidth = 110;
    const legendHeight = 300;

    const legendX = width - legendWidth - 80;
    const legendY = height / 2 - legendHeight / 2 - 220;

    let projection = d3.geoAlbersUsa()
        .scale(width - 20)
        .translate([width / 2, height / 2]);

    let tooltip = null;

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
            .style("stroke", d.properties.abundance != 0 ? "#5c73a2" : "black")
            .style("stroke-width", "2px");

        if (!tooltip) {
            tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);
        }

        tooltip.html(d.properties.name + ' &#40;' + d.properties.postal + '&#41;: ' + d.properties.abundance + ' trees in '
            + d.properties.area + ' km<sup>2</sup>')
            .style("left", (event.pageX + 15) + "px")
            .style("top", (event.pageY - 28) + "px")
            .transition().duration(400)
            .style("opacity", 1);
    };

    let mouseLeave = function () {
        d3.selectAll(".Country")
            .transition()
            .duration(200)
            .style("opacity", 1)
            .style("stroke", "black")
            .style("stroke-width", "0.75px");
        if (tooltip) {
            tooltip.transition().duration(300)
                .style("opacity", 0)
                .remove();
            tooltip = null;
        }
    };

    let path = d3.geoPath().projection(projection);

    const colorScale = d3.scaleThreshold()
        .domain([50000, 100000, 200000, 300000, 500000])
        .range(d3.schemeBlues[6]);

    let svg = d3.select("#choropleth")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${width} ${height}`);

    let world = svg.append("g");

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

    fetch("data/choropleth.json")
        .then(response => response.json())
        .then(data => {
            const data_features = topojson.feature(data, data.objects.states).features;

            world.selectAll(".states")
                .data(data_features)
                .enter().append("path")
                .attr("data-name", function (d) { return d.properties.name })

                .attr("d", path)
                .style("stroke", "black")
                .attr("class", "Country")
                .attr("id", function (d) { return d.id })
                .style("opacity", 1)
                .style("stroke-width", "0.75px")
                .style("fill", function (d) {
                    var value = d.properties.abundance;
                    return value != 0 ? colorScale(value) : "url(#stripe)";
                })
                .on("mouseover", mouseOver)
                .on("mouseleave", mouseLeave);
        })
        .catch(error => {
            console.error("Error fetching the data:", error);
        });

    const x = d3.scaleLinear()
        .domain([2.6, 75.1])
        .rangeRound([600, 860]);

    const legend = svg.append("g")
        .attr("id", "choropleth_legend")
        .attr("transform", `translate(${legendX}, ${legendY})`);

    const legend_entry = legend.selectAll("g.legend")
        .data(colorScale.range().map(function (d) {
            d = colorScale.invertExtent(d);
            if (d[0] == null) d[0] = x.domain()[0];
            if (d[1] == null) d[1] = x.domain()[1];
            return d;
        }))
        .enter().append("g")
        .attr("class", "legend_entry");

    const ls_w = 20,
        ls_h = 20;

    legend_entry.append("rect")
        .attr("x", 20)
        .attr("y", function (d, i) {
            return height - (i * ls_h) - 2 * ls_h;
        })
        .attr("width", ls_w)
        .attr("height", ls_h)
        .style("fill", function (d) {
            return colorScale(d[0]);
        });

    legend_entry.append("text")
        .attr("x", 50)
        .attr("y", function (d, i) {
            return height - (i * ls_h) - ls_h - 6;
        })
        .text(function (d, i) {
            if (i === 0) return "< " + d[1] / 1000 + " k";
            if (d[1] < d[0]) return d[0] / 1000 + " k +";
            return d[0] / 1000 + " k - " + d[1] / 1000 + " k";
        });

    legend.append("text").attr("x", 15).attr("y", 420).text("Tree abundance");
};

onMounted(async () => {
    initializeChoropleth();

    var margin = { top: 60, right: 70, bottom: 70, left: 100 },
        width = 1435 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    let projection = d3.geoAlbersUsa()
        .scale(width - 20)
        .translate([width / 2, height / 2]);

    let path = d3.geoPath().projection(projection);
    let tooltip = null;

    let mouseOver = function (event, d) {
        d3.selectAll(".Circle")
            .transition()
            .duration(200)
            .style("opacity", 0.1)
            .style("stroke", "none");
        d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "black")
            .style("opacity", 0.5)
            .style("stroke-width", "0.75px");
        if (!tooltip) {
            tooltip = d3.select(container.value).append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);
        }
        tooltip.html('<p>' + d.greater_metro + ' &rarr; ' + d.count + ' trees</p>')
            .style("left", (event.pageX + 15) + "px")
            .style("top", (event.pageY - 28) + "px")
            .transition().duration(400)
            .style("position", "absolute")
            .style("opacity", 1);
    }

    let mouseLeave = function () {
        d3.selectAll(".Circle")
            .transition()
            .duration(200)
            .style("opacity", 0.5)
            .style("stroke", "none");
        // Hide and remove the tooltip
        if (tooltip) {
            tooltip.transition().duration(300)
                .style("opacity", 0)
                .remove();
            tooltip = null; // Reset tooltip variable
        }
    }
    let mouseOver_states = function (event, d) {
        d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", d.properties.abundance != 0 ? "#5c73a2" : "black")
            .style("stroke-width", "2px");
        // Create the tooltip if it doesn't exist
        if (!tooltip) {
            tooltip = d3.select(container.value).append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);
        }
        tooltip.html(d.properties.name + ' &#40;' + d.properties.postal + '&#41;')
            .style("left", (event.pageX + 15) + "px")
            .style("top", (event.pageY - 28) + "px")
            .transition().duration(400)
            .style("position", "absolute")
            .style("opacity", 1);
    }

    let mouseLeave_states = function () {
        d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "black")
            .style("stroke-width", "0.75px");
        if (tooltip) {
            tooltip.transition().duration(300)
                .style("opacity", 0)
                .remove();
            tooltip = null; // Reset tooltip variable
        }
    }

    let svg = d3.select(mapContainer.value)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${width} ${height}`);

    let world = svg.append("g");

    let currentZoomState = null;

    let svgBackground = world.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "transparent")
        .on("click", function () {
            if (currentZoomState !== null) {
                svg.transition()
                    .duration(750)
                    .call(zoom.transform, d3.zoomIdentity);
                currentZoomState = null;
            }
        });



    async function getRandomPointInState(stateName, topoData) {
        const states = topojson.feature(topoData, topoData.objects.states).features;
        const stateFeature = states.find(d => d.properties.name === stateName);

        if (!stateFeature) {
            throw new Error(`State not found: ${stateName}`);
        }

        const boundingBox = turf.bbox(stateFeature);
        let randomPoint;

        do {
            randomPoint = turf.randomPoint(1, { bbox: boundingBox });
        } while (!turf.booleanPointInPolygon(randomPoint.features[0], stateFeature));

        const projectedPoint = projection(turf.getCoord(randomPoint.features[0]));
        return {
            x: projectedPoint[0],
            y: projectedPoint[1]
        };
    }
    let topoData = ref();
    fetch("data/choropleth.json")
        .then(response => response.json())
        .then(data => {
            topoData.value = data;
            const data_features = topojson.feature(data, data.objects.states).features;
            world.selectAll(".states")
                .data(data_features)
                .enter().append("path")
                .attr("data-name", function (d) { return d.properties.name })
                .attr("d", path)
                .style("stroke", "black")
                .attr("class", "Country")
                .attr("id", function (d) { return d.id })
                .style("opacity", 1)
                .style("stroke-width", "0.75px")
                .style("fill", "white")
                .on("mouseover", mouseOver_states)
                .on("mouseleave", mouseLeave_states);
            // .on("click", zoomIn);
            d3.csv("data/dotmap_alternative.csv").then(async function (data) {
                loadchart.value = true;
                const data2 = [
                    { state: "Alabama", count: 0 },
                    { state: "Alaska", count: 0 },
                    { state: "Arizona", count: 214 },
                    { state: "Arkansas", count: 0 },
                    { state: "California", count: 1123633 },
                    { state: "Colorado", count: 344031 },
                    { state: "Connecticut", count: 0 },
                    { state: "Delaware", count: 0 },
                    { state: "District of Columbia", count: 165958 },
                    { state: "Florida", count: 118106 },
                    { state: "Georgia", count: 0 },
                    { state: "Hawaii", count: 14655 },
                    { state: "Idaho", count: 0 },
                    { state: "Illinois", count: 0 },
                    { state: "Indiana", count: 97227 },
                    { state: "Iowa", count: 15273 },
                    { state: "Kansas", count: 30841 },
                    { state: "Kentucky", count: 32711 },
                    { state: "Louisiana", count: 0 },
                    { state: "Maine", count: 0 },
                    { state: "Maryland", count: 120620 },
                    { state: "Massachusetts", count: 14498 },
                    { state: "Michigan", count: 85426 },
                    { state: "Minnesota", count: 174674 },
                    { state: "Mississippi", count: 0 },
                    { state: "Missouri", count: 83445 },
                    { state: "Montana", count: 0 },
                    { state: "Nebraska", count: 0 },
                    { state: "Nevada", count: 29198 },
                    { state: "New Hampshire", count: 0 },
                    { state: "New Jersey", count: 0 },
                    { state: "New Mexico", count: 2325 },
                    { state: "New York", count: 697631 },
                    { state: "North Carolina", count: 19782 },
                    { state: "North Dakota", count: 0 },
                    { state: "Ohio", count: 135318 },
                    { state: "Oklahoma", count: 8866 },
                    { state: "Oregon", count: 213890 },
                    { state: "Pennsylvania", count: 0 },
                    { state: "Rhode Island", count: 24066 },
                    { state: "South Carolina", count: 0 },
                    { state: "South Dakota", count: 61171 },
                    { state: "Tennessee", count: 8322 },
                    { state: "Texas", count: 44321 },
                    { state: "Utah", count: 0 },
                    { state: "Vermont", count: 0 },
                    { state: "Virginia", count: 1815 },
                    { state: "Washington", count: 164297 },
                    { state: "West Virginia", count: 0 },
                    { state: "Wisconsin", count: 115365 },
                    { state: "Wyoming", count: 0 },
                    // { state: "Puerto Rico", count: 0 }
                ]
                for (const s of data2) {
                    for (let i = 0; i < s.count / 3000; i++) {

                        let pos = await getRandomPointInState(s.state, topoData.value);
                        svg.append("circle")
                            .attr("class", "Dot")
                            .attr("cx", pos.x)
                            .attr("cy", pos.y)
                            .attr("r", 3) // Small fixed radius for each dot
                            .style("fill", "#5c73a2");

                    }
                }
                loadchart.value = false;

            });
        })
        .catch(error => {
            console.error("Error fetching the data:", error);
        });
});
</script>

<style lang="scss" scoped>
.assignment4 {
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

    .container {

        ::v-deep() {
            .tooltip {
                // display: none;
                position: absolute;
                background-color: rgba(255, 255, 255, 0.9);
                border: 1px solid #5c73a2;
                border-radius: 5px;
                padding: 10px;
                box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
                user-select: none;
            }

            .tooltip .tooltip-content {
                font-size: 14px;
                line-height: 1.4;
                text-align: left;
                max-width: 200px;
            }

            .tooltip p {
                margin: 0;
            }

            .tooltip strong {
                font-weight: bold;
            }
        }
    }
}</style>