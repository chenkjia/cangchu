<template>
  <div class="dashboard">
    <h1>系统首页</h1>
    <div class="stats-container">
      <div class="stat-card">
        <h3>库存物料</h3>
        <p class="stat-number">128</p>
        <p class="stat-desc">当前库存物料种类</p>
      </div>
      <div class="stat-card">
        <h3>待处理采购</h3>
        <p class="stat-number">5</p>
        <p class="stat-desc">待审批采购申请</p>
      </div>
      <div class="stat-card">
        <h3>待处理需求</h3>
        <p class="stat-number">3</p>
        <p class="stat-desc">待审批物资需求</p>
      </div>
      <div class="stat-card">
        <h3>库存预警</h3>
        <p class="stat-number">2</p>
        <p class="stat-desc">低于安全库存物料</p>
      </div>
    </div>
    
    <div class="charts-container">
      <div class="chart-card">
        <h3>库存统计</h3>
        <div class="chart-wrapper">
          <Pie :data="inventoryChartData" :options="chartOptions" />
        </div>
      </div>
      <div class="chart-card">
        <h3>出入库趋势</h3>
        <div class="chart-wrapper">
          <Line :data="trendChartData" :options="lineChartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Pie, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js'

// 注册 Chart.js 组件
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)

// 库存统计饼图数据
const inventoryChartData = ref({
  labels: ['水表', '阀门', '管材', '配件', '其他'],
  datasets: [
    {
      label: '库存数量',
      data: [350, 180, 220, 150, 100],
      backgroundColor: [
        'rgba(93, 173, 226, 0.8)',
        'rgba(102, 187, 106, 0.8)',
        'rgba(243, 156, 18, 0.8)',
        'rgba(231, 76, 60, 0.8)',
        'rgba(155, 89, 182, 0.8)'
      ],
      borderColor: [
        'rgba(93, 173, 226, 1)',
        'rgba(102, 187, 106, 1)',
        'rgba(243, 156, 18, 1)',
        'rgba(231, 76, 60, 1)',
        'rgba(155, 89, 182, 1)'
      ],
      borderWidth: 2
    }
  ]
})

// 出入库趋势折线图数据
const trendChartData = ref({
  labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
  datasets: [
    {
      label: '入库数量',
      data: [120, 150, 180, 160, 200, 170],
      borderColor: 'rgba(93, 173, 226, 1)',
      backgroundColor: 'rgba(93, 173, 226, 0.1)',
      tension: 0.4,
      fill: true
    },
    {
      label: '出库数量',
      data: [80, 110, 130, 140, 160, 150],
      borderColor: 'rgba(102, 187, 106, 1)',
      backgroundColor: 'rgba(102, 187, 106, 0.1)',
      tension: 0.4,
      fill: true
    }
  ]
})

// 图表通用配置
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 15,
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: {
        size: 14
      },
      bodyFont: {
        size: 13
      }
    }
  }
})

// 折线图专用配置
const lineChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 15,
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: {
        size: 14
      },
      bodyFont: {
        size: 13
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.dashboard h1 {
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 25px;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  transition: all 0.3s;
  border: 1px solid #e8eaf6;
}

.stat-card:hover {
  box-shadow: 0 4px 16px rgba(93, 173, 226, 0.2);
  transform: translateY(-2px);
}

.stat-card h3 {
  color: #555;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
}

.stat-number {
  font-size: 2.2rem;
  font-weight: 600;
  background: linear-gradient(90deg, #5dade2, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 10px 0;
}

.stat-desc {
  color: #888;
  margin: 0;
  font-size: 13px;
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border: 1px solid #e8eaf6;
}

.chart-card h3 {
  color: #2c3e50;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
}

.chart-wrapper {
  height: 280px;
  padding: 15px;
}
</style>