import { Badge, Box, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import IconShop from "../../../public/iconshop.png";
import Card from "./components/Card";
import Sidebar from "./components/Sidebar";
import { useProductStore } from "./Store";

const ShoppingCart = () => {
  const { products } = useProductStore((state) => state);
  const [totalQuantity, setTotalQuantiry] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const [data, setData] = useState([
    {
      id: 1,
      name: "Book",
      price: 10.99,
      imgUrl: "book.jpeg",
    },
    {
      id: 2,
      name: "Computer",
      price: 1199,
      imgUrl: "computer.jpeg",
    },
    {
      id: 3,
      name: "Banana",
      price: 1.05,
      imgUrl: "banana.jpeg",
    },
    {
      id: 4,
      name: "Car",
      price: 1400,
      imgUrl: "car.jpeg",
    },
  ]);

  useEffect(() => {
    let total = 0;

    products.forEach((item) => {
      total += item.quantity;
    });
    setTotalQuantiry(total);
  }, [products]);

  return (
    <Box pointerEvents={isOpen ? "none" : "all"}>
      <Box
        justifyContent="space-between"
        boxShadow="0 .125rem .25rem #00000013!important"
        w="100%"
        p="2rem"
        display="flex"
        alignItems="center"
      >
        <Text mx="2rem" fontWeight="bold">
          Home
        </Text>
        <Box
          onClick={() => {
            setIsOpen(true);
          }}
          position="relative"
        >
          <Image mx="2rem" boxSize="40px" src={IconShop} cursor="pointer" />

          <Badge
            borderRadius="20px"
            colorScheme="purple"
            style={{ position: "absolute", bottom: 0, right: 15 }}
          >
            {totalQuantity}
          </Badge>
        </Box>
      </Box>
      <Heading mt="20px" p="2rem" mx="2rem">
        Store
      </Heading>
      <Box p="2rem" mt="2rem" mx="3rem">
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 3, xl: 4 }} spacing={10}>
          {data.map((item) => {
            return (
              <Card
                key={item.id}
                id={item.id}
                name={item.name}
                imgUrl={item.imgUrl}
                price={item.price}
              />
            );
          })}
        </SimpleGrid>
      </Box>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </Box>
  );
};

export default ShoppingCart;
