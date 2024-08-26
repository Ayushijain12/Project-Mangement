import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { RegisterProject, GetProjectsbyID } from '../../../redux/Slice/projectSlice';
import SnackbarAlert from '../../CustomComponents/SnackbarAlert';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { projectvalidationSchema } from '../../../utils/validationSchemas';


const AddressForm = ({ t }) => {
    const { id } = useParams();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [initialValues, setInitialValues] = useState({
        project_name: '',
        project_number: '',
        area: '',
        address: '',
        contact: '',
        manager: '',
        staff: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dispatch(GetProjectsbyID(id));
                const response = result.payload;

                if (response) {
                    setInitialValues({
                        project_name: response.project_name || '',
                        project_number: response.project_number || '',
                        area: response.area || '',
                        address: response.address || '',
                        contact: response.contact || '',
                        manager: response.manager || '',
                        staff: response.staff || '',
                    });
                }
            } catch (err) {
                console.log(err);
            }
        };
        if (id) {
            fetchData();
        }
    }, [dispatch, id]);

    const handlenavigate = () => {
        navigate('/project');
    }

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const result = await dispatch(RegisterProject(values));
            const response = result.payload;

            if (response.status === 200) {
                alert(response.message);
                handlenavigate();
                resetForm();
            } else {
                setOpen(true);
                setMessage(response.error);
            }
        } catch (error) {
            setOpen(true);
            setMessage("Something Went Wrong!!");
        }
    };

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={projectvalidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Field name="project_name">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label={<><span style={{ color: 'red' }}>*</span>{t("project_name")}</>}
                                            placeholder={t("project_name")}
                                            fullWidth
                                            variant="outlined"
                                            error={touched.project_name && !!errors.project_name}
                                            helperText={<ErrorMessage name="project_name" />}
                                        />
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Field name="project_number">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            type='number'
                                            label={<><span style={{ color: 'red' }}>*</span> {t("project_number")}</>}
                                            placeholder={t("project_number")}
                                            fullWidth
                                            variant="outlined"
                                            error={touched.project_number && !!errors.project_number}
                                            helperText={<ErrorMessage name="project_number" />}
                                        />
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Field name="area">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label={<><span style={{ color: 'red' }}>*</span> {t("area_location")}</>}
                                            placeholder={t("area_location")}
                                            fullWidth
                                            variant="outlined"
                                            error={touched.area && !!errors.area}
                                            helperText={<ErrorMessage name="area" />}
                                        />
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Field name="address">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label={<><span style={{ color: 'red' }}>*</span> {t("address")}</>}
                                            type="address"
                                            placeholder={t("address")}
                                            fullWidth
                                            variant="outlined"
                                            error={touched.address && !!errors.address}
                                            helperText={<ErrorMessage name="address" />}
                                        />
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={6}>
                                <Field name="contact">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label={<><span style={{ color: 'red' }}>*</span> {t("contact")}</>}
                                            placeholder={t("contact")}
                                            fullWidth
                                            type='number'
                                            variant="outlined"
                                            error={touched.contact && !!errors.contact}
                                            helperText={<ErrorMessage name="contact" />}
                                        />
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={6}>
                                <Field name="manager">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label={<><span style={{ color: 'red' }}>*</span> {t("manager")}</>}
                                            placeholder={t("manager")}
                                            fullWidth
                                            variant="outlined"
                                            error={touched.manager && !!errors.manager}
                                            helperText={<ErrorMessage name="manager" />}
                                        />
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={6}>
                                <Field name="staff">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label={<><span style={{ color: 'red' }}>*</span> {t("staff")}</>}
                                            placeholder={t("staff")}
                                            fullWidth
                                            type="text"
                                            variant="outlined"
                                            error={touched.staff && !!errors.staff}
                                            helperText={<ErrorMessage name="staff" />}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            <Grid item xs={12} style={{ display: 'flex', gap: '10px' }}>
                                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                    {t('submit')}
                                </Button>
                                <Button variant="contained" color="primary" onClick={handlenavigate}>
                                    {t('cancel')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <SnackbarAlert open={open} onClose={() => setOpen(false)} message={message} />
        </>
    );
};

export default AddressForm;
