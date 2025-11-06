<template>
  <div class="role-management">
    <h1>角色管理</h1>
    <div class="card">
      <p class="description">角色管理功能允许管理员创建、修改和删除系统角色，并为角色分配权限。</p>
      <div class="actions">
        <button class="primary-button">新增角色</button>
      </div>
      <div class="roles-table">
        <table>
          <thead>
            <tr>
              <th>角色名称</th>
              <th>描述</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>管理员</td>
              <td>系统管理员，拥有所有权限</td>
              <td>2023-01-01</td>
              <td>
                <button class="action-button">编辑</button>
                <button class="action-button delete">删除</button>
              </td>
            </tr>
            <tr>
              <td>仓库管理员</td>
              <td>负责仓库物料管理</td>
              <td>2023-01-02</td>
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
// 角色管理组件
</script>

<style scoped>
.role-management {
  padding: 20px;
}

.description {
  color: #666;
  margin-bottom: 20px;
  font-size: 14px;
}

.roles-table {
  margin-top: 20px;
}
</style>