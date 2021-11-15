export const hasUserInDatabase = async (param: { [key: string]: any }) => {
  let params = [];
  for (let key in param) {
    params.push(`${key}=${param[key]}`);
  }
  const formatedParams = params.join("&");
  const response = await fetch(`/api/users/?${formatedParams}`);
  const result = await response.json();

  return result.exist;
};
