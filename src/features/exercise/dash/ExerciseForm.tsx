import { Button, HStack, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import CustomInput from '@/components/dash/CustomInput';
import { TExerciseFormValues } from '@/types/Exercise';

const initialEmptyState = {
  name: '',
  videoUrl: '',
  type: '',
};

type Props = {
  handleSubmit: (values: TExerciseFormValues) => Promise<void>;
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(values);
      }}
    >
      <VStack align="stretch" spacing={4} mb={4}>
        <CustomInput
          name="name"
          label="Name:"
          isRequired
          placeholder="Trening 1"
          value={values?.name}
          onChange={updateValue}
        />
        <CustomInput
          name="videoUrl"
          label="VideoUrl:"
          value={values?.videoUrl}
          onChange={updateValue}
        />
        <CustomInput
          name="type"
          label="Type:"
          placeholder="reps"
          value={values?.type}
          onChange={updateValue}
        />
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
