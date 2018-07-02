<template>
  <div class="connection">
    <el-button v-if="connected" icon="el-icon-circle-check" type="success" circle></el-button>
    <el-button v-else icon="el-icon-circle-close" type="danger" circle></el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.$store.commit('WRAP',this.$socket);
    console.log(this.$store.state.ws);
  },
  computed: {
    connected() {
    return this.$store.state.ws.isConnected;
    }
  }
}
</script>

<style scoped>

</style>

