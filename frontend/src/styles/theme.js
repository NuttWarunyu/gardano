import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  styles: {
    global: {
      "html, body": {
        backgroundColor: "gray.100",
        color: "gray.800",
      },
    },
  },
});

export default theme;
