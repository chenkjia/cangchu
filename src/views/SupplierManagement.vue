<template>
  <div class="supplier-management">
    <h1>供应商管理</h1>
    
    <div class="card">
      <p class="description">供应商管理功能提供对供应商信息的管理。</p>
      
      <div class="actions">
        <button class="primary-button" @click="showAddDialog = true">新增供应商</button>
        <button class="secondary-button" @click="handleImport">导入</button>
        <button class="secondary-button" @click="handleExport">导出</button>
      </div>
      
      <div class="filter-section">
        <div class="filter-item">
          <label>供应商名称:</label>
          <input v-model="filterForm.name" type="text" placeholder="请输入供应商名称">
        </div>
        <div class="filter-item">
          <label>供应商分类:</label>
          <select v-model="filterForm.category">
            <option value="">全部</option>
            <option>水表供应商</option>
            <option>管材供应商</option>
            <option>阀门供应商</option>
            <option>配件供应商</option>
          </select>
        </div>
        <div class="filter-item">
          <label>评级:</label>
          <select v-model="filterForm.rating">
            <option value="">全部</option>
            <option value="5">五星</option>
            <option value="4">四星</option>
            <option value="3">三星</option>
          </select>
        </div>
        <button class="search-button" @click="handleSearch">查询</button>
      </div>
      
      <div class="suppliers-table">
        <table>
          <thead>
            <tr>
              <th>供应商编码</th>
              <th>供应商名称</th>
              <th>联系人</th>
              <th>联系电话</th>
              <th>地址</th>
              <th>供应商分类</th>
              <th>评级</th>
              <th>合作状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="supplier in filteredSuppliers" :key="supplier.id">
              <td>{{ supplier.code }}</td>
              <td>{{ supplier.name }}</td>
              <td>{{ supplier.contact }}</td>
              <td>{{ supplier.phone }}</td>
              <td>{{ supplier.address }}</td>
              <td>{{ supplier.category }}</td>
              <td>
                <div class="rating">
                  <span 
                    v-for="i in 5" 
                    :key="i" 
                    :class="['star', { filled: i <= supplier.rating }]"
                  >
                    ★
                  </span>
                </div>
              </td>
              <td>
                <span :class="supplier.status === '合作中' ? 'status-normal' : 'status-warning'">
                  {{ supplier.status }}
                </span>
              </td>
              <td>
                <button class="action-button" @click="editSupplier(supplier)">编辑</button>
                <button class="action-button" @click="viewSupplier(supplier)">查看</button>
                <button class="action-button delete" @click="deleteSupplier(supplier)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- 新增/编辑弹窗 -->
    <div v-if="showAddDialog" class="modal-overlay" @click.self="showAddDialog = false">
      <div class="modal-content large">
        <h2>{{ editingSupplier ? '编辑供应商' : '新增供应商' }}</h2>
        <div class="form-grid">
          <div class="form-group">
            <label>供应商编码：</label>
            <input v-model="formData.code" type="text" placeholder="请输入供应商编码" />
          </div>
          <div class="form-group">
            <label>供应商名称：<span class="required">*</span></label>
            <input v-model="formData.name" type="text" placeholder="请输入供应商名称" />
          </div>
          <div class="form-group">
            <label>联系人：</label>
            <input v-model="formData.contact" type="text" placeholder="请输入联系人" />
          </div>
          <div class="form-group">
            <label>联系电话：</label>
            <input v-model="formData.phone" type="text" placeholder="请输入联系电话" />
          </div>
          <div class="form-group full-width">
            <label>地址：</label>
            <input v-model="formData.address" type="text" placeholder="请输入地址" />
          </div>
          <div class="form-group">
            <label>供应商分类：</label>
            <select v-model="formData.category">
              <option>水表供应商</option>
              <option>管材供应商</option>
              <option>阀门供应商</option>
              <option>配件供应商</option>
            </select>
          </div>
          <div class="form-group">
            <label>评级：</label>
            <select v-model.number="formData.rating">
              <option :value="5">五星</option>
              <option :value="4">四星</option>
              <option :value="3">三星</option>
              <option :value="2">二星</option>
              <option :value="1">一星</option>
            </select>
          </div>
          <div class="form-group">
            <label>合作状态：</label>
            <select v-model="formData.status">
              <option>合作中</option>
              <option>暂停合作</option>
            </select>
          </div>
          <div class="form-group full-width">
            <label>备注：</label>
            <textarea v-model="formData.remark" rows="3" placeholder="请输入备注信息"></textarea>
          </div>
        </div>
        <div class="modal-actions">
          <button class="secondary-button" @click="showAddDialog = false">取消</button>
          <button class="primary-button" @click="saveSupplier">保存</button>
        </div>
      </div>
    </div>
    
    <!-- 查看详情弹窗 -->
    <div v-if="showDetailDialog" class="modal-overlay" @click.self="showDetailDialog = false">
      <div class="modal-content">
        <h2>供应商详情</h2>
        <div class="detail-info">
          <div class="detail-row">
            <span class="label">供应商编码：</span>
            <span>{{ detailSupplier.code }}</span>
          </div>
          <div class="detail-row">
            <span class="label">供应商名称：</span>
            <span>{{ detailSupplier.name }}</span>
          </div>
          <div class="detail-row">
            <span class="label">联系人：</span>
            <span>{{ detailSupplier.contact }}</span>
          </div>
          <div class="detail-row">
            <span class="label">联系电话：</span>
            <span>{{ detailSupplier.phone }}</span>
          </div>
          <div class="detail-row">
            <span class="label">地址：</span>
            <span>{{ detailSupplier.address }}</span>
          </div>
          <div class="detail-row">
            <span class="label">供应商分类：</span>
            <span>{{ detailSupplier.category }}</span>
          </div>
          <div class="detail-row">
            <span class="label">评级：</span>
            <div class="rating">
              <span 
                v-for="i in 5" 
                :key="i" 
                :class="['star', { filled: i <= detailSupplier.rating }]"
              >
                ★
              </span>
            </div>
          </div>
          <div class="detail-row">
            <span class="label">合作状态：</span>
            <span :class="detailSupplier.status === '合作中' ? 'status-normal' : 'status-warning'">
              {{ detailSupplier.status }}
            </span>
          </div>
          <div class="detail-row" v-if="detailSupplier.remark">
            <span class="label">备注：</span>
            <span>{{ detailSupplier.remark }}</span>
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

