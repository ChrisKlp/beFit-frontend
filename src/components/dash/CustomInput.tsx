import {
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
} from '@chakra-ui/react';

type FormInputProps = {
  id?: string;
  name?: string;
  label?: string;
  value?: string | number;
  placeholder?: string;
  isRequired?: boolean;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & FormControlProps;

export default function CustomInput({
  id,
  name,
  label,
  value,
  placeholder,
  isRequired,
  type,
  onChange,
  ...rest
}: FormInputProps) {
  return (
    <FormControl isRequired={isRequired} {...rest}>
      <FormLabel>{label}</FormLabel>
      <Input
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
      />
    </FormControl>
  );
}
