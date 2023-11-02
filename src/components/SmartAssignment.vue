<template>
    <div class="assginment" :class="{ 'deactive': !isActive }">
        <SVGPolygon class="assginment__polygon" :color="'#22232A'" />
        <SVGPolygon class="assginment__polygon2" :color="'#292A32'" />
        <p class="assginment__name">{{ assginmentName }}</p>
        <h2 class="assginment__number">{{ assginmentNumber }}</h2>
    </div>
</template>

<script setup>
import SVGPolygon from '@/components/SVG/polygon.vue'
const props = defineProps({
    assginmentNumber: String,
    assginmentName: String,
    isActive: {
        type: Boolean,
        default: false
    },
})
</script>

<style lang="scss" scoped>
.assginment {
    height: 200px;
    border-radius: 10px;
    width: 300px;
    position: relative;


    &__polygon2 {
        z-index: -1;
        transform: rotate(15deg);
        height: 100%;
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        transition: 0.3s;
    }

    &__polygon {
        width: 100%;
        height: 100%;
        cursor: pointer;

        &:hover+.assginment__polygon2 {
            transform: rotate(0deg);
        }
    }

    &__name {
        color: rgb(121, 121, 121);
        margin-top: 25px;
    }
    &__number{
        position: absolute;
        bottom: -3rem;
        left: -1rem;
        font-size: 17rem;
        color: black;
        z-index: -1;
    }
}

.deactive {
    opacity: 0.3;
    pointer-events: none;
}
</style>