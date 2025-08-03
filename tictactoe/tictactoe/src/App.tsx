import './App.css'
import Game from './Game/Game'
import SampleDataGrid from './components/SampleDataGrid'
import PaginationExamples from './components/PaginationExamples'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, Container, Typography, Box, Divider } from '@mui/material'

// Create a custom MUI theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          React Demo App
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            MUI DataGrid with Pagination
          </Typography>
          <SampleDataGrid />
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Pagination Examples
          </Typography>
          <PaginationExamples />
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Box>
          <Typography variant="h4" component="h2" gutterBottom>
            Tic Tac Toe Game
          </Typography>
          <Game />
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
