import { Box, Heading, Text, useToast } from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/api";
import CustomInput from "../../../components/components/customInput/customInput";
import PrimaryButton from "../../../components/components/primaryButton/primarybutton";


interface CustomError extends Error {
    response?: {
      data?: {
        error?: string;
      };
    };
  }

const Signup = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {state} = useLocation()

    const toast = useToast()

    const navigate = useNavigate();

    const datax = {
        userName: username,
        email: email,
        password: password
    }

    const signup = async(e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if(password === cPassword) {
        setLoading(true)
        try {
            const {data} = await axiosInstance.post("user/register", datax)
            navigate('/login')
            toast({
                description: data?.message ?? "Account created!",
                status: "success",
                position: "top-right",
                duration: 5000,
                isClosable: true,
              });
        } catch(error: unknown) {
            console.log(error)
            const customError = error as CustomError;
            const errorMessage = customError.response?.data?.error || 'An error occurred';
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
    } else {
        toast({
            description: "Password Mismatch, Please try again.",
            status: "error",
            position: "top-right",
            duration: 5000,
            isClosable: true,
          });
    }
    }


    return (
        <Box>
            {/* <GoBack /> */}
            <Box padding="1rem" maxWidth={"600px"} mx="auto" mt="3rem">
                <Heading mt={6} fontWeight={500} fontSize="1.3rem" color="#030303" fontFamily='Roboto'>Sign up as a {state?.userType?.toLowerCase()}</Heading>
                <Text mt={2} mb="2rem" color={"#667085"} fontSize={".9rem"}>Enter your details to Sign up</Text>
                <form onSubmit={signup}>
                    <CustomInput 
                    type={"text"}
                    required
                    placeholder={"Username"}
                    mb={".8rem"}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setUsername(e.target.value)}
                    />
                    <CustomInput 
                    type={"email"}
                    required
                    placeholder={"Email Address"}
                    mb={".8rem"}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
                    />
                    <CustomInput 
                    type={"password"}
                    required
                    placeholder={"Password"}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
                    mb={".8rem"}
                    />
                    <CustomInput
                    type={"password"}
                    required
                    placeholder={"Confirm Password"}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setCPassword(e.target.value)}
                    />
                    <br /><br /><br />
                    <PrimaryButton type="submit" text="Sign Up" icon="next" func={() => {}} loading={loading} />
                    <Text mt="2rem" textAlign={"center"} fontSize={".9rem"} color="#475467">Already have an account? <span onClick={() => navigate("/login", {state: {userType: state?.userType}})} style={{fontWeight: "600", color: "#7F56D9", cursor: "pointer", transition: "250ms ease"}}>Login here</span></Text>
                </form>
            </Box>
        </Box>
    )
}

export default Signup;

