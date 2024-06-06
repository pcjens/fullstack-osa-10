import { Platform } from "react-native";

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        textError: '#d73a4a',
        primary: '#0366d6',
        textOnPrimary: 'white',
        appBarBackground: '#24292e',
        appBarText: '#eee',
        mainBackground: '#e1e4e8',
        contentBackground: 'white',
    },
    fontSizes: {
        body: 14,
        subheading: 16,
    },
    fonts: {
        main: Platform.select({
            default: 'System',
            ios: 'Arial',
            android: 'Roboto',
        }),
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
};

export default theme;
