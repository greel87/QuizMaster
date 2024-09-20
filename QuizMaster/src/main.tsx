import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { RootNavigation } from './navigation/rootNavigation';

createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <RootNavigation />
  </ChakraProvider>
);