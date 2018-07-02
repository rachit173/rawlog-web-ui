<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="File Path">
      <el-input v-model="formInline.path" placeholder="~/.../***.rawlog"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Load File</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from 'vuex';
import MRPTLIB from 'mrpt-web-js';

export default {
  data() {
    return {
      dialogVisible: false,
      formInline: {
        path : ''
      }
    };
  },
  props: {
    // dialogVisible: {
    //   type: Boolean,
    //   default: false,
    //   required: true
    // }
  },
  computed: {
    // other computed properties
  },
  methods: {
    onSubmit() {
        const path = this.formInline.path;
        console.log(path);
        const ws = this.$store.state.ws;
        console.log('connected', ws.isConnected);
        const loadRawlogClient = new MRPTLIB.Service({
          ws: ws,
          name: 'LoadRawlog'
        });
        const request = new MRPTLIB.ServiceRequest({
          path
        })
        loadRawlogClient.callService(request, function(result) {
          console.log('load rawlog result', result);
        })
    }
  }
}
</script>

<style scoped>

</style>
