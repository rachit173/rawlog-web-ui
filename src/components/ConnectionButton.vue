<template>
  <div class="connection">
    <el-button @click="disconnectHandle" v-if="connected" icon="el-icon-circle-check" type="success" circle></el-button>
    <el-button @click="connectHandle" v-else icon="el-icon-circle-close" type="danger" circle></el-button>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations({
      wrap: 'WRAP'
    }),
    connectHandle() {
      console.log("Connecting...");
      this.$connect();
      this.$socket.onopen = () => {this.wrap(this.$socket);};
    },
    disconnectHandle() {
      console.log("Disconnecting...");
      this.$disconnect();
    }
  },
  mounted() {
    this.wrap(this.$socket);
  },
  computed: {
    connected() {
    return this.getWS.isConnected;
    },
    ...mapGetters([
      'getWS'
    ])
  }
}
</script>

<style scoped>

</style>

