import { Flex, FlexProps } from "@chakra-ui/react";

export const Wrapper: React.FC<FlexProps> = ({ children, ...props }) => {
  return (
    <Flex
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      {children}
    </Flex>
  );
}