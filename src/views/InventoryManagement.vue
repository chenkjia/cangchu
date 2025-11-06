<template>
  <div class="inventory-management">
    <h1>库存管理</h1>
    <p>库存管理功能提供对仓库中物料库存的全面管理。</p>
    
    <div class="filter-section">
      <div class="filter-item">
        <label>物料名称:</label>
        <input type="text" placeholder="请输入物料名称">
      </div>
      <div class="filter-item">
        <label>物料编码:</label>
        <input type="text" placeholder="请输入物料编码">
      </div>
      <div class="filter-item">
        <label>仓库:</label>
        <select>
          <option>全部</option>
          <option>主仓库</option>
          <option>备件仓库</option>
        </select>
      </div>
      <button class="search-button">查询</button>
    </div>
    
    <div class="inventory-summary">
      <div class="summary-card">
        <h3>总物料种类</h3>
        <p class="summary-number">128</p>
      </div>
      <div class="summary-card">
        <h3>库存总价值</h3>
        <p class="summary-number">¥1,250,000</p>
      </div>
      <div class="summary-card">
        <h3>低于安全库存</h3>
        <p class="summary-number">2</p>
      </div>
      <div class="summary-card">
        <h3>即将过期</h3>
        <p class="summary-number">0</p>
      </div>
    </div>
    
    <div class="card">
      <div class="inventory-table">
        <table>
        <thead>
          <tr>
            <th>物料编码</th>
            <th>物料名称</th>
            <th>规格型号</th>
            <th>单位</th>
            <th>当前库存</th>
            <th>安全库存</th>
            <th>仓库</th>
            <th>最近入库时间</th>
            <th>状态</th>
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
            <td>主仓库</td>
            <td>2023-01-15</td>
            <td><span class="status-normal">正常</span></td>
          </tr>
          <tr>
            <td>M002</td>
            <td>阀门</td>
            <td>DN50</td>
            <td>个</td>
            <td>15</td>
            <td>30</td>
            <td>主仓库</td>
            <td>2023-01-10</td>
            <td><span class="status-warning">低于安全库存</span></td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>

<script setup>
// 库存管理组件
</script>

<style scoped>
.inventory-management {
  padding: 20px;
}

.inventory-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.summary-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  text-align: center;
  border: 1px solid #e8eaf6;
  transition: all 0.3s;
}

.summary-card:hover {
  box-shadow: 0 4px 16px rgba(93, 173, 226, 0.2);
  transform: translateY(-2px);
}

.summary-card h3 {
  color: #555;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
}

.summary-number {
  font-size: 2rem;
  font-weight: 600;
  background: linear-gradient(90deg, #5dade2, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 10px 0 0;
}

.inventory-table {
  overflow-x: auto;
}
</style>