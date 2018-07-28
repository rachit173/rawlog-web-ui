<template>
    <div class="menu-bar">
      <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-submenu index="1">
          <template slot="title">File</template>
          <el-menu-item index="1-1">
            <OpenRawlog text="Open"/>
          </el-menu-item>
          <el-menu-item index="1-2">Save As</el-menu-item>
          <el-submenu index="1-3">
            <template slot="title">Operation on Files</template>
            <el-menu-item index="1-3-1">Count Entries</el-menu-item>
            <el-menu-item index="1-3-2">Convert to observation only RawLog</el-menu-item>
            <el-menu-item index="1-3-3">Loss-less decimation</el-menu-item>
            <el-menu-item index="1-3-4">Compact Rawlog</el-menu-item>
          </el-submenu>
          <el-submenu index="1-4">
            <template slot="title">Import</template>
            <el-menu-item index="1-4-1">Carmen Log</el-menu-item>
            <el-menu-item index="1-4-2">Sequence of image files</el-menu-item>
            <el-menu-item index="1-4-3">MOOS alog</el-menu-item>
            <el-menu-item index="1-4-4">RTL Log</el-menu-item>
            <el-menu-item index="1-4-5">Bremen DLR Log</el-menu-item>
          </el-submenu>
          <el-submenu index="1-5">
            <template slot="title">Export</template>
            <el-menu-item index="1-5-1">Plain text files</el-menu-item>
            <el-menu-item index="1-5-2">MOOS alog</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">Edit</template>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">Sensors</template>
          <el-submenu index="3-1">
            <template slot="title">LaserScan</template>
            <el-menu-item index="3-1-1">
              <animate-laser-scan text="Animate LaserScan"/>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3-2">
            <template slot="title">Odometry (actions)</template>
            <el-menu-item index="3-2-1">
              <motion-model text="Modify motion model"/>
            </el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">Tools</template>
          <el-menu-item index="4-1">
            <map-generation text="map and path generation module"/>
          </el-menu-item>
        </el-submenu>
          <el-container style="padding: 1vh; width: 40%;">
            <el-input placeholder="localhost:5000" v-model="address">
              <template slot="prepend">ws://</template>
          </el-input>
          <connection-button :address='completeAddress'></connection-button>
        </el-container>
      </el-menu>
    </div>
</template>

<script>
import OpenRawlog from '@/components/OpenRawlog.vue';
import AnimateLaserScan from '@/components/AnimateLaserScan.vue';
import MotionModel from '@/components/MotionModel.vue';
import MapGeneration from '@/components/MapGeneration.vue';
import ConnectionButton from '@/components/ConnectionButton.vue';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      activeIndex: "1",
      dialogVisible: false,
      address: ''
    };
  },
  components: {
    OpenRawlog,
    AnimateLaserScan,
    MotionModel,
    MapGeneration,
    ConnectionButton
  },
  computed: {
      ...mapState([
    ]),
    completeAddress() {
      return "ws://" + this.address;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
</style>
