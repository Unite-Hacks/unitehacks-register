import styled from '@emotion/styled';
import { css, get } from '@theme-ui/css';
import { createShouldForwardProp } from '@styled-system/should-forward-prop';
import space from '@styled-system/space';
import color from '@styled-system/color';
import React from 'react';
import { keyframes } from '@emotion/react';

const boxSystemProps = [...space.propNames, ...color.propNames];
/**
 * @internal
 * @type {(prop: string) => boolean}
 */

const __isBoxStyledSystemProp = prop => boxSystemProps.includes(prop);
const shouldForwardProp = createShouldForwardProp(boxSystemProps);

const sx = props => css(props.sx)(props.theme);

const base = props => css(props.__css)(props.theme);

const variant = ({
  theme,
  variant,
  __themeKey = 'variants'
}) => css(get(theme, __themeKey + '.' + variant, get(theme, variant)));

const Box = styled('div', {
  shouldForwardProp
})({
  boxSizing: 'border-box',
  margin: 0,
  minWidth: 0
}, base, variant, space, color, sx, props => props.css);
Box.displayName = 'Box';

const Flex = styled(Box)({
  display: 'flex'
});
Flex.displayName = 'Flex';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

const px = n => typeof n === 'number' ? n + 'px' : n;

const widthToColumns = (width, repeat) => Array.isArray(width) ? width.map(w => widthToColumns(w, repeat)) : !!width && `repeat(auto-${repeat}, minmax(${px(width)}, 1fr))`;

const countToColumns = n => Array.isArray(n) ? n.map(countToColumns) : !!n && (typeof n === 'number' ? `repeat(${n}, 1fr)` : n);

const Grid = /*#__PURE__*/React.forwardRef(function Grid({
  width,
  columns,
  gap = 3,
  repeat = 'fit',
  ...props
}, ref) {
  const gridTemplateColumns = !!width ? widthToColumns(width, repeat) : countToColumns(columns);
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref
  }, props, {
    __themeKey: "grids",
    __css: {
      display: 'grid',
      gridGap: gap,
      gridTemplateColumns
    }
  }));
});

const Button = /*#__PURE__*/React.forwardRef(function Button(props, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    as: "button",
    variant: "primary"
  }, props, {
    __themeKey: "buttons",
    __css: {
      appearance: 'none',
      display: props.hidden ? undefined : 'inline-block',
      textAlign: 'center',
      lineHeight: 'inherit',
      textDecoration: 'none',
      fontSize: 'inherit',
      px: 3,
      py: 2,
      color: 'white',
      bg: 'primary',
      border: 0,
      borderRadius: 4
    }
  }));
});

const Link = /*#__PURE__*/React.forwardRef(function Link(props, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    as: "a",
    variant: "styles.a"
  }, props, {
    __themeKey: "links"
  }));
});

const Paragraph = /*#__PURE__*/React.forwardRef(function Paragraph(props, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    as: "p",
    variant: "paragraph",
    __themeKey: "text",
    __css: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    }
  }, props));
});

const Text = /*#__PURE__*/React.forwardRef(function Text(props, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    as: "span",
    ref: ref,
    variant: "default"
  }, props, {
    __themeKey: "text"
  }));
});

const Heading = /*#__PURE__*/React.forwardRef(function Heading(props, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    as: "h2",
    variant: "heading"
  }, props, {
    __themeKey: "text",
    __css: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading'
    }
  }));
});

const Image = /*#__PURE__*/React.forwardRef(function Image(props, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    as: "img"
  }, props, {
    __themeKey: "images",
    __css: {
      maxWidth: '100%',
      height: 'auto',
      ...props.__css
    }
  }));
});

const Card = /*#__PURE__*/React.forwardRef(function Card(props, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    variant: "primary"
  }, props, {
    __themeKey: "cards"
  }));
});

