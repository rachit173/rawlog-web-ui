<template>
  <div :id="divID">
  </div>
</template>

<script>
import MRPTLIB from 'mrpt-web-js';

export default {
  props: {
    divID: {
      type: String,
      required: true,
    },
    plotData: {
      // type: Object,
      required: true
    }
  },
  data() {
    return {
      plot: null
    }
  },
  mounted() {
    let xs;
    let ys;
    if (!this.data) {
      xs = [];
      ys = [];
    }
    else {
      xs = data.xs || [];
      ys = data.ys || [];
    }

    this.plot = new MRPTLIB.plots.ScatterPlot(xs, ys, this.divID);
  },
  methods: {
  },
  watch: {
    plotData: function(newData) {
      console.log("newData", newData);
      let xs = newData.xs || [];
      let ys = newData.ys || [];
      this.plot.processData(xs, ys);
    }
  }
}
</script>

<style scoped>

</style>
