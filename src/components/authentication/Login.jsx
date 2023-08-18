import React, { useEffect, useState } from 'react';
import { useToast, Box, Text, Input, Button, Spacer, Link } from '@chakra-ui/react';
import { FormControl, FormHelperText } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

import Loading from '../Loading/Loading';

const Login = () => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const Navigate = useNavigate();

  const location = useLocation();

  const handleSubmit = () => {
    if (email === '' || password === '') {
      toast({
        title: 'Please enter all the details',
        description: 'Email or Password Maybe Empty',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

      return;
    }
    let payload = {
      email, password
    }
    setLoading(true)
    fetch("https://plum-adventurous-cheetah.cyclic.cloud/user/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 1) {
          sessionStorage.setItem('token', res.token)
          sessionStorage.setItem('name', res.user.name)
          sessionStorage.setItem('email', email)
          sessionStorage.setItem('isAuth', true)
          setLoading(false)
          toast({
            title: 'Login Successful.',
            description: "Successfully logged in ",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
           setLoading(false)
          Navigate("/")
        } else {
          setLoading(false)
          alert("Credentials do not match")
        }
      })
      .catch((err) => {
        setLoading(false)
        toast({
          title: 'Error.',
          description: "Something went wrong",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      })

  };

  if (loading) return <Loading />;

  return (
    <>

      {/* login box */}
      <Box width={{ base: '100%', md: '25%' }} ml={{ base: '0', md: '39em' }}>
        <FormControl>
          <Text fontSize="s" align="left">
            <b>LOG IN</b>
          </Text>
          <Spacer />
          <br />
          <Input
            fontSize="xs"
            required="required"
            name="email"
            type="email"
            placeholder="E-MAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Spacer />
          <br />
          <Input
            fontSize="xs"
            required="required"
            name="password"
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Spacer />
          <br />
          <FormHelperText fontSize="8px" align="left">
            HAVE YOU FORGOTTEN YOUR PASSWORD?
          </FormHelperText>
          <Spacer /> <br />
          <Button
            fontSize="xs"
            borderRadius="none"
            ml="-1em"
            color="white"
            bg="black"
            width={{ base: '100%', md: '300px' }}
            onClick={handleSubmit}
          >
            LOG IN
          </Button>
        </FormControl>
        <FormControl>

          <Text fontSize="xs" align="left">
            Don't have account??..
          </Text>



          <Link href="/signup">
            <Text

            >
              CREATE ACCOUNT
            </Text>
          </Link>
        </FormControl>
      </Box>



    </>
  );
};

export default Login;