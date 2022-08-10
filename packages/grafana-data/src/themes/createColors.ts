import { merge } from 'lodash';
import { alpha, darken, emphasize, getContrastRatio, lighten } from './colorManipulator';
import { getDarkHues, getLightHues } from './createVisualizationColors';
import { palette } from './palette';
import { DeepPartial, ThemeRichColor } from './types';

/** @internal */
export type ThemeColorsMode = 'light' | 'dark' | 'fusebit';

/** @internal */
export interface ThemeColorsBase<TColor> {
  mode: ThemeColorsMode;

  primary: TColor;
  secondary: TColor;
  info: TColor;
  error: TColor;
  success: TColor;
  warning: TColor;

  text: {
    primary: string;
    secondary: string;
    disabled: string;
    link: string;
    /** Used for auto white or dark text on colored backgrounds */
    maxContrast: string;
  };

  background: {
    /** Dashboard and body background */
    canvas: string;
    /** Primary content pane background (panels etc) */
    primary: string;
    /** Cards and elements that need to stand out on the primary background */
    secondary: string;
  };

  border: {
    weak: string;
    medium: string;
    strong: string;
  };

  gradients: {
    brandVertical: string;
    brandHorizontal: string;
  };

  action: {
    /** Used for selected menu item / select option */
    selected: string;
    /** Used for hovered menu item / select option */
    hover: string;
    /** Used for button/colored background hover opacity */
    hoverOpacity: number;
    /** Used focused menu item / select option */
    focus: string;
    /** Used for disabled buttons and inputs */
    disabledBackground: string;
    /** Disabled text */
    disabledText: string;
    /** Disablerd opacity */
    disabledOpacity: number;
  };

  logLevelUnknown: string;
  hoverFactor: number;
  contrastThreshold: number;
  tonalOffset: number;
  transparency: number;
}

export interface ThemeHoverStrengh {}

/** @beta */
export interface ThemeColors extends ThemeColorsBase<ThemeRichColor> {
  /** Returns a text color for the background */
  getContrastText(background: string, threshold?: number): string;
  /* Brighten or darken a color by specified factor (0-1) */
  emphasize(color: string, amount?: number): string;
}

/** @internal */
export type ThemeColorsInput = DeepPartial<ThemeColorsBase<ThemeRichColor>>;

class DarkColors implements ThemeColorsBase<Partial<ThemeRichColor>> {
  mode: ThemeColorsMode = 'dark';

  // Used to get more white opacity colors
  whiteBase = '204, 204, 220';

  border = {
    weak: `rgba(${this.whiteBase}, 0.07)`,
    medium: `rgba(${this.whiteBase}, 0.15)`,
    strong: `rgba(${this.whiteBase}, 0.25)`,
  };

  text = {
    primary: `rgb(${this.whiteBase})`,
    secondary: `rgba(${this.whiteBase}, 0.65)`,
    disabled: `rgba(${this.whiteBase}, 0.58)`,
    link: palette.blueDarkText,
    maxContrast: palette.white,
  };

  primary = {
    main: palette.blueDarkMain,
    text: palette.blueDarkText,
    border: palette.blueDarkText,
  };

  secondary = {
    main: `rgba(${this.whiteBase}, 0.16)`,
    shade: `rgba(${this.whiteBase}, 0.20)`,
    text: this.text.primary,
    contrastText: `rgb(${this.whiteBase})`,
    border: this.border.strong,
  };

  info = this.primary;

  error = {
    main: palette.redDarkMain,
    text: palette.redDarkText,
  };

  success = {
    main: palette.greenDarkMain,
    text: palette.greenDarkText,
  };

  warning = {
    main: palette.orangeDarkMain,
    text: palette.orangeDarkText,
  };

  background = {
    canvas: palette.gray05,
    primary: palette.gray10,
    secondary: palette.gray15,
  };

  action = {
    hover: `rgba(${this.whiteBase}, 0.16)`,
    selected: `rgba(${this.whiteBase}, 0.12)`,
    focus: `rgba(${this.whiteBase}, 0.16)`,
    hoverOpacity: 0.08,
    disabledText: this.text.disabled,
    disabledBackground: `rgba(${this.whiteBase}, 0.04)`,
    disabledOpacity: 0.38,
  };

