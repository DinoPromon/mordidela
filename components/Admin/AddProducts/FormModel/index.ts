import type { FormField } from "@my-types/form";

export interface IProductsFormValues {
  name: string;
  defaultPrice: number | null;
  size: string;
  available: string;
  description: string;
  image: string | null;
}

export type ProductsFormModel = {
  [key in keyof IProductsFormValues]: FormField<IProductsFormValues>;
};

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
