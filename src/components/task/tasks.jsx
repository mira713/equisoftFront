import React, { useState, useEffect } from 'react';
import { VStack, Text, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate()
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

  let switchPage=(id)=>{
     navigate(`/update/${id}`)
  }
  return (
    <>
      <VStack spacing={4}>
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
              onClick={()=>switchPage(task._id)}
              _hover={{cursor:"pointer"}}
            >
              <Text fontSize="lg" fontWeight="bold">{task.name}</Text>
              <Text>due till : {task.dueDate}</Text>
              <Text>{task.description}</Text>
              <Text fontWeight={'bold'}>Click to Update</Text>
            </VStack>
          ))}
        </Box> : <Box>
          <Text>Could not find Data</Text>
          <Text>OR</Text>
          <Text>Try to create new Task</Text>
        </Box>}
      </VStack>
    </>
  )
}

export default Task