const Label = /*#__PURE__*/React.forwardRef(function Label(props, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    as: "label",
    variant: "label"
  }, props, {
    __themeKey: "forms",
    __css: {
      width: '100%',
      display: 'flex'
    }
  }));
});

/** @type {import('theme-ui').ThemeUIStyleObject} */

const autofillStyles = {
  boxShadow: 'inset 0 0 0 1000px var(--theme-ui-input-autofill-bg)',
  fontSize: 'inherit',
  ':first-line': {
    fontSize: '1rem'
  }
};
/** @type {import('theme-ui').ThemeUIStyleObject} */

const defaultInputStyles = {
  display: 'block',
  width: '100%',
  p: 2,
  appearance: 'none',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  border: '1px solid',
  borderRadius: 4,
  color: 'inherit',
  bg: 'transparent',
  ':autofill, :autofill:hover, :autofill:focus': autofillStyles,
  ':-webkit-autofill, :-webkit-autofill:hover, :-webkit-autofill:focus': autofillStyles
};
const Input = /*#__PURE__*/React.forwardRef(function Input({
  sx,
  autofillBackgroundColor = 'background',
  ...rest
}, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    as: "input",
    variant: "input",
    sx: {
      '--theme-ui-input-autofill-bg': theme => get(theme.colors, autofillBackgroundColor, null),
      ...sx
    }
  }, rest, {
    __themeKey: "forms",
    __css: defaultInputStyles
  }));
});

const SVG = ({
  size = 24,
  ...props
}) => /*#__PURE__*/React.createElement(Box, _extends({
  as: "svg",
  xmlns: "http://www.w3.org/2000/svg",
  width: size + '',
  height: size + '',
  viewBox: "0 0 24 24",
  fill: "currentcolor"
}, props));

SVG.displayName = 'SVG';

const getProps = test => props => {
  const next = {};

  for (const key in props) {
    if (test(key || '')) next[key] = props[key];
  }

  return next;
};
const MRE = /^m[trblxy]?$/;
const getMargin = getProps(k => MRE.test(k));
const omitMargin = getProps(k => !MRE.test(k));

const DownArrow = props => /*#__PURE__*/React.createElement(SVG, props, /*#__PURE__*/React.createElement("path", {
  d: "M7 10l5 5 5-5z"
}));

const Select = /*#__PURE__*/React.forwardRef(function Select({
  arrow,
  ...props
}, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({}, getMargin(props), {
    sx: {
      display: 'flex'
    }
  }), /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    as: "select",
    variant: "select"
  }, omitMargin(props), {
    __themeKey: "forms",
    __css: {
      display: 'block',
      width: '100%',
      p: 2,
      appearance: 'none',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      border: '1px solid',
      borderRadius: 4,
      color: 'inherit',
      backgroundColor: theme => get(theme, 'colors.background', null)
    }
  })), arrow || /*#__PURE__*/React.createElement(DownArrow, {
    sx: {
      ml: -28,
      alignSelf: 'center',
      pointerEvents: 'none'
    }
  }));
});

const Textarea = /*#__PURE__*/React.forwardRef(function Textarea(props, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    as: "textarea",
    variant: "textarea"
  }, props, {
    __themeKey: "forms",
    __css: {
      display: 'block',
      width: '100%',
      p: 2,
      appearance: 'none',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      border: '1px solid',
      borderRadius: 4,
      color: 'inherit',
      bg: 'transparent'
    }
  }));
});

