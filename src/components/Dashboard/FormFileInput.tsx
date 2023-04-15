import { Button, FormControl, FormLabel, HStack, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import { RiImageAddFill } from 'react-icons/ri';

type Props = {
  label?: string;
  value?: File | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormFileInput({ label, value, onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <HStack spacing={6}>
        <Button
          leftIcon={<RiImageAddFill />}
          flexShrink={0}
          colorScheme="green"
          variant="outline"
          onClick={() => ref.current?.click()}
        >
          Select image
        </Button>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={ref}
          onChange={onChange}
        />
        <Text>{value?.name || 'No image selected'}</Text>
      </HStack>
    </FormControl>
  );
}
