import { Box, Heading, Text, useToast } from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userActionTypes } from "../../../redux/constants/userActionTypes";
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

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {state} = useLocation()

    const toast = useToast()

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const datax = {
        email: email,
        password: password
    }

    const login = async(e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true)
        try {
            const {data} = await axiosInstance.post("user/login", datax)
            localStorage.setItem("DLTK", data?.token);
            localStorage.setItem("uid", data?.user?.id);
            dispatch({type: userActionTypes.SIGNIN_SUCCESS, payload: data?.user})
            window.location.href = '/'
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
    }


    return (
        <Box>
            <Box padding="1rem" maxWidth={"600px"} mx="auto" mt="3rem">
                <Heading mt={6} fontWeight={500} fontSize="1.3rem" color="#030303" fontFamily='Roboto'>Login to your account</Heading>
                <Text mt={2} mb="2rem" color={"#667085"} fontSize={".9rem"}>Enter your details to log in</Text>
                <form onSubmit={login}>
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
                    />
                    <br /><br /><br />
                    <PrimaryButton type="submit" text="Sign In" icon="next" loading={loading} />
                    <Text mt="2rem" textAlign={"center"} fontSize={".9rem"} color="#475467">Don't have an account? <span onClick={() => navigate("/signup", {state: {userType: state?.userType}})} style={{fontWeight: "600", color: "#7F56D9", cursor: "pointer", transition: "250ms ease"}}>Sign up here</span></Text>
                </form>
            </Box>
        </Box>
    )
}

export default Login;

