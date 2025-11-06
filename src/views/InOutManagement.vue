<template>
  <div class="in-out-management">
    <h1>出入库管理</h1>
    
    <div class="tabs">
      <div 
        v-for="(tab, index) in tabs" 
        :key="index"
        :class="['tab', { active: activeTab === index }]"
        @click="activeTab = index"
      >
        {{ tab.name }}
      </div>
    </div>
    
    <div class="filter-section">
      <div class="filter-item">
        <label>物料名称:</label>
        <input v-model="filterForm.materialName" type="text" placeholder="请输入物料名称">
      </div>
      <div class="filter-item">
        <label>时间范围:</label>
        <input v-model="filterForm.startDate" type="date">
        <span>至</span>
        <input v-model="filterForm.endDate" type="date">
      </div>
      <div class="filter-item">
        <label>仓库:</label>
        <select v-model="filterForm.warehouse">
          <option value="">全部</option>
          <option>主仓库</option>
          <option>备件仓库</option>
        </select>
      </div>
      <button class="search-button" @click="handleSearch">查询</button>
      <button class="secondary-button" @click="handleExport">导出</button>
    </div>
    
    <div class="card">
      <!-- 出库记录 -->
      <div v-if="activeTab === 0" class="records-section">
        <div class="summary-info">
          <div class="summary-item">
            <span class="label">总出库次数：</span>
            <span class="value">{{ outboundSummary.totalCount }}</span>
          </div>
          <div class="summary-item">
            <span class="label">总出库数量：</span>
            <span class="value">{{ outboundSummary.totalQuantity }}</span>
          </div>
        </div>
        <div class="records-table">
          <table>
            <thead>
              <tr>
                <th>单据编号</th>
                <th>物料编码</th>
                <th>物料名称</th>
                <th>规格型号</th>
                <th>单位</th>
                <th>数量</th>
                <th>仓库</th>
                <th>领料人</th>
                <th>操作时间</th>
                <th>操作人</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in filteredOutboundRecords" :key="record.id">
                <td>{{ record.orderNo }}</td>
                <td>{{ record.code }}</td>
                <td>{{ record.name }}</td>
                <td>{{ record.spec }}</td>
                <td>{{ record.unit }}</td>
                <td><span class="outbound">-{{ record.quantity }}</span></td>
                <td>{{ record.warehouse }}</td>
                <td>{{ record.picker }}</td>
                <td>{{ record.operateTime }}</td>
                <td>{{ record.operator }}</td>
                <td>
                  <button class="action-button" @click="viewDetail(record)">查看</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- 入库记录 -->
      <div v-if="activeTab === 1" class="records-section">
        <div class="summary-info">
          <div class="summary-item">
            <span class="label">总入库次数：</span>
            <span class="value">{{ inboundSummary.totalCount }}</span>
          </div>
          <div class="summary-item">
            <span class="label">总入库数量：</span>
            <span class="value">{{ inboundSummary.totalQuantity }}</span>
          </div>
        </div>
        <div class="records-table">
          <table>
            <thead>
              <tr>
                <th>单据编号</th>
                <th>物料编码</th>
                <th>物料名称</th>
                <th>规格型号</th>
                <th>单位</th>
                <th>数量</th>
                <th>单价</th>
                <th>仓库</th>
                <th>供应商</th>
                <th>操作时间</th>
                <th>操作人</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in filteredInboundRecords" :key="record.id">
                <td>{{ record.orderNo }}</td>
                <td>{{ record.code }}</td>
                <td>{{ record.name }}</td>
                <td>{{ record.spec }}</td>
                <td>{{ record.unit }}</td>
                <td><span class="inbound">+{{ record.quantity }}</span></td>
                <td>￥{{ record.price }}</td>
                <td>{{ record.warehouse }}</td>
                <td>{{ record.supplier }}</td>
                <td>{{ record.operateTime }}</td>
                <td>{{ record.operator }}</td>
                <td>
                  <button class="action-button" @click="viewDetail(record)">查看</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- 出入库统计 -->
      <div v-if="activeTab === 2" class="statistics-section">
        <div class="chart-container">
          <div class="chart-card">
            <h3>月度出入库趋势</h3>
            <div class="chart-wrapper">
              <Line :data="trendChartData" :options="chartOptions" />
            </div>
          </div>
        </div>
        
        <div class="stats-cards">
          <div class="stat-card">
            <h4>本月入库</h4>
            <p class="stat-number">￥{{ monthStats.inbound }}</p>
            <p class="stat-desc">较上月 <span class="increase">+12%</span></p>
          </div>
          <div class="stat-card">
            <h4>本月出库</h4>
            <p class="stat-number">￥{{ monthStats.outbound }}</p>
            <p class="stat-desc">较上月 <span class="increase">+8%</span></p>
          </div>
          <div class="stat-card">
            <h4>库存周转率</h4>
            <p class="stat-number">{{ monthStats.turnover }}</p>
            <p class="stat-desc">较上月 <span class="decrease">-3%</span></p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 详情弹窗 -->
    <div v-if="showDetailDialog" class="modal-overlay" @click.self="showDetailDialog = false">
      <div class="modal-content">
        <h2>记录详情</h2>
        <div class="detail-info">
          <div class="detail-row">
            <span class="label">单据编号：</span>
            <span>{{ detailRecord.orderNo }}</span>
          </div>
          <div class="detail-row">
            <span class="label">物料信息：</span>
            <span>{{ detailRecord.name }} ({{ detailRecord.code }})</span>
          </div>
          <div class="detail-row">
            <span class="label">规格型号：</span>
            <span>{{ detailRecord.spec }}</span>
          </div>
          <div class="detail-row">
            <span class="label">数量：</span>
            <span>{{ detailRecord.quantity }} {{ detailRecord.unit }}</span>
          </div>
          <div class="detail-row">
            <span class="label">仓库：</span>
            <span>{{ detailRecord.warehouse }}</span>
          </div>
          <div class="detail-row">
            <span class="label">操作时间：</span>
            <span>{{ detailRecord.operateTime }}</span>
          </div>
          <div class="detail-row">
            <span class="label">操作人：</span>
            <span>{{ detailRecord.operator }}</span>
          </div>
        </div>
        <div class="modal-actions">
          <button class="primary-button" @click="showDetailDialog = false">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const tabs = ref([
  { name: '出库记录' },
  { name: '入库记录' },
  { name: '出入库统计' }
])

