import { Flex, Spinner } from '@chakra-ui/react'

const SpinLoader = () => {
  return (
    <Flex marginTop={"20rem"} justifyContent={"center"}>
      <Spinner size={"lg"} color="#7F56D9" />
    </Flex>
  )
}

export default SpinLoader