import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
    }

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/products/${id}`);
            getProducts();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="container mt-5">
        <Link to="/add"  className="button is-rounded is-success mb-5">+ Add Product</Link>
        <div className="columns is-multiline">
            {products.map((product) => (
                <div className="column is-one-quarter">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-square">
                            <img src={product.url} alt="Placeholder"/>
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="media">
                            <div className="media-content">
                                <p className="title is-4">{product.name}</p>
                            </div>
                            </div>
                        </div>
                        <footer className="card-footer">
                            <Link to={`edit/${product.id}`} className="card-footer-item">Edit</Link>
                            <a onClick={()=> deleteProduct(product.id)} className="card-footer-item">Delete</a>
                        </footer>
                    </div>
                </div>
            ))}

            
        </div>
    </div>
  )
}

export default ProductList