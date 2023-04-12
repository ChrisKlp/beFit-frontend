/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { EntityState } from '@reduxjs/toolkit';
import { Select } from 'chakra-react-select';
import { TExerciseRes } from '@/types/Exercise';

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  values?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  exercises?: EntityState<TExerciseRes>;
  addExercise: () => void;
  removeExercise: (index: number) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTypeChange: (item: any) => void;
  onExerciseChange: (item: any, index: number) => void;
  onExerciseInputChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

export default function ExerciseForm({
  onChange,
  handleSubmit,
  values,
  isDisabled,
  exercises,
  addExercise,
  removeExercise,
  onInputChange,
  onTypeChange,
  onExerciseChange,
  onExerciseInputChange,
}: Props) {
  return (
    <form onSubmit={handleSubmit}>
      <VStack align="stretch" spacing={4} mb={4}>
        <FormControl isRequired>
          <FormLabel>Name:</FormLabel>
          <Input
            name="name"
            placeholder="Trening 1"
            value={values?.name}
            onChange={onInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Level:</FormLabel>
          <Input
            name="level"
            value={values?.level}
            placeholder="Level 1"
            onChange={onInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Type:</FormLabel>
          <Select
            placeholder="Gym"
            selectedOptionColorScheme="green"
            value={values?.type}
            options={['Gym', 'Home', 'Outdoor'].map((type) => ({
              value: type,
              label: type,
            }))}
            onChange={onTypeChange}
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
                <FormControl>
                  <FormLabel>Sets:</FormLabel>
                  <Input
                    name="sets"
                    placeholder="3"
                    value={exercise?.sets}
                    onChange={(e) => onExerciseInputChange(index, e)}
                    type="number"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Reps:</FormLabel>
                  <Input
                    name="reps"
                    placeholder="8"
                    value={exercise?.reps}
                    onChange={(e) => onExerciseInputChange(index, e)}
                    type="number"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Rest:</FormLabel>
                  <Input
                    name="rest"
                    placeholder="120"
                    value={exercise?.rest}
                    onChange={(e) => onExerciseInputChange(index, e)}
                    type="number"
                  />
                </FormControl>
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
        <Button
          type="submit"
          colorScheme="green"
          variant="outline"
          isDisabled={isDisabled}
        >
          Submit
        </Button>
      </HStack>
    </form>
  );
}
