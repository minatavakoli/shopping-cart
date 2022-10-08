import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useOutsideOutside } from "../../../../hooks";
import { useProductStore } from "../../Store";
import { SidebarProps } from "./types";

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { products, clearProduct } = useProductStore((state) => state);
  const wrapperRef = useRef(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useOutsideOutside(wrapperRef, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    let total = 0;

    products.forEach((item) => {
      total = total + item.price * item.quantity;
    });
    setTotalPrice(total);
  }, [products]);
  return (
    <Box
      ref={wrapperRef}
      pointerEvents="all"
      height="100vh"
      position="absolute"
      w="350px"
      top="0"
      right={isOpen ? "0" : "-350px"}
      bg="#fff"
      transition={"0.3s"}
      boxShadow={
        isOpen
          ? "0 0 0 100vw rgba(0, 0 ,0, 0.5)"
          : "0 0 0 100vw rgba(0, 0 ,0, 0)"
      }
      p="14px"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl">Cart</Text>
        <CloseIcon
          cursor="pointer"
          onClick={() => {
            setIsOpen(false);
          }}
        ></CloseIcon>
      </Flex>
      <Box>
        {products.map((item) => {
          return (
            <Flex key={item.id} mt="20px">
              <Flex
                justifyContent="space-between"
                alignItems="center"
                gap="10px"
                w="100%"
              >
                <Flex gap="10px" alignItems="center">
                  <Image
                    w="125px"
                    height="75px"
                    objectFit="cover"
                    src={item.imgUrl}
                  />
                  <Flex flexDirection="column">
                    <Flex alignItems="center" gap="5px">
                      <Text>{item.name}</Text>
                      <Text color="#6c757d" fontSize="xs">
                        x{item.quantity}
                      </Text>
                    </Flex>

                    <Text color="#6c757d" fontSize="sm">
                      ${item.price}
                    </Text>
                  </Flex>
                </Flex>

                <CloseIcon
                  color="#f00"
                  fontSize="xs"
                  cursor="pointer"
                  onClick={() => {
                    clearProduct(item.id);
                  }}
                ></CloseIcon>
              </Flex>
            </Flex>
          );
        })}
      </Box>
      <Text textAlign="right" mt="18px" fontSize="2xl" fontWeight="bold">
        Total: ${totalPrice}
      </Text>
    </Box>
  );
};

export default Sidebar;
