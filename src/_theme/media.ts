export const BREAKPOINT = {
  pc: 1400,
  tablet: 1024,
  mobile: 768,
};

const media = {
  pc: `@media (min-width: ${BREAKPOINT.pc}px)`,
  tablet: `@media (min-width: ${BREAKPOINT.mobile}px) and (max-width: ${BREAKPOINT.pc}px)`,
  mobile: `@media (min-width: ${BREAKPOINT.mobile}px)`,
  notebook: `@media (min-width: ${BREAKPOINT.tablet}px)`,
};

export default media;
