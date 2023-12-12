<template>
  <div class="assignmentcontainer">
    <SmartAssignment :assginmentName="'Comparing categories'" :isActive="true" :assginmentNumber="'1'" :imgUrl="'comparing image.png'" :redirectUrl="'assignment1'"/>
    <SmartAssignment :assginmentName="'Distributions'" :isActive="true" :assginmentNumber="'2'" :imgUrl="'Distrbution image.png'" :redirectUrl="'assignment2'"/>
    <SmartAssignment :assginmentName="'Timelines and distributions'" :isActive="true" :assginmentNumber="'3'" :imgUrl="'timeline.png'" :redirectUrl="'assignment3'"/>
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