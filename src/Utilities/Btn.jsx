import styled from 'styled-components';

const Button = ({name, onClick}) => {
  return (
    <StyledWrapper>
      <button onClick={onClick}>
        {name}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    width: fit-content;
    position: relative;
    height: 2.5em;
    border: 3px ridge #149CEA;
    outline: none;
    background-color: #3d405b;
    color: #00D3F2;
    transition: 0.5s;
    border-radius: 0.3em;
    font-size: 25px;
    font-weight: bold;
    cursor: pointer;
    padding: 0 1.5em;
  }

  button::after {
    content: "";
    position: absolute;
    top: -6px;
    left: 13%;
    width: 75%;
    height: 20%;
    background-color: #00D3F2;
    transition: 0.5s;
    transform-origin: center;
    border-radius: 0.3em;
  }

  button::before {
    content: "";
    transform-origin: center;
    position: absolute;
    top: 88%;
    left: 13%;
    width: 75%;
    height: 20%;
    background-color: #00D3F2;
    transition: 0.5s;
    border-radius: 0.3em;
  }

  button:hover::before, button:hover::after {
    transform: scale(0);
    transition: 0.5s;
  }
  

  button:hover {
    background-color: #8338ec;
    color: #fff;
    scale: 0.8;
    border-radius: 4em;
  }`;

export default Button;
