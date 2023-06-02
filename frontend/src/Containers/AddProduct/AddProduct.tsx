import { fetchProductsRequest } from '../../ReduxSaga/Actions/productsActions';
import { createProductRequest } from '../../ReduxSaga/Actions/addProductActions';
import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from "yup";
import FileBase from "react-file-base64";
import Layout from '../../Components/Layout/Layout';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { SIZE as sizes, MAIN_CATEGORY as categories } from '../../config';

const validationSchema = Yup.object().shape({
  productTitle: Yup.string().required('Product Name is required'),
  productPrice: Yup.number()
    .required('Product Price is required')
    .test('is-positive', 'Price should not be negative', value => value >= 0),
  productDesc: Yup.string().required('Product Description is required'),
  productCategory: Yup.string().required("Product Category is required"),
  productImage: Yup.string().required("Product Image is required"),
  productSizes: Yup.array().min(1, 'At least one size is required').required("Product Size is required"),
});

interface AddProductProps {
  products: {
    productId: string,
    productTitle: string;
    productPrice: string;
    productDesc: string;
    productCategory: string;
    productImage: string;
    productSizes: string[];
  }[];
  isLoading: any;
  error: any;
}

interface FormikErrorsWithIndexSignature {
  [key: string]: string | string[];
}

const AddProduct = ({ products, isLoading, error }: AddProductProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsRequest('GET'))
  }, [dispatch])

  const handleSizeCheckboxChange = (value: string) => {
    const index = values.productSizes.indexOf(value);
    if (index >= 0) {
      const sizes = [...values.productSizes];
      sizes.splice(index, 1);
      formik.setFieldValue("productSizes", sizes);
    } else {
      formik.setFieldValue("productSizes", [...values.productSizes, value]);
    }
  };

  const isProductTitleRepeated = (title: any, products: any) => {
    return products.some((product: any) => product.productTitle === title);
  };

  const formik = useFormik({
    initialValues: {
      productTitle: products.length > 0 ? products[0].productTitle : "",
      productPrice: products.length > 0 ? products[0].productPrice : "",
      productDesc: products.length > 0 ? products[0].productDesc : "",
      productCategory: products.length > 0 ? products[0].productCategory : "",
      productImage: products.length > 0 ? products[0].productImage : "",
      productSizes: products.length > 0 ? products[0].productSizes : []
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const isTitleRepeated = isProductTitleRepeated(values.productTitle, products);
      if (isTitleRepeated) {
        formik.setErrors({ productTitle: "Product name already exists" });
      } else {
        const lastProductId = products[0] ? parseInt(products[0].productId.substring(3), 10) : 0;
        const newProductId = `pro${(lastProductId + 1).toString().padStart(6, '0')}`
        const newProductData = { ...values, createdDate: new Date().toISOString(), productId: newProductId, productSizes: values.productSizes, }
        dispatch(createProductRequest('POST', newProductData))
        resetForm();
      }
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
  });

  const { values, touched, errors }: { values: any, touched: any, errors: FormikErrorsWithIndexSignature } = formik;

  return (
    <Layout title="Add Product">
      <Box className="" component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              {["productTitle", "productPrice", "productDesc", "productCategory", "productImage", "productSizes"].map((input) => (
                <Grid item xs={6}>
                  <FormControl fullWidth sx={{mb: 2}}>
                    {input === "productCategory" ? (
                      <>
                        <InputLabel id={input}>{input.replace(/product/g, '').replace(/^\w/, (c) => c.toUpperCase())}</InputLabel>
                        <Select
                          id={input}
                          size="small"
                          label={input.replace(/product/g, '').replace(/^\w/, (c) => c.toUpperCase())}
                          name={input}
                          value={values[input]}
                          onChange={formik.handleChange}
                        >
                          {categories.map(({ name, link }) => (
                            <MenuItem value={name} key={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    ) : input === "productImage" ? (
                      <>
                        <FormLabel htmlFor={input}>
                          {input.replace(/product/g, '').replace(/^\w/, (c) => c.toUpperCase())}
                        </FormLabel>
                        <FileBase
                          type="file"
                          multiple={false}
                          onDone={({ base64 }: any) => formik.setFieldValue("productImage", base64)}
                        />
                      </>
                    ) : input === "productSizes" ? (
                      <>
                        <FormLabel htmlFor={input}>
                          {input.replace(/product/g, '').replace(/^\w/, (c) => c.toUpperCase())}
                        </FormLabel>
                        <Box display="flex" flexWrap="wrap">
                          {sizes.map((size: any) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  id={size}
                                  value={size}
                                  onChange={() => handleSizeCheckboxChange(size)}
                                  checked={values[input].includes(size)}
                                />
                              }
                              label={size}
                              key={size}
                            />
                          ))}
                        </Box>
                      </>
                    ) : input === "productDesc" ? (
                      <TextField
                        id={input}
                        size="small"
                        label={input.replace(/product/g, '').replace(/^\w/, (c) => c.toUpperCase())}
                        name={input}
                        value={values[input]}
                        onChange={formik.handleChange}
                        multiline
                        rows={4}
                      />
                    ) : (
                      <TextField
                        id={input}
                        size="small"
                        label={input.replace(/product/g, '').replace(/^\w/, (c) => c.toUpperCase())}
                        name={input}
                        value={values[input]}
                        onChange={formik.handleChange}
                      />
                    )}
                    {touched[input] && errors[input] && (
                      <FormHelperText id="my-helper-text">{errors[input]}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained">Add Product</Button>
      </Box>
    </Layout>
  )
}
const mapStateToProps = (state: { addProduct: { isLoading: any; error: any }, products: { products: any; } }) => ({
  products: state.products.products,
  isLoading: state.addProduct.isLoading,
  error: state.addProduct.error,
});

const mapDispatchToProps = {
  createProductRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);