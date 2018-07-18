<template>
  <el-container style="height: 40vh; border: 1px solid #eee;" id="viz-info">
    <el-tabs type="border-card" tab-position="left" style="width: 100%; height: 100%;">
      <el-tab-pane label="Rawlog Information">
        <el-container>
          <!-- The divID must be different for all components in the system
              So always add the component name before the name one chooses -->
          <graph-component divID="viz-info-rawlog" :plotData="rawlogData"></graph-component>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="2D Mov. Action">
        <el-container>
          <graph-component divID="viz-info-mov-2d-action" :plotData="action2d"></graph-component>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="Obs: 2d Scan">
        <el-container>
          <graph-component divID="viz-info-2d-scan" :plotData="scan2d"></graph-component>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="Obs: Image">
        <el-container>
          <image-component divID="viz-info-image" :plotData="imageData"></image-component>
        </el-container>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
import GraphComponent from '@/components/GraphComponent.vue';
import ImageComponent from '@/components/ImageComponent.vue';
export default {
  data() {
    return {
      rawlogData: null,
      action2d: null,
      scan2d: null,
      imageData: null
    }
  },
  components: {
    GraphComponent,
    ImageComponent
  }
}
</script>

<style scoped>

</style>

