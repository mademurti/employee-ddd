import { faker } from '@faker-js/faker';
import type { IEmployee } from '../types/employee';

const createDummyData = () => {
  const size = faker.datatype.number({
    min: 3,
    max: 10
  })

  return [...Array(size)].map(() => {
    return {
      id: faker.datatype.uuid(),
      promoted: faker.datatype.boolean(),
      name: faker.name.fullName(),
      avatar: faker.image.avatar()
    }
  })
}

const getList = ()  => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(createDummyData())
    }, 200)
  })
}

const promote = (id: string) => Promise.resolve()

const employeesRepository = {
  getList,
  promote
}

export default employeesRepository