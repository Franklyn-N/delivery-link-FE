import { SetStateAction, useState } from 'react'
import { Box, useToast } from '@chakra-ui/react';
import axiosInstance from '../../services/api';
import PrimaryButton from '../../components/components/primaryButton/primarybutton';
import CustomInput from '../../components/components/customInput/customInput';
import { useSelector } from 'react-redux';

interface CustomError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface CreateItemProps {
  setTriggerClose: (value: string) => void;
}


const CreateItem = ({setTriggerClose}: CreateItemProps) => {

  const [title, setTitle] = useState("");
  const [loadingx, setLoadingx] = useState(false);

  const currentUser = useSelector(({userData})=>  userData?.currentUser);

  const toast = useToast();

  const createItem = async(e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setLoadingx(true)
    const datax = {
      userId: currentUser?.id,
      title,
    }
    try {
      const {data} = await axiosInstance.post('/item/create', datax)
      toast({
        description: data?.message ?? "Item created",
        status: "success",
        position: 'top'
      });
      setTriggerClose('close' + (Math.random()))
    } catch(error: unknown) {
      console.log(error)
      const customError = error as CustomError;
      const errorMessage = customError.response?.data?.message || 'An error occurred';
      if(error instanceof Error) {
          toast({
          title: "An Error Occurred",
          description: errorMessage,
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      }
      
  } finally {
      setLoadingx(false)
    }
  }


  return (
    <form onSubmit={createItem}>
        <Box height={"58vh"} overflowY={"scroll"}>
          <CustomInput
          type={"text"}
          required
          placeholder={"Item Title"}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTitle(e.target.value)}
          mb=".8rem"
          />
        </Box>
        <PrimaryButton mt="1rem" type="submit" text="Add item" icon="add" func={() => {}} loading={loadingx} />
    </form>
  )
}

export default CreateItem;