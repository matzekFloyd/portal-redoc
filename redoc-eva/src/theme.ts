import { darken, desaturate, lighten, readableColor, transparentize } from 'polished';

const defaultTheme: ThemeInterface = {
  spacing: {
    unit: 5,
    sectionHorizontal: ({ spacing }) => spacing.unit * 8,
    sectionVertical: ({ spacing }) => spacing.unit * 8,
  },
  breakpoints: {
    small: '50rem',
    medium: '75rem',
    large: '105rem',
  },
  colors: {
    tonalOffset: 0.2,
    primary: {
      main: '#3d7bdc',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.primary.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.primary.main),
      contrastText: ({ colors }) => readableColor(colors.primary.main),
    },
    success: {
      main: '#009A75',
      light: ({ colors }) => lighten(colors.tonalOffset * 2, colors.success.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.success.main),
      contrastText: ({ colors }) => readableColor(colors.success.main),
    },
    warning: {
      main: '#FF8522',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.warning.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.warning.main),
      contrastText: '#ffffff',
    },
    error: {
      main: '#E00031',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.error.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.error.main),
      contrastText: ({ colors }) => readableColor(colors.error.main),
    },
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
    },
    text: {
      primary: '#333333',
      secondary: ({ colors }) => lighten(colors.tonalOffset, colors.text.primary),
    },
    border: {
      dark: 'rgba(0,0,0, 0.1)',
      light: '#ffffff',
    },
    responses: {
      success: {
        color: ({ colors }) => colors.success.main,
        backgroundColor: ({ colors }) => transparentize(0.93, colors.success.main),
        tabTextColor: ({ colors }) => colors.responses.success.color,
      },
      error: {
        color: ({ colors }) => colors.error.main,
        backgroundColor: ({ colors }) => transparentize(0.93, colors.error.main),
        tabTextColor: ({ colors }) => colors.responses.error.color,
      },
      redirect: {
        color: ({ colors }) => colors.warning.main,
        backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.redirect.color),
        tabTextColor: ({ colors }) => colors.responses.redirect.color,
      },
      info: {
        color: '#87ceeb',
        backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.info.color),
        tabTextColor: ({ colors }) => colors.responses.info.color,
      },
    },
    http: {
      get: '#009A75',
      post: '#3d7bdc',
      put: '#95507c',
      options: '#947014',
      patch: '#FF8522',
      delete: '#E00031',
      basic: '#707070',
      link: '#07818F',
      head: '#A23DAD',
    },
  },
  schema: {
    linesColor: theme =>
      lighten(
        theme.colors.tonalOffset,
        desaturate(theme.colors.tonalOffset, theme.colors.primary.main),
      ),
    defaultDetailsWidth: '75%',
    typeNameColor: theme => theme.colors.text.secondary,
    typeTitleColor: theme => theme.schema.typeNameColor,
    requireLabelColor: theme => theme.colors.error.main,
    labelsTextSize: '0.9em',
    nestingSpacing: '1em',
    nestedBackground: '#fafafa',
    arrow: {
      size: '1.1em',
      color: theme => theme.colors.text.secondary,
    },
  },
  typography: {
    fontSize: '14px',
    lineHeight: '1.5em',
    fontWeightRegular: '400',
    fontWeightBold: '600',
    fontWeightLight: '300',
    fontFamily: 'Roboto, sans-serif',
    smoothing: 'antialiased',
    optimizeSpeed: true,
    headings: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '400',
      lineHeight: '1.6em',
    },
    code: {
      fontSize: '13px',
      fontFamily: 'Courier, monospace',
      lineHeight: ({ typography }) => typography.lineHeight,
      fontWeight: ({ typography }) => typography.fontWeightRegular,
      color: '#E00031',
      backgroundColor: 'rgba(38, 50, 56, 0.05)',
      wrap: false,
    },
    links: {
      color: ({ colors }) => colors.primary.main,
      visited: ({ typography }) => typography.links.color,
      hover: ({ typography }) => lighten(0.2, typography.links.color),
      textDecoration: 'auto',
      hoverTextDecoration: 'auto',
    },
  },
  sidebar: {
    width: '260px',
    backgroundColor: '#fafafa',
    textColor: '#333333',
    activeTextColor: theme =>
      theme.sidebar.textColor !== defaultTheme.sidebar!.textColor
        ? theme.sidebar.textColor
        : theme.colors.primary.main,
    groupItems: {
      activeBackgroundColor: theme => darken(0.1, theme.sidebar.backgroundColor),
      activeTextColor: theme => theme.sidebar.activeTextColor,
      textTransform: 'uppercase',
    },
    level1Items: {
      activeBackgroundColor: theme => darken(0.05, theme.sidebar.backgroundColor),
      activeTextColor: theme => theme.sidebar.activeTextColor,
      textTransform: 'none',
    },
    arrow: {
      size: '1.5em',
      color: theme => theme.sidebar.textColor,
    },
  },
  logo: {
    maxHeight: ({ sidebar }) => sidebar.width,
    maxWidth: ({ sidebar }) => sidebar.width,
    gutter: '2px',
  },
  rightPanel: {
    backgroundColor: '#263238',
    width: '40%',
    textColor: '#ffffff',
    servers: {
      overlay: {
        backgroundColor: '#fafafa',
        textColor: '#263238',
      },
      url: {
        backgroundColor: '#fff',
      },
    },
  },
  codeBlock: {
    backgroundColor: ({ rightPanel }) => darken(0.1, rightPanel.backgroundColor),
  },
  fab: {
    backgroundColor: '#f2f2f2',
    color: '#0A1264',
  },
};

