import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import { connect, useDispatch } from 'react-redux';
import { fetchProductDetailRequest } from '../../ReduxSaga/Actions/productsActions';
import { useParams } from 'react-router-dom';
import { Grid, Typography, InputLabel, Select, MenuItem, Box, Button, TextField } from '@mui/material';

const ProductDetail = ({ productDetail }: any) => {
  const { id } = useParams();
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [disableIncr, setDisableIncr] = useState(false)
  const [disableDecr, setDisableDecr] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetailRequest(id, 'GET'))
  }, [dispatch, id]);

  const sizes: any = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleChange = (e: any) => {
    setSize(e.target.value)
  }

  const handleQuantityIncr = () => {
    if (quantity === 9) {
      setDisableIncr(true);
    }
    setQuantity(quantity + 1);
    setDisableDecr(false);
  };

  const handleQuantityDecr = () => {
    if (quantity === 2) {
      setDisableDecr(true);
    }
    setQuantity(quantity - 1);
    setDisableIncr(false);
  };

  return (
    <Layout title={""}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <img src={productDetail.productImage} alt={productDetail.productTitle}
            style={{ width: '100%' }} />
        </Grid>
        <Grid xs={8} pl={4}>
          <Typography variant='h3' mb={2}>{productDetail.productTitle}</Typography>
          <Typography variant='body1' mb={2}>{productDetail.productDesc}</Typography>

          <Typography variant='h5' mb={2}>${productDetail.productPrice}</Typography>

          <Box display='flex' mb={6}>
            <Box>
              <InputLabel id="size" sx={{mb: 1}}>Size</InputLabel>
              <Select
                id="size"
                label="Size"
                size="small"
                name="size"
                value={size}
                onChange={e => handleChange(e)}
              >
                {sizes.map((size: any) => (
                  <MenuItem value={size}>{size}</MenuItem>
                ))}
              </Select>
            </Box>
            <Box ml={3}>
              <InputLabel id="size" sx={{mb: 1}}>Quantity</InputLabel>
              <Box display='flex'>
                <Button onClick={handleQuantityDecr} disabled={disableDecr} variant="contained" sx={{ minWidth: 20, borderRadius: 0 }}>
                  -
                </Button>
                <TextField id="quantity" label="Quantity" 
                size="small" name="quantity" value={quantity} sx={{width: 60, borderRadius: 0 }}/>
                <Button onClick={handleQuantityIncr} disabled={disableIncr} variant="contained" sx={{ minWidth: 20, borderRadius: 0 }}>
                  +
                </Button>
              </Box>
            </Box>
          </Box>

          <Button variant='contained'>Add to Cart</Button>
        </Grid>
      </Grid>
    </Layout>
  );
}

const mapStateToProps = (state: { productDetail: { productDetail: any } }) => {
  console.log(state);
  return {
    productDetail: state.productDetail.productDetail,
  };
};

const mapDispatchToProps = {
  fetchProductDetailRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
