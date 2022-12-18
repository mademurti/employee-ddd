<script setup lang="ts">
import { ref } from 'vue';
import employeeList from './modules/employee/components/employee-list.vue';

import employeeRepository from './modules/employee/api/employee-repository';
import reviewRepository from './modules/review/api/review-repository';

import type { IEmployee } from './modules/employee/types/employee.types';

const MIN_RANKING_TO_PROMOTE = 7
const MIN_NUMBER_OF_REVIEWS_TO_BE_PROMOTED = 4

// init local state
const isLoading = ref(true)
const employees = ref<IEmployee[]>([])

// get employee list from repository then assign to local state
employeeRepository.getList().then(data => {
  Object.assign(employees.value, data)
  isLoading.value = false
})

// method when promote an employee
const onPromoteClick = async (employeeToPromote: IEmployee) => {
  const reviews = await reviewRepository.getListReceivedReviews(employeeToPromote.id)

  // business rule
  if (reviews.length < MIN_NUMBER_OF_REVIEWS_TO_BE_PROMOTED) {
    window.alert(`${employeeToPromote.name} received only ${reviews.length} peer reviews, they can't be promoted`)
    return
  }

  const averageRanking = reviews
    .map(r => r.ranking)
    .reduce((acc, ranking) => acc + ranking, 0) / reviews.length

  // business rule
  if (averageRanking < MIN_RANKING_TO_PROMOTE) {
    window.alert(`The ranking of ${employeeToPromote.name} is too low (${averageRanking}) to be promoted`)
    return
  }

  employees.value.find(employee => {
    if (employee.id === employeeToPromote.id) {
      employee.promoted = true
    }
  })
  employeeRepository.promote(employeeToPromote.id)
}

</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <employee-list v-else :employees="employees" @on-promote-click="onPromoteClick" />
</template>
