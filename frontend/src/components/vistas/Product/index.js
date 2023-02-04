import React from 'react'
import PropTypes from 'prop-types'
import '../assets/Styles.css'
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
        image={product.imagen}
        alt="green iguana"
      />
      <CardContent>
     <Typography gutterBottom variant="h6" component="div">
     {product.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        $
                  {' '}
                     {product.valorVenta}
        </Typography>
      </CardContent>
      <CardActions>
        <Button  onClick={()=> handleAddToCart(product)} variant="contained">Agregar</Button>
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