<template>
  <div class="about">
    <eslint-disable></eslint-disable>
    <el-container style="height: 98vh; border: 1px solid #eee">
      <el-header>
          <MenuBar/>
          <ConnectionButton align="right"/>
      </el-header>
      <el-container>
        <el-main>
          <el-container>
            <el-aside style="height: 85vh;">
              <TreeNav/>
            </el-aside>
            <el-main style="height: 85vh;" direction="vertical">
              <TextInfo/>
              <VizInfo/>
            </el-main>
          </el-container>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
/* eslint-disable */
import MenuBar from '@/components/MenuBar.vue'
import TreeNav from '@/components/TreeNav.vue'
import ConnectionButton from '@/components/ConnectionButton.vue'
import TextInfo from '@/components/TextInfo.vue';
import VizInfo from '@/components/VizInfo.vue';

 export default {
    components: {
      MenuBar,
      TreeNav,
      ConnectionButton,
      TextInfo,
      VizInfo
      }
  }
</script>

<style scoped>
</style>