  gradients = {
    brandHorizontal: ' linear-gradient(270deg, #F55F3E 0%, #FF8833 100%);',
    brandVertical: 'linear-gradient(0.01deg, #F55F3E 0.01%, #FF8833 99.99%);',
  };

  logLevelUnknown = '#8e8e8e';
  contrastThreshold = 3;
  hoverFactor = 0.03;
  tonalOffset = 0.15;
  transparency = 0.15;
}

class LightColors implements ThemeColorsBase<Partial<ThemeRichColor>> {
  mode: ThemeColorsMode = 'light';

  blackBase = '36, 41, 46';

  primary = {
    main: palette.blueLightMain,
    border: palette.blueLightText,
    text: palette.blueLightText,
  };

  text = {
    primary: `rgba(${this.blackBase}, 1)`,
    secondary: `rgba(${this.blackBase}, 0.75)`,
    disabled: `rgba(${this.blackBase}, 0.50)`,
    link: this.primary.text,
    maxContrast: palette.black,
  };

  border = {
    weak: `rgba(${this.blackBase}, 0.12)`,
    medium: `rgba(${this.blackBase}, 0.30)`,
    strong: `rgba(${this.blackBase}, 0.40)`,
  };

  secondary = {
    main: `rgba(${this.blackBase}, 0.16)`,
    shade: `rgba(${this.blackBase}, 0.20)`,
    contrastText: `rgba(${this.blackBase},  1)`,
    text: this.text.primary,
    border: this.border.strong,
  };

  info = {
    main: palette.blueLightMain,
    text: palette.blueLightText,
  };

  error = {
    main: palette.redLightMain,
    text: palette.redLightText,
    border: palette.redLightText,
  };

  success = {
    main: palette.greenLightMain,
    text: palette.greenLightText,
  };

  warning = {
    main: palette.orangeLightMain,
    text: palette.orangeLightText,
  };

  background = {
    canvas: palette.gray90,
    primary: palette.white,
    secondary: palette.gray100,
  };

  action = {
    hover: `rgba(${this.blackBase}, 0.12)`,
    selected: `rgba(${this.blackBase}, 0.08)`,
    hoverOpacity: 0.08,
    focus: `rgba(${this.blackBase}, 0.12)`,
    disabledBackground: `rgba(${this.blackBase}, 0.04)`,
    disabledText: this.text.disabled,
    disabledOpacity: 0.38,
  };

  gradients = {
    brandHorizontal: 'linear-gradient(90deg, #FF8833 0%, #F53E4C 100%);',
    brandVertical: 'linear-gradient(0.01deg, #F53E4C -31.2%, #FF8833 113.07%);',
  };

  logLevelUnknown = '#dde4ed';
  contrastThreshold = 3;
  hoverFactor = 0.03;
  tonalOffset = 0.2;
  transparency = 0.08;
}

class FusebitColors implements ThemeColorsBase<Partial<ThemeRichColor>> {
  mode: ThemeColorsMode = 'fusebit';

  blackBase = '36, 41, 46';

  primary = {
    main: palette.blueLightMain,
    border: palette.blueLightText,
    text: palette.blueLightText,
  };

  text = {
    primary: `rgba(${this.blackBase}, 1)`,
    secondary: `rgba(${this.blackBase}, 0.75)`,
    disabled: `rgba(${this.blackBase}, 0.50)`,
    link: this.primary.text,
    maxContrast: palette.black,
  };

  border = {
    weak: `rgba(${this.blackBase}, 0.12)`,
    medium: `rgba(${this.blackBase}, 0.30)`,
    strong: `rgba(${this.blackBase}, 0.40)`,
  };

  secondary = {
    main: `rgba(${this.blackBase}, 0.16)`,
    shade: `rgba(${this.blackBase}, 0.20)`,
    contrastText: `rgba(${this.blackBase},  1)`,
    text: this.text.primary,
    border: this.border.strong,
  };

  info = {
    main: palette.blueLightMain,
    text: palette.blueLightText,
  };

  error = {
    main: palette.redLightMain,
    text: palette.redLightText,
    border: palette.redLightText,
  };

  success = {
    main: palette.greenLightMain,
    text: palette.greenLightText,
  };

