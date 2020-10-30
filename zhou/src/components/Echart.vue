<template>
  <div style="height:100%" ref="echart">
    Echart
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  // 父组件传来的数据
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: []
        };
      }
    },
    // 判断是否有坐标轴的数据
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    }
  },
  watch: {
    // 监听事件
    chartData: {
      handler: function() {
        this.initChart();
      },
      deep: true
    },
    // 当菜单折叠时图表自适应函数运行
    isCollapse() {
      setTimeout(() => {
        this.resizeChart();
      }, 300);
    }
  },

  data() {
    return {
      echart: null,
      // 有坐标轴的
      axisOption: {
        legend: {
          textStyle: {
            color: "#333"
          }
        },
        // 有坐标轴的提示（触发方式为坐标轴）
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3"
            }
          },
          axisLabel: {
            color: "#333"
          }
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3"
              }
            }
          }
        ],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
          "#e5cf0d",
          "#97b552",
          "#95706d",
          "#dc69aa",
          "#07a2a4",
          "#9a7fd1",
          "#588dd5",
          "#f5994e",
          "#c05050",
          "#59678c",
          "#c9ab00",
          "#7eb00a",
          "#6f5553",
          "#c14089"
        ],
        series: []
      },
      // 没有坐标轴的
      normalOption: {
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf"
        ],
        // 没有坐标轴的提示（触发方式为item）
        tooltip: {
          trigger: "item"
        },
        series: []
      }
    };
  },
  methods: {
    // 初始化图标
    initChart() {
      this.initChartData();
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        this.echart = echarts.init(this.$refs.echart);
        this.echart.setOption(this.options);
      }
    },
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
        this.normalOption.series = this.chartData.series;
      }
    },
    // 判断是不是图表进而进不进行图表自适应事件
    resizeChart() {
      this.echart ? this.echart.resize() : "";
    }
  },
  // 添加事件（图表自适应事件）
  mounted() {
    // 监听到resize事件后触发该事件
    window.addEventListener("resize", this.resizeChart);
  },
  // 销毁事件，避免内存泄漏
  destoryed() {
    window.removeEventListener("resize", this.resizeChart);
  }
};
</script>

<style lang="scss" scoped></style>
