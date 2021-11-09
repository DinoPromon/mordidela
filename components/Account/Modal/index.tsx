import React from "react";
import Wrapper from "./styled";


const Modal: React.FC = () => {
    return (
      <Wrapper>
        <h2>Modal Example</h2>
        <button id="myBtn">Open Modal</button>

        <div id="myModal">
            <div>
                <span id="close">&times;</span>
                <p>Some text in the Modal..</p>
            </div>
        </div>
      </Wrapper>
    );
  };
  
export default Modal;