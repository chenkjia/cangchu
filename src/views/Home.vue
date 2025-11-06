<template>
  <div class="home-container">
    <header class="header">
      <div class="logo">安信供水仓储管理系统</div>
      <div class="user-info">
        <button class="alarm-button" @click="handleAlarm" title="报警信息">
          <span class="alarm-icon">🔔</span>
        </button>
        <span>管理员</span>
        <div class="user-dropdown">
          <button class="dropdown-button">▼</button>
          <div class="dropdown-menu">
            <button @click="handleChangePassword">修改密码</button>
            <button @click="handleLogout">退出</button>
          </div>
        </div>
      </div>
    </header>
    
    <div class="main-content">
      <aside class="sidebar">
        <nav class="menu">
          <ul>
            <li class="home-menu">
              <router-link to="/home/dashboard">首页</router-link>
            </li>
            <li class="menu-group">
              <div class="menu-group-title">系统和流程管理</div>
              <ul class="submenu">
                <li><router-link to="/home/data-dictionary">数据字典</router-link></li>
                <li><router-link to="/home/org-structure">组织架构管理</router-link></li>
                <li><router-link to="/home/role-management">角色管理</router-link></li>
                <li><router-link to="/home/account-management">账号管理</router-link></li>
                <li><router-link to="/home/operation-log">操作日志</router-link></li>
                <li><router-link to="/home/process-definition">流程定义</router-link></li>
              </ul>
            </li>
            <li class="menu-group">
              <div class="menu-group-title">供水仓储管理</div>
              <ul class="submenu">
                <li><router-link to="/home/material-management">物料管理</router-link></li>
                <li><router-link to="/home/purchase-storage">采购入仓</router-link></li>
                <li><router-link to="/home/material-demand">物资需求</router-link></li>
                <li><router-link to="/home/material-outbound">材料出仓</router-link></li>
                <li><router-link to="/home/inventory-management">库存管理</router-link></li>
                <li><router-link to="/home/in-out-management">出入库管理</router-link></li>
                <li><router-link to="/home/supplier-management">供应商管理</router-link></li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
      
      <main class="content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  // 退出登录，跳转到登录页
  router.push('/')
}

const handleChangePassword = () => {
  alert('修改密码功能待实现')
}

const handleAlarm = () => {
  alert('报警信息功能待实现')
}
</script>

<style scoped>
.home-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  height: 60px;
  background: linear-gradient(90deg, #5dade2, #3498db);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: none;
  z-index: 1000;
}

.user-dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-menu button {
  display: block;
  width: 100%;
  padding: 10px 15px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
}

.dropdown-menu button:hover {
  background-color: #f0f7ff;
  color: #3498db;
}

.alarm-button {
  background: linear-gradient(90deg, #f39c12, #e67e22);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 6px rgba(230, 126, 34, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.alarm-button:hover {
  box-shadow: 0 4px 10px rgba(230, 126, 34, 0.4);
  transform: translateY(-1px);
}

.alarm-icon {
  font-size: 18px;
  display: inline-block;
  animation: ring 2s ease-in-out infinite;
}

@keyframes ring {
  0%, 100% {
    transform: rotate(0deg);
  }
  10%, 30% {
    transform: rotate(-10deg);
  }
  20%, 40% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(0deg);
  }
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 250px;
  background-color: #fafafa;
  overflow-y: auto;
  border-right: 1px solid #e0e0e0;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu > ul > li {
  border-bottom: 1px solid #eee;
}

.home-menu a {
  display: block;
  padding: 12px 20px;
  text-decoration: none;
  color: #555;
  transition: all 0.3s;
  border-left: 3px solid transparent;
}

.home-menu a:hover {
  background-color: #f0f7ff;
  color: #3498db;
  border-left-color: #3498db;
}

.home-menu a.router-link-active {
  background: linear-gradient(90deg, rgba(93, 173, 226, 0.15), rgba(52, 152, 219, 0.1));
  color: #3498db;
  border-left-color: #3498db;
  font-weight: 500;
}

.menu-group-title {
  padding: 15px 20px;
  font-weight: 600;
  background-color: #f0f0f0;
  color: #2c3e50;
  font-size: 14px;
}

.submenu li {
  border-bottom: 1px solid #eee;
}

.submenu a {
  display: block;
  padding: 12px 20px 12px 40px;
  text-decoration: none;
  color: #555;
  transition: all 0.3s;
  border-left: 3px solid transparent;
}

.submenu a:hover {
  background-color: #f0f7ff;
  color: #3498db;
  border-left-color: #3498db;
}

.submenu a.router-link-active {
  background: linear-gradient(90deg, rgba(93, 173, 226, 0.15), rgba(52, 152, 219, 0.1));
  color: #3498db;
  border-left-color: #3498db;
  font-weight: 500;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: linear-gradient(135deg, #e8eaf6 0%, #f5f7fa 100%);
}
</style>