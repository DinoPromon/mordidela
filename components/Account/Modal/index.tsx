import React from "react";
import Wrapper from "./styled";
import FormButton from "@components/shared/FormButton"
import { Input } from "@components/shared";

type Props = {
  onClose: () => void;
}

const Modal: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <div>
        <span onClick={props.onClose}>&times;</span>
        <form>
          <label>Nome</label>
          <input type="text" value='Aristóteles da Silva'/>
          <label>Data de nascimento</label>
          <input type="text" />
          <label>Telefone</label>
          <input type="text" />
          <label>Email</label>
          <input type="text" />
          <label>Senha</label>
          <input type="text" />
          <FormButton>Salvar</FormButton>
        </form>
      </div>
    </Wrapper>
  );
};

export default Modal;
