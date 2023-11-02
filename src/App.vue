<template>
  <router-view />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab');
@import url('https://fonts.googleapis.com/css?family=Fira+Sans');

#app {
  font-family: 'Roboto Slab', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

p {
  font-family: 'Fira Sans', Avenir, Helvetica, Arial, sans-serif;

}

body,
html {
  height: 100%;
  transform: translateZ(0);
  overflow: hidden;
  background-color: #191a21;
}

#app {
  width: 100%;
  height: 100%;

}


* {
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: #9da0a5;
  scroll-behavior: smooth;
  outline: none;
  margin: 0;
  padding: 0;

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #9da0a5;
  }
}</style>
