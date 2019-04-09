import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from "styled-components";
import marked from 'marked';

const initialState = 
`
# Un Markdown Viewer avec React!

## Un sous titre avec deux dièse 
### Et aussi quelques autres trucs sympas:

Un peu de code inline, \`<div></div>\`, entre deux quotes.
\`\`\`\n
// pour du code multiligne on utilise 3 quotes ouvrants et 3 fermants
  
function simpleFonction(argument1, argument2){
    return foo === 'bar' ? 'foo' : 'bar';
}
\`\`\`
  
  
On peut aussi mettre du texte en **gras** avec 2 étoiles qui encadrent le mot.
Ou encore en _italique_ en encadrant le mot avec des underscores.
Avec deux ~ on peut ~~barré~~ mais on peut aussi combiner le ~~**_tout_**~~!
  
Avec **markdown** on peut aussi faire des tableaux:
  
Les | Tableaux Sont | Cools
------------ | ------------ | ------------
Et très | simples | à utiliser...
et aussi | facile | à comprendre

- Et bien sur comme avec _html_ on a des listes
  - De différents types
    - Et que l'on peut indenter
      - Dans ce style
      
1. Et plus simplement des listes ordonnées.
1. En utilisant le chiffre un et un point. 
1. Ou même avec un tiret. 
1. Enfin on peut inclure des images
1. J'oubliais les liens [links](https://github.com/Logik-Dev), et les 
> Block Quotes !


![React Logo w/ Text](https://goo.gl/Umyytc)`

  ;
const theme = {
  black: "#1D1E22",
  lightBlack: "#1E1F26",
  grey: "#444857",
  darkGrey: "#333641"

}
const Page = styled.div`
  min-height: 100vh;
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${props => props.twoColumns ? "3fr 4fr" : "1fr"};

`
const Container = styled.div`
  background-color: ${props => props.theme.grey};
  border-radius: 3px;
  width: ${props => props.twoColumns ? "40px" : "220px"};
  text-align: center;
  padding: .7rem;
  font-size: 1rem;
  :hover{
    background-color: grey;
    color: #222;
    transition: background-color .3s, color .3s;

  }
`
const Editor = styled.div`
  width: 100%;
  background-color: ${props => props.theme.lightBlack};
  height: ${props => props.twoColumns ? "100%" : "40vh"};
  #editor{
    border-right: ${props => props.twoColumns ? `1px solid ${props.theme.darkGrey}`: "none"};
    background-color: ${props => props.theme.black};
    border: none;
    width: 100%;
    height: 100%;
    padding: 1rem;
    color: #fff;
    outline: none;
    font-size: 1.4rem;
    resize: none;
  }
`
const TitleBar = styled.h2`
  background-color: ${props => props.theme.lightBlack};
  border-left: ${props => props.twoColumns ? `1px solid ${props.theme.darkGrey}` : "none"};
  border-bottom: 1px solid ${props => props.theme.darkGrey};
  padding: 1rem;
  width: 100%;
  height: 80px;
  color: #fff;
  box-shadow: 0px 5px 5px rgba(0,0,0,.5);
  display: flex;
  justify-content: ${props => props.twoColumns ? "center" : "space-between"};
  align-items: center;
  font-weight: 400;
  .fa-edit , .fa-eye {
    margin-right: 8px;
    /* font-size: 1.4rem; */
  }
  .title{
    font-family: cursive;
    font-size: 1.5rem;
    font-weight: 400;
    margin-left: 2.5rem;
  }
`
const Preview = styled.div`
  border-top: 1px solid ${props => props.theme.darkGrey}; 
  resize: ${props => props.twoColumns ? "horizontal" : "vertical"};
  overflow: auto;
  width: 100%;
  display: flex;
    flex-direction: column;
    align-items: center;
  .content{

  }
`
export default function App(props){
  const [currentInput, setCurrentInput] = useState(initialState);
  const [twoColumns, setTwoColumns] = useState(false);
  
  useEffect(()=> {
    window.innerWidth > 1024 ? setTwoColumns(true) : setTwoColumns(false);
  }, [window.innerWidth])
  function createMarkup(text){
    return {__html: marked(text, {breaks: true})}
  }
  useEffect(()=> {
    console.log(twoColumns);
  }, [twoColumns])
  return(
    <ThemeProvider theme={theme}>
      <Page>
        <Wrapper twoColumns={twoColumns}>
          <Editor twoColumns={twoColumns} onChange={(e) => setCurrentInput(e.target.value)}>
            <TitleBar>
              <p className="title">Editor</p>
              <Container twoColumns={twoColumns} onClick={() => setTwoColumns(!twoColumns)}>
                { twoColumns ? <i className="fas fa-eye"/> : "Change View"}
              </Container>
              </TitleBar>

            <textarea id="editor">{initialState}</textarea>
          </Editor>
          <Preview twoColumns={twoColumns} >
            <TitleBar twoColumns={twoColumns}>
              <p className="title">Preview</p>
            </TitleBar>

            <div 
            id="preview" 
            className="content" 
            dangerouslySetInnerHTML={createMarkup(currentInput)} >
            </div>

          </Preview>
        </Wrapper>
      </Page>
    </ThemeProvider>
  )
}