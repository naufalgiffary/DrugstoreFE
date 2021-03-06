import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {connect} from 'react-redux'
import Axios from 'axios'
import { Button } from '../components/homecomponent/Button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { API_URLbe,priceFormatter } from '../helper/idformat';
// import { TablePagination } from '@material-ui/core';
class History extends Component {
state = {
    history:[],
    dataselect:[],
    isOpen:false
}

componentDidMount(){
    Axios.get(`${API_URLbe}/trans/getcompleted`)
    .then((res)=>{
        this.setState({history:res.data})
    })
}

dateformat=(n)=>{
    var today = new Date(n);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    return today
}

todetails=(id)=>{
    Axios.get(`${API_URLbe}/transactionsdetails?transactions_id=${id}&_expand=product`)
    .then((res)=>{
        this.setState({dataselect:res.data,isOpen:true})
    }).catch((err)=>{
        console.log(err)
    })
}

renderTable=()=>{
    return this.state.history.map((val,index)=>{
        return(
        <TableRow key={val.id}>
            <TableCell>{index+1}</TableCell>
            <TableCell>
                {val.metode}
            </TableCell>
            <TableCell>{this.dateformat(val.tanggal)}</TableCell>
            <TableCell>
                <Button onClick={()=>this.todetails(val.id)}>
                    Details
                </Button>
            </TableCell>
        </TableRow>
        )
    })
}
renderDetails=()=>{
    return this.state.dataselect.map((val,index)=>{
        return(
        <TableRow key={val.id}>
            <TableCell>{index+1}</TableCell>
            <TableCell>
                {val.nama}
            </TableCell>
            <TableCell>
                <div style={{width:200,height:100}}>
                    <img src={val.product.banner} width='100%' height='100%' alt={index}/>
                </div>
            </TableCell>
            <TableCell>
                {val.qty}
            </TableCell>
            <TableCell>
                { priceFormatter(val.price)}
            </TableCell>
            <TableCell>
                { priceFormatter(val.price*val.qty)}
            </TableCell>
        </TableRow>
        )
    })
}
totalharga=()=>{
    var total=0
    for(let i=0;i<this.state.dataselect.length;i++){
        total+=(this.state.dataselect[i].price*this.state.dataselect[i].qty)
    }
    return total
    // return this.state.dataselect.reduce((val,num)=>{
    //     return val +(num.price*num.qty)
    // },0)
}
render() { 
    return (
        <div>
            <div style={{marginTop:50, alignItems:'center', justifyContent:'center'}}>
                <h1 style={{marginBottom:30}}>Your Transaction History!</h1>
                <div className='d-flex justify-content-center pt-3'>
                    <Paper style={{width:'50%'}}>
                        <TableContainer >
                            <Table  stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{width:50}}>No.</TableCell>
                                    <TableCell>Metode Pembayaran</TableCell>
                                    <TableCell>Tanggal pembayaran</TableCell>
                                    <TableCell>Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.renderTable()}
                            </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            </div>
            <Modal scrollable style={{marginTop:80}} size='lg' isOpen={this.state.isOpen} toggle={()=>this.setState({isOpen:false})}>
                <ModalHeader toggle={()=>this.setState({isOpen:false})}>
                    Details
                </ModalHeader>
                <ModalBody>
                        <Table style={{width:'100%'}}  stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{width:50}}>No.</TableCell>
                                    <TableCell>Nama product</TableCell>
                                    <TableCell>Gambar</TableCell>
                                    <TableCell>qty</TableCell>
                                    <TableCell>Harga</TableCell>
                                    <TableCell>Subtotal</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.renderDetails()}
                                <TableRow >
                                    <TableCell></TableCell>
                                    <TableCell>
                                        
                                    </TableCell>
                                    <TableCell>
                                        
                                    </TableCell>
                                    <TableCell>
                                        
                                    </TableCell>
                                    <TableCell>
                                        TOTAL 
                                    </TableCell>
                                    <TableCell>
                                        { priceFormatter(this.totalharga())}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={()=>this.setState({isOpen:false})}>
                        OK
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
        );
}
}
const MapstatetoProps=({Auth})=>{
return {
    Auth:Auth
}
} 
export default connect(MapstatetoProps) (History);