import { Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface ProductProps {
  product: {
    productId: string;
    productTitle: string;
    productPrice: string;
    productDesc: string;
    productImage: string;
    productCategory: string;
  };
  handleAddToCart: (product: any) => void;
}

const Product = ({ product }: ProductProps) => {
  return (
    <>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={product.productImage}
            alt={product.productTitle}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.productTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${product?.productPrice}
            </Typography>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <Link key={product?.productId} to={product?.productId}>Know More</Link>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default Product
