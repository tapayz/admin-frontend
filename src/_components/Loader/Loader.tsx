'use client';

import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import { loaderCss } from './Loader.styles';
import theme from '@/_theme';
const Loader = () => {
  return (
    <div css={loaderCss.loader}>
      <ColorRing
        visible={true}
        height="50"
        width="50"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={[
          theme.colors.mainDefault,
          theme.colors.mainDefault,
          theme.colors.mainDefault,
          theme.colors.mainDefault,
          theme.colors.mainDefault,
        ]}
      />
    </div>
  );
};

export default Loader;
