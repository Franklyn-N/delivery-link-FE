import { Box, Flex, Image, Text } from '@chakra-ui/react'
import Illustration from './illustration.svg'

type EmptyStateType = {
  text: string
}

const EmptyState = ({text}: EmptyStateType) => {
  return (
    <Flex justifyContent={"center"} mt="5rem">
        <Box>
        <Image mx="auto" src={Illustration} />
        <Text fontSize={".9rem"} textAlign={"center"} mt="1rem" fontWeight={"500"} color="#475467">{text}</Text>
        </Box>
    </Flex>
  )
}

export default EmptyState;