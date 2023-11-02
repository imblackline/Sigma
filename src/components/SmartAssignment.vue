<template>
    <div class="assginment" :class="{ 'deactive': !isActive }">
        <img v-if="imgUrl" class="assginment__image" :src="`src/assets/${imgUrl}`" alt="" @click="$router.push(`${redirectUrl}`)">
        <SVGPolygon v-else class="assginment__polygon" :color="'#22232A'" @click="$router.push(`${redirectUrl}`)" />
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
    redirectUrl: String,
    imgUrl: String,
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

    &__image {
    //    width: 100%;
        height: 110%;
        cursor: pointer;
        filter: grayscale(.7);
        transition: 0.3s;
        &:hover {
            filter: grayscale(0.3);

        }
        &:hover+.assginment__polygon2 {
            transform: rotate(0deg);
        }
    }

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

    &__number {
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