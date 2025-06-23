import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Flex, Text,HStack, useColorMode} from '@chakra-ui/react';
import {PlusSquareIcon} from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
 

const Navbar = () => {

  const {colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
      
      h={'auto'}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDirection={{
        base : "column",
        sm : "row"
      }}
      gap={{ base: 4, sm: 0 }} // add spacing between elements in column layout
      py={4}

      >
        <Text
        fontSize={{base:"38", sm:"28"}}
        fontWeight ={"bold"}
        textTransform={"uppercase"}
        textAlign={"center"}
        bgGradient={"linear(to-r, cyan.400, blue.500)"}
        bgClip={"text"}
        ><Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}  justifyContent="center"
  w={{ base: "full", sm: "auto" }} // full width on mobile
        >
          <Link to={"/create"}>
          <Button  w={{ base: "full", sm: "auto" }}>
            <PlusSquareIcon fontSize={20}/>
          </Button>
          </Link>

          <Button onClick={toggleColorMode}  w={{ base: "full", sm: "auto" }}>
          {colorMode === "light" ?  <IoMoon/>  :  <LuSun size={20}/>}
          </Button>

        </HStack>

      </Flex>

    </Container>
  )
}

export default Navbar
