<template>
    <div class="assignment2">
        <div class="assignment2__header">
            <div class="assignment2__header__btn">
                <button class="assignment2__header__btn__homebtn" @click="$router.back()">
                    <span>Back home</span>
                    <svg viewBox="-5 -5 110 110" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0" />
                    </svg>
                </button>
            </div>
            <section class="wrapper">
                <div class="top">Distributions</div>
                <div class="bottom" aria-hidden="true">Distributions</div>
            </section>
        </div>
        <h3 class="assignment2__Title">-- Alluvial --</h3>
        <div>
            <div ref="sankeyChart"></div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';

const sankeyChart = ref(null);
onMounted(() => {
    var margin = { top: 20, right: 40, bottom: 70, left: 60 },
        width = 1000 - margin.left - margin.right,
        height = 2000 - margin.top - margin.bottom;

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select(sankeyChart.value).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var sankey2 = sankey()
        .nodeWidth(40)
        .nodePadding(40)
        .size([width, height]);


    d3.csv('data/filtered_data.csv').then((data) => {
        var sankeydata = { "nodes": [], "links": [] };

        data.forEach(function (d) {
            sankeydata.nodes.push({ "name": d.source });
            sankeydata.nodes.push({ "name": d.target });
            sankeydata.links.push({
                "source": d.source,
                "target": d.target,
                "value": +d.value
            });
        });

        // return only the distinct / unique nodes
        sankeydata.nodes = Array.from(
            d3.group(sankeydata.nodes, d => d.name),
            ([value]) => (value)
        );

        // loop through each link replacing the text with its index from node
        sankeydata.links.forEach(function (d, i) {
            sankeydata.links[i].source = sankeydata.nodes
                .indexOf(sankeydata.links[i].source);
            sankeydata.links[i].target = sankeydata.nodes
                .indexOf(sankeydata.links[i].target);
        });

        // now loop through each nodes to make nodes an array of objects
        // rather than an array of strings
        sankeydata.nodes.forEach(function (d, i) {
            sankeydata.nodes[i] = { "name": d };
        });

        let graph = sankey2(sankeydata);
        sankeydata.links.forEach(function (link) {
            link.width = link.value / 1500 < 7 ? 7 : link.value / 1500; // You can adjust this based on your data
        });

        // add in the links
        var link = svg.append("g").selectAll(".link")
            .data(graph.links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", sankeyLinkHorizontal())
            .attr("stroke-width", function (d) { return d.width; });

        // add the link titles
        link.append("title")
            .text(function (d) {
                return d.source.name + " 👉🏻 " +
                    d.target.name + "\n" + d.value;
            });

        // add in the nodes
        var node = svg.append("g").selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "node");

        // add the rectangles for the nodes
        node.append("rect")
            .attr("x", function (d) { return d.x0; })
            .attr("y", function (d) { return d.y0 - (d.value / 1500 < 7 ? 7 : d.value / 1500) / 2; })
            .style("stroke", "black")
            .style("stroke-width", 2)
            .attr("height", function (d) { return (d.value / 1500 < 7 ? 7 : d.value / 1500); })
            .attr("width", sankey2.nodeWidth())
            .style("fill", function (d) {
                return d.color = color(d.name.replace(/ .*/, ""));
            })
            .style("stroke", function (d) {
                return d3.rgb(d.color);
            });

        // add the title for the nodes
        node.append("title")
            .text(function (d) {
                return d.name + "\n" + d.value;
            });

        // add in the text for the nodes
        node.append("text")
            .attr("x", function (d) { return (d.x0 - 6); })
            .attr("y", function (d) { return (d.y1 + d.y0) / 2; })
            .attr("dy", "0.35em")
            .attr("text-anchor", "end")
            .text(function (d) { return d.name; })
            .style("fill", function (d) { return d.color; })
            .filter(function (d) { return d.x0 < width / 2; })
            .attr("x", function (d) { return d.x1 + 6; })
            .attr("text-anchor", "start");

        // Add hover effects to nodes
        node.on("mouseover", function () {
            d3.select(this)
                .attr("font-weight", "bold");
        })
            .on("mouseout", function () {
                d3.select(this)
                    .attr("font-weight", "normal");
            });


    });
})



</script>

<style lang="scss" scoped>
.assignment2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

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


    &__Title {
        font-size: 2rem;
        color: white;
        margin-top: 80px;
        margin-bottom: 10px;
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
            color: hsl(0, 0%, 70%);


            &>div {
                grid-area: 1/1/-1/-1;
            }

            .top {
                clip-path: polygon(0% 0%, 100% 0%, 100% 48%, 0% 58%);
            }

            .bottom {
                clip-path: polygon(0% 60%, 100% 45%, 100% 100%, 0% 100%);
                color: transparent;
                background: -webkit-linear-gradient(179deg, #191a21 53%, hsl(0, 0%, 70%) 65%);
                background: linear-gradient(179deg, #191a21 53%, hsl(0, 0%, 70%) 65%);
                background-clip: text;
                -webkit-background-clip: text;
                transform: translateX(-0.02em);
            }

        }
    }
}
</style>