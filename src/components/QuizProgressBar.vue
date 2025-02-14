<template>
  <div
    class="progress-bar d-flex align-center"
    rounded="lg"
    :class="`text-${color}`"
  >
    <div class="progress-label">{{ label }}:</div>
    <v-progress-linear
      height="15"
      min="0"
      :color="color"
      :max="maxNumber"
      :model-value="targetNumber"
      rounded
    />
    <div class="ml-4">{{ targetNumber }}/{{ maxNumber }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  color: String,
  label: String,
  maxNumber: Number,
  targetNumber: Number,
});
</script>

<style scoped>
.progress-bar {
  color: lightgreen;
  width: 50%;
}

.progress-label {
  width: 15%;
}
</style>
