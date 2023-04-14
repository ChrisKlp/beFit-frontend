export type TExerciseRes = {
  _id: string;
  name: string;
  videoUrl: string;
  type: string;
};

export type TExerciseReq = {
  id: string;
  name: string;
  videoUrl?: string;
  type?: string;
};

export type TExerciseFormValues = Omit<TExerciseReq, 'id'>;
