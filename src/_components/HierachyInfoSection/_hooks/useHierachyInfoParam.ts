import { useSearchParams } from 'next/navigation';
import { parseAsString, useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import { HierarchyInfo } from '../_dtos/GetHierarchyInfoResponse.dto';
import { SelectOption } from '@/_components/Select/types/select.types';

export const useHierachyInfoParam = (defaultValue: string) => {
  const params = useSearchParams();
  const defaultHierachyInfo = params.get('agent');
  const [hierachyInfo, setHierachyInfo] = useState('');
  const [currentHierachyInfo, setCurrentHierachyInfo] = useQueryState('agent', parseAsString.withDefault(''));

  useEffect(() => {
    if (!defaultHierachyInfo) {
      setCurrentHierachyInfo(defaultValue, { shallow: true });
    }
  }, []);

  useEffect(() => {
    if (currentHierachyInfo) {
      setHierachyInfo(currentHierachyInfo);
    }
  }, [currentHierachyInfo]);

  const handleChangeCurrentHierachyInfo = (agent: string) => {
    if (agent === currentHierachyInfo) return;

    if (agent === '') {
      setCurrentHierachyInfo(defaultValue, { shallow: true });
      return;
    }

    setCurrentHierachyInfo(agent, { shallow: true });
  };

  const handleInputChange = (value: string) => {
    setHierachyInfo(value);
    setCurrentHierachyInfo(value, { shallow: false });
  };

  return {
    currentHierachyInfo,
    handleChangeCurrentHierachyInfo,
    hierachyInfo,
    setHierachyInfo,
    handleInputChange,
  };
};
