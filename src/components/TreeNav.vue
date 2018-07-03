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
          label: 'Rawlog Tree Layout'
        },
        {
          label: 'Level one 1',
          children: [{
            label: 'Level two 1-1',
            children: [{
              label: 'Level three 1-1-1'
            }]
          }]
        }, {
          label: 'Level one 2',
          children: [{
            label: 'Level two 2-1',
            children: [{
              label: 'Level three 2-1-1'
            }]
          }, {
            label: 'Level two 2-2',
            children: [{
              label: 'Level three 2-2-1'
            }]
          }]
        }, {
          label: 'Level one 3',
          children: [{
            label: 'Level two 3-1',
            children: [{
              label: 'Level three 3-1-1'
            }]
          }, {
            label: 'Level two 3-2',
            children: [{
              label: 'Level three 3-2-1'
            }]
          }]
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
