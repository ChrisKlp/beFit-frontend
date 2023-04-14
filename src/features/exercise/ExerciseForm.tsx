import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { TExerciseFormValues } from '@/types/Exercise';

const initialEmptyState = {
  name: '',
  videoUrl: 'string',
  type: 'string',
};

type Props = {
  handleSubmit: (
    values: TExerciseFormValues,
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  initialState?: TExerciseFormValues;
  isDisabled?: boolean;
};

export default function ExerciseForm({
  handleSubmit,
  initialState,
  isDisabled,
}: Props) {
  const [values, setValues] = useState<TExerciseFormValues>(
    initialState || initialEmptyState
  );

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={(e) => handleSubmit(values, e)}>
      <VStack align="stretch" spacing={4} mb={4}>
        <FormControl isRequired>
          <FormLabel>Name:</FormLabel>
          <Input
            name="name"
            placeholder="Goblet squat"
            value={values?.name}
            onChange={updateValue}
          />
        </FormControl>
        <FormControl>
          <FormLabel>VideoUrl:</FormLabel>
          <Input
            name="videoUrl"
            value={values?.videoUrl}
            onChange={updateValue}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Type:</FormLabel>
          <Input
            name="type"
            placeholder="reps"
            value={values?.type}
            onChange={updateValue}
          />
        </FormControl>
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
