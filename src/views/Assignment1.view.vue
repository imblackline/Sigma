<template>
    <div class="assignment1">
        <div class="assignment1__header">
            <div class="assignment1__header__btn">
                <button class="assignment1__header__btn__homebtn" @click="$router.back()">
                    <span>Back home</span>
                    <svg viewBox="-5 -5 110 110" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0" />
                    </svg>
                </button>
            </div>
            <!-- <h1 class="assignment1__header__title">Comparing categories</h1> -->
            <section class="wrapper">
                <div class="top">Comparing categories</div>
                <div class="bottom" aria-hidden="true">Comparing categories</div>
            </section>
        </div>

        <select v-model="selected" @change="generateBarChart(selected)">
            <option v-for="item in $store.state.fileList"  :value="item">{{ item.split('_')[0] }}</option>
        </select>
        <div ref="chartRef"></div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();
        const selected = ref(store.state.fileList[0]);
        const chartRef = ref(null);
        const data2 = ref([])
        const generateBarChart = (url) => {
            d3.select(chartRef.value).select('svg').remove();
            console.log(`/data/${url}`);
            // d3.csv(`src/assets/data/${url}`).then((results) => {
            d3.csv(`/data/${url}`).then((results) => {
                console.log("aaaaaa", results);
                data2.value = results;
                const treeStats = data2.value.reduce((acc, cur) => {
                    const name = cur.scientific_name;
                    if (name !== 'NA') {
                        if (!acc[name]) {
                            acc[name] = { count: 0, heightSum: 0, heightAvg: null };
                        }

                        if (cur.height_M !== 'NA') {
                            acc[name].heightSum += parseFloat(cur.height_M);
                            acc[name].count++;
                            acc[name].heightAvg = acc[name].heightSum / acc[name].count;
                        } else {
                            acc[name].count++;
                        }
                    }

                    return acc;
                }, {});
                const treeData = Object.entries(treeStats).map(([name, stats]) => ({
                    name,
                    value: stats.count
                }));
                const sortedTreeData = treeData.sort((a, b) => a.value - b.value);

                console.log(sortedTreeData);


                // console.log(treeStats);
                const margin = { top: 20, right: 30, bottom: 30, left: 150 };
                const width = 1020 - margin.left - margin.right;
                const height = 1020 - margin.top - margin.bottom;

                const svg = d3.select(chartRef.value)
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', `translate(${margin.left},${margin.top})`)
                    .style('color', '#b3b3b3');

                const x = d3.scaleLinear()
                    .range([0, width])
                    .domain([0, d3.max(sortedTreeData, (d) => d.value)]);

                const y = d3.scaleBand()
                    .range([height, 0])
                    .domain(sortedTreeData.map(a => a.name))
                    .padding(0.15);

                svg.append('g')
                    .call(d3.axisLeft(y).tickSize(0).tickPadding(10));

                svg.append('g')
                    .attr('transform', `translate(0,${height})`)
                    .call(d3.axisBottom(x).tickSize(0).tickPadding(10));

                svg.selectAll('.bar')
                    .data(sortedTreeData)
                    .enter()
                    .append('rect')
                    .attr('class', 'bar')
                    .attr('x', 0)
                    .attr('y', (d) => y(d.name))
                    .attr('width', 0)
                    .attr('height', y.bandwidth())
                    .style('fill', '#f5f5f5')
                    .transition()
                    .duration(1000)
                    .attr('width', (d) => x(d.value))
                    .style('fill', '#b3b3b3');

                svg.selectAll('.bar')
                    .on('mouseover', function (event, d) {
                        d3.select(this).style('fill', '#333333');
                        svg.append('rect')
                            .attr('class', 'tooltip-background')
                            .attr('x', x(d.value) + 5)
                            .attr('y', y(d.name) + y.bandwidth() / 2 - 15)
                            .attr('rx', '5')
                            .attr('ry', '5')
                            .attr('width', '80')
                            .attr('height', '30')
                            .style('fill', '#fff');
                        svg.append('text')
                            .attr('class', 'tooltip-text')
                            .attr('x', x(d.value) + 10)
                            .attr('y', y(d.name) + y.bandwidth() / 2)
                            .text(`Count: ${d.value} \r\n asdsadasf`)
                            .style('font-size', '12px')
                            .style('fill', '#333333');
                    })
                    .on('mouseout', function (event, d) {
                        d3.select(this).style('fill', '#e6e6e6');
                        svg.select('.tooltip-background').remove();
                        svg.select('.tooltip-text').remove();
                    });

                // svg.selectAll('.text')
                //     .data(data)
                //     .enter()
                //     .append('text')
                //     .text((d) => d.value)
                //     .attr('x', (d) => x(d.value) + 5)
                //     .attr('y', (d) => y(d.name) + y.bandwidth() / 2)
                //     .attr('text-anchor', 'start').style('fill', '#fff');;
            })
        }
        onMounted(() => {
            generateBarChart(selected.value);
        });

        return { chartRef, selected,generateBarChart };
    },
};
</script>

<style lang="scss" scoped>
.assignment1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

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