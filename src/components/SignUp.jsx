import { useFormik } from 'formik';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import { useMutation } from '@apollo/client';
import { SIGN_UP_MUTATION } from '../graphql/mutations';
import { useState } from 'react';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.colors.contentBackground,
        padding: 16,
    },
    formElement: {
        height: 50,
        borderRadius: 4,
        marginTop: 16,
        marginBottom: 4,
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
        fontSize: theme.fontSizes.subheading,
    },
});

const SignUp = () => {
    const [apolloError, setApolloError] = useState('');
    const [signIn] = useSignIn();
    const navigate = useNavigate();
    const [signUp] = useMutation(SIGN_UP_MUTATION);

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            console.log('signup', await signUp({ variables: { user: { username, password } } }));
            console.log('signin', await signIn({ username, password }));
            navigate('/');
        } catch (err) {
            console.log(err);
            setApolloError(err.message);
        }
    };

    const validationSchema = yup.object().shape({
        username: yup.string()
            .min(5, 'Username must be 5 characters or longer')
            .required('Username is required'),
        password: yup.string()
            .min(5, 'Password must be 5 characters or longer')
            .required('Password is required'),
        passwordConfirm: yup.string()
            .when(['password'], (password, schema) => schema.equals(password, 'Password fields must match'))
            .required('Password confirmation is required'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            passwordConfirm: '',
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

            <TextInput secureTextEntry
                style={[
                    styles.formElement,
                    styles.textField,
                    formik.touched.passwordConfirm && formik.errors.passwordConfirm && styles.errorTextField,
                ]}
                placeholder='Password confirmation'
                value={formik.values.passwordConfirm}
                onChangeText={formik.handleChange('passwordConfirm')} />
            {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
                <Text style={styles.error}>{formik.errors.passwordConfirm}</Text>
            )}

            {apolloError && (
                <Text style={styles.error}>{apolloError}</Text>
            )}

            <Pressable onPress={formik.handleSubmit}>
                <Text fontSize='subheading' fontWeight='bold' style={[styles.formElement, styles.button]}>
                    Sign up
                </Text>
            </Pressable>
        </View>
    );
};

export default SignUp;
