<template>
  <div class="org-structure">
    <h1>组织架构管理</h1>
    
    <div class="card">
      <p class="description">组织架构管理功能允许管理员对公司的组织架构进行管理。</p>
      
      <div class="actions">
        <button class="primary-button" @click="showAddDialog = true">新增部门</button>
      </div>
      
      <div class="org-content">
        <div class="org-tree">
          <div class="tree-node root">
            <div class="node-content">
              <span class="node-icon">🏢</span>
              <span class="node-name">公司总部</span>
            </div>
            <div class="children">
              <div v-for="dept in departments" :key="dept.id" class="tree-node">
                <div class="node-content">
                  <span class="node-icon">💼</span>
                  <span class="node-name">{{ dept.name }}</span>
                  <div class="node-actions">
                    <button class="action-button" @click="editDept(dept)">编辑</button>
                    <button class="action-button delete" @click="deleteDept(dept)">删除</button>
                  </div>
                </div>
                <div v-if="dept.children && dept.children.length" class="children">
                  <div v-for="child in dept.children" :key="child.id" class="tree-node">
                    <div class="node-content">
                      <span class="node-icon">👥</span>
                      <span class="node-name">{{ child.name }}</span>
                      <div class="node-actions">
                        <button class="action-button" @click="editDept(child)">编辑</button>
                        <button class="action-button delete" @click="deleteDept(child)">删除</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 新增/编辑弹窗 -->
    <div v-if="showAddDialog" class="modal-overlay" @click.self="showAddDialog = false">
      <div class="modal-content">
        <h2>{{ editingDept ? '编辑部门' : '新增部门' }}</h2>
        <div class="form-group">
          <label>部门名称：</label>
          <input v-model="formData.name" type="text" placeholder="请输入部门名称" />
        </div>
        <div class="form-group">
          <label>上级部门：</label>
          <select v-model="formData.parentId">
            <option :value="0">公司总部</option>
            <option v-for="dept in departments" :key="dept.id" :value="dept.id">
              {{ dept.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>部门类别：</label>
          <select v-model="formData.type">
            <option>职能部门</option>
            <option>业务部门</option>
          </select>
        </div>
        <div class="form-group">
          <label>负责人：</label>
          <input v-model="formData.leader" type="text" placeholder="请输入负责人" />
        </div>
        <div class="modal-actions">
          <button class="secondary-button" @click="showAddDialog = false">取消</button>
          <button class="primary-button" @click="saveDept">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const departments = ref([
  {
    id: 1,
    name: '行政部',
    type: '职能部门',
    leader: '王经理',
    parentId: 0,
    children: [
      { id: 11, name: '人事科', type: '职能部门', leader: '张主管', parentId: 1 },
      { id: 12, name: '财务科', type: '职能部门', leader: '李主管', parentId: 1 }
    ]
  },
  {
    id: 2,
    name: '工程部',
    type: '业务部门',
    leader: '刘经理',
    parentId: 0,
    children: [
      { id: 21, name: '施工一组', type: '业务部门', leader: '赵组长', parentId: 2 },
      { id: 22, name: '施工二组', type: '业务部门', leader: '钱组长', parentId: 2 }
    ]
  },
  {
    id: 3,
    name: '器材股',
    type: '业务部门',
    leader: '孙股长',
    parentId: 0,
    children: []
  },
  {
    id: 4,
    name: '运营部',
    type: '业务部门',
    leader: '周经理',
    parentId: 0,
    children: []
  }
])

const showAddDialog = ref(false)
const editingDept = ref(null)
const formData = ref({
  name: '',
  parentId: 0,
  type: '职能部门',
  leader: ''
})

const editDept = (dept) => {
  editingDept.value = dept
  formData.value = { ...dept }
  showAddDialog.value = true
}

const deleteDept = (dept) => {
  if (confirm(`确定要删除"${dept.name}"吗？`)) {
    if (dept.parentId === 0) {
      const index = departments.value.findIndex(d => d.id === dept.id)
      if (index > -1) departments.value.splice(index, 1)
    } else {
      const parent = departments.value.find(d => d.id === dept.parentId)
      if (parent && parent.children) {
        const index = parent.children.findIndex(d => d.id === dept.id)
        if (index > -1) parent.children.splice(index, 1)
      }
    }
  }
}

const saveDept = () => {
  if (!formData.value.name) {
    alert('请填写部门名称')
    return
  }
  
  if (editingDept.value) {
    // 编辑
    Object.assign(editingDept.value, formData.value)
  } else {
    // 新增
    const newDept = {
      ...formData.value,
      id: Date.now(),
      children: []
    }
    
    if (formData.value.parentId === 0) {
      departments.value.push(newDept)
    } else {
      const parent = departments.value.find(d => d.id === formData.value.parentId)
      if (parent) {
        if (!parent.children) parent.children = []
        parent.children.push(newDept)
      }
    }
  }
  
  showAddDialog.value = false
  editingDept.value = null
  formData.value = {
    name: '',
    parentId: 0,
    type: '职能部门',
    leader: ''
  }
}
</script>

<style scoped>
.org-structure {
  padding: 20px;
}

.description {
  color: #666;
  margin-bottom: 20px;
  font-size: 14px;
}

.org-content {
  margin-top: 30px;
}

.org-tree {
  padding: 20px;
}

.tree-node {
  margin: 10px 0;
}

.tree-node.root > .node-content {
  background: linear-gradient(90deg, #5dade2, #3498db);
  color: white;
  font-size: 16px;
  font-weight: 600;
}

.node-content {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin-bottom: 8px;
  transition: all 0.3s;
}

.node-content:hover {
  box-shadow: 0 2px 8px rgba(93, 173, 226, 0.2);
  border-color: #5dade2;
}

.node-icon {
  font-size: 20px;
  margin-right: 10px;
}

.node-name {
  flex: 1;
  font-weight: 500;
}

.node-actions {
  display: flex;
  gap: 5px;
}

.children {
  margin-left: 40px;
  padding-left: 20px;
  border-left: 2px dashed #e0e0e0;
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