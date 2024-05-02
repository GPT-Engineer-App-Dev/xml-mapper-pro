import { Box, Button, Input, Text, VStack, Heading, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

const Index = () => {
  const [file, setFile] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    console.log('File uploaded:', file.name);
  };

  const handleFileUpload = () => {
    // Placeholder for file upload logic
    console.log('Processing file:', file.name);
    // Simulate quote parsing
    setQuotes([{ id: 1, product: 'Product A', quantity: 10, price: 100, description: 'High quality steel product.' }]);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleExport = () => {
    console.log('Exporting data');
  };

  return (
    <Box p={5}>
      <VStack spacing={4}>
        <Heading>Lindab Quote Mapper</Heading>
        <Text>Upload your XML file to map quotes to products.</Text>
        <Flex>
          <Input type="file" onChange={handleFileChange} placeholder="Upload XML" />
          <Button leftIcon={<FaUpload />} colorScheme="blue" onClick={handleFileUpload}>
            Upload
          </Button>
        </Flex>
        {quotes.length > 0 && (
          <>
            <Input placeholder="Search products..." value={searchTerm} onChange={handleSearchChange} />
            {quotes.map((quote) => (
              <Box key={quote.id} p={3} shadow="md" borderWidth="1px">
                <Text fontWeight="bold">Product: {quote.product}</Text>
                <Text>Quantity: {quote.quantity}</Text>
                <Text>Price: {quote.price ?? 'N/A'}</Text>
                <Text>Description: {quote.description ?? 'No description available'}</Text>
              </Box>
            ))}
            <Button colorScheme="green" onClick={handleExport}>Export Mapped Quotes</Button>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Index;