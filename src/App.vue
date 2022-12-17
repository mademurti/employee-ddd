<script setup lang="ts">
import { ref } from 'vue';
import employeeRepository from './modules/employee/repository/employee-repository';
import employeeList from './modules/employee/components/employee-list.vue';
import type { IEmployee } from './modules/employee/types/employee';

// init local state
const isLoading = ref(true)
const employees = ref<IEmployee[]>([])

// get employee list from repository then assign to local state
employeeRepository.getList().then(data => {
  Object.assign(employees.value, data)
  isLoading.value = false
})

// method when promote an employee
const onPromoteClick = (id: string) => {
  employees.value.find(employee => {
    if (employee.id === id) {
      employee.promoted = true
    }
  })
  employeeRepository.promote(id)
}

</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <employee-list v-else :employees="employees" @on-promote-click="onPromoteClick" />
</template>
