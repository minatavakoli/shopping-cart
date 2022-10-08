import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useProductStore } from "../../Store";

import { CardProps } from "./types";

const Card = ({ id, imgUrl, name, price }: CardProps) => {
  const { addProduct, products, clearProduct, removeProduct } = useProductStore(
    (state) => state
  );
  const [isProductExist, setIsProductExist] = useState(false);

  useEffect(() => {
    const product = products.find((item) => item.id === id);
    setIsProductExist(!!product);
  }, [products]);

  return (
    <div>
      <Box
        border="1px solid #eee"
        borderRadius="10px"
        height="300px"
       
      >
        <Image src={imgUrl} w="100%" height="50%" objectFit="cover" />
        <Box w="100%" display="flex" justifyContent="space-between" p="0.5rem">
          <Text fontWeight="bold" fontSize="2xl">
            {name}
          </Text>
          <Text fontWeight="bold" fontSize="xl" color="#6c757d">
            ${price}
          </Text>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          p="0.5rem"
          mt="-10px"
        >
          {isProductExist ? (
            <Flex flexDirection={"column"} width={"100%"}>
              <Box
                w="100%"
                display="flex"
                justifyContent="center"
                p="0.5rem"
                mt="-10px"
                gap="10px"
              >
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    removeProduct(id);
                  }}
                >
                  -
                </Button>
                <Text fontSize="2xl">in cart</Text>
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    addProduct({ id, imgUrl, name, price });
                  }}
                >
                  +
                </Button>
              </Box>
              <Flex display="flex" justifyContent="center" alignItems="center">
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => {
                    clearProduct(id);
                  }}
                >
                  Remove
                </Button>
              </Flex>
            </Flex>
          ) : (
            <Button
              onClick={() => {
                addProduct({ id, imgUrl, name, price });
              }}
              mt="14px"
              w="100%"
              color="#fff"
              bg="#236efd"
            >
              + Add to cart
            </Button>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Card;
