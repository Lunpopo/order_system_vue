<template>
  <div class="dashboard-editor-container">
    <!-- 入库出库总金额和总数量统计 -->
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div>
          <el-statistic group-separator="," :precision="2" decimal-separator="." :value="purchase_order_total_price" title="入库单总金额">
            <template slot="prefix">
              <i class="el-icon-s-flag" style="color: red" />
            </template>
            <template slot="suffix">
              <i class="el-icon-s-flag" style="color: blue" />
            </template>
          </el-statistic>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div>
          <el-statistic :value="purchase_order_total_piece" title="入库单总数量（件）" />
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div>
          <el-statistic group-separator="," :precision="2" decimal-separator="." :value="outbound_order_total_price" title="出库单总金额">
            <template slot="prefix">
              <i class="el-icon-s-flag" style="color: red" />
            </template>
            <template slot="suffix">
              <i class="el-icon-s-flag" style="color: blue" />
            </template>
          </el-statistic>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div>
          <el-statistic :value="outbound_order_total_piece" title="出库单总数量（瓶）" />
        </div>
      </el-col>
    </el-row>

    <!-- <github-corner class="github-corner" /> -->

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <!-- <el-col :xs="24" :sm="24" :lg="8"> -->
      <el-col :span="12">
        <div class="chart-wrapper">
          <pie-chart :chart-data="lineChartData" />
        </div>
      </el-col>
      <!-- <el-col :xs="24" :sm="24" :lg="8"> -->
      <el-col :span="12">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getTotalPurchasePriceAndPiece, getPurchasePriceStatistics, getPurchasePieceStatistics } from '@/api/purchase_order'
import { getTotalOutboundPriceAndPiece, getOutboundPriceStatistics, getOutboundPieceStatistics } from '@/api/outbound_order'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

const choiceStatistic = {
  purchase_price: {
    data: [],
    date_time: [],
    switch_name: '金额（元）'
  },
  purchase_piece: {
    data: [],
    date_time: [],
    switch_name: '数量（件）'
  },
  outbound_price: {
    data: [],
    date_time: [],
    switch_name: '金额（元）'
  },
  outbound_piece: {
    data: [],
    date_time: [],
    switch_name: '数量（件）'
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    PieChart,
    BarChart
  },

  data() {
    return {
      // 默认展示的折线统计图
      lineChartData: choiceStatistic.purchase_price,
      purchase_order_total_price: '',
      purchase_order_total_piece: '',
      outbound_order_total_price: '',
      outbound_order_total_piece: ''
    }
  },

  created() {
    // 初始化页面的数据
    this.getTotalPurchaseOutbound()
    this.getStatistic()
  },

  methods: {
    // 获取入库单和出库单的总金额和总数量
    getTotalPurchaseOutbound() {
      getTotalPurchasePriceAndPiece().then((response) => {
        const data = response.data
        this.purchase_order_total_price = data.total_price
        this.purchase_order_total_piece = data.total_piece
      })
      getTotalOutboundPriceAndPiece().then((response) => {
        const data = response.data
        this.outbound_order_total_price = data.total_price
        this.outbound_order_total_piece = data.total_piece
      })
    },

    // 获取 4 个统计图的数据信息
    getStatistic() {
      this.getPurchaseStatistic()
      this.getOutboundStatistic()
    },

    // 获取入库单金额和时间的统计数据
    getPurchaseStatistic() {
      getPurchasePriceStatistics().then((response) => {
        const _dict = {
          'data': response.data.y,
          'date_time': response.data.x,
          'switch_name': '金额（元）',
          'title': '入库金额统计（元）：'
        }
        choiceStatistic.purchase_price = _dict
        this.lineChartData = _dict
      })
      getPurchasePieceStatistics().then((response) => {
        const _dict = {
          'data': response.data.y,
          'date_time': response.data.x,
          'switch_name': '数量（件）',
          'title': '入库数量统计（件）：'
        }
        choiceStatistic.purchase_piece = _dict
      })
    },

    // 获取出库单金额和时间的统计数据
    getOutboundStatistic() {
      getOutboundPriceStatistics().then((response) => {
        const _dict = {
          'data': response.data.y,
          'date_time': response.data.x,
          'switch_name': '金额（元）',
          'title': '出库金额统计（元）：'
        }
        choiceStatistic.outbound_price = _dict
      })
      getOutboundPieceStatistics().then((response) => {
        const _dict = {
          'data': response.data.y,
          'date_time': response.data.x,
          'switch_name': '数量（瓶）',
          'title': '出库数量统计（瓶）：'
        }
        choiceStatistic.outbound_piece = _dict
      })
    },

    // 点击按钮 切换统计图
    handleSetLineChartData(type) {
      this.lineChartData = choiceStatistic[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.card-panel-col {
  margin-bottom: 32px;
}

.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 16px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>