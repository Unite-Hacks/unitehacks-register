'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var core = require('@theme-ui/core');
var css = require('@theme-ui/css');
var react = require('@emotion/react');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const toVarName = key => `--theme-ui-${key.replace('-__default', '')}`;

const toVarValue = key => `var(${toVarName(key)})`;

const join = (...args) => args.filter(Boolean).join('-');
const reservedKeys = {
  useCustomProperties: true,
  initialColorModeName: true,
  printColorModeName: true,
  initialColorMode: true,
  useLocalStorage: true
};


const toCustomProperties = (obj, parent, themeKey) => {
  const next = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    const value = obj[key];
    const name = join(parent, key);

    if (value && typeof value === 'object') {
      next[key] = toCustomProperties(value, name);
      continue;
    }

    if (reservedKeys[key]) {
      next[key] = value;
      continue;
    }
    next[key] = toVarValue(name);
  }

  return next;
};
const objectToVars = (parent, obj) => {
  let vars = {};

  for (let key in obj) {
    if (key === 'modes') continue;
    const name = join(parent, key);
    const value = obj[key];

    if (value && typeof value === 'object') {
      vars = { ...vars,
        ...objectToVars(name, value)
      };
    } else {
      vars[toVarName(name)] = value;
    }
  }

  return vars;
}; // create root styles for color modes

const createColorStyles = (theme = {}) => {
  const {
    useCustomProperties,
    initialColorModeName,
    printColorModeName,
    useRootStyles
  } = theme.config || theme || {};
  const colors = theme.rawColors || theme.colors;
  if (!colors || useRootStyles === false) return {};

  if (useCustomProperties === false) {
    return css.css({
      html: {
        color: 'text',
        bg: 'background'
      }
    })(theme);
  }

  const modes = colors.modes || {};
  const styles = objectToVars('colors', colors);
  Object.keys(modes).forEach(mode => {
    const key = `&.theme-ui-${mode}`;
    styles[key] = objectToVars('colors', modes[mode]);
  });

  if (printColorModeName) {
    const mode = printColorModeName === 'initial' || printColorModeName === initialColorModeName ? colors : modes[printColorModeName];
    styles['@media print'] = objectToVars('colors', mode);
  }

  const colorToVarValue = color => toVarValue(`colors-${color}`);

  return css.css({
    html: { ...styles,
      color: colorToVarValue('text'),
      bg: colorToVarValue('background')
    }
  })(theme);
};

const STORAGE_KEY = 'theme-ui-color-mode';
const storage = {
  get: () => {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      console.warn('localStorage is disabled and color mode might not work as expected.', 'Please check your Site Settings.', e);
    }
  },
  set: value => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      console.warn('localStorage is disabled and color mode might not work as expected.', 'Please check your Site Settings.', e);
    }
  }
};

const getPreferredColorScheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  }

  return null;
};

const getModeFromClass = () => {
  let mode;

  if (typeof document !== 'undefined') {
    document.documentElement.classList.forEach(className => {
      if (className.startsWith('theme-ui-')) {
        mode = className.replace('theme-ui-', '');
      }
    });
  }

  return mode;
};

const useColorModeState = (theme = {}) => {
  const {
    initialColorModeName,
    useColorSchemeMediaQuery,
    useLocalStorage
  } = theme.config || theme;
  let [mode, setMode] = React.useState(() => {
    const modeFromClass = getModeFromClass();

    if (modeFromClass) {
      return modeFromClass;
    }

    const preferredMode = useColorSchemeMediaQuery !== false && getPreferredColorScheme();
    return preferredMode || initialColorModeName;
  }); // on first render, we read the color mode from localStorage and
  // clear the class on document element body

  React.useEffect(() => {
    const stored = useLocalStorage !== false && storage.get();

    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('theme-ui-' + stored);
      document.body.classList.remove('theme-ui-' + stored);
    }

    if (stored && stored !== mode) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mode = stored;
      setMode(stored);
    }
  }, []); // when mode changes, we save it to localStorage

  React__default['default'].useEffect(() => {
    if (mode && useLocalStorage !== false) {
      storage.set(mode);
    }
  }, [mode, useLocalStorage]);

  if (process.env.NODE_ENV !== 'production') {
    var _theme$colors;

    if ((_theme$colors = theme.colors) != null && _theme$colors.modes && initialColorModeName && Object.keys(theme.colors.modes).indexOf(initialColorModeName) > -1) {
      console.warn('[theme-ui] The `initialColorModeName` value should be a unique name' + ' and cannot reference a key in `theme.colors.modes`.');
    }
  }

  return [mode, setMode];
};

