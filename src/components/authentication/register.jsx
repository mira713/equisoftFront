import React, { useEffect, useState } from "react";
import {
  useToast,
  Button,
  Box,
  Flex,
  FormLabel,

  HStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {
  Text,
  Input,
  Spacer,
  FormControl,
 
  Stack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useNavigate } from "react-router-dom";
import { FcInfo } from "react-icons/fc";

import Loading from "../Loading/Loading";


const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const handleSubmit = () => {
    if (password.length < 5) {
      alert("Please Provide 5 minimum digit password");
    } else if (!email.includes("@")) {
      alert(" @ missing, Please fill correct emailID");
    } else if (phone.length !== 10) {
      alert("Phone no. should be 10 digit");
    } else {
      let payload = {
        name,
        email,
        password,
        phone,
       
      };
      console.log(payload)
      setLoading(true);
      fetch("https://plum-adventurous-cheetah.cyclic.cloud/user/register", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status == 1) {
            setLoading(false);
            toast({
              title: "Account created.",
              description: res.message,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            navigate("/login");
          } else {
            setLoading(false);
            toast({
              title: "error.",
              description: res.message,
              status: "failed",
              duration: 3000,
              isClosable: true,
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          toast({
            title: "Error",
            description: "Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Box pl={{ base: "20px", md: "50px" }} ml="32.5em"  mt="4em">
        <Stack>
          <Text textAlign="left" fontSize={{ base: "xs", md: "sm" }}>
            <b>REGISTER YOURSELF</b>
          </Text>
        </Stack>

        <Flex mt={{ base: "1em", md: "1.5em"}}>
          <Box width={{ base: "100%", md: "400px" }}>
            <FormControl>
              <Input
                fontSize={{ base: "xs", md: "sm" }}
                required="required"
                name="email"
                type="email"
                placeholder="E-MAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Spacer />
              <br />

              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <HStack>
                <FcInfo />
                <Text fontSize="xs" as="i">
                  Passwords must be at least 5 characters
                </Text>
              </HStack>
              <Spacer /> <br />
              <Input
                required="required"
                name="name"
                fontSize={{ base: "xs", md: "sm" }}
                type="text"
                placeholder="NAME"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Spacer></Spacer>
              <br />

            
             
              <Flex>
                <FormLabel
                  as="none"
                  alignContent={"center"}
                  fontSize={{ base: "xs", md: "sm" }}
                >
                  +91
                </FormLabel>
                <Input
                  fontSize={{ base: "xs", md: "sm" }}
                  type="number"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                ></Input>
              </Flex>
            </FormControl>
            
        <Button
          borderRadius="none"
          type="submit"
          fontSize={{ base: "xs", md: "sm" }}
          color={"white"}
          bg={"black"}
          width={{ base: "100%", md: "400px" }}
          
          mt={4}
          onClick={handleSubmit}
        >
          CREATE ACCOUNT
        </Button>
  
          </Box>
         
        </Flex>
      
    

       
      </Box>
    </>
  );
};

export default Registration;