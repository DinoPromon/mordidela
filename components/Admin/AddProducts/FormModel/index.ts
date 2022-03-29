import type { FormField } from "@my-types/form";
import type { ProductAvailable } from "../utility/constants";

export interface IProductsFormValues {
  name: string;
  defaultPrice: string;
  size: string;
  available: ProductAvailable;
  maxFlavors: string;
  description: string;
  image: File | undefined;
}

export type ProductsFormModel = {
  [key in keyof IProductsFormValues]: FormField<IProductsFormValues>;
};

export type SetProductValue = <T extends keyof IProductsFormValues>(
  key: T,
  value: IProductsFormValues[T]
) => void;

export function getProductsFormModel() {
  const productsFormModel: ProductsFormModel = {
    name: {
      label: "Nome*",
      name: "name",
      requiredErrorMessage: "Insira o nome do produto",
    },
    defaultPrice: {
      label: "Valor*",
      name: "defaultPrice",
      requiredErrorMessage: "Insira o valor do produto",
    },
    size: {
      label: "Tamanho",
      name: "size",
    },
    maxFlavors: {
      label: "Quantidade de sabores",
      name: "maxFlavors",
      requiredErrorMessage: "Escolha uma quantidade máxima de sabores",
    },
    available: {
      label: "Disponível?*",
      name: "available",
      requiredErrorMessage: "Informe a disponibilidade do produto",
    },
    description: {
      label: "Descrição",
      name: "description",
    },
    image: {
      label: "Imagem",
      name: "image",
    },
  };

  return productsFormModel;
}

export { getProductsFormInitialValues } from "./initialValues";
export { getProductsFormValidationSchema } from "./validationSchema";
