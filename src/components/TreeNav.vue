<template>
  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
    <template slot="title">RawLog Tree Layout</template>
  </el-tree>
</template>

<script>
/* eslint-disable */
import MRPTLIB from 'mrpt-web-js';
import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        data: [{
          label: 'Load some file'
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
        console.log(data.index);
      },
      getTreeData() {
        const ws = this.$store.state.ws;
        console.log('connected', ws.isConnected);
        const loadTreeClient = new MRPTLIB.Service({
          ws: ws,
          name: 'GetRawlogTree'
        });
        const request = new MRPTLIB.ServiceRequest({});
        loadTreeClient.callService(request, (result) => {
            this.arrangeData(result);
        });
      },
      arrangeData(data) {
        console.log(data);
        this.data = [];
        // this.data = new Array(data.length);
        this.data[0] = {
          label: 'Rawlog'
        };
        console.log(typeof data);
        for (let i = 1; i < data.length; i++) {
          console.log(i,data[i].data);
          this.data[i] = {
            label: data[i].data,
            index: i
          };
        }
      }
    },
    computed: {
      ...mapGetters({
        rawlogLoaded: 'getRawlogState'
      })
    },
    watch: {
      rawlogLoaded (newCheck, oldCheck) {
        if (newCheck === true) {
          this.getTreeData();
        }
      }
    }
  };
</script>

<style>

</style>
