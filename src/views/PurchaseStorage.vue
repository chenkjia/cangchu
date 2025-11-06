<template>
  <div class="purchase-storage">
    <h1>采购入仓流程</h1>
    
    <WorkflowSteps :steps="workflowSteps" :current-step="currentStep" />
    
    <div class="card">
      <h2>当前步骤：{{ workflowSteps[currentStep].title }}</h2>
      <p class="description">{{ workflowSteps[currentStep].description }}</p>
      
      <div class="form-section">
        <div class="form-row">
          <div class="form-group">
            <label>采购单号：</label>
            <input v-model="formData.orderNo" type="text" placeholder="自动生成" readonly />
          </div>
          <div class="form-group">
            <label>申请人：</label>
            <input v-model="formData.applicant" type="text" readonly />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>申请日期：</label>
            <input v-model="formData.applyDate" type="date" />
          </div>
          <div class="form-group">
            <label>预计到货日期：</label>
            <input v-model="formData.expectedDate" type="date" />
          </div>
        </div>
        
        <h3>采购物料明细</h3>
        <div class="table-actions">
          <button class="secondary-button" @click="addMaterial">新增物料</button>
        </div>
        <table class="materials-table">
          <thead>
            <tr>
              <th>物料编码</th>
              <th>物料名称</th>
              <th>规格型号</th>
              <th>单位</th>
              <th>数量</th>
              <th>单价</th>
              <th>金额</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in materials" :key="index">
              <td>{{ item.code }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.spec }}</td>
              <td>{{ item.unit }}</td>
              <td>
                <input v-model.number="item.quantity" type="number" min="1" style="width: 80px;" />
              </td>
              <td>
                <input v-model.number="item.price" type="number" min="0" step="0.01" style="width: 100px;" />
              </td>
              <td>{{ (item.quantity * item.price).toFixed(2) }}</td>
              <td>
                <button class="action-button delete" @click="removeMaterial(index)">删除</button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="6" style="text-align: right; font-weight: 600;">总金额：</td>
              <td style="font-weight: 600; color: #e74c3c;">￥{{ totalAmount }}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        
        <div class="form-actions">
          <button v-if="currentStep > 0" class="secondary-button" @click="prevStep">上一步</button>
          <button class="primary-button" @click="nextStep">
            {{ currentStep < workflowSteps.length - 1 ? '下一步' : '完成' }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- 添加物料弹窗 -->
    <div v-if="showMaterialDialog" class="modal-overlay" @click.self="showMaterialDialog = false">
      <div class="modal-content">
        <h2>选择物料</h2>
        <div class="material-list">
          <div 
            v-for="material in availableMaterials" 
            :key="material.code"
            class="material-item"
            @click="selectMaterial(material)"
          >
            <div class="material-info">
              <div class="material-name">{{ material.name }}</div>
              <div class="material-spec">{{ material.code }} - {{ material.spec }}</div>
            </div>
            <button class="action-button">选择</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import WorkflowSteps from '../components/WorkflowSteps.vue'

const workflowSteps = ref([
  { title: '采购申请', description: '器材股股长填写采购信息' },
  { title: '器材股审核', description: '器材股股长审核采购申请' },
  { title: '副总审核', description: '副总经理审核' },
  { title: '总经理审批', description: '总经理审批' },
  { title: '打印入仓单', description: '仓库管理员打印入仓单' },
  { title: '录入价格', description: '材料记账员录入价格信息' },
  { title: '物资验收', description: '器材会计员验收' },
  { title: '入仓确认', description: '仓库管理员确认入仓' }
])

const currentStep = ref(0)

const formData = ref({
  orderNo: 'PO' + Date.now(),
  applicant: '器材股股长',
  applyDate: new Date().toISOString().split('T')[0],
  expectedDate: ''
})

const materials = ref([
  { code: 'M001', name: '水表', spec: 'DN15', unit: '个', quantity: 10, price: 50.00 },
  { code: 'M002', name: '阀门', spec: 'DN50', unit: '个', quantity: 5, price: 120.00 }
])

const availableMaterials = ref([
  { code: 'M001', name: '水表', spec: 'DN15', unit: '个' },
  { code: 'M002', name: '阀门', spec: 'DN50', unit: '个' },
  { code: 'M003', name: '管材', spec: 'DN20', unit: '米' },
  { code: 'M004', name: '接头', spec: '标准', unit: '个' }
])

const showMaterialDialog = ref(false)

const totalAmount = computed(() => {
  return materials.value.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)
})

const addMaterial = () => {
  showMaterialDialog.value = true
}

const selectMaterial = (material) => {
  materials.value.push({
    ...material,
    quantity: 1,
    price: 0
  })
  showMaterialDialog.value = false
}

const removeMaterial = (index) => {
  materials.value.splice(index, 1)
}

const nextStep = () => {
  if (currentStep.value < workflowSteps.value.length - 1) {
    currentStep.value++
  } else {
    alert('流程完成！')
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
</script>

<style scoped>
.purchase-storage {
  padding: 20px;
}

.description {
  color: #666;
  margin-bottom: 20px;
  font-size: 14px;
}

.form-section {
  margin-top: 20px;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 250px;
}

.form-group label {
  width: 140px;
  font-weight: 500;
  color: #555;
}

.form-group input,
.form-group select {
  flex: 1;
}

.materials-table {
  width: 100%;
  margin: 20px 0;
}

.materials-table input {
  padding: 6px 10px;
}

.table-actions {
  margin-bottom: 15px;
}

.form-actions {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
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
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-content h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.material-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.material-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.material-item:hover {
  border-color: #5dade2;
  background-color: #f0f7ff;
}

.material-info {
  flex: 1;
}

.material-name {
  font-weight: 600;
  margin-bottom: 5px;
}

.material-spec {
  font-size: 13px;
  color: #666;
}
</style>