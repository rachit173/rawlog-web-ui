<template>
  <el-button type="text" @click="open">{{ text }}</el-button>
</template>

<script>
import MRPTLIB from 'mrpt-web-js';
import { mapGetters, mapMutations } from 'vuex';
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
        this.setRawlogLoaded(false);
        const ws = this.getWS;
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
            this.setRawlogLoaded(true);
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'File not loaded'
        });
      });
    },
    ...mapMutations({
      setRawlogLoaded: 'SET_RAWLOG_LOADED'
    })
  },
  computed: {
    ...mapGetters([
      'getWS'
    ])
  }
}
</script>

<style scoped>

</style>
