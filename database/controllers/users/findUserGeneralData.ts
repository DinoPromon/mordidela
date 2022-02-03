import Usuario, { UserGeneralData, UserWithoutPassword } from "@models/usuario";
import Telefone from "@models/telefone";
import { UserRepo } from "@repository/user";
import { OrderRepo } from "@repository/order";
import { PhoneRepo } from "@repository/phone";

function convertDateToTimestamp(date: Date | number) {
  if (date instanceof Date) {
    return date.getTime();
  }

  return new Date(date).getTime();
}

export async function findUserGeneralData(userId: Usuario["id_usuario"]) {
  const userWithoutPassword = (await UserRepo.findWithoutPasswordByUserId(
    userId
  )) as UserWithoutPassword;
  const phone = (await PhoneRepo.findByUserId(userId)) as Telefone;
  const ordersCount = await OrderRepo.countByUserId(userId);

  const userBirthDate = convertDateToTimestamp(userWithoutPassword.data_nascimento);
  const userCreatedDate = convertDateToTimestamp(userWithoutPassword.data_criacao);

  const userGeneralData: UserGeneralData = {
    ...userWithoutPassword,
    data_criacao: userCreatedDate,
    data_nascimento: userBirthDate,
    count_pedido: ordersCount,
    telefone: phone,
  };

  return userGeneralData;
}
