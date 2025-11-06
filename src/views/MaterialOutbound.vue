<template>
  <div class="material-outbound">
    <h1>材料出仓流程</h1>
    
    <WorkflowSteps :steps="workflowSteps" :current-step="currentStep" />
    
    <div class="card">
      <h2>当前步骤：{{ workflowSteps[currentStep].title }}</h2>
      <p class="description">{{ workflowSteps[currentStep].description }}</p>
      
      <div class="form-section">
        <div class="form-row">
          <div class="form-group">
            <label>领料单号：</label>
            <input v-model="formData.outboundNo" type="text" readonly />
          </div>
          <div class="form-group">
            <label>领料人：</label>
            <input v-model="formData.picker" type="text" placeholder="请输入领料人" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>领料部门：</label>
            <select v-model="formData.department">
              <option>工程部</option>
              <option>维修部</option>
              <option>运营部</option>
            </select>
          </div>
          <div class="form-group">
            <label>领料日期：</label>
            <input v-model="formData.pickDate" type="date" />
          </div>
        </div>
        
        <h3>出仓物料明细</h3>
        <table class="materials-table">
          <thead>
            <tr>
              <th>物料编码</th>
              <th>物料名称</th>
              <th>规格型号</th>
              <th>单位</th>
              <th>申请数量</th>
              <th>实发数量</th>
              <th>库存数量</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in materials" :key="index">
              <td>{{ item.code }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.spec }}</td>
              <td>{{ item.unit }}</td>
              <td>{{ item.requestQty }}</td>
              <td>
                <input 
                  v-model.number="item.actualQty" 
                  type="number" 
                  min="0" 
                  :max="Math.min(item.requestQty, item.stock)"
                  style="width: 80px;"
                />
              </td>
              <td>{{ item.stock }}</td>
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
import { ref } from 'vue'
import WorkflowSteps from '../components/WorkflowSteps.vue'

const workflowSteps = ref([
  { title: '打印领料单', description: '领料员打印领料单' },
  { title: '出仓确认', description: '仓库管理员确认出仓' }
])

const currentStep = ref(0)

const formData = ref({
  outboundNo: 'OUT' + Date.now(),
  picker: '',
  department: '工程部',
  pickDate: new Date().toISOString().split('T')[0]
})

const materials = ref([
  { code: 'M001', name: '水表', spec: 'DN15', unit: '个', requestQty: 5, actualQty: 5, stock: 100 }
])

const nextStep = () => {
  if (currentStep.value < workflowSteps.value.length - 1) {
    currentStep.value++
  } else {
    alert('出仓完成！')
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}
</script>

<style scoped>
.material-outbound {
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

.form-actions {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>