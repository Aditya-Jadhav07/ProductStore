import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, useColorModeValue, Image, Heading,HStack,IconButton , Text, useToast, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  VStack,
  Input,
  Button} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product.js';



const ProductCard = ({product}) => {
    const [updatedProduct,setUpdatedProduct] =useState(product);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white"," gray.800");

    const {deleteProduct, updateProduct} = useProductStore();
    const toast = useToast();

    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid);
        if(!success) {
        toast({
        title:"Error",
        description:message,
        status: "error",
        isClosable : true,
        });
        }
        else{
            toast({
          title:"Success",
          description:message,
          status: "success",
          isClosable : true,
        })}}

      const { isOpen, onOpen, onClose } = useDisclosure();
      const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success, message} = await updateProduct(pid, updatedProduct)
        onClose();
        if (!success) {
  toast({
    title: "Error",
    description: message,
    status: "error",
    isClosable: true,
  });
} else {
  toast({
    title: "Success",
    description: "Product Updated Successfully",
    status: "success",
    isClosable: true,
  });
}


      }
  return (
    <Box
    shadow={"lg"}
    rounded={"lg"}
    overflow={"hidden"}
    transition={'all 0.3s'}
    _hover={ { transform : "translateY(-5px)", shadow: 'xl'}}
    bg={bg}
    >
        <Image src={product.image} alt={product.name}  height="200px"          // fixed height for consistency
  width="100%"            // full width of the card
  objectFit="cover"       // crop and fill nicely
  borderRadius="md"       // medium border radius for smooth corners
  boxShadow="md"          // subtle shadow around the image
  mb={4}          />

        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}
            >
            {product.price}.RS
            </Text>

            <HStack>
               <IconButton icon={<EditIcon/>}  onClick={onOpen} colorScheme={'blue'}/>
               <IconButton icon={<DeleteIcon/>}  onClick={() => handleDeleteProduct(product._id)} colorScheme={'red'}/>
            </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>

            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody> 
                <VStack spacing={4}>
                    <Input
                    placeholder='Product Name'
                    name='name'
                    value={updatedProduct.name}
                    onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})} 
                    />

                     <Input
                    placeholder='Price'
                    name='price'
                    value={updatedProduct.price}
                    onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                    />

                     <Input
                    placeholder='Image Url'
                    name='image'
                    value={updatedProduct.image}
                    onChange={(e) => setUpdatedProduct({...updatedProduct, image : e.target.value})} 
                    /> 
                </VStack>
                </ModalBody>

                  <ModalFooter>

                      <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id,updatedProduct)}>Update</Button>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
           
          </ModalFooter>


            </ModalContent>

        </Modal>

    </Box>
  )
}

export default ProductCard
