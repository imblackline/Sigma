<template>
  <div class="home">
    <div class="home__header">
      <img class="home__header__image" alt="Vue logo" src="../assets/moai_1f5ff.webp">
      <h1 class="home__header__title">SIGMA</h1>
      <div class="home__header__subtitle">
        <div class="string">
          <h1 class="greeting es">I don't care</h1>
          <h1 class="greeting de">اهمیت نمیدهم</h1>
          <h1 class="greeting it">Non mi importa</h1>
          <h1 class="greeting en">私は気にしない</h1>
        </div>
        <div class="closure">, scroll down for the <b>assignments</b></div>
      </div>
    </div>
    <SmartAssignmentsContainer class="home__assignments"/>
  </div>
</template>

<script>
import SmartAssignmentsContainer from '@/components/SmartAssignmentsContainer.vue'

export default {
  components: {
    SmartAssignmentsContainer
  }
}
</script>
<style lang="scss">
@keyframes move {
  20% {
    transform: translatey(-1.2vmin);
    opacity: 1;
  }

  40% {
    transform: translatey(-4.2vmin);
  }

  60% {
    transform: translatey(-7.2vmin);
  }
  80% {
    transform: translatey(-10.2vmin);
  }
}

.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  align-items: center;

  &__header {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    &__image {
      position: absolute;
      opacity: 0.3;
      user-select: none;
      z-index: 2;
    }

    &__title {
      user-select: none;
      font-size: 20rem;
      z-index: 1;
      color: #5c73a2;
    }

    &__subtitle {
      color: #9caed4;
      position: absolute;
      bottom: 0px;
      display: flex;
      .string {
        display: flex;
        flex-direction: column;
        text-align: center;
        animation: move 5s infinite;
      }
      
      .greeting {
        font-size: 1rem;
        position: relative;
        top: 1.6vmin;
        animation: white-out 5s infinite;
      }
      .closure{
        font-size: 1rem;
      }
      .closure::after {
        content: '';
        position: absolute;
        height: 25vmin;
        width: 40vmin;
        background: #EEF5FF;
        transform: translate(-60vmin, -24.5vmin);
      }
      
      .closure::before {
        content: '';
        position: absolute;
        height: 25vmin;
        width: 40vmin;
        background: #EEF5FF;
        transform: translate(-30vmin, 2.8vmin);
      }
    }
  }
  &__assignments{
    z-index: 1;
  }
}
</style>