const filterForm = ref({
  name: '',
  category: '',
  rating: ''
})

const suppliers = ref([
  {
    id: 1,
    code: 'S001',
    name: '华水表有限公司',
    contact: '张经理',
    phone: '13800138000',
    address: '广东省深圳市南山区科技园',
    category: '水表供应商',
    rating: 5,
    status: '合作中',
    remark: '优质供应商，长期合作伙伴'
  },
  {
    id: 2,
    code: 'S002',
    name: '东方管业集团',
    contact: '李总',
    phone: '13900139000',
    address: '江苏省苏州市工业园区',
    category: '管材供应商',
    rating: 4,
    status: '合作中',
    remark: '产品质量稳定'
  },
  {
    id: 3,
    code: 'S003',
    name: '中国阀门公司',
    contact: '王主管',
    phone: '13700137000',
    address: '浙江省杭州市余杭区',
    category: '阀门供应商',
    rating: 4,
    status: '合作中',
    remark: ''
  },
  {
    id: 4,
    code: 'S004',
    name: '南方配件有限公司',
    contact: '赵经理',
    phone: '13600136000',
    address: '广东省广州市白云区',
    category: '配件供应商',
    rating: 3,
    status: '暂停合作',
    remark: '交货延误，暂停合作'
  }
])

const filteredSuppliers = computed(() => {
  return suppliers.value.filter(supplier => {
    if (filterForm.value.name && !supplier.name.includes(filterForm.value.name)) {
      return false
    }
    if (filterForm.value.category && supplier.category !== filterForm.value.category) {
      return false
    }
    if (filterForm.value.rating && supplier.rating < parseInt(filterForm.value.rating)) {
      return false
    }
    return true
  })
})

const showAddDialog = ref(false)
const showDetailDialog = ref(false)
const editingSupplier = ref(null)
const detailSupplier = ref({})

const formData = ref({
  code: '',
  name: '',
  contact: '',
  phone: '',
  address: '',
  category: '水表供应商',
  rating: 5,
  status: '合作中',
  remark: ''
})

const handleSearch = () => {
  console.log('搜索：', filterForm.value)
}

const handleImport = () => {
  alert('导入功能待实现')
}

const handleExport = () => {
  alert('导出功能待实现')
}

const editSupplier = (supplier) => {
  editingSupplier.value = supplier
  formData.value = { ...supplier }
  showAddDialog.value = true
}

const viewSupplier = (supplier) => {
  detailSupplier.value = supplier
  showDetailDialog.value = true
}

const deleteSupplier = (supplier) => {
  if (confirm(`确定要删除供应商"${supplier.name}"吗？`)) {
    const index = suppliers.value.findIndex(s => s.id === supplier.id)
    if (index > -1) {
      suppliers.value.splice(index, 1)
    }
  }
}

const saveSupplier = () => {
  if (!formData.value.name) {
    alert('请填写供应商名称')
    return
  }
  
  if (editingSupplier.value) {
    // 编辑
    const index = suppliers.value.findIndex(s => s.id === editingSupplier.value.id)
    if (index > -1) {
      suppliers.value[index] = { ...formData.value, id: editingSupplier.value.id }
    }
  } else {
    // 新增
    const newId = Math.max(...suppliers.value.map(s => s.id), 0) + 1
    suppliers.value.push({ ...formData.value, id: newId })
  }
  
  showAddDialog.value = false
  editingSupplier.value = null
  formData.value = {
    code: '',
    name: '',
    contact: '',
    phone: '',
    address: '',
    category: '水表供应商',
    rating: 5,
    status: '合作中',
    remark: ''
  }
}
</script>

<style scoped>
.supplier-management {
  padding: 20px;
}

.description {
  color: #666;
  margin-bottom: 20px;
  font-size: 14px;
}

.suppliers-table {
  margin-top: 20px;
  overflow-x: auto;
}

.rating {
  display: flex;
  gap: 2px;
}

.rating .star {
  color: #ddd;
  font-size: 18px;
}

.rating .star.filled {
  color: #f39c12;
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
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-content.large {
  max-width: 800px;
}

.modal-content h2 {
  margin-bottom: 25px;
  color: #2c3e50;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
  font-size: 14px;
}

.form-group .required {
  color: #e74c3c;
  margin-left: 2px;
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

.detail-info {
  margin-bottom: 20px;
}

.detail-row {
  display: flex;
  align-items: center;
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
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-group.full-width {
    grid-column: 1;
  }
}
</style>