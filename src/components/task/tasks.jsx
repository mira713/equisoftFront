import React, { useState, useEffect } from 'react';
import { VStack, Text, Box } from '@chakra-ui/react';
import axios from 'axios';

const Task = () => {
  const [tasks, setTasks] = useState([]);

  const getData = () => {
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    axios.get('https://plum-adventurous-cheetah.cyclic.cloud/task/user', config).then((response) => {
      setTasks(response.data.data);
      console.log('task', response.data)
    });
  }

  useEffect(() => {
     getData()
  }, []);
  return (
    <>
      <VStack align="stretch" spacing={4}>
        <Text fontSize="xl" fontWeight="bold">Task List</Text>
        {tasks[0] ? <Box>
          {tasks.map((task) => (
            <VStack
              key={task._id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              align="stretch"
            >
              <Text fontSize="lg" fontWeight="bold">{task.name}</Text>
              <Text>{task.description}</Text>
            </VStack>
          ))}
        </Box> : <Box>
          <Text>Could not find Data</Text>
        </Box>}
      </VStack>
    </>
  )
}

export default Task