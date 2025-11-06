<template>
  <div class="account-management">
    <h1>账号管理</h1>
    <div class="card">
      <p class="description">账号管理功能允许管理员对系统中的用户账号进行管理。</p>
      <div class="actions">
        <button class="primary-button">新增账号</button>
        <button class="secondary-button">重置密码</button>
      </div>
      <div class="accounts-table">
        <table>
          <thead>
            <tr>
              <th>用户名</th>
              <th>姓名</th>
              <th>角色</th>
              <th>状态</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>admin</td>
              <td>管理员</td>
              <td>管理员</td>
              <td><span class="status-normal">启用</span></td>
              <td>2023-01-01</td>
              <td>
                <button class="action-button">编辑</button>
                <button class="action-button delete">禁用</button>
              </td>
            </tr>
            <tr>
              <td>warehouse</td>
              <td>仓库管理员</td>
              <td>仓库管理员</td>
              <td><span class="status-normal">启用</span></td>
              <td>2023-01-02</td>
              <td>
                <button class="action-button">编辑</button>
                <button class="action-button delete">禁用</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
// 账号管理组件
</script>

<style scoped>
.account-management {
  padding: 20px;
}

.description {
  color: #666;
  margin-bottom: 20px;
  font-size: 14px;
}

.accounts-table {
  margin-top: 20px;
}
</style>