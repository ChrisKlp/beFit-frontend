import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { SignInFormValues } from '@/pages/LoginPage';

type Props = {
  handleSubmit: (values: SignInFormValues) => void;
};

export default function SignInForm({ handleSubmit }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState<SignInFormValues>({
    login: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Stack spacing={8} mx="auto" maxW="lg" w="full" px={6}>
      <Box
        rounded="lg"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        p={8}
      >
        <Stack
          as="form"
          spacing={4}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(values);
          }}
        >
          <FormControl id="email" isRequired>
            <FormLabel>Login</FormLabel>
            <Input name="login" value={values.login} onChange={handleChange} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Hasło</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              <InputRightElement h="full">
                <Button
                  variant="ghost"
                  onClick={() => setShowPassword((prev) => !prev)}
                  p={0}
                  color="green.200"
                >
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack pt={2}>
            <Button
              type="submit"
              loadingText="Logowanie"
              size="lg"
              colorScheme="green"
            >
              Zaloguj się
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
