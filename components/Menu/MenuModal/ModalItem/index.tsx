import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { CartContext } from "@store/cart";
import { getProductImagePath } from "@utils/images";
import { formatProductId } from "@utils/formatters";
import { transformPriceToString } from "@utils/transformation";

import ItemImage from "./ItemImage";
import ItemFlavorsList from "./ItemFlavorsList";
import ItemAddsList from "./ItemAddsList";
import ItemCounter from "./ItemCounter";
import { ModalItemContainer, MenuItemActionsContainer, ItemPrice, useStyles } from "./styled";

import type ISabor from "@models/sabor";
import type IAdicional from "@models/adicional";
import type { CartProduct } from "@my-types/context";
import type { RelatedProduct } from "@models/produto";

type Props = {
  item: RelatedProduct;
  onCloseModal: () => void;
};

const ModalItem: React.FC<Props> = ({ item, onCloseModal }) => {
  const [productOrder, setProductOrder] = useState<CartProduct>({
    adds: [],
    flavors: [],
    total_price: item.preco_padrao,
    key: `${formatProductId(item.nome, item.id_produto, [], [])}`,
    name: item.nome,
    product_id: item.id_produto,
    quantity: 1,
    size: item.tamanho,
    standard_price: item.preco_padrao,
    orderNote: "",
  });
  const [price, setPrice] = useState(item.preco_padrao);
  const { addProductToCart } = useContext(CartContext);

  const canSubmit = item.sabores.length ? productOrder.flavors.length > 0 : true;

  const getProductKey = formatProductId.bind(null, item.nome, item.id_produto);

  const classes = useStyles();

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (canSubmit) {
      addProductToCart(productOrder);
      onCloseModal();
    }
  }

  function addFlavor(flavor: ISabor) {
    setProductOrder((prevState) => {
      const flavors = [...prevState.flavors, flavor];
      return {
        ...prevState,
        key: getProductKey(prevState.adds, flavors),
        flavors,
      };
    });
  }

  function removeFlavor(flavor: ISabor) {
    setProductOrder((prevState) => {
      const flavors = prevState.flavors.filter((item) => item.id_sabor !== flavor.id_sabor);
      return {
        ...prevState,
        key: getProductKey(prevState.adds, flavors),
        flavors,
      };
    });
  }

  function addAditional(add: IAdicional) {
    setProductOrder((prevState) => {
      const adds = [...prevState.adds, add];
      return {
        ...prevState,
        total_price: prevState.total_price + add.preco,
        key: getProductKey(adds, prevState.flavors),
        adds,
      };
    });
  }

  function removeAditional(add: IAdicional) {
    setProductOrder((prevState) => {
      const adds = prevState.adds.filter((item) => item.id_adicional !== add.id_adicional);
      return {
        ...prevState,
        total_price: prevState.total_price - add.preco,
        key: getProductKey(adds, prevState.flavors),
        adds,
      };
    });
  }

  function noteBlurHandler(event: React.FocusEvent<HTMLTextAreaElement>) {
    const { value } = event.target;
    setProductOrder((prevState) => ({
      ...prevState,
      orderNote: value,
    }));
  }

  function changeQuantity(quantity: number) {
    setProductOrder((prevState) => ({
      ...prevState,
      quantity: quantity,
    }));
  }

  return (
    <ModalItemContainer onSubmit={submitHandler}>
      {" "}
      {item.tamanho !== null ? (
        <h2>
          {item.nome} - {item.tamanho}
        </h2>
      ) : (
        <h2>{item.nome}</h2>
      )}
      <ItemImage src={getProductImagePath(item.nome_imagem)} alt={item.nome} />
      <p>{item.descricao}</p>
      {item.sabores.length > 0 && (
        <ItemFlavorsList
          items={item.sabores}
          maxFlavor={item.qtde_max_sabor}
          flavorsAmount={productOrder.flavors.length}
          onAddFlavor={addFlavor}
          onRemoveFlavor={removeFlavor}
        />
      )}
      {item.adicionais.length > 0 && (
        <ItemAddsList
          items={item.adicionais}
          setPrice={setPrice}
          onAddAditional={addAditional}
          onRemoveAditional={removeAditional}
        />
      )}
      <TextField
        className={classes.root}
        variant="outlined"
        name="observacao"
        placeholder="Alguma observação?"
        multiline
        onBlur={noteBlurHandler}
        fullWidth
        inputProps={{ style: { textAlign: "center" } }}
        label="Observação"
      ></TextField>
      <MenuItemActionsContainer>
        <ItemCounter quantity={productOrder.quantity} setQuantity={changeQuantity} />
        <ItemPrice>R$ {transformPriceToString(price * productOrder.quantity)}</ItemPrice>
        <Button type="submit" variant="contained" color="secondary" disabled={!canSubmit}>
          Adicionar
        </Button>
      </MenuItemActionsContainer>
    </ModalItemContainer>
  );
};

export default ModalItem;
