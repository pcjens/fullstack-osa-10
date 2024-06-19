import { useFormik } from 'formik';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

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
    errorTextField: {
        borderColor: theme.colors.textError,
    },
    error: {
        color: theme.colors.textError,
    },
});

const SignIn = () => {
    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            const { data } = await signIn({ username, password });
            console.log(data);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    const validationSchema = yup.object().shape({
        username: yup.string()
            .required('Username is required'),
        password: yup.string()
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit,
    });

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.formElement,
                    styles.textField,
                    formik.touched.username && formik.errors.username && styles.errorTextField,
                ]}
                placeholder='Username'
                value={formik.values.username}
                onChangeText={formik.handleChange('username')} />
            {formik.touched.username && formik.errors.username && (
                <Text style={styles.error}>{formik.errors.username}</Text>
            )}

            <TextInput secureTextEntry
                style={[
                    styles.formElement,
                    styles.textField,
                    formik.touched.password && formik.errors.password && styles.errorTextField,
                ]}
                placeholder='Password'
                value={formik.values.password}
                onChangeText={formik.handleChange('password')} />
            {formik.touched.password && formik.errors.password && (
                <Text style={styles.error}>{formik.errors.password}</Text>
            )}

            <Pressable onPress={formik.handleSubmit}>
                <Text fontSize='subheading' fontWeight='bold' style={[styles.formElement, styles.button]}>
                    Sign in
                </Text>
            </Pressable>
        </View>
    );
};

export default SignIn;
