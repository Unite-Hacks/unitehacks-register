import { useThemeUI, jsx, ThemeProvider as ThemeProvider$1 } from '@theme-ui/core';
import { css } from '@theme-ui/css';
import { ColorModeProvider } from '@theme-ui/color-modes';
import { MDXProvider } from '@theme-ui/mdx';
import { Global } from '@emotion/react';

const RootStyles = () => jsx(Global, {
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
    return css({
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
  const outer = useThemeUI();

  if (typeof outer.setColorMode === 'function') {
    return jsx(ThemeProvider$1, {
      theme
    }, jsx(MDXProvider, {
      components,
      children
    }));
  }

  return jsx(ThemeProvider$1, {
    theme
  }, jsx(ColorModeProvider, null, jsx(RootStyles), jsx(MDXProvider, {
    components,
    children
  })));
};

export { ThemeProvider };
