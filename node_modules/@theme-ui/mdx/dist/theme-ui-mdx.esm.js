import { jsx } from '@theme-ui/core';
import { css, get } from '@theme-ui/css';
import { useEffect, createElement } from 'react';
import styled from '@emotion/styled';
import { useMDXComponents, MDXProvider as MDXProvider$1 } from '@mdx-js/react';

// mdx components
const tags = ['p', 'b', 'i', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'pre', 'code', 'ol', 'ul', 'li', 'blockquote', 'hr', 'em', 'table', 'tr', 'th', 'td', 'em', 'strong', 'del', // mdx
'inlineCode', 'thematicBreak', // other
'div', // theme-ui
'root'];
const aliases = {
  inlineCode: 'code',
  thematicBreak: 'hr',
  root: 'div'
};

const isAlias = x => x in aliases;

const alias = n => isAlias(n) ? aliases[n] : n;

const propOverrides = {
  th: {
    align: 'textAlign'
  },
  td: {
    align: 'textAlign'
  }
};
const themed = key => ({
  theme,
  ...rest
}) => {
  const propsStyle = propOverrides[key];
  const extraStyles = propsStyle ? Object.keys(rest).filter(prop => propsStyle[prop] !== undefined).reduce((acc, prop) => ({ ...acc,
    [propsStyle[prop]]: rest[prop]
  }), {}) : undefined;
  return css({ ...get(theme, `styles.${key}`),
    ...extraStyles
  })(theme);
}; // opt out of typechecking whenever `as` prop is used

const Themed = styled('div')(themed('div'));
/**
 * @deprecated since 0.6.0.
 *
 * `Styled` was renamed to `Themed` to avoid confusion with styled components.
 */

const Styled = styled('div')(themed('div'));

const warnStyled = tag => props => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[theme-ui] The Styled component from "@theme-ui/mdx" is deprecated and will be removed in a future version. It has been renamed to Themed with the same API.');
    }
  }, []);
  return /*#__PURE__*/createElement(alias(tag), props);
};

const components = {};
tags.forEach(tag => {
  // fixme?
  components[tag] = styled(alias(tag))(themed(tag));
  Themed[tag] = components[tag];
  Styled[tag] = styled(warnStyled(tag))(themed(tag));
});

const createComponents = comps => {
  const next = { ...components
  };
  const componentKeys = Object.keys(comps);
  componentKeys.forEach(key => {
    next[key] = styled(comps[key])(themed(key));
  });
  return next;
};

const MDXProvider = ({
  components,
  children
}) => {
  const outer = useMDXComponents();
  return jsx(MDXProvider$1, {
    components: createComponents({ ...outer,
      ...components
    }),
    children
  });
};

export { MDXProvider, Styled, Themed, components, themed };
