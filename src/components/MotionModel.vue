<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">{{ text }}</el-button>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
      append-to-body="append"
      fullscreen="true">
      <el-container>
        <el-container width="70%">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Gaussian model" name="first">
              <el-container direction="vertical">
              <el-container>
                Ratio motion to x/y std. dev (alpha_1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-input-number v-model="edG_A1" size="mini" controls-position="right" :min="-10000000" :max="10000000"></el-input-number>
                <span>&nbsp;&nbsp;(meter/meter)</span>
              </el-container>
              <el-container>
                Ratio rotation to x/y std. dev (alpha_2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-input-number v-model="edG_A2" size="mini" controls-position="right"></el-input-number>
                <span>&nbsp;&nbsp;(meter/deg)</span>
              </el-container>
              <el-container>
                Ratio motion x/y to phi std. dev (alpha_3)&nbsp;&nbsp;
                <el-input-number v-model="edG_A3" size="mini" controls-position="right"></el-input-number>
                <span>&nbsp;&nbsp;(deg/meter)</span>
              </el-container>
              <el-container>
                Ratio rotation to phi std. dev (alpha_4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-input-number v-model="edG_A4" size="mini" controls-position="right"></el-input-number>
                <span>&nbsp;&nbsp;(deg/deg)</span>
              </el-container>
              <el-container>
                Minimum std. dev of x/y (min_std_XY)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-input-number v-model="edMinStdXY" size="mini" controls-position="right"></el-input-number>
                <span>&nbsp;&nbsp;(meters)</span>
              </el-container>
              <el-container>
                Minimum std. dev of phi (min_std_PHI)&nbsp;&nbsp;&nbsp;&nbsp;
                <el-input-number v-model="edMinStdPHI" size="mini" controls-position="right"></el-input-number>
                <span>&nbsp;&nbsp;(degrees)</span>
              </el-container>
              </el-container>
            </el-tab-pane>
            <el-tab-pane label="Thrun's Book Model" name="second">
              <el-container direction="vertical">
              <el-container>
                alpha1_rot_rot<span style="display:inline-block; width: 12em;"></span>
                <el-input-number v-model="edA1" size="mini" controls-position="right" :min="-10000000" :max="10000000"></el-input-number>
                <span>&nbsp;&nbsp;(degs/deg)</span>
              </el-container>
              <el-container>
                alpha2_rot_trans<span style="display:inline-block; width: 11em;"></span>
                <el-input-number v-model="edA2" size="mini" controls-position="right"></el-input-number>
                <span>&nbsp;&nbsp;(degs/meter)</span>
              </el-container>
              <el-container>
                alpha3_trans_trans<span style="display:inline-block; width: 10em;"></span>
                <el-input-number v-model="edA3" size="mini" controls-position="right"></el-input-number>
                <span>&nbsp;&nbsp;(meters/meter)</span>
              </el-container>
              <el-container>
                alpha4_trans_rot<span style="display:inline-block; width: 11em;"></span>
                <el-input-number v-model="edA4" size="mini" controls-position="right"></el-input-number>
                <span>&nbsp;&nbsp;(meters/deg)</span>
              </el-container>
              <el-container>
                Number of particles to generate<span style="display:inline-block; width: 5em;"></span>
                <el-input-number v-model="edNumParts" size="mini" controls-position="right"></el-input-number>
              </el-container>
              <el-container>
                Additional std. dev. of x/y (min_std_XY)<span style="display:inline-block; width: 1em;"></span>
                <el-input-number v-model="edAddXY" size="mini" controls-position="right"></el-input-number>
              <span>&nbsp;&nbsp;(meters)</span>
              </el-container>
              <el-container>
                Additional std. dev. of phi(min_std_PHI)<span style="display:inline-block; width: 1em;"></span>
                <el-input-number v-model="edAddPhi" size="mini" controls-position="right"></el-input-number>
              <span>&nbsp;&nbsp;(degrees)</span>
              </el-container>
              </el-container>
            </el-tab-pane>
            <span><br><br></span>
            <el-container direction="horizontal">
              <el-button @click="resetDefaultValue" size="small">Reset default values</el-button>
              <el-button @click="apply" size="small">Apply</el-button>
              <el-button @click="drawSamples" size="small">Draw Samples</el-button>
            </el-container>
            <span><br><br></span>
              <el-container>
                <el-checkbox v-model="applyToAll">Apply to all</el-checkbox>
              </el-container>
            <el-container direction="horizontal">
              <el-container direction="vertical">
                <el-container>Min Index</el-container>
                <el-input-number size="medium" v-model="minIdx" :min="0" :max="maxIdx" :disabled="applyToAll"></el-input-number>
              </el-container>
              <el-container direction="vertical">
                <el-container>Max Index</el-container>
                <el-input-number size="medium" v-model="maxIdx" :min="minIdx" :max="rawlogSize" :disabled="applyToAll"></el-input-number>
              </el-container>
            </el-container>
          </el-tabs>
        </el-container>
        <el-container width="30%">
          Plots for the samples
        </el-container>
      </el-container>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
  },
  data() {
    return {
      dialogVisible: false,
      activeName: 'first',
      minIdx: 0,
      maxIdx: 0,
      applyToAll: true,
      edG_A1: 0,
      edG_A2: 0,
      edG_A3: 0,
      edG_A4: 0,
      edMinStdXY: 0.01,
      edMinStdPHI: 0.02,
      default_edG_A1: 0,
      default_edG_A2: 0,
      default_edG_A3: 0,
      default_edG_A4: 0,
      default_edMinStdXY: 0.01,
      default_edMinStdPHI: 0.02,
      edA1: 0.05,
      edA2: 4,
      edA3: 0.01,
      edA4: 0.0001,
      edNumParts: 300,
      edAddXY: 0.001,
      edAddPhi: 0.050,
      default_edA1: 0.05,
      default_edA2: 4,
      default_edA3: 0.01,
      default_edA4: 0.0001,
      default_edNumParts: 300,
      default_edAddXY: 0.001,
      default_edAddPhi: 0.050,
    };
  },
  methods: {
    handleClose(done) {
      this.dialogVisible = false;
    },
    resetDefaultValue() {
      if (this.activeName === 'first') {
        this.edG_A1 = this.default_edG_A1;
        this.edG_A2 = this.default_edG_A2;
        this.edG_A3 = this.default_edG_A3;
        this.edG_A4 = this.default_edG_A4;
        this.edMinStdXY = this.default_edMinStdXY;
        this.edMinStdPHI = this.default_edMinStdPHI;
      }
      else {
      this.edA1 = this.default_edA1;
      this.edA2 = this.default_edA2;
      this.edA3 = this.default_edA3;
      this.edA4 = this.default_edA4;
      this.edNumParts = this.default_edNumParts;
      this.edAddXY = this.default_edAddXY;
      this.edAddPhi = this.default_edAddPhi;
      }
      this.apply();
    },
    apply() {
      let sendData;
      if(this.activeName === 'first') {
        const edG_A1 = this.edG_A1;
        const edG_A2 = this.edG_A2;
        const edG_A3 = this.edG_A3;
        const edG_A4 = this.edG_A4;
        const edMinStdXY = this.edMinStdXY;
        const edMinStdPHI = this.edMinStdPHI;
        sendData = {
          model: "Gaussian",
          edG_A1, edG_A2, edG_A3, edG_A4,
          edMinStdXY, edMinStdPHI,
        };
      }
      else {
        const edA1 = this.edA1;
        const edA2 = this.edA2;
        const edA3 = this.edA3;
        const edA4 = this.edA4;
        const edNumParts = this.edNumParts;
        const edAddXY = this.edAddXY;
        const edAddPhi = this.edAddPhi;
        sendData = {
          model: "Thrun",
          edA1,edA2,edA3,edA4,edNumParts,edAddXY,edAddPhi
        };
      }
      this.$store.dispatch('UPLOAD_MOTION_MODEL', sendData);
    },
    drawSamples() {

    }
  },
  computed: {
    rawlogSize() {
      let arr = this.$store.getters.getTree;
      let size =  ((arr.length - 1) || 0);
      return size;
    }
  },
  watch: {
    rawlogSize: function(newVal, oldVal) {
      console.log("Here");
      this.maxIdx = newVal;
    }
  },
  created() {
    this.maxIdx = (this.$store.getters.getTree.length - 1) || 0;
  },
  mounted() {
    this.maxIdx = (this.$store.getters.getTree.length - 1) || 0;
  }
}
</script>

<style scoped>

</style>

