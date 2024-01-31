import { EntityId } from '@reduxjs/toolkit';
import { TWorkoutRes } from './Workout';

export type TUserDoneWorkoutRes = {
  _id: EntityId;
  user: EntityId;
  userWorkout: EntityId;
  workout: Pick<TWorkoutRes, '_id' | 'name'>;
  createdAt: string;
  updatedAt: string;
};

export type TUserDoneWorkoutReq = {
  workout: EntityId;
  userWorkout?: EntityId;
};
