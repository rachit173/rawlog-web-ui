<template>
  <el-container style="height: 40vh;" id="text-info">
    <textarea style="height:98%;width:100%;resize:none;" id="area" align="left" v-model="text" readonly></textarea>
  </el-container>
</template>

<script>
export default {
  computed: {
    text() {
      return this.$store.state.currentLogText;
    }
  }
}
</script>

<style scoped>
 @import url('https://fonts.googleapis.com/css?family=Inconsolata&amp;subset=latin-ext');
  .id-info {
    font-family: 'Inconsolata', monospace;
  }
</style>
