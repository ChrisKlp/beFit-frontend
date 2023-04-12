import { TExerciseRes } from './Exercise';

export type TWorkoutRes = {
  _id: string;
  name: string;
  type: string;
  level: string;
  exercises: {
    _id: string;
    exercise: TExerciseRes;
    sets: number;
    reps: number;
    rest: number;
  }[];
};

export type TWorkoutReq = {
  id?: string;
  name: string;
  type?: string;
  level?: string;
  exercises: {
    exercise: string;
    sets: number;
    reps: number;
    rest: number;
  }[];
};
