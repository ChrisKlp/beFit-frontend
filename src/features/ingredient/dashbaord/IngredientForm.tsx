import { Button, HStack, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import CustomInput from '@/components/dashboard/CustomInput';
import { TIngredientFormValues } from '@/types/Ingredient';

const initialEmptyState = {
  name: '',
  unitWeight: 0,
};

type Props = {
  handleSubmit: (values: TIngredientFormValues) => Promise<void>;
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
          placeholder="Awokado"
          value={values?.name}
          onChange={updateValue}
        />
        <CustomInput
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
