import React from 'react';
import {ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import {MainComponent} from "./components/MainComponent";


function App() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
                <MainComponent/>
            </div>
        </ThemeProvider>

    );
}

export default App;
