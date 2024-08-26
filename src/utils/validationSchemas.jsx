import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const registrationValidationSchema = Yup.object({
    username: Yup.string().required('User Name is required'),
    companyname: Yup.string().required('Company Name is required'),
    department: Yup.string().required('Department is required'),
    mobile: Yup.string()
      .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
      .required('Mobile is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });


 export const projectvalidationSchema = Yup.object({
    project_name: Yup.string().required('Required'),
    project_number: Yup.string().required('Required'),
    area: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    contact: Yup.string()
        .required('Required')
        .matches(/^\d{10}$/, 'Must be a valid 10-digit phone number'),
    manager: Yup.string().required('Required'),
    staff: Yup.string().required('Required'),
});


export const ChangevalidationSchema = Yup.object({
  newPassword: Yup.string().min(6, 'New password must be at least 6 characters').required('New password is required'),
  confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
});


export const forgetvalidationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
});

export const otpvalidationSchema = Yup.object({
  otp: Yup.string().required('Email is required'),
});

export const estimatevalidationSchema = Yup.object({
  project_name: Yup.string().required('Required'),
  project_number: Yup.string().required('Required'),
});