export default defaultTheme;

export function resolveTheme(theme: ThemeInterface): ResolvedThemeInterface {
  const resolvedValues = {};
  let counter = 0;
  const setProxy = (obj, path: string) => {
    Object.keys(obj).forEach(k => {
      const currentPath = (path ? path + '.' : '') + k;
      const val = obj[k];
      if (typeof val === 'function') {
        Object.defineProperty(obj, k, {
          get() {
            if (!resolvedValues[currentPath]) {
              counter++;
              if (counter > 1000) {
                throw new Error(
                  `Theme probably contains circular dependency at ${currentPath}: ${val.toString()}`,
                );
              }

              resolvedValues[currentPath] = val(theme);
            }
            return resolvedValues[currentPath];
          },
          enumerable: true,
        });
      } else if (typeof val === 'object') {
        setProxy(val, currentPath);
      }
    });
  };

  setProxy(theme, '');
  return JSON.parse(JSON.stringify(theme));
}

export interface ColorSetting {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

export interface HTTPResponseColos {
  color: string;
  backgroundColor: string;
  tabTextColor: string;
}

export interface FontSettings {
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  lineHeight: string;
  color: string;
}

export interface Servers {
  overlay: {
    backgroundColor: string;
    textColor: string;
  };
  url: {
    backgroundColor: string;
  };
}

export interface ResolvedThemeInterface {
  spacing: {
    unit: number;
    sectionHorizontal: number;
    sectionVertical: number;
  };
  breakpoints: {
    small: string;
    medium: string;
    large: string;
  };
  colors: {
    tonalOffset: number;
    primary: ColorSetting;
    success: ColorSetting;
    warning: ColorSetting;
    error: ColorSetting;
    gray: {
      50: string;
      100: string;
    };
    border: {
      light: string;
      dark: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    responses: {
      success: HTTPResponseColos;
      error: HTTPResponseColos;
      redirect: HTTPResponseColos;
      info: HTTPResponseColos;
    };
    http: {
      get: string;
      post: string;
      put: string;
      options: string;
      patch: string;
      delete: string;
      basic: string;
      link: string;
      head: string;
    };
  };
  schema: {
    linesColor: string;
    defaultDetailsWidth: string;
    typeNameColor: string;
    typeTitleColor: string;
    requireLabelColor: string;
    labelsTextSize: string;
    nestingSpacing: string;
    nestedBackground: string;
    arrow: {
      size: string;
      color: string;
    };
  };
  typography: {
    fontSize: string;
    lineHeight: string;
    fontWeightLight: string;
    fontWeightRegular: string;
    fontWeightBold: string;
    fontFamily: string;

    smoothing: string;
    optimizeSpeed: boolean;

    code: FontSettings & {
      backgroundColor: string;
      wrap: boolean;
    };
    headings: {
      fontFamily: string;
      fontWeight: string;
      lineHeight: string;
    };

    links: {
      color: string;
      visited: string;
      hover: string;
      textDecoration: string;
      hoverTextDecoration: string;
    };
  };
  sidebar: {
    width: string;
    backgroundColor: string;
    textColor: string;
    activeTextColor: string;
    groupItems: {
      activeBackgroundColor: string;
      activeTextColor: string;
      textTransform: string;
    };
    level1Items: {
      activeBackgroundColor: string;
      activeTextColor: string;
      textTransform: string;
    };
    arrow: {
      size: string;
      color: string;
    };
  };
  logo: {
    maxHeight: string;
    maxWidth: string;
    gutter: string;
  };
  rightPanel: {
    backgroundColor: string;
    textColor: string;
    width: string;
    servers: Servers;
  };
  codeBlock: {
    backgroundColor: string;
  };
  fab: {
    backgroundColor: string;
    color: string;
  };

  extensionsHook?: (name: string, props: any) => string;
}

export type primitive = string | number | boolean | undefined | null;
export type AdvancedThemeDeep<T> = T extends primitive
  ? T | ((theme: ResolvedThemeInterface) => T)
  : AdvancedThemeObject<T>;
export type AdvancedThemeObject<T> = { [P in keyof T]?: AdvancedThemeDeep<T[P]> };
export type ThemeInterface = AdvancedThemeObject<ResolvedThemeInterface>;
