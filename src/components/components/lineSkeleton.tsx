import { Skeleton, Stack } from '@chakra-ui/react'

type LineSkeletonType = {
  num: number
}


const LineSkeleton = ({num, ...props}: LineSkeletonType) => {
  const arr = [...Array(num).keys()]

  return (
    <Stack mt=".5rem">
        {arr?.map((index) => {
            return (
                <Skeleton key={index} {...props} height={"40px"} />
            )
        })}
    </Stack>
  )
}

export default LineSkeleton;