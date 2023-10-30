import { Container } from "@chakra-ui/react";
import AddCostume from "../components/AddCostume";
import Auth from "../components/Auth";

export default function AddCostumePage() {
  return (
    <Container maxW="7xl">
      <Auth />
      <AddCostume />
    </Container>
  );
}
