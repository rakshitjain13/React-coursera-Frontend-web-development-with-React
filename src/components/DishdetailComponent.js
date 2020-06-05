import  React from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({dish}){
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
  

    function formatDate({ date }) {
        return new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
      }
    function  RenderComments({comments}){
        if (comments != null) {

            let list = comments.map((comments)=>{

                let date = comments.date
                // console.log(this.formatDate({date}))

                return(

                    <li key={comments.id} >
                        <p>{comments.comment}</p>
                        <p>--{comments.author},{formatDate({date})}</p>
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
    const Dishdetail= (props)=>{
        if(props.dish){
            return(
                <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish}/>
            </div>
             <div className="col-12 col-md-5 m-1">
             <RenderComments comments={props.dish.comments}/>
             </div>
             </div>
            );
        }else{
            return( <div></div> );
        }
    }
    export default Dishdetail;

