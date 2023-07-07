import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './pages/Home';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4b88f0'
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Home />
        </ThemeProvider>
    );
}

export default App;
