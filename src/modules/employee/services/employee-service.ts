import reviewRepository from "@/modules/review/api/review-repository";
import employeesRepository from "../api/employee-repository";
import type { IEmployee } from "../types/employee.types";

const MIN_RANKING_TO_PROMOTE = 7
const MIN_NUMBER_OF_REVIEWS_TO_BE_PROMOTED = 4

const getList = employeesRepository.getList
const promote = async (employeeToPromote: IEmployee, employees: IEmployee[]) => {
  const reviews = await reviewRepository.getListReceivedReviews(employeeToPromote.id)

  // business rule
  if(reviews.length < MIN_NUMBER_OF_REVIEWS_TO_BE_PROMOTED) {
    throw new Error(`${employeeToPromote.name} received only ${reviews.length} peer reviews, they can't be promoted`)
  }

  const averageRanking = reviews
    .map(r => r.ranking)
    .reduce((acc, ranking) => acc + ranking, 0) / reviews.length
  
  // business rule
  if(averageRanking < MIN_RANKING_TO_PROMOTE) {
    throw new Error(`The ranking of ${employeeToPromote.name} is too low (${averageRanking}) to be promoted`)
  }

  const newEmployees = employees.map(employee => {
    if(employee.id == employeeToPromote.id) {
      employee.promoted = true
    }
    return employee
  })
  
  employeesRepository.promote(employeeToPromote.id)
}

const employeeService = {
  getList,
  promote
}

export default employeeService