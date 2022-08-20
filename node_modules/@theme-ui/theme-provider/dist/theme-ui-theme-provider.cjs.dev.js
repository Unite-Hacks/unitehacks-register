'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@theme-ui/core');
var css = require('@theme-ui/css');
var colorModes = require('@theme-ui/color-modes');
var mdx = require('@theme-ui/mdx');
var react = require('@emotion/react');

const RootStyles = () => core.jsx(react.Global, {
  styles: emotionTheme => {
    var _theme$config;

    const theme = emotionTheme;
    const {
      useRootStyles
    } = theme.config || theme;

    if (useRootStyles === false || theme.styles && !theme.styles.root) {
      return null;
    }

    const boxSizing = ((_theme$config = theme.config) == null ? void 0 : _theme$config.useBorderBox) === false ? undefined : 'border-box';
    return css.css({
      '*': {
        boxSizing
      },
      html: {
        variant: 'styles.root'
      },
      body: {
        margin: 0
      }
    })(theme);
  }
});

const ThemeProvider = ({
  theme,
  components,
  children
}) => {
  const outer = core.useThemeUI();

  if (typeof outer.setColorMode === 'function') {
    return core.jsx(core.ThemeProvider, {
      theme
    }, core.jsx(mdx.MDXProvider, {
      components,
      children
    }));
  }

  return core.jsx(core.ThemeProvider, {
    theme
  }, core.jsx(colorModes.ColorModeProvider, null, core.jsx(RootStyles), core.jsx(mdx.MDXProvider, {
    components,
    children
  })));
};

exports.ThemeProvider = ThemeProvider;
