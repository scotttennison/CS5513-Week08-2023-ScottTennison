import { Box, Badge, Heading, Text, VStack, HStack, SimpleGrid, useToast, Link } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteCostume, toggleCostumeStatus } from "../api/costume";

const CostumeList = () => {
  const [costumes, setCostumes] = React.useState([]);
  const { user } = useAuth();
  const toast = useToast();

  const refreshData = () => {
    if (!user) {
      setCostumes([]);
      return;
    }
    const q = query(collection(db, "costume"), where("user", "==", user.uid));
    onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.docs.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() });
      });
      setCostumes(arr);
      console.log(costumes);
    });
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  const handleCostumeDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this costume?")) {
      deleteCostume(id);
      toast({ title: "Costume deleted successfully", status: "success" });
    }
  };

  const handleToggle = async (id, status) => {
    const newStatus = status == "completed" ? "pending" : "completed";
    await toggleCostumeStatus({ docId: id, status: newStatus });
    toast({
      title: `Costume marked ${newStatus}`,
      status: newStatus == "completed" ? "success" : "warning",
    });
  };

  return (
    <Box mt={5}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {costumes && costumes.map((costume) => (
          <Box
            p={4}
            borderRadius="lg"
            borderWidth="1px"
            boxShadow="lg"
            _hover={{ boxShadow: "xl" }}
            bg="white"
            transition="0.3s"
            key={costume.id}
          >
            <VStack align="start" spacing={3}>
              <HStack justifyContent="space-between" width="100%">
              <Heading as="h3" fontSize={"xl"}>
                  <Link href={`/costume/${costume.id}`}>{costume.name}</Link> - {costume.costume}
              </Heading>
                <HStack spacing={2}>
                  <Badge
                    colorScheme="red"
                    onClick={() => handleCostumeDelete(costume.id)}
                  >
                    <FaTrash />
                  </Badge>

                  <Badge
                    colorScheme={costume.status == "pending" ? "gray" : "green"}
                    onClick={() => handleToggle(costume.id, costume.status)}
                  >
                    {costume.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
                  </Badge>

                  <Badge
                    colorScheme={costume.status == "pending" ? "yellow" : "green"}
                  >
                    {costume.status}
                  </Badge>
                </HStack>
              </HStack>

              <Text>Costume Description: {costume.costumeDescription}</Text>
              <Text>Type: {costume.adultOrChild}</Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CostumeList;