const RadioChecked = props => /*#__PURE__*/React.createElement(SVG, props, /*#__PURE__*/React.createElement("path", {
  d: "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}));

const RadioUnchecked = props => /*#__PURE__*/React.createElement(SVG, props, /*#__PURE__*/React.createElement("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}));

const RadioIcon = props => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RadioChecked, _extends({}, props, {
  __css: {
    display: 'none',
    'input:checked ~ &': {
      display: 'block'
    }
  }
})), /*#__PURE__*/React.createElement(RadioUnchecked, _extends({}, props, {
  __css: {
    display: 'block',
    'input:checked ~ &': {
      display: 'none'
    }
  }
})));

const Radio = /*#__PURE__*/React.forwardRef(function Radio({
  className,
  sx,
  variant = 'radio',
  ...props
}, ref) {
  return /*#__PURE__*/React.createElement(Box, {
    sx: {
      minWidth: 'min-content'
    }
  }, /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    as: "input",
    type: "radio"
  }, props, {
    sx: {
      position: 'absolute',
      opacity: 0,
      zIndex: -1,
      width: 1,
      height: 1,
      overflow: 'hidden'
    }
  })), /*#__PURE__*/React.createElement(Box, {
    as: RadioIcon,
    "aria-hidden": "true",
    __themeKey: "forms",
    variant: variant,
    className: className,
    sx: sx,
    __css: {
      // todo: system props??
      mr: 2,
      borderRadius: 9999,
      color: 'gray',
      flexShrink: 0,
      'input:checked ~ &': {
        color: 'primary'
      },
      'input:focus ~ &': {
        bg: 'highlight'
      }
    }
  }));
});

const CheckboxChecked = props => /*#__PURE__*/React.createElement(SVG, props, /*#__PURE__*/React.createElement("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
}));

const CheckboxUnchecked = props => /*#__PURE__*/React.createElement(SVG, props, /*#__PURE__*/React.createElement("path", {
  d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
}));

const CheckboxIcon = props => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CheckboxChecked, _extends({}, props, {
  __css: {
    display: 'none',
    'input:checked ~ &': {
      display: 'block'
    }
  }
})), /*#__PURE__*/React.createElement(CheckboxUnchecked, _extends({}, props, {
  __css: {
    display: 'block',
    'input:checked ~ &': {
      display: 'none'
    }
  }
})));

const Checkbox = /*#__PURE__*/React.forwardRef(function Checkbox({
  className,
  sx,
  variant = 'checkbox',
  children,
  ...props
}, ref) {
  return /*#__PURE__*/React.createElement(Box, {
    sx: {
      minWidth: 'min-content'
    }
  }, /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    as: "input",
    type: "checkbox"
  }, props, {
    sx: {
      position: 'absolute',
      opacity: 0,
      zIndex: -1,
      width: 1,
      height: 1,
      overflow: 'hidden'
    }
  })), /*#__PURE__*/React.createElement(Box, {
    as: CheckboxIcon,
    "aria-hidden": "true",
    __themeKey: "forms",
    variant: variant,
    className: className,
    sx: sx,
    __css: {
      mr: 2,
      borderRadius: 4,
      color: 'gray',
      flexShrink: 0,
      'input:checked ~ &': {
        color: 'primary'
      },
      'input:focus ~ &': {
        color: 'primary',
        bg: 'highlight'
      }
    }
  }), children);
});

const GUTTER = 2;
const SIZE = 18;
const Switch = /*#__PURE__*/React.forwardRef(function Switch({
  className,
  label,
  sx,
  variant = 'switch',
  ...props
}, ref) {
  return /*#__PURE__*/React.createElement(Label, {
    sx: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    as: "input",
    type: "checkbox",
    __themeKey: "forms",
    "aria-label": label
  }, props, {
    sx: {
      position: 'absolute',
      opacity: 0,
      zIndex: -1,
      width: 1,
      height: 1,
      overflow: 'hidden'
    }
  })), /*#__PURE__*/React.createElement(Box, {
    css: {
      padding: GUTTER
    },
    __themeKey: "forms",
    variant: variant,
    className: className,
    sx: sx,
    __css: {
      position: 'relative',
      bg: 'gray',
      borderRadius: SIZE,
      height: SIZE + GUTTER * 2,
      width: SIZE * 2 + GUTTER * 2,
      mr: 2,
      'input:disabled ~ &': {
        opacity: 0.5,
        cursor: 'not-allowed'
      },
      '& > div': {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '50%',
        height: SIZE,
        width: SIZE,
        bg: 'white',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        transform: 'translateX(0%)',
        transition: `transform 240ms cubic-bezier(0.165, 0.840, 0.440, 1.000)`
      },
      'input:checked ~ &': {
        bg: 'primary',
        '> div': {
          transform: 'translateX(100%)'
        }
      }
    }
  }, /*#__PURE__*/React.createElement(Box, null)), /*#__PURE__*/React.createElement("span", null, label));
});

