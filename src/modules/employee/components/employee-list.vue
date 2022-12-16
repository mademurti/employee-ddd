<template>
  <ul>
    <li v-for="employee in employees" :key="employee.id">
      <div class="avatar">
        <img :src="employee.avatar" :alt="employee.name" />
      </div>
      <div class="name">{{employee.name}}</div>
      <div v-if="employee.promoted">Promoted</div>
      <div v-else class="promote-cta" @click="onPromoteClick(employee.id)">promote?</div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { IEmployee } from '../types/employee';

defineProps({
  employees: {
    type: Array as () => IEmployee[],
    default: (): IEmployee[] => [],
  },
})
const emit = defineEmits<{
  (e: 'onPromoteClick', id: string): void
}>()

const onPromoteClick = (id: string) => {
  emit('onPromoteClick', id)
}
</script>