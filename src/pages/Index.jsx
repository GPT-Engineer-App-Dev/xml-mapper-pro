import { Box, Button, Input, Text, VStack, Heading, Flex } from '@chakra-ui/react';
import { parseString } from 'xml2js';
import { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

const Index = () => {
  const [file, setFile] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    // Placeholder for file parsing logic
    console.log('File uploaded:', file.name);
  };

  const handleFileUpload = () => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const xml = event.target.result;
      parseString(xml, (err, result) => {
        if (err) {
          console.error('Error parsing XML:', err);
          return;
        }
        // Assuming the XML structure contains a 'quotes' root element with multiple 'quote' children
        const quotes = result.quotes.quote.map(q => ({
          id: q.id[0],
          product: q.product[0],
          quantity: parseInt(q.quantity[0], 10)
        }));
        setQuotes(quotes);
      });
    };
    reader.readAsText(file);
    console.log('Processing file:', file.name);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleExport = () => {
    // Placeholder for export logic
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
                <Text>Product: {quote.product}</Text>
                <Text>Quantity: {quote.quantity}</Text>
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