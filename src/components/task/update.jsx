import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Badge, Divider } from '@chakra-ui/react';
import Loading from '../Loading/Loading';
import {AiOutlineUserAdd} from "react-icons/ai";
import {BiSolidAddToQueue} from "react-icons/bi";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    useDisclosure
  } from '@chakra-ui/react';

const Update = () => {
    const { id } = useParams();
    const [task, setTask] = useState({});
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        checklist: [],
        comments: [],
        name: '',
        assign: [],
        dueDate: '',
        labels: [],
        description: '',
        project: ''
    });
    const { isOpen, onOpen, onClose } = useDisclosure()

    let getData = () => {
        let token = sessionStorage.getItem('token');
        setLoading(true)
        fetch(`https://plum-adventurous-cheetah.cyclic.cloud/task/${id}`, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {setTask(data.data);setLoading(false)})
            .catch(error => console.error('Error fetching task data:', error));
    }

    let updateData = () => {
        let token = sessionStorage.getItem('token');
        setLoading(true)
        fetch(`https://plum-adventurous-cheetah.cyclic.cloud/task/${id}`, {
            method:"PATCH",
            body: JSON.stringify(formData),
            headers: {
                "Content-type": "application/json",
                Authorization: `${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {setTask(data.data);setLoading(false)})
            .catch(error => console.error('Error fetching task data:', error));
    }
    console.log(task)
    useEffect(() => {
        getData()
    }, [id])

    if(loading){
       return <Loading/>
    }
    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSave=()=>{
        onClose()
        updateData()
    }
    return (
        <>
        {loading?<Loading/>:<Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
        <Text fontSize="xl" fontWeight="bold">{task.name}</Text>
        <Text>{task.description}</Text>
        <Divider my={2} />
        <Text>Due Date: {new Date(task.dueDate).toLocaleDateString()}</Text><br/>
        <Text>Project: {task.project}</Text><br/>
        <Text><BiSolidAddToQueue size={30} onClick={onOpen} value={formData.checklist}/>Checklist: {task.checklist?task.checklist.length<=1?task.checklist[0]:task.checklist.join(', '):""}</Text><br/>
        <Text><AiOutlineUserAdd size={30} />Assign To: {task.assign?task.assign.length<=1?task.assign[0]:task.assign.join(', '):""}</Text><br/>
        <Text><BiSolidAddToQueue size={30}/>Labels: {task.labels?task.labels.length<=1?task.labels[0]:task.labels.join(', '):""}</Text><br/>
        <Text><BiSolidAddToQueue size={30}/>Comments: {task.comments?task.comments.length<=1?task.comments[0]:task.comments.join(', '):""}</Text><br/>

        <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Field</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Enter Data"
            value={formData.checklist}
            onChange={(e) => handleInputChange( 'checklist', e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

      </Box>}
      </>
    )
}

export default Update

