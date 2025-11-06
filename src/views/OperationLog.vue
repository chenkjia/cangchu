<template>
  <div class="operation-log">
    <h1>操作日志</h1>
    <div class="filter-section">
      <div class="filter-item">
        <label>操作人员:</label>
        <input type="text" placeholder="请输入操作人员">
      </div>
      <div class="filter-item">
        <label>操作时间:</label>
        <input type="date">
        <span>至</span>
        <input type="date">
      </div>
      <div class="filter-item">
        <label>操作内容:</label>
        <input type="text" placeholder="请输入操作内容">
      </div>
      <button class="search-button">查询</button>
    </div>
    <div class="card">
      <div class="logs-table">
        <table>
          <thead>
            <tr>
              <th>操作人员</th>
              <th>操作时间</th>
              <th>操作内容</th>
              <th>IP地址</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>admin</td>
              <td>2023-01-01 10:00:00</td>
              <td>登录系统</td>
              <td>192.168.1.100</td>
            </tr>
            <tr>
              <td>admin</td>
              <td>2023-01-01 10:05:00</td>
              <td>新增角色“仓库管理员”</td>
              <td>192.168.1.100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
// 操作日志组件
</script>

<style scoped>
.operation-log {
  padding: 20px;
}

.logs-table {
  overflow-x: auto;
}
</style>