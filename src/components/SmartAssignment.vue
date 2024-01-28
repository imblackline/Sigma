<template>
    <div class="assginment" :class="{ 'deactive': !isActive }">
        <span v-if="!isActive" class="material-icons-round assginment__visibilityIcon">
            visibility_off
        </span>
        <img v-if="imgUrl" class="assginment__image" :src="`img/${imgUrl}`" alt="" @click="$router.push(`${redirectUrl}`)">
        <SVGPolygon v-else class="assginment__polygon" :color="'#5c73a2'" @click="$router.push(`${redirectUrl}`)" />
        <SVGPolygon class="assginment__polygon2" :color="isFinal? '#e6b3254e':'#a5b8e0'" />
        <p class="assginment__name" :class="{'assginment__name--gold':isFinal}">{{ assginmentName }}</p>
        <h2 class="assginment__number" :class="{'assginment__number--gold':isFinal}">{{ assginmentNumber }}</h2>
    </div>
</template>

<script setup>
import SVGPolygon from '@/components/SVG/polygon.vue'
const props = defineProps({
    assginmentNumber: String,
    assginmentName: String,
    redirectUrl: String,
    imgUrl: String,
    isFinal:{
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
})
</script>

<style lang="scss" scoped>
.assginment {
    color: white;
    height: 200px;
    border-radius: 10px;
    width: 300px;
    position: relative;
    &__visibilityIcon{
        position: absolute;
        top: 0;
        left:0;
        right: 0;
        bottom: 0;
        font-size: 3.5rem;
        width:fit-content;
        height:fit-content;
        margin: auto;
        transform: translateY(10px);
    }
    &__image {
        //    width: 100%;
        height: 100%;
        cursor: pointer;
        filter: sepia(100%) hue-rotate(180deg) saturate(100%);
        transition: 0.3s;

        &:hover {
            filter:none;
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
        color: #5c73a2;
        font-weight: bold;
        margin-top: 25px;
        &--gold{
            color: #C58940;
        }
    }

    &__number {
        position: absolute;
        bottom: -3rem;
        left: -1rem;
        font-size: 17rem;
        color: #5c73a2;
        z-index: -1;
        &--gold{
            color: #E6B325;
        }
    }
}

.deactive {
    opacity: 0.3;
    pointer-events: none;
}
</style>