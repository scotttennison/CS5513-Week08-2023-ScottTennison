import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import CostumeList from "../components/CostumeList";

export default function Home() {
  return (
    <Container maxW="7xl">
      <Auth />
      <CostumeList />
    </Container>
  );
}
