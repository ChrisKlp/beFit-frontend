import { Button, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import FormInput from '@/components/dashboard/FormInput';

type Props = {
  handleSubmit: (value: string) => Promise<void>;
  category?: string;
  isDisabled?: boolean;
};

export default function CategoryForm({
  handleSubmit,
  category,
  isDisabled,
}: Props) {
  const [value, setValues] = useState<string>(category || '');

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(value);
      }}
    >
      <FormInput
        name="name"
        label="Name:"
        isRequired
        placeholder="Obiad"
        value={value}
        onChange={updateValue}
        mb={4}
      />
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
