import { z } from "zod";

// 비밀번호 정규식: 영문 소문자, 대문자, 특수문자/숫자를 모두 포함한 8자리 이상
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

export const partnerCreateModalUserSchema = z
  .object({
    id: z.string().min(1, { message: "partner.idEmptyErrorMessage" }),
    password: z
      .string()
      .min(1, { message: "partner.passwordEmptyErrorMessage" })
      .regex(passwordRegex, {
        message: "partner.passwordInvalidTypeError",
      }),
    rePassword: z.string(),
    name: z.string().min(1, { message: "partner.nameEmptyErrorMessage" }),
    feeRate: z
      .number({
        message: "partner.feeRateEmptyErrorMessage",
      })
      .min(0, { message: "partner.feeRateMinErrorMessage" })
      .max(100, { message: "partner.feeRateMaxErrorMessage" }),
    txFeeRate: z
      .number({
        message: "partner.txFeeRateEmptyErrorMessage",
      })
      .min(0, { message: "partner.feeRateMinErrorMessage" })
      .max(100, { message: "partner.feeRateMaxErrorMessage" }),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "partner.passwordMismatchErrorMessage",
  });

export type PartnerCreateModalUserSchema = z.infer<
  typeof partnerCreateModalUserSchema
>;

export const partnerInfoUpdateSchema = z
  .object({
    password: z
      .string()
      .min(4, { message: "partner.passwordMinLengthErrorMessage" })
      .max(30, { message: "partner.passwordMaxLengthErrorMessage" })
      .optional(),
    rePassword: z.string().optional(),
    name: z
      .string()
      .min(4, { message: "partner.nameMinLengthErrorMessage" })
      .max(24, { message: "partner.nameMaxLengthErrorMessage" })
      .optional(),
    callback: z.string().optional(),
    feeRate: z
      .number()
      .min(0, { message: "partner.feeRateMinErrorMessage" })
      .max(100, { message: "partner.feeRateMaxErrorMessage" })
      .optional(),
    txFeeRate: z
      .number()
      .min(0, { message: "partner.feeRateMinErrorMessage" })
      .max(100, { message: "partner.feeRateMaxErrorMessage" })
      .optional(),
    bitAddress: z.string().optional(),
    ethAddress: z.string().optional(),
    trxAddress: z.string().optional(),
  })
  .refine((data) => {
    if (data.password && data.rePassword) {
      return data.password === data.rePassword;
    }
    return true;
  }, {
    path: ["rePassword"],
    message: "partner.passwordMismatchErrorMessage",
  });

export type PartnerInfoUpdateSchema = z.infer<typeof partnerInfoUpdateSchema>;
