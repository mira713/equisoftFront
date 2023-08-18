import React from 'react';
import { Box, Flex, Link, useMediaQuery } from '@chakra-ui/react';

const Navbar = () => {
  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
  const [auth, setAuth] = React.useState(sessionStorage.getItem('isAuth'?true:false))
  return (
    <>
      <Box
      borderBottom="1px"
      borderColor="black.200"
    //   position={isSmallerScreen ? 'sticky' : 'fixed'}
      top={0}
      width="100%"
      backgroundColor="white"
      zIndex={1000}
    >
      <Flex justifyContent="space-between" padding={3}>
        <Box>
          <Link
            fontSize="large"
            fontWeight="bold"
            color="red.300"
            href="/"
          >
           Task Management App
          </Link>
        </Box>

        <Box borderBottom="4px" borderColor="green.200">
          {isSmallerScreen ? (
            <>
              <Flex
                direction="column"
                align="flex-start"
                padding={10}
                gap={4}
              >
                <Link fontSize="xl" fontWeight="bold" color="blue.700" href="/tasks">
                  Tasks
                </Link>
                <Link fontSize="xl" fontWeight="bold" color="blue.700" href="/create">
                  Create task
                </Link>
                <Link fontSize="xl" fontWeight="bold" color="blue.700" href="/login">
                  Login
                </Link>
                <Link fontSize="xl" fontWeight="bold" color="blue.700" href="/signup">
                  SignUp
                </Link>
              </Flex>
            </>
          ) : (
            <Flex justifyItems="flex-start" padding={10} gap={12}>
              <Box>
                <Link fontSize="xl" fontWeight="bold" color="blue.700" href="/tasks" marginRight={4}>
                  Tasks
                </Link>
              </Box>
              <Box>
                <Link fontSize="xl" fontWeight="bold" color="blue.700" href="/create" marginRight={4}>
                  Create task
                </Link>
              </Box>
              <Box>
                <Link fontSize="xl" fontWeight="bold" color="blue.700" href="/login" marginRight={4}>
                  Login
                </Link>
              </Box>
              <Box>
                <Link fontSize="xl" fontWeight="bold" color="blue.700" href="/signup" marginRight={4}>
                  SignUp
                </Link>
              </Box>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
    </>
  
  );
};

export default Navbar;