const thumb = {
  appearance: 'none',
  width: 16,
  height: 16,
  bg: 'currentcolor',
  border: 0,
  borderRadius: 9999,
  variant: 'forms.slider.thumb'
};
const Slider = /*#__PURE__*/React.forwardRef(function Slider(props, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    as: "input",
    type: "range",
    variant: "slider"
  }, props, {
    __themeKey: "forms",
    __css: {
      display: 'block',
      width: '100%',
      height: 4,
      my: 2,
      cursor: 'pointer',
      appearance: 'none',
      borderRadius: 9999,
      color: 'inherit',
      bg: 'gray',
      ':focus': {
        outline: 'none',
        color: 'primary'
      },
      '&::-webkit-slider-thumb': thumb,
      '&::-moz-range-thumb': thumb,
      '&::-ms-thumb': thumb
    }
  }));
});

const Field = /*#__PURE__*/React.forwardRef(function Field({
  as: Control = Input,
  label,
  id,
  name,
  ...props
}, ref) {
  const fieldIdentifier = id || name;
  return /*#__PURE__*/React.createElement(Box, getMargin(props), /*#__PURE__*/React.createElement(Label, {
    htmlFor: fieldIdentifier
  }, label), /*#__PURE__*/React.createElement(Control, _extends({
    ref: ref,
    id: fieldIdentifier,
    name: name
  }, omitMargin(props))));
});

const Progress = /*#__PURE__*/React.forwardRef(function Progress(props, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    as: "progress",
    variant: "styles.progress"
  }, props, {
    __css: {
      display: 'block',
      width: '100%',
      height: '4px',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      appearance: 'none',
      color: 'primary',
      bg: 'gray',
      borderRadius: 9999,
      border: 'none',
      '&::-webkit-progress-bar': {
        bg: 'transparent'
      },
      '&::-webkit-progress-value': {
        bg: 'currentcolor'
      },
      '&::-moz-progress-bar': {
        bg: 'currentcolor'
      }
    }
  }));
});

const Donut = /*#__PURE__*/React.forwardRef(function Donut({
  size = 128,
  strokeWidth = 2,
  value = 0,
  min = 0,
  max = 1,
  title,
  ...props
}, ref) {
  const r = 16 - strokeWidth;
  const C = 2 * r * Math.PI;
  const offset = C - (value - min) / (max - min) * C;
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    as: "svg",
    viewBox: "0 0 32 32",
    width: size,
    height: size,
    strokeWidth: strokeWidth,
    fill: "none",
    stroke: "currentcolor",
    role: "img",
    "aria-valuenow": value,
    "aria-valuemin": min,
    "aria-valuemax": max
  }, props, {
    __css: {
      color: 'primary'
    }
  }), title && /*#__PURE__*/React.createElement("title", null, title), /*#__PURE__*/React.createElement("circle", {
    cx: 16,
    cy: 16,
    r: r,
    opacity: 1 / 8
  }), /*#__PURE__*/React.createElement("circle", {
    cx: 16,
    cy: 16,
    r: r,
    strokeDasharray: C,
    strokeDashoffset: offset,
    transform: "rotate(-90 16 16)"
  }));
});

