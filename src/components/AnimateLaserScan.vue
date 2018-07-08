<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">{{ text }}</el-button>
    <el-dialog
      title="Animate Laser Scan"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
      append-to-body="append"
      fullscreen=true>
      <span>This is component is under development</span>
      <el-container direction="vertical">
        <el-container style="height:40vh;">
          <el-input></el-input>
          <!-- <el-button type="success" @click="dialogVisible = false">Play</el-button> -->
        </el-container>
        <el-container style="height:60vh;" id="animation-scene">
          <!-- <div  >
          </div> -->
        </el-container>
      </el-container>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MRPTLIB from 'mrpt-web-js'
export default {
  props: {
    text: String
  },
  data() {
    return {
      dialogVisible: false,
      scene: null,
      append: true,
      arrow: true
    }
  },
  methods: {
      handleClose(done) {
        this.dialogVisible = false;
      },
      initiateScene() {
        if(this.scene === null) {
        this.scene = new MRPTLIB.Scene({
            divID: "animation-scene",
            width: 800,
            height: 600,
            cameraPose :{
              x : -3,
              y: -3,
              z: 5
            }
          });
        }
      }
  },
  watch: {
    dialogVisible: function(newValue, oldValue) {
        if( newValue === true) {
          this.initiateScene();
        }
    }
  }
}
</script>

<style scoped>

</style>
