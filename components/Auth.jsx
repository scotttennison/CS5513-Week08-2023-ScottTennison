import React from "react";
import { Box, Button, Link, Text, useColorMode } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";

const Auth = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isLoggedIn, user } = useAuth();

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box>
        <Link href="/add-costume">Add Costume</Link>
      </Box>
      <Box>
        <Link href="/">List All Costumes</Link>
      </Box>
      <Box textAlign={"right"}>
        <Button onClick={() => toggleColorMode()}>
          {colorMode == "dark" ? <FaSun /> : <FaMoon />}
        </Button>{" "}
        {isLoggedIn && (
          <>
            <Text color="green.500">{user.email}</Text>
            <Link color="red.500" onClick={() => auth.signOut()}>
              Logout
            </Link>
          </>
        )}
        {!isLoggedIn && (
          <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
            Login with Google
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Auth;
