import React from 'react';
import { inputSectionCss, gridTypeCss } from './InputSection.styles';
import { Interpolation, Theme } from '@emotion/react';

type GridType = keyof typeof gridTypeCss;

interface Props {
  gridType?: GridType;
  children: React.ReactNode;
  heading?: string;
  cssStyle?: Interpolation<Theme>;
  headingText?: React.ReactNode;
}

const headingTag = (heading: string, node: React.ReactNode) => {
  switch (heading) {
    case 'h1':
      return (
        <h1 css={inputSectionCss.heading} className="heading">
          {node}
        </h1>
      );
    case 'h2':
      return (
        <h2 css={inputSectionCss.heading} className="heading">
          {node}
        </h2>
      );
    case 'h3':
      return (
        <h3 css={inputSectionCss.heading} className="heading">
          {node}
        </h3>
      );
    case 'h4':
      return (
        <h4 css={inputSectionCss.heading} className="heading">
          {node}
        </h4>
      );
    case 'h5':
      return (
        <h5 css={inputSectionCss.heading} className="heading">
          {node}
        </h5>
      );
    case 'h6':
      return (
        <h6 css={inputSectionCss.heading} className="heading">
          {node}
        </h6>
      );
    default:
      return (
        <div css={inputSectionCss.heading} className="heading">
          {node}
        </div>
      );
  }
};

const InputSection = ({ children, gridType = 'row', heading = '', headingText, cssStyle }: Props) => {
  return (
    <div css={[inputSectionCss.container, gridTypeCss[gridType], cssStyle]}>
      {headingTag(heading, headingText)}
      <div css={inputSectionCss.content} className="content">
        {children}
      </div>
    </div>
  );
};

export default InputSection;
