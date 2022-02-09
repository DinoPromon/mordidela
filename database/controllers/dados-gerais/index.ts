import ITelefone from "@models/telefone";
import IUsuario from "@models/usuario";
import { PhoneRepo } from "@repository/phone";
import { UserRepo } from "@repository/user";

type GeneralDataPhone = {
  ddd: string;
  numero: string;
};

type GeneralDataUser = {
  nome: string;
  data_nascimento: Date;
};

type GeneralDataArg = {
  user: GeneralDataUser;
  telefone: GeneralDataPhone;
};

export async function updateGeneralData(
  userId: IUsuario["id_usuario"],
  newGeneralData: GeneralDataArg
) {
  const updatedPhone = await PhoneRepo.updateByUserId(userId, newGeneralData.telefone);
  const updatedUser = await UserRepo.updateByUserId(userId, newGeneralData.user);

  return {
    user: updatedUser,
    telefone: updatedPhone,
  };
}
