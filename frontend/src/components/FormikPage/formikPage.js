import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeAllItemsFromCart } from '../../redux/cartActions';
import ErrorValid from '../ErrorValid/errorValid';
import styles from './formikPage.module.css';
import './formikPage.css';

const FormikPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    age: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().max(20, 'Max 20 characters').required('First Name is required'),
    lastName: Yup.string().max(30, 'Max 30 characters').required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, 'Invalid phone number')
      .required('Phone Number is required'),
    age: Yup.number()
      .typeError('Age must be a number')
      .integer('Age must be an integer')
      .required('Age is required')
      .min(17, 'Age must be greater than 16'),
  });

  const handleSubmit = (values, actions) => {
    console.log('Form submitted!', values);
    actions.setSubmitting(false);
    dispatch(removeAllItemsFromCart());
    navigate('/success');
  };

  return (
    <div>
      <h2 className='checkout'>Checkout</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="firstName">First Name</label>
              <Field type="text" id="firstName" name="firstName" className={styles.input} />
              <ErrorMessage name="firstName" component={ErrorValid} />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <Field type="text" id="lastName" name="lastName" className={styles.input} />
              <ErrorMessage name="lastName" component={ErrorValid} />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" className={styles.input} />
              <ErrorMessage name="email" component={ErrorValid} />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <Field type="tel" id="phoneNumber" name="phoneNumber" className={styles.input} />
              <ErrorMessage name="phoneNumber" component={ErrorValid} />
            </div>
            <div>
              <label htmlFor="age">Age</label>
              <Field type="text" id="age" name="age" className={styles.input} />
              <ErrorMessage name="age" component={ErrorValid} />
            </div>
            <div className="formik-buttons">
              <button onClick={() => navigate('/')}>Back to Catalog</button>
              <button className='cart-buttons-last-button' type="submit" disabled={isSubmitting}>
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikPage;