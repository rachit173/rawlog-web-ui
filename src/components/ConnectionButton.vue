<template>
  <div class="connection">
    <el-button @click="disconnectHandle" v-if="connected" icon="el-icon-circle-check" type="success" circle></el-button>
    <el-button @click="connectHandle" v-else icon="el-icon-circle-close" type="danger" circle></el-button>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  props: {
    address: String,
  },
  data() {
    return {
      nativeSocket: null
    }
  },
  methods: {
    ...mapMutations({
      wrap: 'WRAP'
    }),
    connectHandle() {
      console.log("Connecting...");
      if (this.connected) {
        this.disconnectHandle();
      }
      try{
        this.nativeSocket = new WebSocket(this.address);
        this.nativeSocket.onopen = () => { this.wrap(this.nativeSocket); }
      }
      catch(err) {
        console.log("Could not create the socket");
      }
    },
    disconnectHandle() {
      console.log("Disconnecting...");
      if (this.nativeSocket) {
        this.nativeSocket.close();
      }
    }
  },
  mounted() {
    this.wrap(this.nativeSocket);
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

