import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import SnackbarAlert from '../../CustomComponents/SnackbarAlert';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { estimatevalidationSchema } from '../../../utils/validationSchemas';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

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
    const [initialEstimate, setInitialEstimate] = useState([{
        projectData: [{
            item: "Product",
            item_description: "this is dummmy!",
            unit: "KG",
            quantity: "2",
            price: "100",
            percentage: "10%",
            margin: "",
            total: ""
        }],
        projectname: 'Electric'
    }]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlenavigate = () => {
        navigate('/estimate');
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

    const handleAddMainRow = () => {
        setInitialEstimate(prevState => [
            ...prevState,
            {
                projectData: [{
                    item: "Product",
                    item_description: "this is dummmy!",
                    unit: "KG",
                    quantity: "2",
                    price: "100",
                    percentage: "10%",
                    margin: "",
                    total: ""
                }],
                projectname: 'Electric'
            }
        ]);
    };

    const handleAddfields = (mainIndex) => {
        const newEstimate = [...initialEstimate];
        newEstimate[mainIndex].projectData.push({
            item: "",
            item_description: "",
            unit: "",
            quantity: "",
            price: "",
            percentage: "",
            margin: "",
            total: ""
        });
        setInitialEstimate(newEstimate);
    };

    const handleRemoveFields = (mainIndex, index) => {
        const newEstimate = [...initialEstimate];
        if (newEstimate[mainIndex].projectData.length > 1) {
            newEstimate[mainIndex].projectData.splice(index, 1);
            setInitialEstimate(newEstimate);
        }
    };

    const calculateTotal = (quantity, price, percentage, margin) => {
        const totalWithoutMargin = quantity * price;
        const marginAmount = totalWithoutMargin * (parseFloat(percentage) / 100);
        return totalWithoutMargin + marginAmount;
    };

    const handleFieldChange = (mainIndex, index, fieldName, value) => {
        const newEstimate = [...initialEstimate];
        newEstimate[mainIndex].projectData[index][fieldName] = value;

        if (fieldName === 'quantity' || fieldName === 'price' || fieldName === 'percentage') {
            const { quantity, price, percentage } = newEstimate[mainIndex].projectData[index];
            newEstimate[mainIndex].projectData[index].total = calculateTotal(quantity, price, percentage);
        }

        setInitialEstimate(newEstimate);
    };

    const calculateRowTotal = (mainIndex) => {
        const estimate = initialEstimate[mainIndex];
        return estimate.projectData.reduce((rowSum, item) => {
            return rowSum + parseFloat(item.total || 0);
        }, 0);
    };


    const calculateAllRowsTotal = () => {
        return initialEstimate.reduce((grandTotal, _, mainIndex) => {
            return grandTotal + calculateRowTotal(mainIndex);
        }, 0);
    };

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={estimatevalidationSchema}
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
                            {initialEstimate.map((estimate, mainIndex) => (
                                <Grid key={mainIndex} item xs={12} container alignItems="center" spacing={2}>
                                    <Grid item>
                                        <IconButton color="primary" onClick={handleAddMainRow}>
                                            <AddCircleIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs>
                                        <fieldset>
                                            <legend>
                                                <TextField
                                                    type='text'
                                                    value={estimate.projectname}
                                                    placeholder={t("project_number")}
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    margin="dense"
                                                />
                                            </legend>
                                            {estimate.projectData.map((small, index) => (
                                                <Grid key={index} item xs={12} container alignItems="center" spacing={2}>
                                                    <Grid item xs>
                                                        <TextField
                                                            type='text'
                                                            value={small.item}
                                                            placeholder={"Item"}
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            margin="dense"
                                                            onChange={(e) => handleFieldChange(mainIndex, index, 'item', e.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <TextField
                                                            type='text'
                                                            value={small.item_description}
                                                            placeholder={"Item Description"}
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            margin="dense"
                                                            onChange={(e) => handleFieldChange(mainIndex, index, 'item_description', e.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <TextField
                                                            type='text'
                                                            value={small.unit}
                                                            placeholder={"Unit"}
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            margin="dense"
                                                            onChange={(e) => handleFieldChange(mainIndex, index, 'unit', e.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <TextField
                                                            type='number'
                                                            value={small.quantity}
                                                            placeholder={"Quantity"}
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            margin="dense"
                                                            onChange={(e) => handleFieldChange(mainIndex, index, 'quantity', e.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <TextField
                                                            type='number'
                                                            value={small.price}
                                                            placeholder={"Price"}
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            margin="dense"
                                                            onChange={(e) => handleFieldChange(mainIndex, index, 'price', e.target.value)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <TextField
                                                            type='text'
                                                            value={small.percentage}
                                                            placeholder={"Percentage"}
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            margin="dense"
                                                            onChange={(e) => handleFieldChange(mainIndex, index, 'percentage', e.target.value)}
                                                        />
                                                    </Grid>

                                                    <Grid item xs>
                                                        <TextField
                                                            type='number'
                                                            value={small.total}
                                                            placeholder={"Total"}
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            margin="dense"
                                                            InputProps={{
                                                                readOnly: true,
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <IconButton color="primary" onClick={() => handleAddfields(mainIndex)}>
                                                            <AddCircleIcon />
                                                        </IconButton>
                                                        <IconButton color="primary" onClick={() => handleRemoveFields(mainIndex, index)}>
                                                            <RemoveCircleIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                            <span style={{ margin: '10px' }}>Main Total: {calculateRowTotal(mainIndex)}</span>

                                        </fieldset>
                                    </Grid>
                                </Grid>
                            ))}

                            <Grid item xs={12}>
                                <span style={{ margin: '10px' }}>Overall Total: {calculateAllRowsTotal()}</span>
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" fullWidth variant="contained" color="primary" disabled={isSubmitting}>
                                    {t("submit")}
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <SnackbarAlert
                open={open}
                message={message}
                onClose={() => setOpen(false)}
            />
        </>
    );
};

export default AddressForm;
