<template>
    <div class="taxonomic-rank" :style="{ backgroundColor: bcolor, width: width }">
        <div class="rank" :style="{ color: color }">{{ rank }}</div>
        <div class="value" >{{ value }}</div>
    </div>
</template>
  
<script>
export default {
    props: {
        rank: String,
        value: String,
        color: String,
        bcolor: String,
        width: String,
    },
};
</script>
  
<style scoped>
.taxonomic-tree {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.taxonomic-rank {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 3px;
    padding: 5px 10px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

}

.rank {
    font-weight: bold;
    font-size: 18px;
    padding:2px 8px;
}

.value {
    color: white;
    margin: 5px 0;
    font-size: 16px;
}
</style>