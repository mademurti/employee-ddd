<script setup lang="ts">
import { ref } from 'vue';
import employeeList from './modules/employee/components/employee-list.vue';

import type { IEmployee } from './modules/employee/types/employee.types';

import employeeService from './modules/employee/services/employee-service';

// init local state
const isLoading = ref(true)
const employees = ref<IEmployee[]>([])

// get employee list from repository then assign to local state
employeeService.getList().then(data => {
  Object.assign(employees.value, data)
  isLoading.value = false
})

// method when promote an employee
const onPromoteClick = async (employeeToPromote: IEmployee) => {
  try {
    await employeeService.promote(employeeToPromote, employees.value)
  } catch (e) {
    if (e instanceof Error) {
      window.alert(e.message)
    }
  }
}
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <employee-list v-else :employees="employees" @on-promote-click="onPromoteClick" />
</template>
