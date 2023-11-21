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
            <section class="wrapper">
                <div class="top">Comparing categories</div>
                <div class="bottom" aria-hidden="true">Comparing categories</div>
            </section>
        </div>
        <h3 class="assignment1__stackchartTitle">--Tree species abundance at a glance--</h3>
        <p class="assignment1__stackchartSubTitle">In this presentation, we present the most prevalent tree species in
            various cities across the United States.

            A dropdown menu is provided, allowing users to select a specific city from the dataset and view localized
            information on the dominant tree types. To illustrate this data, we employ a bar chart as the chosen
            visualization method.

            The use of a bar chart is particularly suitable for this purpose because it enables a clear and concise
            representation of the relative prevalence of tree types in a specific city. Each bar on the chart corresponds to
            a tree species, and its height directly correlates with the frequency of that species in the selected city,
            making it an effective tool for visualizing and comparing data across different locations.</p>
        <select v-model="selected" @change="generateBarChart(selected)">
            <option v-for="item in $store.state.fileList" :value="item">{{ item.split('_')[0] }}</option>
        </select>
        <div class="assignment1__chart" ref="chartRef"></div>
        <h3 class="assignment1__stackchartTitle">--Compare tree species abundance--</h3>
        <div class="assignment1__stackchart">
            <div class="assignment1__stackchart__labels">
                <p>Platanus acerifolia</p>
                <p>Syagrus romanzoffianum</p>
                <p>Washingtonia robusta</p>
                <p>Magnolia grandiflora</p>
                <p>Liquidambar styraciflua</p>
            </div>
            <svg ref="chart"></svg>
        </div>
        <h3 class="assignment1__stackchartTitle">--Stacked bar chart 100%--</h3>
        <div class="assignment1__stackchart">
            <div class="assignment1__stackchart__labels">
                <p>Platanus acerifolia</p>
                <p>Syagrus romanzoffianum</p>
                <p>Washingtonia robusta</p>
                <p>Magnolia grandiflora</p>
                <p>Liquidambar styraciflua</p>
            </div>
            <svg ref="chartPercentage"></svg>
        </div>
        <div class="assignment1__stackchart">
            <div v-for="cityData in cities" :key="cityData.city">
                <h2>{{ cityData.city }}</h2>
                <svg :ref="chartRefs[cityData.city]" width="400" height="200"></svg>
            </div>
        </div>
        <h3 class="assignment1__stackchartTitle">--Compare tree species abundance heatmap--</h3>
        <p class="assignment1__stackchartSubTitle">In this presentation, we present a visual representation in the form of a
            heatmap, illustrating the distribution of tree types in a selected subset of California.

            The horizontal axis of the heatmap represents five major cities within the state, while the vertical axis
            displays the prevalence of the five most common tree species found across these cities.

            As indicated in the accompanying legend, the intensity of color in the heatmap corresponds to the relative
            abundance of each tree type within a specific city.</p>
        <div>
            <svg ref="colorBar"></svg>
            <svg ref="heatmap"></svg>
        </div>
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
            // d3.csv(`src/assets/data/${url}`).then((results) => {
            d3.csv(`data/${url}`).then((results) => {
                data2.value = results;
                // console.log(results);
                let treeStats = data2.value.reduce((acc, cur) => {
                    let name = cur.scientific_name;
                    if (name !== 'NA') {
                        if (!acc[name]) {
                            acc[name] = { count: 0, heightSum: 0, heightAvg: null, common_name: null };
                        }
                        if (cur.common_name !== 'NA') {
                            acc[name].common_name = cur.common_name;
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
                let treeData = Object.entries(treeStats).map(([name, stats]) => ({
                    name,
                    common_name: stats.common_name,
                    heightAvg: stats.heightAvg,
                    value: stats.count
                }));
                let sortedTreeData = treeData.sort((a, b) => a.value - b.value);
                console.log("ppp", sortedTreeData);



                // console.log(treeStats);
                let margin = { top: 20, right: 30, bottom: 30, left: 150 };
                let width = 1220 - margin.left - margin.right;
                let height = (sortedTreeData.length * 20) - margin.top - margin.bottom;

                let svg = d3.select(chartRef.value)
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', `translate(${margin.left},${margin.top})`)
                    .style('color', '#b3b3b3');

                let x = d3.scaleLinear()
                    .range([0, width])
                    .domain([0, d3.max(sortedTreeData, (d) => d.value)]);

                let y = d3.scaleBand()
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
                            .attr('x', x(d.value) / 2)
                            .attr('y', y(d.name) + y.bandwidth() / 2 + 15)
                            .attr('rx', '5')
                            .attr('ry', '5')
                            .attr('width', '250')
                            .attr('height', '70')
                            .style('fill', '#fff');
                        svg.append('text')
                            .attr('class', 'tooltip-text')
                            .attr('x', x(d.value) / 2)
                            .attr('y', y(d.name) + y.bandwidth() / 2 + 20)
                            .style('font-size', '12px')
                            .style('fill', '#333333')
                            .selectAll('tspan')
                            .data([`Count: ${d.value}`, `Common Name: ${d.common_name}`, `Average height: ${Number((d.heightAvg)?.toFixed(2))}`]) // Define an array of lines
                            .enter()
                            .append('tspan')
                            .attr('x', x(d.value) / 2 + 10)
                            .attr('dy', 12) // Adjust the line spacing as needed
                            .text(d => d);
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

        const data = ref([])
        const chart = ref(null);
        const generateStackChart = () => {
            d3.csv(`data/finalComparisonTable.csv`).then((results) => {
                data.value = results;
                console.log(data.value);

                // Define chart dimensions
                const margin = { top: 20, right: 30, bottom: 30, left: 80 };
                const width = 1000 - margin.left - margin.right;
                const height = 400 - margin.top - margin.bottom;

                // Create SVG element
                const svg = d3.select(chart.value)
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .style("color", '#b3b3b3')
                    .attr("transform", `translate(${margin.left},${margin.top})`);

                // Prepare data for stacking
                const keys = Object.keys(data.value[0]).slice(1, -1);
                const stack = d3.stack().keys(keys);
                const stackedData = stack(data.value);
                console.log("oooo", stackedData, data.value)
                // Define color scale
                const color = d3.scaleSequential(d3.interpolateGreys)
                    .domain([0, keys.length - 1])
                    .nice(keys.length);

                // Create x and y scales
                const x = d3.scaleLinear()
                    .domain([0, d3.max(stackedData, d => d3.max(d, d => d[1]))])
                    .range([0, width]);

                const y = d3.scaleBand()
                    .domain(data.value.map(d => d.city))
                    .range([0, height])
                    .padding(0.1);

                // Create stacked bars
                const bars = svg.selectAll("g")
                    .data(stackedData)
                    .enter().append("g")
                    .attr("fill", (d, i) => color(i));

                bars.selectAll("rect")
                    .data(d => d)
                    .enter().append("rect")
                    .attr("x", d => x(d[0]))
                    .attr("y", d => y(d.data.city))
                    .attr('width', 0)
                    .attr("height", y.bandwidth())
                    .transition()
                    .duration(1000)
                    .attr("width", d => x(d[1]) - x(d[0]));

                // Add x-axis
                svg.append("g")
                    .attr("transform", `translate(0,${height})`)
                    .style("color", '#b3b3b3')
                    .call(d3.axisBottom(x));

                // Add y-axis
                svg.append("g")
                    .call(d3.axisLeft(y));

                // Add tooltips
                bars.selectAll("rect")
                    .on('mouseover', function (event, d) {
                        d3.select(this).style('fill', 'balck');
                        svg.append('rect')
                            .attr('class', 'tooltip-background')
                            .attr('x', x(d[0]))
                            .attr('y', y(d.data.city) + y.bandwidth() / 2 + 25)
                            .attr('rx', '5')
                            .attr('ry', '5')
                            .attr('width', '120')
                            .attr('height', '40')
                            .style('fill', '#fff');
                        svg.append('text')
                            .attr('class', 'tooltip-text')
                            .attr('x', x(d[0]) + 5)
                            .attr('y', y(d.data.city) + y.bandwidth() / 2 + 30)
                            .style('font-size', '12px')
                            .style('fill', '#333333')
                            .selectAll('tspan')
                            .data([`Count: ${d[1] - d[0]}`]) // Define an array of lines
                            .enter()
                            .append('tspan')
                            .attr('x', x(d) / 2 + 10)
                            .attr('dy', 12) // Adjust the line spacing as needed
                            .text(d => d);
                    })
                    .on('mouseout', function (event, d) {
                        d3.select(this);
                        svg.select('.tooltip-background').remove();
                        svg.select('.tooltip-text').remove();
                    });
            });

        }

        const heatmap = ref(null);
        const colorBar = ref(null);
        const data3 = ref([])
        const generateHeatmap = () => {
            d3.csv(`data/finalComparisonTable.csv`).then((results) => {
                data3.value = results;
                const margin = { top: 40, right: 20, bottom: 40, left: 80 };
                const width = 1000 - margin.left - margin.right;
                const height = 400 - margin.top - margin.bottom;

                const svg = d3.select(heatmap.value)
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .style("color", "#b3b3b3")
                    .attr("transform", `translate(${margin.left},${margin.top})`);

                // Create the color bar SVG
                const colorBarSvg = d3
                    .select(colorBar.value)
                    .attr('width', width + margin.left + margin.right - 100)
                    .attr('height', 50)
                    .append('g')
                    .attr('transform', `translate(${margin.left},${5})`);

                const keys = Object.keys(data3.value[0]).slice(1, -1);
                const cities = data3.value.map(d => d.city);

                const x = d3.scaleBand()
                    .domain(keys)
                    .range([0, width])
                    .padding(0.1);

                const y = d3.scaleBand()
                    .domain(cities)
                    .range([0, height])
                    .padding(0.1);

                // Use a quantize scale with a custom color range
                const maxBlockValue = d3.max(data3.value, d => d3.max(keys, key => +d[key]));

                const colorScale = d3.scaleSequential(d3.interpolateGreys)
                    .domain([0, maxBlockValue])
                    .nice();

                svg.selectAll()
                    .data(data3.value)
                    .enter()
                    .append("g")
                    .selectAll("rect")
                    .data(d => keys.map(key => ({ city: d.city, key, value: +d[key] })))
                    .enter()
                    .append("rect")
                    .attr("x", d => x(d.key))
                    .attr("y", d => y(d.city))
                    .attr("width", x.bandwidth())
                    .attr("height", y.bandwidth())
                    .attr("fill", d => colorScale(d.value))
                    .on('mouseover', function (event, d) {
                        d3.select(this).style('fill', 'balck');
                        svg.append('rect')
                            .attr('class', 'tooltip-background')
                            .attr('x', x(d.key))
                            .attr('y', y(d.city) + y.bandwidth() / 2 + 30)
                            .attr('rx', '5')
                            .attr('ry', '5')
                            .attr('width', '120')
                            .attr('height', '40')
                            .style('outline', '2px dashed black')
                            .style('fill', '#fff');
                        svg.append('text')
                            .attr('class', 'tooltip-text')
                            .attr('x', x(d.key) + 5)
                            .attr('y', y(d.city) + y.bandwidth() / 2 + 35)
                            .style('font-size', '12px')
                            .style('fill', '#333333')
                            .selectAll('tspan')
                            .data([`Count: ${d.value}`]) // Define an array of lines
                            .enter()
                            .append('tspan')
                            .attr('x', x(d) / 2 + 10)
                            .attr('dy', 12) // Adjust the line spacing as needed
                            .text(d => d);
                    })
                    .on('mouseout', function (event, d) {
                        d3.select(this);
                        svg.select('.tooltip-background').remove();
                        svg.select('.tooltip-text').remove();
                    });

                // Add text labels for block values
                svg.selectAll()
                    .data(data3.value)
                    .enter()
                    .append("g")
                    .selectAll("text")
                    .data(d => keys.map(key => ({ city: d.city, key, value: +d[key] })))
                    .enter()
                    .append("text")
                    .text(d => d.value)
                    .attr("x", d => x(d.key) + x.bandwidth() / 2)
                    .attr("y", d => y(d.city) + y.bandwidth() / 2)
                    .attr("text-anchor", "middle")
                    .attr("dy", "0.35em")
                    .style("fill", d => (d3.lab(colorScale(d.value)).l < 70) ? "white" : "black"); // Change text color to white

                // Add x-axis
                svg.append("g")
                    .attr("transform", `translate(0,${height})`)
                    .call(d3.axisBottom(x));

                // Add y-axis
                svg.append("g")
                    .call(d3.axisLeft(y));

                // Draw the color bar
                colorBarSvg
                    .selectAll('rect')
                    .data(d3.range(0, maxBlockValue + 1, maxBlockValue / 10))
                    .enter()
                    .append('rect')
                    .attr('x', (d, i) => i * (width / 10 - 15))
                    .attr('width', width / 10)
                    .attr('height', 20)
                    .attr('fill', (d) => colorScale(d));

                // Add range numbers below each color
                colorBarSvg
                    .selectAll('text')
                    .data(d3.range(0, maxBlockValue + 1, maxBlockValue / 10))
                    .enter()
                    .append('text')
                    .text((d) => d.toFixed(2)) // Adjust decimal places as needed
                    .attr('x', (d, i) => i * (width / 10 - 15))
                    .attr('y', 40)
                    .attr('text-anchor', 'middle')
                    .style('font-size', '12px')
                    .style('fill', '#fff');
            });
        }


        const data4 = ref([])
        const chartPercentage = ref(null);
        const generateStackedPercentageChart = () => {
            d3.csv(`data/finalComparisonTable.csv`).then((results) => {
                data4.value = results;
                console.log(data4.value);

                // Define chart dimensions
                const margin = { top: 20, right: 30, bottom: 30, left: 80 };
                const width = 1000 - margin.left - margin.right;
                const height = 400 - margin.top - margin.bottom;

                // Create SVG element
                const svg = d3.select(chartPercentage.value)
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .style("color", '#b3b3b3')
                    .attr("transform", `translate(${margin.left},${margin.top})`);

                // Prepare data for stacking
                const keys = Object.keys(data4.value[0]).slice(1, -1);
                const stack = d3.stack().keys(keys);
                const stackedData = stack(data4.value);
                // Define color scale
                const color = d3.scaleSequential(d3.interpolateGreys)
                    .domain([0, keys.length - 1])
                    .nice(keys.length);

                //
                const totalValues = data4.value.map((d) => keys.reduce((total, key) => total + +d[key], 0));

                // Create x and y scales
                const x = d3.scaleLinear()
                    .domain([0, 100])
                    .range([0, 920]);

                const y = d3.scaleBand()
                    .domain(data4.value.map(d => d.city))
                    .range([0, height])
                    .padding(0.1);

                console.log("kkkkkkkkkkk", stackedData, totalValues)
                // Create stacked bars
                const bars = svg.selectAll("g")
                    .data(stackedData)
                    .enter().append("g")
                    .attr("fill", (d, i) => color(i));

                bars.selectAll("rect")
                    .data(d => d)
                    .enter().append("rect")
                    .attr("x", (d, i) => x(d[0]) / totalValues[i] * 100)
                    .attr("y", d => y(d.data.city))
                    .attr('width', 0)
                    .attr("height", y.bandwidth())
                    .transition()
                    .duration(1000)
                    .attr("width", d => x(d[1]) - x(d[0]));

                // Add x-axis
                svg.append("g")
                    .attr("transform", `translate(0,${height})`)
                    .style("color", '#b3b3b3')
                    .call(d3.axisBottom(x));

                // Add y-axis
                svg.append("g")
                    .call(d3.axisLeft(y));

                //Add tooltips
                bars.selectAll("rect")
                    .on('mouseover', function (event, d) {
                        d3.select(this).style('fill', 'balck');
                        const dataIndex = ref();
                        stackedData.forEach((sd, i) => {
                            if (sd.indexOf(d) != -1) {
                                dataIndex.value = sd.indexOf(d);
                            }
                        });
                        svg.append('rect')
                            .attr('class', 'tooltip-background')
                            .attr('x', x(d[0]) / totalValues[dataIndex.value] * 100)
                            .attr('y', y(d.data.city) + y.bandwidth() / 2 + 25)
                            .attr('rx', '5')
                            .attr('ry', '5')
                            .attr('width', '120')
                            .attr('height', '40')
                            .style('outline', '2px dashed black')
                            .style('fill', '#fff');
                        svg.append('text')
                            .attr('class', 'tooltip-text')
                            .attr('x', x(d[0]) / totalValues[dataIndex.value] * 100 + 5)
                            .attr('y', y(d.data.city) + y.bandwidth() / 2 + 30)
                            .style('font-size', '12px')
                            .style('fill', '#333333')
                            .selectAll('tspan')
                            .data([`Amount: ${Number(((d[1] - d[0]) / totalValues[dataIndex.value] * 100)?.toFixed(2))}%`]) // Define an array of lines
                            .enter()
                            .append('tspan')
                            .attr('x', x(d) / 2 + 10)
                            .attr('dy', 12) // Adjust the line spacing as needed
                            .text((d, i) => d);
                    })
                    .on('mouseout', function (event, d) {
                        d3.select(this);
                        svg.select('.tooltip-background').remove();
                        svg.select('.tooltip-text').remove();
                    });



            });
        }

        const cities = ref([])
        const chartRefs = ref([]);


        const createStackedBarChart = (cityData, chartRef) => {
            const svg = d3.select(chartRef);
            console.log(chartRef);
            // Define chart dimensions
            const width = 400;
            const height = 200;
            const margin = { top: 20, right: 30, bottom: 30, left: 40 };

            // Prepare data for stacking
            const keys = Object.keys(cityData).filter(key => key !== 'city' && key !== 'total');
            const stack = d3.stack().keys(keys);
            const stackedData = stack([cityData]);

            // Create a color scale for the bars
            const color = d3.scaleOrdinal()
                .domain(keys)
                .range(d3.schemeCategory10);

            // Create x and y scales
            const x = d3.scaleBand()
                .domain(keys)
                .range([margin.left, width - margin.right])
                .padding(0.1);

            const y = d3.scaleLinear()
                .domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])])
                .nice()
                .range([height - margin.bottom, margin.top]);

            // Create the chart
            svg.selectAll("g")
                .data(stackedData)
                .enter()
                .append("g")
                .attr("fill", d => color(d.key))
                .selectAll("rect")
                .data(d => d)
                .enter()
                .append("rect")
                .attr("x", d => x(d.data.city))
                .attr("y", d => y(d[1]))
                .attr("height", d => y(d[0]) - y(d[1]))
                .attr("width", x.bandwidth());

            // Add x-axis
            svg.append("g")
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x));

            // Add y-axis
            svg.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y));
        };


        onMounted(() => {
            generateBarChart(selected.value);
            generateStackChart();
            generateHeatmap();
            generateStackedPercentageChart();

            d3.csv(`data/finalComparisonTable.csv`).then((results) => {
                cities.value = results;
                cities.value.forEach(cityData => {
                    chartRefs.value[cityData.city]
                    console.log(chartRefs.value, cityData.city)
                    createStackedBarChart(cityData, chartRefs.value[cityData.city]);
                });
            });
        });

        return { cities, colorBar, chartRefs, chartPercentage, heatmap, chart, chartRef, selected, generateBarChart };
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

    &__chart {
        // z-index: 2;
    }

    &__stackchartTitle {
        font-size: 2rem;
        color: white;
        margin-top: 80px;
        margin-bottom: 10px;
    }

    &__stackchartSubTitle {
        color: #5d5d5d;
        width: 70%;
        margin-bottom: 20px;
    }

    &__stackchart {
        &__labels {
            display: flex;
            justify-content: space-around;

            p {
                padding: 3px 17px;
                border-radius: 7px;

                &:nth-of-type(1) {
                    color: #313236;
                    background-color: rgb(231, 231, 231);
                }

                &:nth-of-type(2) {
                    color: #313236;
                    background-color: rgb(178, 178, 178);
                }

                &:nth-of-type(3) {
                    color: #000000;
                    background-color: rgb(120, 120, 120);
                }

                &:nth-of-type(4) {
                    color: #040506;
                    background-color: rgb(58, 58, 58);
                }

                &:nth-of-type(5) {
                    color: #5d5d5d;
                    background-color: black;
                }
            }
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