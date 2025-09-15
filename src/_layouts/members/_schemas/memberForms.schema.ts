import { z } from "zod";
import { ContactType } from '../_dtos/customerResponse.dto';

export const memberNameEditSchema = z.object({
  targetId: z.number(),
  name: z.string()
    .min(1, { message: "member.nameEmptyErrorMessage" })
    .max(50, { message: "member.nameMaxLengthErrorMessage" }),
});

export type MemberNameEditSchema = z.infer<typeof memberNameEditSchema>;

export const memberMemoSchema = z.object({
  targetId: z.number(),
  memo: z.string()
    .min(1, { message: "member.memoEmptyErrorMessage" })
    .max(500, { message: "member.memoMaxLengthErrorMessage" }),
});

export type MemberMemoSchema = z.infer<typeof memberMemoSchema>;

export const memberMemoEditSchema = z.object({
  targetId: z.number(),
  memoId: z.number(),
  memo: z.string()
    .min(1, { message: "member.memoEmptyErrorMessage" })
    .max(500, { message: "member.memoMaxLengthErrorMessage" }),
});

export type MemberMemoEditSchema = z.infer<typeof memberMemoEditSchema>;

export const memberMemoDeleteSchema = z.object({
  targetId: z.number(),
  memoId: z.number(),
});

export type MemberMemoDeleteSchema = z.infer<typeof memberMemoDeleteSchema>;

export const contactTypeEnum = z.nativeEnum(ContactType);

export const memberContactSchema = z.object({
  targetId: z.number(),
  type: contactTypeEnum,
  value: z.string()
    .min(1, { message: "member.contactValueEmptyErrorMessage" }),
  desc: z.string()
    .min(1, { message: "member.contactDescEmptyErrorMessage" })
    .max(500, { message: "member.contactDescMaxLengthErrorMessage" }),
}).refine((data) => {
  if (data.type === ContactType.EMAIL) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(data.value);
  }
  if (data.type === ContactType.PHONE) {
    const phoneRegex = /^[0-9-+\s()]+$/;
    return phoneRegex.test(data.value);
  }
  return true;
}, { 
  message: "member.contactValueInvalidErrorMessage",
  path: ["value"]
});

export type MemberContactSchema = z.infer<typeof memberContactSchema>;

export const memberContactEditSchema = z.object({
  targetId: z.number(),
  contactId: z.number(),
  value: z.string()
    .min(1, { message: "member.contactValueEmptyErrorMessage" }),
  desc: z.string()
    .min(1, { message: "member.contactDescEmptyErrorMessage" })
    .max(500, { message: "member.contactDescMaxLengthErrorMessage" }),
});

export type MemberContactEditSchema = z.infer<typeof memberContactEditSchema>;

export const memberContactDeleteSchema = z.object({
  targetId: z.number(),
  contactId: z.number(),
});

export type MemberContactDeleteSchema = z.infer<typeof memberContactDeleteSchema>;

export const memberIconUploadSchema = z.object({
  targetId: z.number(),
  file: z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "member.iconFileSizeErrorMessage"
    })
    .refine((file) => ['image/jpeg', 'image/png', 'image/gif'].includes(file.type), {
      message: "member.iconFileTypeErrorMessage"
    }),
});

export type MemberIconUploadSchema = z.infer<typeof memberIconUploadSchema>;