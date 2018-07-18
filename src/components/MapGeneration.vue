<template>
  <div>
    <el-button type="text" @click="dialogVisible=true">{{ text }}</el-button>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
      append-to-body="append"
      fullscreen="true">
      <el-container direction="vertical">
        <el-container direction="horizontal" style="min-height: 20vh;">
          <el-container width="50%" direction="vertical">
            <el-container>
              <span> First Entry: <el-input-number size="small" v-model="minIdx" :min="0" :max="maxIdx"></el-input-number></span>
            </el-container>
            <el-container>
              <span> Last Entry:  <el-input-number size="small" v-model="maxIdx" :min="minIdx" :max="rawlogSize"></el-input-number></span>
            </el-container>
            <el-container>
              <span> Decimation:    <el-input-number size="small" v-model="decimation" :min="1" :max="200"></el-input-number></span>
            </el-container><br><br>
            <el-container direction="horizontal">
              <el-button @click="generateMapFromOdometry">Map from Odometry</el-button>
              <!-- <el-button @click="generateMapFromRTKGPS">Map from RTK GPS</el-button>
              <el-button @click="generateRandomPaths"> Random paths</el-button> -->
            </el-container>
          </el-container>
          <el-container width="50%">
            <textarea style="height:98%;width:100%;resize:none;" id="area" align="left" v-model="textData" readonly></textarea>        </el-container>
          </el-container>
        <el-container id="bottom-padding-container">
        </el-container>
        <el-container align="center" style="padding-top: 10vh;">
          <graph-component-flex divID="map-generation-plot" :traces="mapData"></graph-component-flex>
        </el-container>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
import GraphComponentFlex from '@/components/GraphComponentFlex.vue';
import { mapGetters } from 'vuex';
import MRPTLIB from 'mrpt-web-js';
export default {
  props: {
    text: String,
  },
  data() {
    return {
      dialogVisible: false,
      textData: "",
      minIdx: 0,
      maxIdx: 0,
      decimation: 1,
      mapData: []
    }
  },
  methods: {
    handleClose(done) {
      this.dialogVisible = false;
    },
    generateMapFromOdometry() {
      // make changes to mapData
      let firstEntry = this.minIdx;
      let lastEntry = this.maxIdx;
      let decimate = this.decimation;
      const ws = this.getWS;
      console.log('connected', ws.isConnected);

      const mapLoadClient = new MRPTLIB.Service({
        ws: ws,
        name: "GetMapAndPath"
      });

      const request = new MRPTLIB.ServiceRequest({
        firstEntry,
        lastEntry,
        decimate
      });

      let _this = this;

      mapLoadClient.callService(request, (result) => {
        if (result.err) {
          console.error("error", result.err);
        }
        console.log(result);
        _this.textData = result.textData;
        let tmp = [];
        tmp[0] = MRPTLIB.plots.ScatterPlot.processTrace(result.points.xs, result.points.ys, 1);
        tmp[1] = MRPTLIB.plots.LinePlot.processTrace(result.path.x, result.path.y);
        _this.mapData = tmp;
      });
    }
  },
  computed: {
    rawlogSize() {
      let arr = this.getTree;
      let size =  ((arr.length - 1) || 0);
      return size;
    },
    ...mapGetters([
      'getTree',
      'getWS'
    ])
  },
  watch: {
    rawlogSize: function(newVal, oldVal) {
      console.log("Here");
      this.maxIdx = newVal;
    }
  },
  components: {
    GraphComponentFlex
  }
}
</script>

<style>

</style>