const spin = keyframes({
  from: {
    transform: 'rotate(0deg)'
  },
  to: {
    transform: 'rotate(360deg)'
  }
});
const Spinner = /*#__PURE__*/React.forwardRef(function Spinner({
  size = 48,
  strokeWidth = 4,
  max = 1,
  title = 'Loading...',
  duration = 500,
  ...props
}, ref) {
  const r = 16 - strokeWidth;
  const C = 2 * r * Math.PI;
  const offset = C - 1 / 4 * C;
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    as: "svg",
    viewBox: "0 0 32 32",
    width: size,
    height: size,
    strokeWidth: strokeWidth,
    fill: "none",
    stroke: "currentcolor",
    role: "img"
  }, props, {
    __css: {
      color: 'primary',
      overflow: 'visible'
    }
  }), /*#__PURE__*/React.createElement("title", null, title), /*#__PURE__*/React.createElement("circle", {
    cx: 16,
    cy: 16,
    r: r,
    opacity: 1 / 8
  }), /*#__PURE__*/React.createElement(Box, {
    as: "circle",
    cx: 16,
    cy: 16,
    r: r,
    strokeDasharray: C,
    strokeDashoffset: offset,
    __css: {
      transformOrigin: '50% 50%',
      animationName: spin.toString(),
      animationTimingFunction: 'linear',
      animationDuration: duration + 'ms',
      animationIterationCount: 'infinite'
    }
  }));
});

const Avatar = /*#__PURE__*/React.forwardRef(function Avatar({
  size = 48,
  ...props
}, ref) {
  return /*#__PURE__*/React.createElement(Image, _extends({
    ref: ref,
    width: size,
    height: size,
    variant: "avatar"
  }, props, {
    __css: {
      borderRadius: 9999
    }
  }));
});

const Badge = /*#__PURE__*/React.forwardRef(function Badge(props, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    variant: "primary"
  }, props, {
    __themeKey: "badges",
    __css: {
      display: 'inline-block',
      verticalAlign: 'baseline',
      fontSize: 0,
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      px: 1,
      borderRadius: 2,
      color: 'white',
      bg: 'primary'
    }
  }));
});

const IconButton = /*#__PURE__*/React.forwardRef(function IconButton({
  size = 32,
  ...props
}, ref) {
  var _props$__css;

  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    as: "button",
    variant: "icon"
  }, props, {
    __themeKey: "buttons",
    __css: {
      label: ((_props$__css = props.__css) == null ? void 0 : _props$__css.label) || 'IconButton',
      appearance: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 1,
      width: size,
      height: size,
      color: 'inherit',
      bg: 'transparent',
      border: 'none',
      borderRadius: 4
    }
  }));
});

const x = /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "currentcolor",
  viewBox: "0 0 24 24"
}, /*#__PURE__*/React.createElement("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}));
const Close = /*#__PURE__*/React.forwardRef(function Close({
  size = 32,
  ...props
}, ref) {
  return /*#__PURE__*/React.createElement(IconButton, _extends({
    ref: ref,
    size: size,
    title: "Close",
    "aria-label": "Close",
    variant: "close"
  }, props, {
    children: x
  }));
});

const Alert = /*#__PURE__*/React.forwardRef(function Alert(props, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    variant: "primary"
  }, props, {
    __themeKey: "alerts",
    __css: {
      display: 'flex',
      alignItems: 'center',
      px: 3,
      py: 2,
      fontWeight: 'bold',
      color: 'white',
      bg: 'primary',
      borderRadius: 4
    }
  }));
});

const Divider = /*#__PURE__*/React.forwardRef(function Divider(props, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    as: "hr",
    variant: "styles.hr"
  }, props, {
    __css: {
      color: 'gray',
      m: 0,
      my: 2,
      border: 0,
      borderBottom: '1px solid'
    }
  }));
});

const getContainerProps = getProps(__isBoxStyledSystemProp);
const getIframeProps = getProps(str => !__isBoxStyledSystemProp(str));
/** @typedef {import("../index").EmbedProps} EmbedProps */

