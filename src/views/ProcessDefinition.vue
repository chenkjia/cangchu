<template>
  <div class="process-definition">
    <h1>流程定义</h1>
    
    <div class="tabs">
      <div 
        v-for="(process, index) in processes" 
        :key="index"
        :class="['tab', { active: activeTab === index }]"
        @click="activeTab = index"
      >
        {{ process.name }}
      </div>
    </div>
    
    <div class="card">
      <p class="description">{{ processes[activeTab].description }}</p>
      
      <div class="process-content">
        <h2>{{ processes[activeTab].name }}步骤定义</h2>
        <div class="step-definition">
          <div 
            v-for="(step, index) in processes[activeTab].steps" 
            :key="index"
            class="step"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-name">{{ step.name }}</div>
            <div class="step-role">
              <label>分配人员：</label>
              <select v-model="step.assignedRole" @change="updateStep(step)">
                <option value="">请选择角色</option>
                <option v-for="role in availableRoles" :key="role.id" :value="role.id">
                  {{ role.name }}
                </option>
              </select>
              <span v-if="step.assignedRole" class="assigned-user">
                当前：{{ getRoleName(step.assignedRole) }}
              </span>
            </div>
            <div class="step-actions">
              <button 
                class="action-button" 
                @click="editStepConfig(step)"
                :disabled="!step.assignedRole"
              >
                配置
              </button>
            </div>
          </div>
        </div>
        <div class="actions">
          <button class="primary-button" @click="saveProcessDefinition">保存流程定义</button>
          <button class="secondary-button" @click="resetProcessDefinition">重置</button>
        </div>
      </div>
    </div>
    
    <!-- 步骤配置弹窗 -->
    <div v-if="showConfigDialog" class="modal-overlay" @click.self="showConfigDialog = false">
      <div class="modal-content">
        <h2>配置步骤：{{ editingStep?.name }}</h2>
        <div class="form-group">
          <label>是否必须：</label>
          <select v-model="stepConfig.required">
            <option :value="true">必须</option>
            <option :value="false">可选</option>
          </select>
        </div>
        <div class="form-group">
          <label>超时提醒（小时）：</label>
          <input v-model.number="stepConfig.timeout" type="number" min="0" placeholder="0表示不提醒" />
        </div>
        <div class="form-group">
          <label>允许跳过：</label>
          <select v-model="stepConfig.canSkip">
            <option :value="true">是</option>
            <option :value="false">否</option>
          </select>
        </div>
        <div class="form-group">
          <label>备注：</label>
          <textarea v-model="stepConfig.remark" rows="3" placeholder="请输入备注信息"></textarea>
        </div>
        <div class="modal-actions">
          <button class="secondary-button" @click="showConfigDialog = false">取消</button>
          <button class="primary-button" @click="saveStepConfig">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref(0)

const processes = ref([
  {
    name: '物资需求流程',
    description: '为物资需求流程的每个步骤分配相应的操作人员',
    steps: [
      { id: 1, name: '填写物资需求', assignedRole: 1, required: true, timeout: 0, canSkip: false, remark: '' },
      { id: 2, name: '主管部门审核', assignedRole: 2, required: true, timeout: 24, canSkip: false, remark: '' },
      { id: 3, name: '器材会计员确认', assignedRole: 3, required: true, timeout: 24, canSkip: false, remark: '' },
      { id: 4, name: '副总经理审批', assignedRole: 4, required: true, timeout: 48, canSkip: false, remark: '' },
      { id: 5, name: '总经理审批', assignedRole: 5, required: true, timeout: 48, canSkip: false, remark: '' }
    ]
  },
  {
    name: '采购入仓流程',
    description: '为采购入仓流程的每个步骤分配相应的操作人员',
    steps: [
      { id: 1, name: '填写采购信息', assignedRole: 6, required: true, timeout: 0, canSkip: false, remark: '' },
      { id: 2, name: '器材股审核', assignedRole: 6, required: true, timeout: 24, canSkip: false, remark: '' },
      { id: 3, name: '副总经理审核', assignedRole: 4, required: true, timeout: 48, canSkip: false, remark: '' },
      { id: 4, name: '总经理审批', assignedRole: 5, required: true, timeout: 48, canSkip: false, remark: '' },
      { id: 5, name: '打印入仓单', assignedRole: 7, required: true, timeout: 24, canSkip: false, remark: '' },
      { id: 6, name: '录入价格信息', assignedRole: 8, required: true, timeout: 24, canSkip: false, remark: '' },
      { id: 7, name: '物资验收', assignedRole: 3, required: true, timeout: 48, canSkip: false, remark: '' },
      { id: 8, name: '物资入仓确认', assignedRole: 7, required: true, timeout: 24, canSkip: false, remark: '' }
    ]
  },
  {
    name: '材料出仓流程',
    description: '为材料出仓流程的每个步骤分配相应的操作人员',
    steps: [
      { id: 1, name: '打印领料单', assignedRole: 9, required: true, timeout: 0, canSkip: false, remark: '' },
      { id: 2, name: '物资出仓确认', assignedRole: 7, required: true, timeout: 24, canSkip: false, remark: '' }
    ]
  }
])

