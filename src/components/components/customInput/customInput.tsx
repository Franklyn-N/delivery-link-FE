/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const CustomInput = ({ placeholder, type, ...props }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (event: { target: { value: any; }; }) => {
    if (!event.target.value) {
      setIsFocused(false);
    }
  };

  return (
    <InputGroup position={"relative"} className={isFocused ? "focused" : ""}>
      {/* <Text transition={"250ms ease"} bg="#FFF" zIndex={isFocused ? "7" : "4"} px=".3rem" position={"absolute"} whiteSpace={"nowrap"} color={"#667085"} fontSize={isFocused ? "12px" : ".95rem"} ml={isFocused ? ".7rem" : ".8rem"} mt={isFocused ? "-.6rem" : "1.2rem"}>{placeholder}</Text> */}
      <Input
        py="1.8rem"
        px="1rem"
        zIndex={"6"}
        onFocus={handleFocus}
        // onMouseEnter={handleFocus}
        // onClick={handleFocus}
        // onSelect={handleFocus}
        borderColor={"#667085"}
        onBlur={handleBlur}
        _focus={{ borderColor: "#F9F5FF" }}
        // _placeholder={{ opacity: 0 }}
        placeholder={placeholder}
        type={showPassword ? "text" : type}
        {...props}
      />
      {type === "password" && <InputRightElement zIndex={"7"} mt=".65rem" children={showPassword ? <AiOutlineEye style={{transform: "scale(1.4) translateX(-.4rem)", cursor: "pointer"}} color={"#8F939B"} cursor={"pointer"} onClick={() => setShowPassword(!showPassword)} /> : <AiOutlineEyeInvisible style={{transform: "scale(1.4) translateX(-.4rem)", cursor: "pointer"}} color={"#8F939B"} cursor={"pointer"} onClick={() => setShowPassword(!showPassword)} />} />}
    </InputGroup>
  );
};

export default CustomInput;