/** @type {React.ForwardRefExoticComponent<EmbedProps>} */

const Embed = /*#__PURE__*/React.forwardRef(function Embed({
  variant,
  sx,
  ratio = 16 / 9,
  src,
  frameBorder = 0,
  allowFullScreen = true,
  width = 560,
  height = 315,
  allow,
  ...rest
}, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    variant: variant,
    sx: sx,
    __css: {
      width: '100%',
      height: 0,
      paddingBottom: 100 / ratio + '%',
      position: 'relative',
      overflow: 'hidden'
    }
  }, getContainerProps(rest)), /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    as: "iframe",
    src: src,
    width: width,
    height: height,
    frameBorder: frameBorder,
    allowFullScreen: allowFullScreen,
    allow: allow
  }, getIframeProps(rest), {
    __css: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      bottom: 0,
      left: 0,
      border: 0
    }
  })));
});

const AspectRatio = /*#__PURE__*/React.forwardRef(function AspectRatio({
  ratio = 4 / 3,
  children,
  ...props
}, ref) {
  return /*#__PURE__*/React.createElement(Box, {
    ref: ref,
    sx: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Box, {
    sx: {
      width: '100%',
      height: 0,
      paddingBottom: 100 / ratio + '%'
    }
  }), /*#__PURE__*/React.createElement(Box, _extends({}, props, {
    __css: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  }), children));
});

const AspectImage = /*#__PURE__*/React.forwardRef(function AspectImage({
  ratio,
  ...props
}, ref) {
  return /*#__PURE__*/React.createElement(AspectRatio, {
    ratio: ratio
  }, /*#__PURE__*/React.createElement(Image, _extends({
    ref: ref
  }, props, {
    __css: {
      objectFit: 'cover'
    }
  })));
});

const Container = /*#__PURE__*/React.forwardRef(function Container(props, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    variant: "container"
  }, props, {
    __themeKey: "layout",
    __css: {
      width: '100%',
      maxWidth: 'container',
      mx: 'auto'
    }
  }));
});

const NavLink = /*#__PURE__*/React.forwardRef(function NavLink(props, ref) {
  return /*#__PURE__*/React.createElement(Link, _extends({
    ref: ref,
    variant: "nav"
  }, props, {
    __css: {
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 'bold',
      display: 'inline-block',
      '&:hover, &:focus, &.active': {
        color: 'primary'
      }
    }
  }));
});

const Message = /*#__PURE__*/React.forwardRef(function Message(props, ref) {
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref
  }, props, {
    __themeKey: "messages",
    __css: {
      padding: 3,
      paddingLeft: t => t.space[3] - t.space[1],
      borderLeftWidth: t => t.space[1],
      borderLeftStyle: 'solid',
      borderLeftColor: 'primary',
      borderRadius: 4,
      bg: 'highlight'
    }
  }));
});

const MenuIcon = ({
  size = 24
}) => /*#__PURE__*/React.createElement(Box, {
  as: "svg",
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  fill: "currentcolor",
  viewBox: "0 0 24 24",
  sx: {
    display: 'block',
    margin: 0
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
}));
const MenuButton = /*#__PURE__*/React.forwardRef(function MenuButton(props, ref) {
  return /*#__PURE__*/React.createElement(IconButton, _extends({
    ref: ref,
    title: "Menu",
    "aria-label": "Toggle Menu",
    variant: "menu"
  }, props), /*#__PURE__*/React.createElement(MenuIcon, null));
});

export { Alert, AspectImage, AspectRatio, Avatar, Badge, Box, Button, Card, Checkbox, Close, Container, Divider, Donut, Embed, Field, Flex, Grid, Heading, IconButton, Image, Input, Label, Link, MenuButton, Message, NavLink, Paragraph, Progress, Radio, Select, Slider, Spinner, Switch, Text, Textarea };
