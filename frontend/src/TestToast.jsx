import { Button, useToast, VStack } from "@chakra-ui/react";


export default function TestToast() {
  const toast = useToast();

  const showToast = () => {
    toast({
      title: "การแจ้งเตือนสำเร็จ!",
      description: "นี่คือข้อความแจ้งเตือนจาก useToast()",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4} p={5}>
      <Button colorScheme="blue" onClick={showToast}>
        กดเพื่อแสดง Toast 🎉
      </Button>
    </VStack>
  );
}
