import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "reset-css"; // USE THIS
import type { AppProps } from 'next/app'
import PlayerLayout from "../components/PlayerLayout";
import type { NextComponentType } from "next";

const theme = extendTheme({
  colors: {
    gray: {
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121"
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ":focus": {
            outline: "none",
            boxShadow: "none"
          }
        }
      }
    }
  }
})

type CustomAppProps = AppProps & {
  Component: NextComponentType & { authPage?: boolean }
}

export default function App({ Component, pageProps }: CustomAppProps) {
  return (
    <ChakraProvider theme={theme}>
      {Component.authPage ? (
        <Component {...pageProps} />
      ) : (
        <PlayerLayout>
          <Component {...pageProps} />
        </PlayerLayout>
      )}
    </ChakraProvider>
  )
}