const availableRoles = ref([
  { id: 1, name: '需求部门人员' },
  { id: 2, name: '部门主管' },
  { id: 3, name: '器材会计员' },
  { id: 4, name: '副总经理' },
  { id: 5, name: '总经理' },
  { id: 6, name: '器材股股长' },
  { id: 7, name: '仓库管理员' },
  { id: 8, name: '材料记账员' },
  { id: 9, name: '领料员' }
])

const showConfigDialog = ref(false)
const editingStep = ref(null)
const stepConfig = ref({
  required: true,
  timeout: 0,
  canSkip: false,
  remark: ''
})

const getRoleName = (roleId) => {
  const role = availableRoles.value.find(r => r.id === roleId)
  return role ? role.name : '未分配'
}

const updateStep = (step) => {
  console.log('更新步骤：', step)
}

const editStepConfig = (step) => {
  editingStep.value = step
  stepConfig.value = {
    required: step.required,
    timeout: step.timeout,
    canSkip: step.canSkip,
    remark: step.remark || ''
  }
  showConfigDialog.value = true
}

const saveStepConfig = () => {
  if (editingStep.value) {
    Object.assign(editingStep.value, stepConfig.value)
  }
  showConfigDialog.value = false
  editingStep.value = null
}

const saveProcessDefinition = () => {
  alert('流程定义已保存！')
  console.log('保存流程：', processes.value[activeTab.value])
}

const resetProcessDefinition = () => {
  if (confirm('确定要重置当前流程定义吗？')) {
    // 重置逻辑
    alert('已重置')
  }
}
</script>

<style scoped>
.process-definition {
  padding: 20px;
}

.description {
  color: #666;
  margin-bottom: 20px;
  font-size: 14px;
}

.process-content {
  margin-top: 20px;
}

.process-content h2 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin-bottom: 20px;
}

.step-definition {
  margin: 20px 0;
}

.step {
  display: flex;
  align-items: center;
  padding: 18px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 12px;
  background: white;
  transition: all 0.3s;
}

.step:hover {
  border-color: #5dade2;
  box-shadow: 0 2px 8px rgba(93, 173, 226, 0.15);
}

.step-number {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #5dade2, #3498db);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  font-weight: 600;
  font-size: 16px;
  flex-shrink: 0;
}

.step-name {
  flex: 0 0 180px;
  font-weight: 600;
  color: #2c3e50;
  font-size: 15px;
}

.step-role {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.step-role label {
  font-weight: 500;
  color: #555;
  white-space: nowrap;
}

.step-role select {
  min-width: 200px;
}

.assigned-user {
  color: #66bb6a;
  font-size: 13px;
  font-weight: 500;
}

.step-actions {
  margin-left: 12px;
}

.step-actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-content h2 {
  margin-bottom: 25px;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  box-sizing: border-box;
}

.form-group textarea {
  resize: vertical;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
}
</style>