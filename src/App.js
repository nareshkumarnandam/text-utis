import React, {useReducer, useState} from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Card, CardContent, CardMedia, Switch, Typography, colors } from "@mui/material";
import './App.css';
import { dark } from '@mui/material/styles/createPalette';

const reducer = (prevState, action) => {
  switch(action.type){

    case 'change' :
      return {text : action.payload}

    case 'uppercase' :
      return {text : prevState.text.toUpperCase()}
     
    case 'lowercase' :
        return {text : prevState.text.toLowerCase()}
    
    case 'clear' :
      return {text : ""};
    case 'removeextraspaces' :
      return { text : prevState.replace(/\s+/g, " ").trim()}

    default:
      return prevState

  }
}

const App = () => {
  const [toggleDarkMode, setToggleDarkMode] = useState(false);

  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: toggleDarkMode ? "dark" : "light",
      
    },
  });

  const textColor = createTheme({
    text: {
      primary: "#000000",
      secondary: "#FFFFFF",
    },
  })

  const initialState = {
    text : ""
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='App'>
      <div className='navbar'>
        <h1>TextUtis</h1>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch checked={toggleDarkMode} onChange={toggleDarkTheme} />
        </ThemeProvider>
      </div>
      <div className='section'>
        <textarea className='textarea' value={state.text} onChange={(e) => {dispatch({type: 'change' , payload: e.target.value})}} style={{
          color: theme.palette.mode === "light" ? textColor.text.primary :textColor.text.secondary,
        }} />
        <div className='buttonsDiv'>
          <button onClick={(e) => {dispatch({type: 'uppercase' })}}>Change to UpperCase</button>
          <button onClick={(e) => {dispatch({type: 'lowercase' })}}>Change to LowerCase</button>
          <button onClick={() => {dispatch({type: 'clear' })}}>Clear Text</button>
          <button onClick={() => {
            navigator.clipboard.writeText(state.text);
          }} >Copy Text</button>
          <button onClick={() => {dispatch({type: 'removeextraspaces' })}}>Remove extra spaces</button>
        </div>
        <div className='details'>
        <p>No. of words : {state.text.split(" ").length - 1}</p>
        <p>No. of Characters : {state.text.length}</p>
        <p>Reading time : </p>
        </div>
        <div className='preview'>
          <h1>Preview text</h1>
          <textarea className='textarea' value={state.text} style={{
            color: theme.palette.mode === "light" ? textColor.text.primary :textColor.text.secondary,
          }}  />
        </div>
      </div>
    </div>
  )
}

export default App