const activeTab = ref(0)

const filterForm = ref({
  materialName: '',
  startDate: '',
  endDate: '',
  warehouse: ''
})

// 出库记录
const outboundRecords = ref([
  { id: 1, orderNo: 'OUT20240101001', code: 'M001', name: '水表', spec: 'DN15', unit: '个', quantity: 5, warehouse: '主仓库', picker: '张三', operateTime: '2024-01-01 10:30', operator: '仓库管理员' },
  { id: 2, orderNo: 'OUT20240102001', code: 'M002', name: '阀门', spec: 'DN50', unit: '个', quantity: 3, warehouse: '主仓库', picker: '李四', operateTime: '2024-01-02 14:20', operator: '仓库管理员' },
  { id: 3, orderNo: 'OUT20240103001', code: 'M003', name: '管材', spec: 'DN20', unit: '米', quantity: 50, warehouse: '主仓库', picker: '王五', operateTime: '2024-01-03 09:15', operator: '仓库管理员' },
  { id: 4, orderNo: 'OUT20240104001', code: 'M004', name: '接头', spec: '标准', unit: '个', quantity: 20, warehouse: '备件仓库', picker: '赵六', operateTime: '2024-01-04 11:45', operator: '仓库管理员' }
])

// 入库记录
const inboundRecords = ref([
  { id: 1, orderNo: 'IN20240101001', code: 'M001', name: '水表', spec: 'DN15', unit: '个', quantity: 100, price: 50.00, warehouse: '主仓库', supplier: '华水表有限公司', operateTime: '2024-01-01 15:30', operator: '仓库管理员' },
  { id: 2, orderNo: 'IN20240102001', code: 'M002', name: '阀门', spec: 'DN50', unit: '个', quantity: 50, price: 120.00, warehouse: '主仓库', supplier: '华水表有限公司', operateTime: '2024-01-02 16:20', operator: '仓库管理员' },
  { id: 3, orderNo: 'IN20240103001', code: 'M003', name: '管材', spec: 'DN20', unit: '米', quantity: 200, price: 15.00, warehouse: '主仓库', supplier: '华水表有限公司', operateTime: '2024-01-03 10:15', operator: '仓库管理员' }
])

