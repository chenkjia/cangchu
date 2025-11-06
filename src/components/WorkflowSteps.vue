<template>
  <div class="workflow-steps">
    <div class="steps-container">
      <div 
        v-for="(step, index) in steps" 
        :key="index"
        class="step-wrapper"
      >
        <div :class="['step-card', { active: currentStep === index, completed: currentStep > index }]">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-info">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-desc">{{ step.description }}</div>
          </div>
        </div>
        <div v-if="index < steps.length - 1" class="step-arrow">→</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: {
    type: Array,
    required: true
  },
  currentStep: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
.workflow-steps {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  margin-bottom: 25px;
  border: 1px solid #e8eaf6;
}

.steps-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.step-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.step-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 10px;
  background: #f8f9fa;
  border: 2px solid #e0e0e0;
  min-width: 180px;
  transition: all 0.3s;
}

.step-card.active {
  background: linear-gradient(135deg, #5dade2, #3498db);
  color: white;
  border-color: #3498db;
  box-shadow: 0 4px 12px rgba(93, 173, 226, 0.3);
}

.step-card.completed {
  background: #e8f5e9;
  border-color: #66bb6a;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
}

.step-card.active .step-number {
  background: rgba(255, 255, 255, 0.3);
}

.step-card.completed .step-number {
  background: #66bb6a;
  color: white;
}

.step-info {
  flex: 1;
}

.step-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
}

.step-desc {
  font-size: 12px;
  opacity: 0.8;
}

.step-arrow {
  font-size: 24px;
  color: #ccc;
  font-weight: bold;
}

@media (max-width: 1200px) {
  .steps-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .step-wrapper {
    flex-direction: column;
  }
  
  .step-arrow {
    transform: rotate(90deg);
  }
  
  .step-card {
    width: 100%;
  }
}
</style>
