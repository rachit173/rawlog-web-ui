<template>
  <div class="about">
    <eslint-disable></eslint-disable>
    <el-header>
      <MenuBar/>
      <ConnectionButton align="right"/>
    </el-header>
    <el-container>
      <el-aside>
        <TreeNav/>
      </el-aside>
    </el-container>
  </div>
</template>
<script>
/* eslint-disable */
import MenuBar from '@/components/MenuBar.vue'
import TreeNav from '@/components/TreeNav.vue'
import ConnectionButton from '@/components/ConnectionButton.vue'

 export default {
    components: {
      MenuBar,
      TreeNav,
      ConnectionButton
      }
  }
</script>

<style scoped>
</style>
