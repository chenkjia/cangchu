<template>
  <div class="login-container">
    <h1 class="system-title">仓储管理系统</h1>
    
    <div class="login-box">
      <h2 class="login-title">用户登录</h2>
      <div class="title-underline"></div>
      
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <input 
            type="text" 
            v-model="loginForm.username" 
            required 
            placeholder="用户名"
            class="login-input"
          />
          <span class="input-icon user-icon">👤</span>
        </div>
        
        <div class="input-group">
          <input 
            type="password" 
            v-model="loginForm.password" 
            required 
            placeholder="密码"
            class="login-input"
          />
          <span class="input-icon password-icon">🔒</span>
        </div>
        
        <div class="checkbox-group">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              v-model="loginForm.remember"
            />
            <span>记住密码</span>
          </label>
        </div>
        
        <button type="submit" class="login-button">登录</button>
        
        <div class="copyright">
          © 2023 仓储管理系统 版权所有
        </div>
      </form>
    </div>
    
    <div class="security-notice">
      请注意保护您的账号安全，定期更换密码
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginForm = reactive({
  username: '',
  password: '',
  remember: false
})

const handleLogin = () => {
  // 简单的登录验证，实际项目中需要连接后端API
  if (loginForm.username && loginForm.password) {
    // 登录成功，跳转到主页
    router.push('/home/dashboard')
  } else {
    alert('请输入用户名和密码')
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #e8eaf6 0%, #f5f7fa 100%);
  padding: 20px;
}

.system-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 40px;
  text-align: center;
  letter-spacing: 2px;
}

.login-box {
  width: 100%;
  max-width: 430px;
  background: white;
  border-radius: 16px;
  padding: 45px 40px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.login-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 8px;
}

.title-underline {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #5dade2, #3498db);
  margin: 0 auto 35px;
  border-radius: 2px;
}

.input-group {
  position: relative;
  margin-bottom: 20px;
}

.login-input {
  width: 100%;
  padding: 14px 45px 14px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  color: #333;
  background: #fafafa;
  transition: all 0.3s;
  box-sizing: border-box;
}

.login-input:focus {
  outline: none;
  border-color: #5dade2;
  background: white;
  box-shadow: 0 0 0 3px rgba(93, 173, 226, 0.1);
}

.login-input::placeholder {
  color: #999;
}

.input-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  opacity: 0.4;
}

.checkbox-group {
  margin: 25px 0 30px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  cursor: pointer;
}

.checkbox-label span {
  font-size: 14px;
  color: #666;
}

.login-button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(90deg, #5dade2, #3498db);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(93, 173, 226, 0.3);
}

.login-button:hover {
  background: linear-gradient(90deg, #4a9fd8, #2e86c1);
  box-shadow: 0 6px 16px rgba(93, 173, 226, 0.4);
  transform: translateY(-1px);
}

.login-button:active {
  transform: translateY(0);
}

.copyright {
  text-align: center;
  color: #999;
  font-size: 13px;
  margin-top: 25px;
}

.security-notice {
  margin-top: 25px;
  padding: 12px 24px;
  background: rgba(139, 195, 74, 0.15);
  color: #689f38;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  max-width: 430px;
}

@media (max-width: 480px) {
  .system-title {
    font-size: 2rem;
  }
  
  .login-box {
    padding: 35px 25px;
  }
}
</style>