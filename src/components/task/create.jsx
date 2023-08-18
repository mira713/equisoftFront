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
    Select,
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

const Create = () => {
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();
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

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const navigate = useNavigate();
    const handleSubmit = () => {
        let token = sessionStorage.getItem('token')
        setLoading(true);
        fetch("https://plum-adventurous-cheetah.cyclic.cloud/task/add", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json",
            "Authorization" : token
          },
        })
          .then((res) => res.json())
          .then((res)=>{setLoading(false);console.log(res);navigate("/tasks")})
        //   .then((res) => {
        //     if (res.status == 1) {
        //       setLoading(false);
        //       toast({
        //         title: "Task Added.",
        //         description: res.message,
        //         status: "success",
        //         duration: 3000,
        //         isClosable: true,
        //       });
        //       navigate("/tasks");
        //     } else {
        //       setLoading(false);
        //       toast({
        //         title: "error.",
        //         description: res.message,
        //         status: "failed",
        //         duration: 3000,
        //         isClosable: true,
        //       });
        //     }
        //   })
        //   .catch((err) => {
        //     setLoading(false);
        //     toast({
        //       title: "Error",
        //       description: "Please try again.",
        //       status: "error",
        //       duration: 3000,
        //       isClosable: true,
        //     });
        //   });
    };

    if (loading) return <Loading />;

    return (
        <>
            <Box pl={{ base: "20px", md: "50px" }} ml="1.5em" mt="4em">
                <Stack>
                    <Text textAlign="left" fontSize={{ base: "xs", md: "sm" }}>
                        <b>CREATE TASK</b>
                    </Text>
                </Stack>

                <Flex mt={{ base: "1em", md: "1.5em" }}>
                    <Box width={{ base: "100%", md: "400px" }}>
                        <FormControl>
                            <Input
                                fontSize={{ base: "xs", md: "sm" }}
                                required="required"
                                name="name"
                                type="text"
                                placeholder="TASK NAME"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                            <Spacer />
                            <br />

                            <InputGroup>
                                <Input
                                    type={"text"}
                                    placeholder="DESCRIPTION"
                                    value={formData.description}
                                    onChange={(e) =>
                                        handleInputChange('description', e.target.value)
                                    }
                                />
                            </InputGroup>
                            <Spacer /> <br />

                            <label>
                                <Select
                                    value={formData.checklist}
                                    onChange={(e) =>
                                        handleInputChange('checklist', e.target.value)
                                    }
                                >
                                    <option value="">Select...</option>
                                    <option value="important">Important</option>
                                    <option value="very_important">Very Important</option>
                                    <option value="less_important">Less Important</option>
                                </Select>
                            </label>
                            <Spacer></Spacer>
                            <br />
                            <Flex>
                                <Input
                                    placeholder="PROJECT"
                                    type="text"
                                    value={formData.project}
                                    onChange={(e) =>
                                        handleInputChange('project', e.target.value)
                                    }
                                /><Spacer />
                                <br />
                            </Flex>
                            <Flex>
                                <Input
                                    placeholder="COMMENT"
                                    type="text"
                                    value={formData.comments}
                                    onChange={(e) =>
                                        handleInputChange('comments', e.target.value)
                                    }
                                /><Spacer />
                                <br />
                            </Flex>
                            <Flex>
                                <Input
                                    placeholder="ASSIGN"
                                    type="text"
                                    value={formData.assign}
                                    onChange={(e) =>
                                        handleInputChange('assign', e.target.value)
                                    }
                                /><Spacer />
                                <br />
                            </Flex>
                            <Flex>
                                <Input
                                    placeholder="DUE DATE"
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                                /><Spacer />
                                <br />
                            </Flex>
                            <Flex>
                                <Input
                                    placeholder="LABEL"
                                    type="text"
                                    value={formData.labels}
                                    onChange={(e) =>
                                        handleInputChange('labels', e.target.value)
                                    }
                                /><Spacer />
                                <br />
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
}

export default Create