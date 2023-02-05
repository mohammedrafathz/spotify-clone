import { Box, Flex, Input, Button } from '@chakra-ui/react'
import { log } from 'console'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { useSWRConfig } from 'swr'
import { auth } from '../lib/mutations'


const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await auth(mode, { email, password })

      router.push('/');
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <Box height="100vh" width="100vw" bg='black'>
      <Flex justify="center" align="center" height='100px' borderBottom="white 1px solid">
        <Image alt='logo' src='/logo.png' height="60" width="130" />
      </Flex>
      <Flex justify='center' align='center' height='calc(100vh - 100px)'>
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder='Email Address'
              type='email'
              onChange={({ target }) => setEmail(target.value)}
              marginBottom="30px"
            />
            <Input
              placeholder='Password'
              type='password'
              marginBottom="30px"
              onChange={({ target }) => setPassword(target.value)} />
            <Button type='submit' sx={{
              '&:hover': {
                bg: 'green.400'
              }
            }} bg="green.500" isLoading={loading}>
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm