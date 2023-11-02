<template>
  <div class="assignmentcontainer">
    <SmartAssignment :assginmentName="'Comparing categories'" :isActive="true" :assginmentNumber="'1'" />
    <SmartAssignment :assginmentName="'Distributions'" :assginmentNumber="'2'"/>
    <SmartAssignment :assginmentName="'Correlations'" :assginmentNumber="'3'"/>
    <SmartAssignment :assginmentName="'Maps'" :assginmentNumber="'4'"/>
    <SmartAssignment :assginmentName="'Timelines'" :assginmentNumber="'5'"/>
    <SmartAssignment :assginmentName="'Flux'" :assginmentNumber="'6'"/>
  </div>
</template>

<script setup>
import SmartAssignment from '@/components/SmartAssignment.vue'

</script>

<style lang="scss" scoped>
.assignmentcontainer {
  width: 70%;
  min-height: 100Vh;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>