import { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Slider,
  Box,
  Typography,
  Grid,
  Link,
} from '@mui/material';

function App() {
  // State variables for temporary input, final input, QR code size, background color, and QR code URL
  const [temp, setTemp] = useState('');
  const [word, setWord] = useState('');
  const [size, setSize] = useState(400);
  const [bgColor, setBgColor] = useState('ffffff');
  const [qrCode, setQrCode] = useState('');

  // Effect hook to update the QR code URL whenever the word, size, or background color changes
  useEffect(() => {
    setQrCode(
      `http://api.qrserver.com/v1/create-qr-code/?data=${word}!&size=${size}x${size}&bgcolor=${bgColor}`
    );
  }, [word, size, bgColor]);

  // Function to update the word state when the generate button is clicked
  function handleClick() {
    setWord(temp);
  }

  return (
    <Container maxWidth="lg" sx={{ p: 10 }}>
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={6}
          container
          direction="column"
          justifyContent="center" // Center vertically
        >
          {/* Input field for text to encode */}
          <Box mb={3}>
          <Typography variant="h4" component="h1" gutterBottom sx={{color:"#333333", fontWeight:"bold"}}>
            URL TO QR code
          </Typography>
          </Box>         
          {/* Input field for text to encode */}
          <Box mb={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Enter URL"
              onChange={(e) => setTemp(e.target.value)}
            />
          </Box>
          {/* Slider for QR code size */}
          <Box mb={3}>
            <Typography gutterBottom>Sizes:</Typography>
            <Slider
              value={size}
              onChange={(e, newValue) => setSize(newValue)}
              aria-labelledby="continuous-slider"
              min={200}
              max={600}
            />
          </Box>
          {/* Generate button */}
          <Box mt={2} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleClick}>
              Generate
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} display="flex" flexDirection="column" alignItems="center">
          {/* QR code image and download button */}
          {qrCode && (
            <>
              <img src={qrCode} alt="QR Code" style={{ marginBottom: '20px', maxWidth: '100%' }} />
              <Box mt={2}>
                <Link href={qrCode} download="QRCode" underline="none">
                  <Button variant="contained" color="primary">
                    Download now
                  </Button>
                </Link>
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
