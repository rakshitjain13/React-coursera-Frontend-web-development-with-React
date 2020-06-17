import  React,{Component}from "react";
import { Card, CardImg, CardText, CardBody,Button,
    CardTitle, Breadcrumb, BreadcrumbItem ,Modal,ModalBody,ModalHeader,Row ,Col, Label} from 'reactstrap';
 import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderDish({dish}){
    if (dish != null) {
        return(
          <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        )
    }
    else{
        return(
            <div></div>
        )
    }

}
  

    function formatDate({ date }) {
        return new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
      }
    function  RenderComments({comments,postComment,dishId}){
        if (comments != null) {

            let list =<Stagger in>{ comments.map((comments)=>{

                let date = comments.date;
                // console.log(this.formatDate({date}))

                return(

                         <Fade in>
                    <li key={comments.id} >
                        <p>{comments.comment}</p>
                        <p>--{comments.author},{formatDate({date})}</p>
                    </li>
                        </Fade>

                )
            })}</Stagger>

            return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {list}
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment} />
                </div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }
    class CommentForm extends Component{
        constructor(props){
            super(props);
            this.state = {
                isModalOpen: false
            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit=this.handleSubmit.bind(this);
        }
        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
          }
          handleSubmit(values) {
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        }
        render(){
            const required = (val) => val && val.length;
            const maxLength = (len) => (val) => !(val) || (val.length <= len);
            const minLength = (len) => (val) => val && (val.length >= len);
            return(
                <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={(values)=>this.toggleModal(values)}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col className="col-12">
                                    <Control.select model=".rating" id="rating" for="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your name</Label>
                                <Col className="col-12">
                                    <Control.text model=".author" id="author" for="author" className="form-control"
                                    placeholder="Your name"
                                    validators={
                                        {
                                            required,minLength: minLength(3),maxLength :maxLength(15)
                                        }
                                    }></Control.text>
                                    <Errors className="text-danger"
                                    show="touched" model=".name" 
                                    messages={{
                                        required :'Required',
                                        minLength: 'Must be greater than 2 numbers',
                                        maxLength: 'Must be 15 numbers or less'
                                    }}></Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col className="col-12">
                                    <Control.textarea model=".comment" id="comment" name="comment" class="form-control"
                                    rows="6"></Control.textarea>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </div>





            );
        }


    }
    const Dishdetail= (props)=>{
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }else if(props.dish!=null)
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments}
                    postComment={props.postComment}
                    dishId={props.dish.id}
                />
                </div>
            </div>
            </div>
        );
    }
    export default Dishdetail;

