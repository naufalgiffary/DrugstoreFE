import React,{useEffect,useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from './../components/homecomponent/Footer'
import Bounce from 'react-reveal/Bounce';
import './product.css'
import {Link} from 'react-router-dom'
import Axios from 'axios' 

const Product=()=>{
    var settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
   const [Data,setData]= useState([])

    useEffect(()=>{
      Axios.get('http://localhost:8080/product/getproduct')
      .then((res)=>{
        setData(res.data)
      })
      .catch(()=>{

      })
    },[])
  
    const Getproduct=(state,index)=>{
     

        return(

          <Bounce top>
            <Card style={{flexBasis:'25%',marginTop:10,marginRight:40,width:200}} >
            <CardContent>
              <Typography  color="textSecondary" gutterBottom>
              <img src={`http://localhost:8080/${state.banner}`} style={{width:150,height:100}}/>
              </Typography>
              <Typography variant="h5" component="h2">
                {state.nama}
              </Typography>
              <Typography  color="textSecondary">
                {state.price}
              </Typography>
              <Typography variant="body2" component="p">
                {state.deskripsi}
              
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small"><Link to={'/productdetails/'+state.id}>To details</Link></Button>
            </CardActions>
          </Card>
          </Bounce>
        )
    }
    
    return(
      <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <div style={{width:600,height:400,marginBottom:20,marginTop:20}}>
              <Slider {...settings}>
                  <div >
                    <img style={{width:600,height:400,justifyContent:"center"}} src='./images/img-1.jpg' alt="gambar"/>
                  </div>
                  <div>
                  <img style={{width:600,height:400,justifyContent:"center"}} src='./images/img-6.jpg' alt="gambar"/>
                  </div>
                    </Slider>
            </div>
        <div style={{width:'100%',height:950,marginTop:20,marginBottom:20,borderStyle:'solid',borderWidth:'3px'}} className='conten'>
            <div style={{flexWrap:'wrap',display:'flex',padding:40,justifyContent:'flex-start'}}>
              {
                  Data.map((val, index) => {
                    return Getproduct(val, index)
                })
              }
            </div>
        </div>
        <div style={{width:'100%'}}>

        <Footer/>
        </div>
      </div>
    )
}


export default Product