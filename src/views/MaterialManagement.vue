<template>
  <div class="material-management">
    <h1>物料管理</h1>
    
    <div class="tabs">
      <div class="tab active">物料信息管理</div>
      <div class="tab">物料库存管理</div>
      <div class="tab">批次库存管理</div>
      <div class="tab">物料入库管理</div>
      <div class="tab">物料出库管理</div>
      <div class="tab">安全库存管理</div>
    </div>
    
    <div class="card">
      <p class="description">物料管理功能提供对物料信息、库存、批次等的全面管理。</p>
      
      <div class="actions">
        <button class="primary-button">新增物料</button>
        <button class="secondary-button">导入物料</button>
      </div>
      
      <div class="materials-table">
        <table>
          <thead>
            <tr>
              <th>物料编码</th>
              <th>物料名称</th>
              <th>规格型号</th>
              <th>单位</th>
              <th>当前库存</th>
              <th>安全库存</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>M001</td>
              <td>水表</td>
              <td>DN15</td>
              <td>个</td>
              <td>100</td>
              <td>20</td>
              <td>
                <button class="action-button">编辑</button>
                <button class="action-button delete">删除</button>
              </td>
            </tr>
            <tr>
              <td>M002</td>
              <td>阀门</td>
              <td>DN50</td>
              <td>个</td>
              <td>50</td>
              <td>30</td>
              <td>
                <button class="action-button">编辑</button>
                <button class="action-button delete">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
// 物料管理组件
</script>

<style scoped>
.material-management {
  padding: 20px;
}

.description {
  color: #666;
  margin-bottom: 20px;
  font-size: 14px;
}

.materials-table {
  overflow-x: auto;
  margin-top: 20px;
}
</style>