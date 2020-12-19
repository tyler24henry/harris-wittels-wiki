import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'sf_mono';
    src: url('static/SFMonoRegular.woff');
    font-weight: normal;
    font-style: normal;
  }
  :root {
    --maroon: #42215e;
    --snow: #fbfbfb;
    --red: #FF4949;
    --black: #020202;
    --yellow: #ffc600;
    --white: #fefefe;
    --grey: #efefef;
    --greenTint: rgba(100, 255, 218, 0.1);
    --blue: #0745ad;
    --whitesmoke: #f8f7f8;
  }
  html {
    font-size: 10px;
    font-family: 'sf_mono';
  }

  body {
    font-size: 1.5rem;
    line-height: 1.25;
    color: var(--black);
    background: var(--white);
    font-family: 'sf_mono';
  }

  fieldset {
    border-color: rgba(0,0,0,0.1);
    border-width: 1px;
  }

  button {
    background: var(--blue);
    color: white;
    border: 0;
    padding: 0.6rem 1rem;
    border-radius: 2px;
    cursor: pointer;
  }

  button:focus {outline:0;}
  input:focus {outline:0;}
  textarea:focus {outline:0;}
  select:focus {outline:0;}

  .gatsby-image-wrapper img[src*=base64\\,] {
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
  }

  img {
    max-width: 100%;
  }

`;

export default GlobalStyles;