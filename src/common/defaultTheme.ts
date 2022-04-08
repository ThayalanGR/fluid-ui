import {
    ITheme,
    IThemeColors,
    IThemeFontSizes,
} from '../components/ThemeProvider/ThemeProvider.types';

export const defaultColors: IThemeColors = {
    primary: '#0F307F',
    secondary: '#9DADD0',

    foregroundPrimary: '#212121',
    foregroundSecondary: '#666666',
    foregroundTertiary: '#9E9E9E',

    backgroundPrimary: '#FFFFFF',
    backgroundSecondary: '#F5F5F5',
    backgroundTertiary: '#E0E0E0',

    success: '#7CC887',
    info: '#41C2F5',
    warning: '#FFB857',
    danger: '#E97375',
    link: '#3B6FEE',

    brandColor1: '#0086CE',
    brandColor2: '#FFB857',
    brandColor3: '#8E7CC3',
    brandColor4: '#8E7CC3',
    brandColor5: '#FA453C',
    brandColor6: '#3A6FEE',
};

export const defaultFontSizes: IThemeFontSizes = {
    h1: '3rem',
    h2: '2.5rem',
    h3: '2rem',
    h4: '1.75rem',
    h5: '1.5rem',
    h6: '1.25rem',
    bodyIntro: '1.125rem',
    bodyMain: '1rem',
    medium: '0.875rem',
    caption: '0.75rem',
    small: '0.625rem',
};

export const defaultTheme: ITheme = {
    colors: defaultColors,
    fontSizes: defaultFontSizes,
};