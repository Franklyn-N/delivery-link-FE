/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Spinner, Text } from "@chakra-ui/react"
import { HiOutlineArrowNarrowRight, HiOutlinePlus } from 'react-icons/hi'
import { RxExit } from 'react-icons/rx'

const PrimaryButton = (props: any, { color, bg, icon}: any) => {
    return (
        <Button 
        onClick={props.func}
        backgroundColor={bg || "#101828"}
        color={color || "#FFFFFF"}
        fontSize=".9rem"
        fontWeight={"600"}
        fontFamily={"Inter"}
        borderRadius={"12px"}
        padding="1.87rem 1.5rem"
        width={"100%"}
        _hover={{ backgroundColor: "#101828"}}
        transition={"250ms ease"}
        _disabled={{backgroundColor: "#D0D5DD", cursor: "not-allowed"}}
        {...props}
        >
       {props.loading === true ? 
       <Spinner />
       : 
       <Text ml={icon?.length > 0 ? "-.5rem" : ""} color={"#FFF"}>
        {props?.text}
        {props?.icon === "next" && <HiOutlineArrowNarrowRight style={{transform: "scale(1.3) translateY(2px)", display: "inline", marginLeft: ".5rem"}} />}
        {props?.icon === "add" && <HiOutlinePlus style={{transform: "scale(1.3) translateY(2px)", display: "inline", marginLeft: ".5rem"}} />}
        {props?.icon === "exit" && <RxExit style={{transform: "scale(1.1) translateY(2px) rotate(180deg)", display: "inline", marginLeft: ".5rem"}} />}
       </Text>
       }
       </Button>
    )
}

export default PrimaryButton