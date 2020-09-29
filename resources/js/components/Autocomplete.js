import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Radium, {Style} from 'radium';

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  static propTypes = {
    kind: PropTypes.oneOf(['input','suggestions','em','noSuggestions'])
  };
  
  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };

     this.state = {       
      toggleOnFocus: true
     };

     this.toggleOnFocus = this.toggleOnFocus.bind(this);

  }

  toggleOnFocus=()=>{
    this.setState((prevState) => ({
      toggleOnFocus: !prevState.toggleOnFocus
    }))
  }

  // Event fired when the input value is changed
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() { 
    
    const {
      onChange,
      onClick,
      onKeyDown,
      onFocus,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions" style={[styles.suggestions, styles[this.props.kind]]} >
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={onClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div style={[styles.noSuggestions, styles[this.props.kind]]} className="noSuggestions">
            <div data-test="col" className="col">
              <div className="md-form form-group form-lg md-bg">
                <em style={[styles.em, styles[this.props.kind]]} >No suggestions, you're on your own!</em>                                                 
              </div>                            
          </div>
            
          </div>
        );
      }
    }

    return (
      
      <Fragment>
        <section className="section-preview">
          <div className="select-wrapper mdb-select md-form">
            <input type="text" style={[styles.input, styles[this.props.kind]]}   onFocus={this.toggleOnFocus} onBlur={this.toggleOnFocus} onChange={onChange}  onKeyDown={onKeyDown} value={userInput} className="form-control mdb-autocomplete"/>             
          </div>
        </section>      
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

Autocomplete = Radium(Autocomplete);

// You can create your style objects dynamically or share them for
// every instance of the component.
// Adding interactive state couldn't be easier! Add a special key to your
// style object (:hover, :focus, :active, or @media) with the additional rules.
// styles 


const styles = {

  input: {
    
    boxSizing:"border-box",
    cursor:"text",
    display:"block",
    color:"rgb(73, 80, 87)",
    fontFamily:"Roboto, sans-serif",
    fontSize:"20px",
    fontStretch:"100%",
    fontStyle:"normal",
    fontVariantCaps:"normal",
    fontVariantEastAsian:"normal",
    fontVariantLigatures:"normal",
    fontVariantNumeric:"normal",
    fontWeight:"400",
    height:"53.9844px",
    letterSpacing:"normal",
    lineHeight:"30px",
    marginBottom:"4px",
    marginLeft:"48px",
    marginRight:"0px",
    marginTop:"0px",
    outlineColor:"rgb(73, 80, 87)",
    outlineStyle:"none",
    outlineWidth:"0px",
    overflowX:"visible",    
  },  
   ':focus': {
    boxSizing:"border-box",
    color:"rgb(117, 117, 117)",
    cursor:"text",
    display:"block",
    fontFamily:"Roboto, sans-serif",
    fontSize:"16px",
    fontWeight:"300",
    height:"24px",
    left:"0px",
    lineHeight:"24px",
    marginBottom:"8px",
    marginLeft:"48px",
    maxWidth:"100%",
    overflowX:"hidden",
    overflowY:"hidden",
    paddingLeft:"11.2px",
    position:"absolute",
    textAlign:"left",
    textOverflow:"ellipsis",
    textSizeAdjust:"100%",
    top:"0px",
    transform:"matrix(1, 0, 0, 1, 0, 16)",
    transformOrigin:"0px 24px",
    transitionDelay:"0s, 0s",
    transitionDuration:"0.2s, 0.2s",
    transitionProperty:"transform, color",
    transitionTimingFunction:"ease-out, ease-out",
    whiteSpace:"nowrap",
    width:"52.2344px",
    WebkitTapHighlightColor:"rgba(0, 0, 0, 0)",
    appearance:"none",
    backgroundAttachment:"scroll, scroll",
    backgroundClip:"border-box, border-box",
    backgroundColor:"rgb(245, 245, 245)",
    backgroundImage:"linear-gradient(rgb(66, 133, 244), rgb(66, 133, 244)), linear-gradient(rgb(206, 212, 218), rgb(206, 212, 218)),linear-gradient(to bottom, #4285f4, #4285f4),linear-gradient(to bottom, #ced4da, #ced4da)",
    backgroundOrigin:"padding-box, padding-box",
    backgroundPositionX:"50%, 50%",
    backgroundPositionY:"100%, 100%",
    backgroundRepeatX:"",
    backgroundRepeatY:"",
    backgroundSize:"0px 2px, 100% 1px",
    borderBottomColor:"rgb(73, 80, 87)",
    borderBottomLeftRadius:"0px",
    borderBottomRightRadius:"0px",
    borderBottomStyle:"none",
    borderBottomWidth:"0px",
    borderImageOutset:0,
    borderImageRepeat:"stretch",
    borderImageSlice:"100%",
    borderImageSource:"none",
    borderImageWidth:1,
    borderLeftColor:"rgb(73, 80, 87)",
    borderLeftStyle:"none",
    borderLeftWidth:"0px",
    borderRightColor:"rgb(73, 80, 87)",
    borderRightStyle:"none",
    borderRightWidth:"0px",
    borderTopColor:"rgb(73, 80, 87)",
    borderTopLeftRadius:"4.8px",
    borderTopRightRadius:"4.8px",
    borderTopStyle:"none",
    borderTopWidth:"0px",
    boxShadow:"none",
    boxSizing:"border-box",
    color:"rgb(73, 80, 87)",
    cursor:"text",
    display:"block",
    fontFamily:"Roboto, sans-serif",
    fontSize:"20px",
    fontStretch:"100%",
    fontStyle:"normal",
    fontVariantCaps:"normal",
    fontVariantEastAsian:"normal",
    fontVariantLigatures:"normal",
    fontVariantNumeric:"normal",
    fontWeight:"400",
    height:"53.9844px",
    letterSpacing:"normal",
    lineHeight:"30px",
    marginBottom:"8px",
    marginLeft:"48px",
    marginRight:"0px",
    marginTop:"0px",
    outlineColor:"rgb(73, 80, 87)",
    outlineStyle:"none",
    outlineWidth:"0px",
    overflowX:"visible",
    overflowY:"visible",
    paddingBottom:"6.4px",
    paddingLeft:"11.2px",
    paddingRight:"11.2px",
    paddingTop:"17.6px",
    textAlign:"start",
    textIndent:"0px",
    textRendering:"auto",
    textShadow:"none",
    textSizeAdjust:"100%",
    textTransform:"none",
    transitionDelay:"0s",
    transitionDuration:"0.3s",
    transitionProperty:"background-size",
    transitionTimingFunction:"cubic-bezier(0.64, 0.09, 0.08, 1)",
    width:"93.3281px",
    wordSpacing:"0px",
    writingMode:"horizontal-tb",
    WebkitRtlOrdering:"logical",
    WebkitTapHighlightColor:"rgba(0, 0, 0, 0)",
    WebkitBorderImage:"none"

  },
  suggestions:{    
      position: "absolute",
      right: 0,
      left: 0,
      zIndex: 100,
      paddingLeft: 0,
      overflowY: "auto",
      listStyleType: "none",
      background: "#fff",
      WebkitBoxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)",
      boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)",
      maxHeight: "225px",
      marginBottom:"8px",
      marginLeft:"48px",
      marginRight:"48px",
      marginTop:"0px",
      overflowY: "auto",
      lineHeight:"24px",
      marginBottom:"8px",
      maxWidth:"100%",
      paddingLeft:"11.2px",
      width: "calc(300px + 1rem)"    
  },
  noSuggestions:{
    position: "absolute",
      right: 0,
      left: 0,
      zIndex: 100,
      paddingLeft: 0,
      overflowY: "auto",
      listStyleType: "none",
      background: "#fff",
      WebkitBoxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)",
      boxShadow: "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)",
      maxHeight: "225px",
      marginBottom:"8px",
      marginLeft:"48px",
      marginRight:"48px",
      marginTop:"0px",
      overflowY: "auto",
      lineHeight:"24px",
      marginBottom:"8px",
      maxWidth:"100%",
      paddingLeft:"11.2px",
      width: "calc(300px + 1rem)",
  }
};    

export default Autocomplete;