const outboundSummary = computed(() => ({
  totalCount: filteredOutboundRecords.value.length,
  totalQuantity: filteredOutboundRecords.value.reduce((sum, item) => sum + item.quantity, 0)
}))

const inboundSummary = computed(() => ({
  totalCount: filteredInboundRecords.value.length,
  totalQuantity: filteredInboundRecords.value.reduce((sum, item) => sum + item.quantity, 0)
}))

const filteredOutboundRecords = computed(() => {
  return outboundRecords.value.filter(record => {
    if (filterForm.value.materialName && !record.name.includes(filterForm.value.materialName)) {
      return false
    }
    if (filterForm.value.warehouse && record.warehouse !== filterForm.value.warehouse) {
      return false
    }
    return true
  })
})

const filteredInboundRecords = computed(() => {
  return inboundRecords.value.filter(record => {
    if (filterForm.value.materialName && !record.name.includes(filterForm.value.materialName)) {
      return false
    }
    if (filterForm.value.warehouse && record.warehouse !== filterForm.value.warehouse) {
      return false
    }
    return true
  })
})

const monthStats = ref({
  inbound: '125,600',
  outbound: '98,400',
  turnover: '2.8次'
})

const trendChartData = ref({
  labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
  datasets: [
    {
      label: '入库金额(元)',
      data: [120000, 150000, 130000, 160000, 140000, 125600],
      borderColor: 'rgba(93, 173, 226, 1)',
      backgroundColor: 'rgba(93, 173, 226, 0.1)',
      tension: 0.4,
      fill: true
    },
    {
      label: '出库金额(元)',
      data: [80000, 110000, 95000, 130000, 120000, 98400],
      borderColor: 'rgba(231, 76, 60, 1)',
      backgroundColor: 'rgba(231, 76, 60, 0.1)',
      tension: 0.4,
      fill: true
    }
  ]
})

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

const showDetailDialog = ref(false)
const detailRecord = ref({})

const handleSearch = () => {
  console.log('搜索：', filterForm.value)
}

const handleExport = () => {
  alert('导出功能待实现')
}

const viewDetail = (record) => {
  detailRecord.value = record
  showDetailDialog.value = true
}
</script>

<style scoped>
.in-out-management {
  padding: 20px;
}

.records-section {
  margin-top: 20px;
}

.summary-info {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
  padding: 15px;
  background: linear-gradient(135deg, #f8f9fa, #e8eaf6);
  border-radius: 8px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.summary-item .label {
  color: #666;
  font-size: 14px;
}

.summary-item .value {
  color: #3498db;
  font-size: 18px;
  font-weight: 600;
}

.records-table {
  overflow-x: auto;
}

.statistics-section {
  margin-top: 20px;
}

.chart-container {
  margin-bottom: 30px;
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
  height: 300px;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border: 1px solid #e8eaf6;
  transition: all 0.3s;
}

.stat-card:hover {
  box-shadow: 0 4px 16px rgba(93, 173, 226, 0.2);
  transform: translateY(-2px);
}

.stat-card h4 {
  color: #555;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
}

.stat-card .stat-number {
  font-size: 2rem;
  font-weight: 600;
  background: linear-gradient(90deg, #5dade2, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 10px 0;
}

.stat-card .stat-desc {
  color: #888;
  font-size: 13px;
}

.increase {
  color: #66bb6a;
  font-weight: 600;
}

.decrease {
  color: #e74c3c;
  font-weight: 600;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 30px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-content h2 {
  margin-bottom: 25px;
  color: #2c3e50;
}

.detail-info {
  margin-bottom: 20px;
}

.detail-row {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row .label {
  width: 120px;
  color: #666;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
}
</style>