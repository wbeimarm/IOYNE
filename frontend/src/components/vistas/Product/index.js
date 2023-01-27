import React from 'react'
import PropTypes from 'prop-types'
import '../assets/styles.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const Product = ({ product, handleAddToCart }) => {
  return (
    <Card className="Products-item"  sx={{ maxWidth: 345 }}>
    <CardActionArea>
      <CardMedia
        className="Products-item-img"
        component="img"
        height="140"
        image={product.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {product.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
           $
                  {' '}
                     {product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleAddToCart(product)} size="small">Comprar</Button>
      </CardActions>
    </CardActionArea>
  </Card>    
  )
}

Product.propTypes = {
  product: PropTypes.func.isRequired,
  handleAddToCart: PropTypes.func.isRequired
}

export default Product