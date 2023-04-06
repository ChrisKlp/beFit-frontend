import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from '@chakra-ui/react';

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
};

export default function CategoryForm({
  onChange,
  handleSubmit,
  value,
  isDisabled,
}: Props) {
  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired mb={4}>
        <FormLabel>Category name:</FormLabel>
        <Input placeholder="Obiad" value={value} onChange={onChange} />
      </FormControl>
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
