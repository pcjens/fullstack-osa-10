import { useFormik } from 'formik';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.colors.contentBackground,
        padding: 16,
        gap: 16,
    },
    formElement: {
        height: 50,
        borderRadius: 4,
    },
    textField: {
        borderWidth: 1,
        borderColor: theme.colors.textSecondary,
        fontSize: theme.fontSizes.subheading,
        paddingLeft: 12,
        paddingRight: 12,
    },
    button: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.textOnPrimary,
        textAlign: 'center',
        verticalAlign: 'middle',
    },
});

const SignIn = () => {
    const onSubmit = (values) => {
        console.log(values);
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit,
    });
    return (
        <View style={styles.container}>
            <TextInput style={[styles.formElement, styles.textField]}
                placeholder='Username'
                value={formik.values.username}
                onChangeText={formik.handleChange('username')} />
            <TextInput secureTextEntry style={[styles.formElement, styles.textField]}
                placeholder='Password'
                value={formik.values.password}
                onChangeText={formik.handleChange('password')} />
            <Pressable onPress={formik.handleSubmit}>
                <Text fontSize='subheading' fontWeight='bold' style={[styles.formElement, styles.button]}>
                    Sign in
                </Text>
            </Pressable>
        </View>
    );
};

export default SignIn;
