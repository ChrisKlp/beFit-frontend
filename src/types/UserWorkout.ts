import { EntityId } from '@reduxjs/toolkit';
import { TWorkoutRes } from './Workout';
import { TUserDoneWorkoutRes } from './UserDoneWorkout';

export type TUserWorkoutRes = {
  _id: EntityId;
  user: EntityId;
  workoutA: TWorkoutRes | null;
  workoutB: TWorkoutRes | null;
  workoutC: TWorkoutRes | null;
  doneWorkouts: TUserDoneWorkout[];
  createdAt: string;
  updatedAt: string;
};

export type TUserWorkoutReq = {
  id: EntityId;
  workoutA: string | null;
  workoutB: string | null;
  workoutC: string | null;
};

export enum TWorkoutType {
  WorkoutA = 'workoutA',
  WorkoutB = 'workoutB',
  WorkoutC = 'workoutC',
}

export type TUserDoneWorkout = Pick<
  TUserDoneWorkoutRes,
  '_id' | 'workout' | 'createdAt'
>;
