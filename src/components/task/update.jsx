import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Text, Badge, Divider } from '@chakra-ui/react';
import Loading from '../Loading/Loading';
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiSolidAddToQueue } from "react-icons/bi";

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
import UserSelectionModal from './UserSelectionModal';

const Update = () => {
    const { id } = useParams();
    const [task, setTask] = useState({});
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate()
    const [formData, setFormData] = useState({
        checklist: task.checklist ? task.checklist : [],
        comments: task.comments ? task.comments : [],
        name: task.name ? task.name : "",
        assign: task.assign ? task.assign : [],
        dueDate: task.dueDate ? task.dueDate : "",
        labels: task.labels ? task.labels : [],
        description: task.description ? task.description : "",
        project: task.project ? task.project : ""
    });
    const [alluser, setAlluser] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [newChecklist, setChecklist] = useState('');
    const [selectedUser, setSelectedUser] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [given, setGiven] = useState([])

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSelectUser = (newUser) => {
        setSelectedUser(newUser);
        setGiven([...given,newUser])
        handleCloseModal();
        assignName()
    };
let assignName = () =>{
    setFormData({
        ...formData, 
        assign: given, 
      });
}
console.log(formData,"yes")
    let handleDelete = () => {
        let token = sessionStorage.getItem('token');
        setLoading(true)
        fetch(`https://plum-adventurous-cheetah.cyclic.cloud/task/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                Authorization: `${token}`,
            },
        })
            .then(response => Navigate('/tasks'))
            .then(data => window.location.reload())
            .catch(error => console.error('Error fetching task data:', error));
    }
    let getData = () => {
        let token = sessionStorage.getItem('token');
        setLoading(true)
        fetch(`https://plum-adventurous-cheetah.cyclic.cloud/task/${id}`, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then(response => response.json())
            .then(data => { setTask(data.data); setLoading(false) })
            .catch(error => console.error('Error fetching task data:', error));
    }
    let getUser = () => {
        let token = sessionStorage.getItem('token');
        //setLoading(true)
        fetch(`https://plum-adventurous-cheetah.cyclic.cloud/user`, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then(response => response.json())
            .then(data => setAlluser(data.user))
            .catch(error => console.error('Error fetching task data:', error));
    }
    const handleChecklist = () => {
        setFormData((prevData) => ({
            ...prevData,
            checklist: [...prevData.checklist, newChecklist],
        }));
        onClose();
    };



    let updateData = () => {
        let token = sessionStorage.getItem('token');
        console.log(formData);
        setLoading(true)
        fetch(`https://plum-adventurous-cheetah.cyclic.cloud/task/${id}`, {
            method: "PATCH",
            body: JSON.stringify(formData),
            headers: {
                "Content-type": "application/json",
                Authorization: `${token}`,
            },
        })
            .then(response => response.json())
            .then(data => { setTask(data.data); setLoading(false) })
            .catch(error => console.error('Error fetching task data:', error));
    }

    useEffect(() => {
        updateData()
        getData()
        getUser()
    }, [id,formData])


    if (loading) {
        return <Loading />
    }

    return (
        <>
            {loading ? <Loading /> : <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
                <Text fontSize="xl" fontWeight="bold">{task.name}</Text>
                <Text>{task.description}</Text>
                <Divider my={2} />
                <Text>Due Date: {new Date(task.dueDate).toLocaleDateString()}</Text><br />
                <Text>Project: {task.project}</Text><br />
                <Text><BiSolidAddToQueue size={30} onClick={onOpen} />Checklist: {task.checklist ? task.checklist.length <= 1 ? task.checklist[0] : task.checklist.join(', ') : ""}</Text><br />
                <div><Text><AiOutlineUserAdd size={30} onClick={handleOpenModal} />Assign To: {task.assign ? task.assign.length <= 1 ? task.assign[0] : task.assign.join(', ') : ""}</Text>
                    <UserSelectionModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        users={alluser}
                        selectedUser={selectedUser}
                        onSelectUser={handleSelectUser}
                    />
                </div><br />
                <Text><BiSolidAddToQueue size={30} />Labels: {task.labels ? task.labels.length <= 1 ? task.labels[0] : task.labels.join(', ') : ""}</Text><br />
                <Text><BiSolidAddToQueue size={30} />Comments: {task.comments ? task.comments.length <= 1 ? task.comments[0] : task.comments.join(', ') : ""}</Text><br />


                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add Checklist</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input
                                placeholder="Enter chicklist"
                                value={newChecklist}
                                onChange={(e) => setChecklist(e.target.value)}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" onClick={handleChecklist}>
                                Add
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Button onClick={handleDelete}>Delete Task</Button>
            </Box>}
        </>
    )
}

export default Update

