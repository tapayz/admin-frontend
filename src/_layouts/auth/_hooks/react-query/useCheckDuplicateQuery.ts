import { useQuery, queryOptions } from "@tanstack/react-query";
import { checkDuplicate } from "../../_actions/checkDuplicate";
import { CheckDuplicateRequestDto } from "../../_dtos/checkDuplicateRequest.dto";
import { CheckDuplicateResponseDto } from "../../_dtos/checkDuplicateResponse.dto";

const CHECK_DUPLICATE = "checkDuplicate";

export const checkDuplicateOptions = (params: CheckDuplicateRequestDto, options?: { enabled?: boolean }) =>
  queryOptions<CheckDuplicateResponseDto>({
    queryKey: [CHECK_DUPLICATE, params.id],
    queryFn: () => checkDuplicate(params),
    enabled: options?.enabled ?? (!!params.id && params.id.length >= 5),
  });

export const useCheckDuplicateQuery = (
  params: CheckDuplicateRequestDto, 
  options?: { enabled?: boolean }
) => {
  return useQuery({
    ...checkDuplicateOptions(params, options),
  });
};