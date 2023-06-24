import { EntityId } from '@reduxjs/toolkit';
import { TWorkoutRes } from './Workout';

export type TUserWorkoutRes = {
  _id: EntityId;
  user: EntityId;
  workoutA: TWorkoutRes | null;
  workoutB: TWorkoutRes | null;
  workoutC: TWorkoutRes | null;
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
