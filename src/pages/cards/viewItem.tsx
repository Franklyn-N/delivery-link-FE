import { Box, Flex, FormControl, FormLabel, Spinner, Text, useToast } from '@chakra-ui/react'
import moment from 'moment';
import axiosInstance from '../../services/api';
import { SetStateAction, useState } from 'react';
import CustomInput from '../../components/components/customInput/customInput';
import PrimaryButton from '../../components/components/primaryButton/primarybutton';
import { useSelector } from 'react-redux';

interface CustomError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface ItemDetailsProps {
  title: string;
  id: string;
  userId: string;
  createdAt: string;
}

type itemDetails = {
  data: ItemDetailsProps;
  setTriggerClose: (value: string) => void;
}

const ViewItem = ({data, setTriggerClose}: itemDetails) => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState("view")
  const currentUser = useSelector(({userData})=>  userData?.currentUser);

  const [title, setTitle] = useState(data?.title);
  const [loadingx, setLoadingx] = useState(false);

  const deleteItem = async() => {
    setLoading(true)
    try {
      const res = await axiosInstance.delete(`/item/delete/${data?.id}/${currentUser?.id}`)
      toast({
        description: res?.data?.message ?? "Item deleted",
        status: "success",
        position: 'top'
      });
      setTriggerClose('close' + (Math.random()))
    }  catch(error: unknown) {
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
      setLoading(false)
    }
  }

  const handleEdit = (val: string) => {
    setView(val)
  }

  const updateItem = async(e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setLoadingx(true)
    const datax = {
      userId: currentUser?.id,
      title,
    }
    try {
      const res = await axiosInstance.put(`/item/edit/${data?.id}`, datax)
      toast({
        description: res?.data?.message ?? "Item updated",
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
    <Box>
     {data?.userId === currentUser?.id &&
     <Flex justifyContent={"flex-end"} mt="2rem" mb="1rem">
        <Flex gap="1rem" alignItems={"center"}>
          <Text cursor={"pointer"} onClick={() => handleEdit("edit")} textDecoration={"underline"} fontSize={".9rem"} fontWeight={"500"}>Edit</Text>
          <Text cursor={"pointer"} onClick={deleteItem} textDecoration={"underline"} fontSize={".9rem"} color="crimson" fontWeight={"500"}>{loading ? <Spinner size={"xs"} /> : "Delete"}</Text>
        </Flex>
      </Flex>}
      <Box mt="1rem">
        <Flex cursor={"pointer"} mb=".7rem" alignItems={"center"} gap=".5rem" p=".7rem" boxShadow="0px 4px 24px 0px #0000000D" border="1px solid #D0D5DD" borderRadius={"14px"}>
          <Box height={"50px"} width={"60px"} borderRadius={"8px"} backgroundImage={""} bg="lightgray" backgroundSize={"contain"} backgroundRepeat={"no-repeat"} />
          <Box>
              <Text mb=".3rem" fontSize={"1rem"} color="#475467" fontWeight={"600"} textTransform={"capitalize"}>{data?.title}</Text>
              <Text fontSize={".8rem"} color="#475467" opacity={".7"} fontWeight={"500"} textTransform={"capitalize"}>{moment(data?.createdAt).calendar()}</Text>
          </Box>
        </Flex>
      </Box>
      {view === "edit" &&
      <form onSubmit={updateItem}>
        <FormLabel fontSize={".9rem"} opacity={".7"} mt="5rem">Item Title</FormLabel>
        <FormControl>
          <CustomInput
            type={"text"}
            value={title}
            required
            placeholder={"Item Title"}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTitle(e.target.value)}
            mb=".8rem"
          />
        </FormControl>
            
        <PrimaryButton mt="1rem" type="submit" text="Update item" icon="add" func={() => {}} loading={loadingx} />
      </form>
      }
    </Box>
  )
}

export default ViewItem;