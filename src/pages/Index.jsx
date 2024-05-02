import { Box, Button, Input, Text, VStack, Heading, Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';

const Index = () => {
  const [file, setFile] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dataLines, setDataLines] = useState([]);
  const [productDatabase, setProductDatabase] = useState([]);

  useEffect(() => {
    setDataLines([
      { productCode: '001', description: 'Steel Beam', unit: 'pcs', quantity: 10 },
      { productCode: '002', description: 'Concrete Block', unit: 'pcs', quantity: 20 }
    ]);
    setProductDatabase([
      { productCode: '001', productName: 'Steel Beam' },
      { productCode: '002', productName: 'Concrete Block' }
    ]);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    console.log('File uploaded:', file.name);
  };

  const handleFileUpload = () => {
    console.log('Processing file:', file.name);
    setQuotes([{ id: 1, product: 'Product A', quantity: 10, price: 100, description: 'High quality steel product.' }]);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleExport = () => {
    console.log('Exporting data');
  };

  const handleProductSearch = (event, productCode) => {
    const searchTerm = event.target.value;
    const filteredProducts = productDatabase.filter(product => product.productCode.includes(searchTerm));
    console.log('Filtered Products:', filteredProducts);
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
        {dataLines.map((line, index) => (
          <Box key={index} p={3} shadow="md" borderWidth="1px">
            <Text fontWeight="bold">Product Code: {line.productCode}</Text>
            <Text>Description: {line.description}</Text>
            <Text>Unit: {line.unit}</Text>
            <Text>Quantity: {line.quantity}</Text>
            <Input placeholder="Search product..." onChange={(e) => handleProductSearch(e, line.productCode)} />
          </Box>
        ))}
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