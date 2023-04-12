/* eslint-disable import/no-cycle */
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { TExerciseFormValues } from './EditExercise';

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  values?: TExerciseFormValues;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
};

export default function ExerciseForm({
  onChange,
  handleSubmit,
  values,
  isDisabled,
}: Props) {
  return (
    <form onSubmit={handleSubmit}>
      <VStack align="stretch" spacing={4} mb={4}>
        <FormControl isRequired>
          <FormLabel>Name:</FormLabel>
          <Input
            name="name"
            placeholder="Goblet squat"
            value={values?.name}
            onChange={onChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>VideoUrl:</FormLabel>
          <Input name="videoUrl" value={values?.videoUrl} onChange={onChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Type:</FormLabel>
          <Input
            name="type"
            placeholder="reps"
            value={values?.type}
            onChange={onChange}
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
