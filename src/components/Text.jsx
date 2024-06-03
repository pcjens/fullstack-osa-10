import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
    text: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.body,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal,
    },
    colorTextSecondary: {
        color: theme.colors.textSecondary,
    },
    colorPrimary: {
        color: theme.colors.primary,
    },
    fontSizeSubheading: {
        fontSize: theme.fontSizes.subheading,
    },
    fontWeightBold: {
        fontWeight: theme.fontWeights.bold,
    },
    badge: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.textOnPrimary,
        alignSelf: 'flex-start',
        padding: 3,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 4,
    },
});

const Text = ({ color, fontSize, fontWeight, isBadge, style, ...props }) => {
    const textStyle = [
        styles.text,
        color === 'textSecondary' && styles.colorTextSecondary,
        color === 'primary' && styles.colorPrimary,
        fontSize === 'subheading' && styles.fontSizeSubheading,
        fontWeight === 'bold' && styles.fontWeightBold,
        isBadge && styles.badge,
        style,
    ];

    return <NativeText style={textStyle} {...props} />;
};

export default Text;