function useColorMode() {
  const {
    colorMode,
    setColorMode
  } = core.useThemeUI();

  if (typeof setColorMode !== 'function') {
    throw new Error(`[useColorMode] requires the ColorModeProvider component`);
  } // We're allowing the user to specify a narrower type for its color mode name.


  return [colorMode, setColorMode];
}

const omitModes = colors => {
  const res = { ...colors
  };
  delete res.modes;
  return res;
};

function copyRawColors(colors, outerThemeRawColors) {
  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === 'string' && !value.startsWith('var(')) {
      outerThemeRawColors[key] = value;
    }

    if (typeof value === 'object') {
      outerThemeRawColors[key] = { ...outerThemeRawColors[key],
        ...copyRawColors(value, {})
      };
    }
  }

  return outerThemeRawColors;
}

const ColorModeProvider = ({
  children
}) => {
  const outer = core.useThemeUI();
  const outerTheme = outer.theme;
  const [colorMode, setColorMode] = useColorModeState(outerTheme);
  const theme = React.useMemo(() => {
    const res = { ...outerTheme
    };
    const modes = css.get(res, 'colors.modes', {});
    const currentColorMode = css.get(modes, colorMode, {});

    if (colorMode) {
      res.colors = { ...res.colors,
        ...currentColorMode
      };
    }

    const {
      useCustomProperties,
      initialColorModeName = '__default'
    } = outerTheme.config || outerTheme;
    let outerThemeRawColors = outerTheme.rawColors || outerTheme.colors || {};

    if (useCustomProperties !== false) {
      const alreadyHasRawColors = res.rawColors != null;
      const colors = res.colors || {};

      if (alreadyHasRawColors) {
        outerThemeRawColors = { ...outerThemeRawColors
        };
        copyRawColors(colors, outerThemeRawColors);

        if ('modes' in outerThemeRawColors) {
          var _res$rawColors;

          res.rawColors = { ...outerThemeRawColors,
            modes: { ...((_res$rawColors = res.rawColors) == null ? void 0 : _res$rawColors.modes),
              [initialColorModeName]: omitModes(outerThemeRawColors)
            }
          };
        } else {
          res.rawColors = outerThemeRawColors;
        }
      } else {
        if (!('modes' in outerThemeRawColors)) {
          res.rawColors = colors;
        } else {
          const modes = {
            [initialColorModeName]: omitModes(outerThemeRawColors),
            ...outerThemeRawColors.modes
          };
          res.rawColors = { ...colors,
            modes
          };
          /* modes doesn't match index signature by design */
        }
      }

      res.colors = toCustomProperties(omitModes(outerThemeRawColors), 'colors');
    }

    return res;
  }, [colorMode, outerTheme]);
  const context = { ...outer,
    theme,
    colorMode,
    setColorMode
  };
  const isTopLevelColorModeProvider = outer.setColorMode === undefined;
  return core.jsx(core.__ThemeUIInternalBaseThemeProvider, {
    context
  }, isTopLevelColorModeProvider ? core.jsx(react.Global, {
    styles: () => {
      return createColorStyles(theme);
    }
  }) : core.jsx('div', {
    className: 'theme-ui__nested-color-mode-provider',
    style: createColorStyles(theme)['html']
  }), children);
};
const noflash = `(function() { try {
  var mode = localStorage.getItem('theme-ui-color-mode');
  if (!mode) return
  document.documentElement.classList.add('theme-ui-' + mode);
  document.body.classList.add('theme-ui-' + mode);
} catch (e) {} })();`;
const InitializeColorMode = () => core.jsx('script', {
  key: 'theme-ui-no-flash',
  dangerouslySetInnerHTML: {
    __html: noflash
  }
});

exports.ColorModeProvider = ColorModeProvider;
exports.InitializeColorMode = InitializeColorMode;
exports.useColorMode = useColorMode;
