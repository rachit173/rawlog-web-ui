<template>
  <div id="app">
    <router-view/>
    <div id="footer">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  padding-bottom: 1vh;
  padding-top: 1vh;
  padding-left: 0vh;
  padding-right: 0vh;
  align-self: center;
  background: #ffffff;
}

#footer a {
  font-weight: bold;
  color: #2c3e50;
}

#footer a.router-link-exact-active {
  color: #42b983;
}
</style>
