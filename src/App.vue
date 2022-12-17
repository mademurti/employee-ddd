<script setup lang="ts">
import { ref } from 'vue';
import employeesRepository from './modules/employee/api/employees-repository';
import employeeList from './modules/employee/components/employee-list.vue';
import type { IEmployee } from './modules/employee/types/employee';

const isLoading = ref(true)
const employees = ref<IEmployee[]>([])
employeesRepository.getList().then(data => {
  Object.assign(employees.value, data)
  isLoading.value = false
})

const onPromoteClick = (id: string) => {
  employees.value.forEach(employee => {
    if (employee.id === id) {
      employee.promoted = true
    }
  })
  employeesRepository.promote(id)
}

</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <employee-list v-else :employees="employees" @on-promote-click="onPromoteClick" />
</template>
