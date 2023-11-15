<!-- components/TaxonomicTree.vue -->
<template>
    <div class="taxonomic-tree">
        <TaxonomicRank rank="Kingdom" :value="taxonomy.kingdom" bcolor="#000" color="#3498db" width="50%" />
        <TaxonomicRank rank="Phylum" :value="taxonomy.phylum" bcolor="#141414" color="#2ecc71" width="45%" />
        <TaxonomicRank rank="Class" :value="taxonomy.class" bcolor="#292929" color="#e74c3c" width="40%" />
        <TaxonomicRank rank="Order" :value="taxonomy.order" bcolor="#3d3d3d" color="#f39c12" width="35%" />
        <TaxonomicRank rank="Family" :value="taxonomy.family" bcolor="#525252" color="#9b59b6" width="30%" />
        <TaxonomicRank rank="Genus" :value="taxonomy.genus" bcolor="#666666" color="#1abc9c" width="25%" />
        <TaxonomicRank rank="Species" :value="taxonomy.species" bcolor="#7a7a7a" color="#63350b" width="20%" />
    </div>
</template>
  
<script>
import TaxonomicRank from './TaxonomicRank.vue';

export default {
    props: {
        taxonomy: Object,
    },
    components: {
        TaxonomicRank,
    },
};
</script>
  
<style scoped>
.taxonomic-tree {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 20px 0;
}
</style>
  