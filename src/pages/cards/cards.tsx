import { Box, Flex, IconButton, Text, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { HiPlus } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import axiosInstance from '../../services/api'
import PrimaryButton from '../../components/components/primaryButton/primarybutton'
import EmptyState from '../../components/emptyState/emptyState'
import LineSkeleton from '../../components/components/lineSkeleton'
import CustomDrawer from '../../components/components/customDrawer/customDrawer'
import CreateItem from './createItem'
import moment from 'moment'
import ViewItem from './viewItem'
import { AiOutlineEdit } from 'react-icons/ai'


interface CustomError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface userData {
  id: string;
  email: string;
  userName: string;
}

interface itemDetails {
  title: string;
  id: string;
  userId: string;
  createdAt: string;
  user: userData
}


const Cards = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingc, ] = useState(false)

  const [triggerClose, setTriggerClose] = useState("")

  const currentUser = useSelector(({userData})=>  userData?.currentUser);

  const logout = () => {  
      localStorage.removeItem("uid")
      localStorage.removeItem("DLTK")
      window.location.reload()
  }

  const toast = useToast()

  const getItems = async() => {
    setLoading(true)
    try {
      const {data} = await axiosInstance.get(`/item/all`)
      setItems(data)
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

  useEffect(() => {
    getItems()
  }, [loadingc, triggerClose])

  return (
    <>
      <Flex padding={"1rem"} justifyContent={"flex-end"}>
        <Text>Logged in as <span style={{textDecoration: "underline"}}>{currentUser?.email}</span>, <span onClick={logout} style={{color: "#7F56D9", fontWeight: "500", cursor: "pointer"}}>Log out?</span></Text>
      </Flex>
   
    <Box maxWidth={"600px"} height={"87vh"} overflowY={"scroll"} mx="auto" mt="4rem" px="1rem">
        <Text mb="1.5rem" fontWeight={"700"} fontSize={"1.4rem"} opacity={".8"}>ALL ITEMS</Text>
        {loading ?
        <LineSkeleton num={6} />
        :
        items?.length < 1 ?
        <Flex justifyContent={"center"}>
         <Box>
            <EmptyState text={"No items added"} />
            <CustomDrawer 
              position={"bottom"}
              title={"Add new item"}
              triggerClose={triggerClose}
              toggleElement={
                <PrimaryButton mt="1rem" width="" text="Add new item" icon="add" func={() => {}} loading={loading} />
              }
              content={
                <CreateItem setTriggerClose={setTriggerClose} />
              }
            />
         </Box>
        </Flex>
        :
        items?.map(((i: itemDetails) => {
            return (
              <CustomDrawer  
                key={i?.title}
                position={"bottom"}
                title={"Item details"}
                triggerClose={triggerClose}
                toggleElement={
                  <Flex position={"relative"} cursor={"pointer"} mb=".7rem" alignItems={"center"} gap=".5rem" p=".7rem" boxShadow="0px 4px 24px 0px #0000000D" border="1px solid #D0D5DD" borderRadius={"14px"}>
                    <Box height={"50px"} width={"60px"} borderRadius={"8px"} backgroundImage={""} bg="lightgray" backgroundSize={"contain"} backgroundRepeat={"no-repeat"} />
                    <Box>
                        <Text mb=".3rem" fontSize={".9rem"} color="#475467" fontWeight={"600"} textTransform={"capitalize"}>{i?.title}</Text>
                          <Text fontSize={".7rem"} color="#475467" opacity={".7"} fontWeight={"500"} textTransform={"capitalize"}>{moment(i?.createdAt).calendar()}</Text>
                    </Box>
                    {currentUser?.id !== i?.userId && <Text position={"absolute"} right={"2%"} bottom={"12%"} fontSize={".75rem"} color="#475467" opacity={".7"} fontWeight={"500"} textTransform={"capitalize"}><AiOutlineEdit style={{display: "inline", transform: "translate(-3px, 2px)"}} />{i?.user?.userName}</Text>}
                  </Flex>
                }
                content={
                  <Box height={"65vh"} overflowY={"scroll"}>
                    <ViewItem data={i} setTriggerClose={setTriggerClose} />
                  </Box>
                }
              />
            )
        }))
        }
        {items?.length > 0 &&
        <CustomDrawer 
          position={"bottom"}
          title={"Add new item"}
          triggerClose={triggerClose}
          toggleElement={
            <IconButton
            position={"absolute"} 
            bottom={"5%"}
            right={"5%"}
            bg="#000000" 
            boxShadow="0px 4px 24px 0px #0000000D" 
            color="#FFF" borderRadius={"50%"} 
            boxSizing='border-box' 
            padding={"1.5rem 1rem"}
            _hover={{backgroundColor: "#000", color: "#FFF"}} 
            aria-label='Add new item' 
            icon={<HiPlus />} 
            />
          }
          content={
            <CreateItem setTriggerClose={setTriggerClose} />
          }
        />
        }
    </Box>
    </>
  )
}

export default Cards















