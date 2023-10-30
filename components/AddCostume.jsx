import React from "react";
import {
  Box,
  Input,
  Button,
  Textarea,
  Stack,
  Select,
  useToast
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addCostume } from "../api/costume";

const AddCostume = () => {
  const [name, setName] = React.useState("");
  const [costume, setCostume] = React.useState("");
  const [costumeDescription, setCostumeDescription] = React.useState("");
  const [adultOrChild, setAdultOrChild] = React.useState("Adult");
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();
  const { isLoggedIn, user } = useAuth();

  const handleCostumeCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: "You must be logged in to create a costume",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
  
    setIsLoading(true);
  
    const costumeData = {
      name, 
      costume,
      costumeDescription,
      adultOrChild,
      userId: user.uid,
    };
    
    await addCostume(costumeData);
    
    setIsLoading(false);
    setName("");
    setCostume("");
    setCostumeDescription("");
    toast({ title: "Costume created successfully", status: "success" });
  };

  return (
    <Box w="40%" margin={"0 auto"} display="block" mt={5}>
      <Stack direction="column">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Costume"
          value={costume}
          onChange={(e) => setCostume(e.target.value)}
        />
        <Textarea
          placeholder="Costume Description"
          value={costumeDescription}
          onChange={(e) => setCostumeDescription(e.target.value)}
        />
        <Select value={adultOrChild} onChange={(e) => setAdultOrChild(e.target.value)}>
          <option value={"Adult"}>Adult</option>
          <option value={"Child"}>Child</option>
        </Select>
        <Button
          onClick={() => handleCostumeCreate()}
          disabled={!name || !costume || !costumeDescription || isLoading}
          colorScheme="teal"
          variant="solid"
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default AddCostume;
