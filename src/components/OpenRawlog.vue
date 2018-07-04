<template>
  <el-button type="text" @click="open">{{ text }}</el-button>
</template>

<script>
import MRPTLIB from 'mrpt-web-js';
export default {
  props: {
    text: String
  },
  methods: {
    open() {
      this.$prompt('File location', 'Load rawlog', {
        confirmButtonText: 'Open',
        cancelButtonText: 'Cancel',
        inputErrorMessage: 'Invalid File Type'
      }).then(input => {
        const path = input.value || "";
        console.log('rawlog path', path);
        this.$store.commit('SET_RAWLOG_LOADED', false);
        const ws = this.$store.state.ws;
        console.log('connected', ws.isConnected);
        const loadRawlogClient = new MRPTLIB.Service({
          ws: ws,
          name: 'LoadRawlog'
        });
        const request = new MRPTLIB.ServiceRequest({
          path
        });
        loadRawlogClient.callService(request, (result) => {
          if (result.loaded) {
            console.log(result);
            this.$store.commit('SET_RAWLOG_LOADED', true);
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'File not loaded'
        });
      });
    }
  }
}
</script>

<style scoped>

</style>
