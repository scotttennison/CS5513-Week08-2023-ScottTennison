import React from "react";
import {
    Box,
    Heading,
    Text,
    Button,
    VStack,
    Divider
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from 'next/router';

const CostumeItem = ({ itemData }) => {
    const router = useRouter();
    const { user } = useAuth() || {};
    
    if (!user) {
        return null;  
    }
    
    return (
        <Box mt={5}
        padding={5}
        borderWidth="1px"
        borderRadius="lg"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover">
            <Button 
                colorScheme="teal" 
                mb={4} 
                onClick={() => router.back()}
            >
                Go Back
            </Button>

            <Divider mb={4} />

            <VStack align="start" spacing={3}>
                <Heading as="h3" fontSize={"xl"}>
                    { itemData.name } 
                </Heading>
                <Text>
                    Costume: { itemData.costume }  
                </Text>
                <Text>
                    Description: { itemData.costumeDescription }  
                </Text>
                <Text>
                    For: { itemData.adultOrChild }  
                </Text>
                <Text>
                    Added on: { new Date(itemData.createdAt).toLocaleDateString() } 
                </Text>
            </VStack>
        </Box>
    );
};

export async function getServerSideProps(context) {
    
    let itemData = null;
    
    const docRef = doc(db, 'costume', context.params.id);  
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        itemData = docSnap.data();
    }

    return {
        props: {
            itemData
        }
    };
}

export default CostumeItem;
