<template>
  <div class="material-demand">
    <h1>物资需求流程</h1>
    
    <WorkflowSteps :steps="workflowSteps" :current-step="currentStep" />
    
    <div class="card">
      <h2>当前步骤：{{ workflowSteps[currentStep].title }}</h2>
      <p class="description">{{ workflowSteps[currentStep].description }}</p>
      
      <div class="form-section">
        <div class="form-row">
          <div class="form-group">
            <label>需求单号：</label>
            <input v-model="formData.demandNo" type="text" readonly />
          </div>
          <div class="form-group">
            <label>申请人：</label>
            <input v-model="formData.applicant" type="text" readonly />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>申请部门：</label>
            <select v-model="formData.department">
              <option>工程部</option>
              <option>维修部</option>
              <option>运营部</option>
            </select>
          </div>
          <div class="form-group">
            <label>申请日期：</label>
            <input v-model="formData.applyDate" type="date" />
          </div>
        </div>
        
        <h3>需求物料明细</h3>
        <table class="materials-table">
          <thead>
            <tr>
              <th>物料编码</th>
              <th>物料名称</th>
              <th>规格型号</th>
              <th>单位</th>
              <th>需求数量</th>
              <th>现有库存</th>
              <th>用途说明</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in materials" :key="index">
              <td>{{ item.code }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.spec }}</td>
              <td>{{ item.unit }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.stock }}</td>
              <td>{{ item.purpose }}</td>
              <td>
                <button class="action-button delete">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div class="form-actions">
          <button v-if="currentStep > 0" class="secondary-button" @click="prevStep">上一步</button>
          <button class="primary-button" @click="nextStep">
            {{ currentStep < workflowSteps.length - 1 ? '下一步' : '完成' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import WorkflowSteps from '../components/WorkflowSteps.vue'

const workflowSteps = ref([
  { title: '需求填写', description: '各部门需求人员填写物资需求' },
  { title: '主管审核', description: '需求部门主管审核' },
  { title: '器材会计确认', description: '器材会计员确认需求' },
  { title: '副总审批', description: '副总经理审批' },
  { title: '总经理审批', description: '总经理审批' }
])

const currentStep = ref(0)

const formData = ref({
  demandNo: 'DM' + Date.now(),
  applicant: '需求部门人员',
  department: '工程部',
  applyDate: new Date().toISOString().split('T')[0]
})

const materials = ref([
  { code: 'M001', name: '水表', spec: 'DN15', unit: '个', quantity: 5, stock: 100, purpose: '新用户安装' }
])

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
.material-demand {
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

.form-actions {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>