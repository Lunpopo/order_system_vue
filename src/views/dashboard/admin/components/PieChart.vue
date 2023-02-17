<!--
 * @Author: xie.yx yxxie@gk-estor.com
 * @Date: 2022-12-05 21:09:43
 * @LastEditors: xie.yx yxxie@gk-estor.com
 * @LastEditTime: 2023-01-14 16:13:54
 * @FilePath: /vue-element-admin/src/views/dashboard/admin/components/PieChart.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import { getOutboundPieStatistics } from '@/api/outbound_order'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    }
  },

  data() {
    return {
      // 经销商列表
      dealer_names: [],
      // 经销商数据列表，里面是字典
      dealer_price_data: [],
      chart: null
    }
  },

  created() {
    this.get_outbound_pie_data()
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },

  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },

  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          text: '前5名经销商进货额统计信息：',
          textStyle: {
            fontSize: 18,
            fontWeight: 'bolder'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: []
        },
        series: [
          {
            name: '前5名经销商进货额统计信息',
            type: 'pie',
            roseType: 'radius',
            // radius: [15, 95],
            radius: [30, 130],
            // center: ['50%', '38%'],
            data: [],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    },

    // 获取各个经销商出库金额的饼图统计信息
    get_outbound_pie_data() {
      getOutboundPieStatistics().then((response) => {
        this.dealer_names = response.data.dealer_names
        this.dealer_price_data = response.data.data_dict

        // 然后再给饼状图赋值
        this.chart.setOption({
          legend: {
            data: this.dealer_names
          },
          series: [{
            data: this.dealer_price_data
          }]
        })
      })
    }
  }
}
</script>
