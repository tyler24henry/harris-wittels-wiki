import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --maroon: #42215e;
    --snow: #fbfbfb;
    --red: #FF4949;
    --black: #2E2E2E;
    --yellow: #ffc600;
    --white: #fff;
    --grey: #efefef;
  }
  html {
    font-size: 10px;
  }

  body {
    font-size: 1.5rem;
    line-height: 1.25;
    color: #9da8c7;
    background: #0a1930;
  }

  fieldset {
    border-color: rgba(0,0,0,0.1);
    border-width: 1px;
  }

  button, .button {
    background: var(--red);
    color: white;
    border: 0;
    padding: 0.6rem 1rem;
    border-radius: 2px;
    cursor: pointer;
    --cast: 2px;
    box-shadow: var(--cast) var(--cast) 0 var(--grey);
    text-shadow: 0.5px 0.5px 0 rgba(0,0,0,0.2);
    transition: all 0.2s;
    &:hover {
      --cast: 4px;
    }
  }
  .no-default-btn {
    background: none;
    color: #ccd6f5;
    border: 0;
    padding: 0;
    border-radius: 0;
    cursor: pointer;
    box-shadow: none;
    text-shadow: 0.5px 0.5px 0 rgba(0,0,0,0.2);
  }

  button:focus {outline:0;}
  input:focus {outline:0;}
  textarea:focus {outline:0;}
  select:focus {outline:0;}

  .gatsby-image-wrapper img[src*=base64\\,] {
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
  }

  /* Scrollbar Styles */
  body::-webkit-scrollbar {
    width: 12px;
  }
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--red) var(--white);
  }
  body::-webkit-scrollbar-track {
    background: #0a1930;
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--red) ;
    border-radius: 6px;
    border: 3px solid var(--white);
  }

  img {
    max-width: 100%;
  }

`;

export default GlobalStyles;