  warning = {
    main: palette.orangeLightMain,
    text: palette.orangeLightText,
  };

  background = {
    canvas: palette.fusebit.white,
    primary: palette.fusebit.white,
    secondary: palette.fusebit.lightBlue,
  };

  action = {
    hover: `rgba(${palette.fusebit.blue}, 0.5)`,
    selected: `rgba(${this.blackBase}, 0.08)`,
    hoverOpacity: 0.08,
    focus: `rgba(${palette.fusebit.blue}, 0.12)`,
    disabledBackground: `rgba(${this.blackBase}, 0.04)`,
    disabledText: this.text.disabled,
    disabledOpacity: 0.38,
  };

  gradients = {
    brandHorizontal: 'linear-gradient(90deg, #FF8833 0%, #F53E4C 100%);',
    brandVertical: 'linear-gradient(0.01deg, #F53E4C -31.2%, #FF8833 113.07%);',
  };

  logLevelUnknown = '#dde4ed';
  contrastThreshold = 3;
  hoverFactor = 0.03;
  tonalOffset = 0.2;
  transparency = 0.08;
}

const dark = new DarkColors();
const light = new LightColors();
const fusebit = new FusebitColors();

export const themesConfig = {
  dark: {
    base: dark,
    getShadeColor: (color: string) => lighten(color, dark.tonalOffset),
    getTransparentColor: (color: string) => alpha(color, dark.transparency),
    hues: getDarkHues(),
  },
  light: {
    base: light,
    getShadeColor: (color: string) => darken(color, light.tonalOffset),
    getTransparentColor: (color: string) => alpha(color, light.transparency),
    hues: getLightHues(),
  },
  fusebit: {
    base: fusebit,
    getShadeColor: (color: string) => darken(color, fusebit.tonalOffset),
    getTransparentColor: (color: string) => alpha(color, fusebit.transparency),
    hues: getLightHues(),
  },
};

export function createColors(colors: ThemeColorsInput): ThemeColors {
  const colorKey = colors.mode || 'dark';
  const currentTheme = themesConfig[colorKey];
  const {
    primary = currentTheme.base.primary,
    secondary = currentTheme.base.secondary,
    info = currentTheme.base.info,
    warning = currentTheme.base.warning,
    success = currentTheme.base.success,
    error = currentTheme.base.error,
    tonalOffset = currentTheme.base.tonalOffset,
    hoverFactor = currentTheme.base.hoverFactor,
    contrastThreshold = currentTheme.base.contrastThreshold,
    ...other
  } = colors;

  function getContrastText(background: string, threshold: number = contrastThreshold) {
    const contrastText =
      getContrastRatio(themesConfig['dark'].base.text.maxContrast, background, currentTheme.base.background.primary) >=
      threshold
        ? themesConfig['dark'].base.text.maxContrast
        : currentTheme.base.text.maxContrast;
    // todo, need color framework
    return contrastText;
  }

  const getRichColor = ({ color, name }: GetRichColorProps): ThemeRichColor => {
    color = { ...color, name };
    if (!color.main) {
      throw new Error(`Missing main color for ${name}`);
    }
    if (!color.text) {
      color.text = color.main;
    }
    if (!color.border) {
      color.border = color.text;
    }
    if (!color.shade) {
      color.shade = currentTheme.getShadeColor(color.main);
    }
    if (!color.transparent) {
      color.transparent = currentTheme.getTransparentColor(color.main);
    }
    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main);
    }
    return color as ThemeRichColor;
  };

  return merge(
    {
      ...currentTheme.base,
      primary: getRichColor({ color: primary, name: 'primary' }),
      secondary: getRichColor({ color: secondary, name: 'secondary' }),
      info: getRichColor({ color: info, name: 'info' }),
      error: getRichColor({ color: error, name: 'error' }),
      success: getRichColor({ color: success, name: 'success' }),
      warning: getRichColor({ color: warning, name: 'warning' }),
      getContrastText,
      emphasize: (color: string, factor?: number) => {
        return emphasize(color, factor ?? hoverFactor);
      },
    },
    other
  );
}

interface GetRichColorProps {
  color: Partial<ThemeRichColor>;
  name: string;
}
