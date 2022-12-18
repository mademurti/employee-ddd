import { faker } from '@faker-js/faker';
import type { IReview } from '../types/review.types';

// dummy data
const createDummyData = (receiverId: string): IReview[] => {
  const size = faker.datatype.number({
    min: 3,
    max: 10
  })

  return [...Array(size)].map(() => {
    return {
      id: faker.datatype.uuid(),
      ranking: faker.datatype.number({
        min: 3,
        max: 10
      }),
      receiverId,
      senderId: faker.datatype.uuid(),
      review: faker.lorem.words(10)
    }
  })
}

// api call to get the data
const getListReceivedReviews = (employeeId: string) => {
  return new Promise<IReview[]>((resolve) => {
    setTimeout(() => {
      resolve(createDummyData(employeeId))
    }, 200)
  })
}

const reviewRepository = {
  getListReceivedReviews
}

export default reviewRepository