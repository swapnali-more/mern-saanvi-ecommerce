import React, { useEffect } from 'react'
import { Loader, Message, Product } from "../../Components/index"
import { fetchProductsRequest } from '../../ReduxSaga/Actions/productsActions'
import { connect, useDispatch } from 'react-redux'
import { addProductToCart } from '../../ReduxSaga/Actions/productCartActions'
import Layout from '../../Components/Layout/Layout'
import { Grid } from '@mui/material'

const Products = ({ products, isLoading, error, fetchProductsRequest }: any) => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchProductsRequest('GET')
    }, [fetchProductsRequest])

    if (isLoading) {
        return <Loader />;
    }

    const handleAddToCart = (product: any) => {
        dispatch(addProductToCart(product))
    }

    return (
        <Layout title={""}>
            {error ? (
                <Message message={`Error: ${error.message}`} category="error"/>
            ) : !products || !Array.isArray(products) || products.length === 0 ? (
                <Message message="No Products available" category="warning"/>
            ) : (
                <Grid container spacing={2}>
                    {products.map((product: any) => (
                        <Grid item xs={3}>
                            <Product key={product?.productId} product={product} handleAddToCart={handleAddToCart} />
                        </Grid>
                    ))}
                </Grid>
            )}

        </Layout>
    )
}
const mapStateToProps = (state: {
    products: { products: any; isLoading: any; error: any },
}) => {
    return {
        products: state.products.products,
        isLoading: state.products.isLoading,
        error: state.products.error,
    }
};

const mapDispatchToProps = {
    fetchProductsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);