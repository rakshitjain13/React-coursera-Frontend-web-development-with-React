import  React,{ Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
export default class  DishDetail extends Component{
    constructor(props){
        super(props);
        this.state={

        }
        console.log("Dishdetails");
    }
    renderDish(dish) {
        if (dish != null) {
            return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }
    formatDate({ date }) {
        return new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
      }
    renderComments(comments){
        if (comments != null) {

            let list = comments.map((comments)=>{

                let date = comments.date
                // console.log(this.formatDate({date}))

                return(

                    <li key={comments.id} >
                        <p>{comments.comment}</p>
                        <p>--{comments.author},{this.formatDate({date})}</p>
                    </li>


                )
            })

            return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {list}
                    </ul>
                </div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }
    render(){
            if(this.props.dish){
                return(
                    <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                 <div className="col-12 col-md-5 m-1">
                 {this.renderComments(this.props.dish.comments)}
                 </div>
                 </div>
                );
            }else{
                return( <div></div> );
            }
    }

}