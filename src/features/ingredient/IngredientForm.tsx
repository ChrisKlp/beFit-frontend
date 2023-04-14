/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, HStack, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import FormInput from '@/components/Dashboard/FormInput';
import { TIngredientFormValues } from '@/types/Ingredient';

const initialEmptyState = {
  name: '',
  unitWeight: 0,
};

type Props = {
  handleSubmit: (
    values: TIngredientFormValues,
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  initialState?: TIngredientFormValues;
  isDisabled?: boolean;
};

export default function IngredientForm({
  handleSubmit,
  initialState,
  isDisabled,
}: Props) {
  const [values, setValues] = useState<TIngredientFormValues>(
    initialState || initialEmptyState
  );

  const updateValue = (e: any) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={(e) => handleSubmit(values, e)}>
      <VStack align="stretch" spacing={4} mb={4}>
        <FormInput
          name="name"
          label="Name:"
          isRequired
          placeholder="Awokado"
          value={values?.name}
          onChange={updateValue}
        />
        <FormInput
          name="unitWeight"
          label="Unit weight:"
          value={values?.unitWeight}
          onChange={updateValue}
          type="number"
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
