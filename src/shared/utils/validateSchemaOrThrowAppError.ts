import { AnyZodObject, z, ZodError } from "zod";
import { AppError } from "../errors/AppError";

export function validateSchemaOrThrowAppError(
  validator: AnyZodObject | z.ZodEffects<z.AnyZodObject>,
  data: unknown
) {
  try {
    validator.parse(data);
  } catch (err) {
    console.log(err);
    const error = `${(err as ZodError).issues[0].message}`;
    throw new AppError(error, 400);
  }
}
