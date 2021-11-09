import React from "react";
import Wrapper from "./styled";

type Props = {
  onClose: () => void;
}

const Modal: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <div>
        <span onClick={props.onClose}>&times;</span>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione atque consequuntur ipsum necessitatibus quaerat itaque, fuga, error quos nam officiis id, quae blanditiis eveniet deserunt architecto cum corrupti! Beatae, iure?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, provident at. Magni deleniti alias consectetur similique, harum dolor, ex tempora pariatur adipisci tempore officiis recusandae. Aperiam sed praesentium vitae quod.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione excepturi sint repellendus quidem voluptates, possimus ipsam minima, consequatur vero facere officiis nesciunt molestias odio? Est obcaecati unde maxime asperiores ad?
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui, accusamus exercitationem velit, nemo inventore dolor et recusandae dolores optio necessitatibus quam, laboriosam quo amet reprehenderit laudantium explicabo? Sunt, porro molestias!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus laborum ducimus, fugit, aliquid provident sunt, nemo cumque incidunt error molestiae consequatur voluptate perspiciatis placeat debitis minima adipisci qui a accusamus.</p>
      </div>
    </Wrapper>
  );
};

export default Modal;
