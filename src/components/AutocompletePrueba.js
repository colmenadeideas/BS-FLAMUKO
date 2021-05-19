import React, {useEffect, useState} from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios'

// Imagine you have a list of languages that you'd like to autosuggest.


// Teach Autosuggest how to calculate suggestions for any given input value.
// const getSuggestions = value => {
//   const inputValue = value.trim().toLowerCase();
//   const inputLength = inputValue.length;

//   return inputLength === 0 ? [] : languages.filter(lang =>
//     lang.name.toLowerCase().slice(0, inputLength) === inputValue
//   );
// };

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.term.toLowerCase();

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.term.toLowerCase()}
  </div>
);


const Example = ({setBusqueda}) => {

    const autosuggestRef = React.createRef();

    const [value, setValue]             = useState('')
    const [suggestions, setSuggestions] = useState([])
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    

    const onChange = (event, { newValue }) => {
        console.log(suggestions)
        setValue(newValue)
        setBusqueda(newValue)
    };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
    const onSuggestionsFetchRequested = (data) => {
        
        const inputReplace1 = data.value.replace(' ', '%20')
        const inputReplace2 = inputReplace1.replace(' ', '%20')
    
        const url = `http://lab.besign.com.ve/flamuko/html/api/autocomplete/all?term=${inputReplace2}`
        axios.get(url)
        .then(res=>{
            // console.log(res.data)
            const sugerencias = res.data.slice(0, 9)
            setSuggestions(sugerencias)

        })
        .catch(err=>{
            console.log(err)
        })
    };

  // Autosuggest will call this function every time you need to clear suggestions.
    const onSuggestionsClearRequested = () => {
        
        setSuggestions([])
    
    };

    const getSugerencias = (userInput) => {

        const inputReplace1 = userInput.replace(' ', '%20')
        const inputReplace2 = inputReplace1.replace(' ', '%20')
    
        const url = `http://lab.besign.com.ve/flamuko/html/api/autocomplete/all?term=${inputReplace2}`
        axios.get(url)
        .then(res=>{
            // console.log(res.data)
            const sugerencias = res.data
            return sugerencias
        })
        .catch(err=>{
            console.log(err)
        })
    }

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Buscar por producto o color',
      className:"form-control valid",
      value,
      onChange: onChange
    };

    const containerProps = {
        className:"container-suggestions",
    }

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        ref={autosuggestRef}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        containerProps={containerProps}
      />
    );
}

export default Example