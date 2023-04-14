/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { EntityState } from '@reduxjs/toolkit';
import { Select } from 'chakra-react-select';
import { useState } from 'react';
import { TWorkoutFormValues } from '@/types/Workout';
import { TExerciseRes } from '@/types/Exercise';
import FormInput from '@/components/Dashboard/FormInput';

const initialEmptyState = {
  name: '',
  level: '',
  type: '',
  exercises: [],
};

const exerciseEmptyState = {
  exercise: {
    value: '',
    label: '',
  },
  sets: 0,
  reps: 0,
  rest: 0,
};

type Props = {
  handleSubmit: (values: TWorkoutFormValues) => Promise<void>;
  exercises?: EntityState<TExerciseRes>;
  initialState?: TWorkoutFormValues;
};

export default function ExerciseForm({
  handleSubmit,
  exercises,
  initialState,
}: Props) {
  const [values, setValues] = useState<TWorkoutFormValues>(
    initialState || initialEmptyState
  );

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const addExercise = () => {
    setValues((prev) => ({
      ...prev,
      exercises: [...prev.exercises, exerciseEmptyState],
    }));
  };

  const removeExercise = (index: number) => {
    setValues((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index),
    }));
  };

  const onExerciseChange = (item: any, index: number) => {
    setValues((prev) => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) =>
        i === index ? { ...exercise, exercise: item } : exercise
      ),
    }));
  };

  const onExerciseInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) =>
        i === index ? { ...exercise, [name]: value } : exercise
      ),
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(values);
      }}
    >
      <VStack align="stretch" spacing={4} mb={4}>
        <FormInput
          name="name"
          label="Name:"
          isRequired
          placeholder="Trening 1"
          value={values?.name}
          onChange={handleInputChange}
        />
        <FormInput
          name="level"
          label="Level:"
          placeholder="beginner"
          value={values?.level}
          onChange={handleInputChange}
        />
        <FormControl>
          <FormLabel>Type:</FormLabel>
          <Select
            placeholder="Gym"
            selectedOptionColorScheme="green"
            value={{ value: values?.type, label: values?.type }}
            options={['Gym', 'Home', 'Outdoor'].map((type) => ({
              value: type,
              label: type,
            }))}
            onChange={(item) =>
              handleInputChange({
                target: { name: 'type', value: item?.value },
              })
            }
          />
        </FormControl>
        <Text fontWeight="medium">Exercises:</Text>
        {values.exercises?.map((exercise: any, index: number) => {
          return (
            <VStack
              align="stretch"
              key={index}
              spacing={4}
              bg="gray.800"
              border="1px"
              borderColor="gray.700"
              rounded="lg"
              p={6}
            >
              <FormControl>
                <FormLabel>Exercise:</FormLabel>
                <Select
                  colorScheme="green"
                  noOptionsMessage={() => 'No exercises'}
                  value={{
                    value: exercise.exercise.value,
                    label: exercise.exercise.label,
                  }}
                  options={
                    exercises?.ids.map((id) => ({
                      value: exercises?.entities[id]?._id || '',
                      label: exercises?.entities[id]?.name || '',
                    })) || []
                  }
                  onChange={(item) => onExerciseChange(item, index)}
                />
              </FormControl>
              <SimpleGrid columns={4} spacing={4}>
                <FormInput
                  name="sets"
                  label="Sets:"
                  placeholder="3"
                  value={exercise?.sets}
                  type="number"
                  onChange={(e: any) => onExerciseInputChange(index, e)}
                />
                <FormInput
                  name="reps"
                  label="Reps:"
                  placeholder="8"
                  value={exercise?.reps}
                  type="number"
                  onChange={(e: any) => onExerciseInputChange(index, e)}
                />
                <FormInput
                  name="rest"
                  label="Rest:"
                  placeholder="8"
                  value={exercise?.rest}
                  type="number"
                  onChange={(e: any) => onExerciseInputChange(index, e)}
                />
                <Button
                  alignSelf="end"
                  colorScheme="red"
                  variant="outline"
                  onClick={() => removeExercise(index)}
                >
                  Delete
                </Button>
              </SimpleGrid>
            </VStack>
          );
        })}
        <Button onClick={addExercise}>Add Exercise</Button>
      </VStack>

      <HStack justifyContent="flex-end">
        <Button type="submit" colorScheme="green" variant="outline">
          Submit
        </Button>
      </HStack>
    </form>
  );
}
