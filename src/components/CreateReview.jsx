import { useFormik } from 'formik';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW_MUTATION } from '../graphql/mutations';
import { useState } from 'react';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.colors.contentBackground,
        padding: 16,
    },
    formElement: {
        minHeight: 50,
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
        paddingTop: 8,
        paddingBottom: 8,
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

const CreateReview = () => {
    const [apolloError, setApolloError] = useState('');
    const [createReview] = useMutation(CREATE_REVIEW_MUTATION);
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { owner, name, rating: ratingStr, review } = values;
        const rating = Number.parseInt(ratingStr, 10);
        try {
            const { data: { createReview: { repositoryId } } } = await createReview({
                variables: {
                    review: {
                        ownerName: owner,
                        rating,
                        repositoryName: name,
                        text: review,
                    },
                },
            });
            console.log('successfully submitted review for:', repositoryId);
            navigate(`/Repo/${repositoryId}`);
        } catch (err) {
            console.log(err);
            setApolloError(err.message);
        }
    };

    const validationSchema = yup.object().shape({
        owner: yup.string().required('Repository owner name is required'),
        name: yup.string().required('Repository name is required'),
        rating: yup.number('Rating must be a number')
            .integer('Rating must be a whole number')
            .moreThan(-1, 'Rating must be between 0-100')
            .lessThan(101, 'Rating must be between 0-100')
            .required('Rating is required'),
        review: yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            owner: '',
            name: '',
            rating: '',
            review: '',
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
                    formik.touched.owner && formik.errors.owner && styles.errorTextField,
                ]}
                placeholder='Repository owner name'
                value={formik.values.owner}
                onChangeText={formik.handleChange('owner')} />
            {formik.touched.owner && formik.errors.owner && (
                <Text style={styles.error}>{formik.errors.owner}</Text>
            )}

            <TextInput
                style={[
                    styles.formElement,
                    styles.textField,
                    formik.touched.name && formik.errors.name && styles.errorTextField,
                ]}
                placeholder='Repository name'
                value={formik.values.name}
                onChangeText={formik.handleChange('name')} />
            {formik.touched.name && formik.errors.name && (
                <Text style={styles.error}>{formik.errors.name}</Text>
            )}

            <TextInput
                style={[
                    styles.formElement,
                    styles.textField,
                    formik.touched.rating && formik.errors.rating && styles.errorTextField,
                ]}
                placeholder='Rating between 0 and 100'
                value={formik.values.rating}
                inputMode='numeric'
                onChangeText={formik.handleChange('rating')} />
            {formik.touched.rating && formik.errors.rating && (
                <Text style={styles.error}>{formik.errors.rating}</Text>
            )}

            <TextInput
                style={[
                    styles.formElement,
                    styles.textField,
                    formik.touched.review && formik.errors.review && styles.errorTextField,
                ]}
                placeholder='Review'
                value={formik.values.review}
                onChangeText={formik.handleChange('review')}
                multiline />
            {formik.touched.review && formik.errors.review && (
                <Text style={styles.error}>{formik.errors.review}</Text>
            )}

            {apolloError && (
                <Text style={styles.error}>{apolloError}</Text>
            )}

            <Pressable onPress={formik.handleSubmit}>
                <Text fontSize='subheading' fontWeight='bold' style={[styles.formElement, styles.button]}>
                    Create a review
                </Text>
            </Pressable>
        </View>
    );
};

export default CreateReview;
