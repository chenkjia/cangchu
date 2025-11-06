<template>
  <div class="data-dictionary">
    <h1>数据字典</h1>
    
    <div class="tabs">
      <div 
        v-for="(item, index) in dictTypes" 
        :key="index"
        :class="['tab', { active: activeTab === index }]"
        @click="activeTab = index"
      >
        {{ item.name }}
      </div>
    </div>
    
    <div class="card">
      <p class="description">{{ dictTypes[activeTab].description }}</p>
      
      <div class="actions">
        <button class="primary-button" @click="showAddDialog = true">新增配置</button>
      </div>
      
      <div class="dict-table">
        <table>
          <thead>
            <tr>
              <th>编码</th>
              <th>名称</th>
              <th>排序</th>
              <th>状态</th>
              <th>备注</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in currentDictData" :key="item.id">
              <td>{{ item.code }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.sort }}</td>
              <td>
                <span :class="item.status === '启用' ? 'status-normal' : 'status-warning'">
                  {{ item.status }}
                </span>
              </td>
              <td>{{ item.remark }}</td>
              <td>
                <button class="action-button" @click="editItem(item)">编辑</button>
                <button class="action-button delete" @click="deleteItem(item)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- 新增/编辑弹窗 -->
    <div v-if="showAddDialog" class="modal-overlay" @click.self="showAddDialog = false">
      <div class="modal-content">
        <h2>{{ editingItem ? '编辑配置' : '新增配置' }}</h2>
        <div class="form-group">
          <label>编码：</label>
          <input v-model="formData.code" type="text" placeholder="请输入编码" />
        </div>
        <div class="form-group">
          <label>名称：</label>
          <input v-model="formData.name" type="text" placeholder="请输入名称" />
        </div>
        <div class="form-group">
          <label>排序：</label>
          <input v-model="formData.sort" type="number" placeholder="请输入排序" />
        </div>
        <div class="form-group">
          <label>状态：</label>
          <select v-model="formData.status">
            <option>启用</option>
            <option>禁用</option>
          </select>
        </div>
        <div class="form-group">
          <label>备注：</label>
          <input v-model="formData.remark" type="text" placeholder="请输入备注" />
        </div>
        <div class="modal-actions">
          <button class="secondary-button" @click="showAddDialog = false">取消</button>
          <button class="primary-button" @click="saveItem">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 字典类型
const dictTypes = ref([
  { name: '人员配置', description: '配置系统中的施工人员和勘察人员' },
  { name: '水表类型', description: '配置水表的类型和型号' },
  { name: '水表口径', description: '配置水表的口径规格' },
  { name: '物料规格', description: '配置物料的规格型号' },
  { name: '物料类型', description: '配置物料的分类' },
  { name: '物料单位', description: '配置物料的计量单位' },
  { name: '入仓状态', description: '配置物料入仓时的状态' },
  { name: '入仓来源', description: '配置物料入仓的来源' },
  { name: '仓库配置', description: '配置系统中的仓库信息' }
])

const activeTab = ref(0)

// 模拟数据
const dictData = ref({
  0: [
    { id: 1, code: 'P001', name: '张三', sort: 1, status: '启用', remark: '施工人员' },
    { id: 2, code: 'P002', name: '李四', sort: 2, status: '启用', remark: '勘察人员' }
  ],
  1: [
    { id: 1, code: 'WT001', name: '智能水表', sort: 1, status: '启用', remark: '新型智能表' },
    { id: 2, code: 'WT002', name: '普通水表', sort: 2, status: '启用', remark: '普通机械表' }
  ],
  2: [
    { id: 1, code: 'DN15', name: 'DN15', sort: 1, status: '启用', remark: '15mm口径' },
    { id: 2, code: 'DN20', name: 'DN20', sort: 2, status: '启用', remark: '20mm口径' },
    { id: 3, code: 'DN25', name: 'DN25', sort: 3, status: '启用', remark: '25mm口径' }
  ],
  3: [
    { id: 1, code: 'S001', name: '标准规格', sort: 1, status: '启用', remark: '常用规格' }
  ],
  4: [
    { id: 1, code: 'T001', name: '水表', sort: 1, status: '启用', remark: '水表类' },
    { id: 2, code: 'T002', name: '阀门', sort: 2, status: '启用', remark: '阀门类' },
    { id: 3, code: 'T003', name: '管材', sort: 3, status: '启用', remark: '管材类' }
  ],
  5: [
    { id: 1, code: 'U001', name: '个', sort: 1, status: '启用', remark: '个数' },
    { id: 2, code: 'U002', name: '米', sort: 2, status: '启用', remark: '米' },
    { id: 3, code: 'U003', name: '套', sort: 3, status: '启用', remark: '套' }
  ],
  6: [
    { id: 1, code: 'ST001', name: '合格', sort: 1, status: '启用', remark: '质量合格' },
    { id: 2, code: 'ST002', name: '待验', sort: 2, status: '启用', remark: '待验收' }
  ],
  7: [
    { id: 1, code: 'SR001', name: '采购', sort: 1, status: '启用', remark: '采购入库' },
    { id: 2, code: 'SR002', name: '退货', sort: 2, status: '启用', remark: '退货入库' }
  ],
  8: [
    { id: 1, code: 'WH001', name: '主仓库', sort: 1, status: '启用', remark: '主要仓库' },
    { id: 2, code: 'WH002', name: '备件仓库', sort: 2, status: '启用', remark: '备件仓库' }
  ]
})

const currentDictData = computed(() => dictData.value[activeTab.value] || [])

const showAddDialog = ref(false)
const editingItem = ref(null)
const formData = ref({
  code: '',
  name: '',
  sort: 1,
  status: '启用',
  remark: ''
})

const editItem = (item) => {
  editingItem.value = item
  formData.value = { ...item }
  showAddDialog.value = true
}

const deleteItem = (item) => {
  if (confirm(`确定要删除"${item.name}"吗？`)) {
    const index = dictData.value[activeTab.value].findIndex(i => i.id === item.id)
    if (index > -1) {
      dictData.value[activeTab.value].splice(index, 1)
    }
  }
}

const saveItem = () => {
  if (!formData.value.code || !formData.value.name) {
    alert('请填写必填项')
    return
  }
  
  if (editingItem.value) {
    // 编辑
    const index = dictData.value[activeTab.value].findIndex(i => i.id === editingItem.value.id)
    if (index > -1) {
      dictData.value[activeTab.value][index] = { ...formData.value, id: editingItem.value.id }
    }
  } else {
    // 新增
    const newId = Math.max(...dictData.value[activeTab.value].map(i => i.id), 0) + 1
    dictData.value[activeTab.value].push({ ...formData.value, id: newId })
  }
  
  showAddDialog.value = false
  editingItem.value = null
  formData.value = {
    code: '',
    name: '',
    sort: 1,
    status: '启用',
    remark: ''
  }
}
</script>

<style scoped>
.data-dictionary {
  padding: 20px;
}

.description {
  color: #666;
  margin-bottom: 20px;
  font-size: 14px;
}

.dict-table {
  margin-top: 20px;
  overflow-x: auto;
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
.form-group select {
  width: 100%;
  box-sizing: border-box;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
}
</style>