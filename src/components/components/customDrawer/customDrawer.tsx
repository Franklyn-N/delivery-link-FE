/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Box,
  } from '@chakra-ui/react'


const CustomDrawer = ({position, title, toggleElement, content, triggerClose }: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleClose = () => {
        if(triggerClose?.includes('close')) {
          onClose()
        }
    }

    useEffect(() => {
      handleClose()
    }, [triggerClose])
    
  return (
    <>
      <Box onClick={onOpen}>
        {toggleElement}
      </Box>
      <Drawer
        isOpen={isOpen}
        placement={position}
        onClose={onClose}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent borderRadius={position === "bottom" ? "16px 16px 0 0" : "0px"} pt={position === "bottom" ? "" : "4rem"}>
          <DrawerCloseButton border="2px solid #292D32" borderRadius={"50%"} transform={"scale(.8) translateY(1rem)"} fontWeight={"700"} />
          {position === "bottom" && <Box onClick={onClose} cursor={"pointer"} height={"6px"} mx="auto" mt=".7rem" width={"40px"} bg="#EAECF0" borderRadius={"8px"}/>}
          <DrawerHeader fontWeight={"500"} color={"#475467"}>{title}</DrawerHeader>

          <DrawerBody>
            {content}
          </DrawerBody>

          {position === "bottom" &&
          <DrawerFooter justifyContent={"center"}>
            <Button variant='ghost' mr={3} color="#475467" onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>}
        </DrawerContent>
      </Drawer>

    </>
  )
}

export default CustomDrawer;