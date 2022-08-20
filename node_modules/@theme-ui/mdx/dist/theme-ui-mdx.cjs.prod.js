'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@theme-ui/core');
var css = require('@theme-ui/css');
var react = require('react');
var styled = require('@emotion/styled');
var react$1 = require('@mdx-js/react');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var styled__default = /*#__PURE__*/_interopDefault(styled);

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
  return css.css({ ...css.get(theme, `styles.${key}`),
    ...extraStyles
  })(theme);
}; // opt out of typechecking whenever `as` prop is used

const Themed = styled__default['default']('div')(themed('div'));
/**
 * @deprecated since 0.6.0.
 *
 * `Styled` was renamed to `Themed` to avoid confusion with styled components.
 */

const Styled = styled__default['default']('div')(themed('div'));

const warnStyled = tag => props => {
  react.useEffect(() => {
  }, []);
  return /*#__PURE__*/react.createElement(alias(tag), props);
};

const components = {};
tags.forEach(tag => {
  // fixme?
  components[tag] = styled__default['default'](alias(tag))(themed(tag));
  Themed[tag] = components[tag];
  Styled[tag] = styled__default['default'](warnStyled(tag))(themed(tag));
});

const createComponents = comps => {
  const next = { ...components
  };
  const componentKeys = Object.keys(comps);
  componentKeys.forEach(key => {
    next[key] = styled__default['default'](comps[key])(themed(key));
  });
  return next;
};

const MDXProvider = ({
  components,
  children
}) => {
  const outer = react$1.useMDXComponents();
  return core.jsx(react$1.MDXProvider, {
    components: createComponents({ ...outer,
      ...components
    }),
    children
  });
};

exports.MDXProvider = MDXProvider;
exports.Styled = Styled;
exports.Themed = Themed;
exports.components = components;
exports.themed = themed;
