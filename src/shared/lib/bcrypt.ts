import bcrypt from "bcryptjs";

export function defaultHash(senha: string) {
  return bcrypt.hashSync(senha, 8);
}

export function compare(senha: string, hashSenha: string) {
  return bcrypt.compareSync(senha, hashSenha);
}
