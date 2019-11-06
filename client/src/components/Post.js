import React, {Component} from "react";
import axios from "axios";
import to from "await-to-js"
import { Link } from "react-router-dom"

export default class Post extends Component{
    state ={
       post:{
           "id": "",
           "title": "",
           "author": "",
           "imageurl":"",
           "content": "",
           "createdat": ""
       }
    }
    componentDidMount =async()=>{
        const  {id}  = this.props.match.params
        console.log(id)
        let [ error, result ] = await to (axios.get(`/api/posts/${id}`))
        console.log(result.data[0])
        let post = result.data[0]
        if (error){
            console.log(error)
        }
        return this.setState({post})
    }

    deletePost = async()=>{
        const  {id}  = this.props.match.params
        let [error] = await to (axios.delete(`/api/posts/${id}`))
        console.log(id)
        if(error){
            console.log('deleteItem has error',error)
        }

        return this.props.history.push("/")
    }
    changePage =()=>{
        this.props.history.push("/")
    }

    render(){
        const { id, title, author, imageurl, content } = this.state.post
        return(
            <div className='App'>
                <div key = {id} >
                    <h3>{title}</h3>
                    <h5 className='heading'>{author}</h5>
                    <img src= {imageurl} alt={title} />
                    <h5>{content}</h5>
                    <button className='btn btn-danger post-buttons' onClick={this.deletePost}>Delete Post</button>
                    <button className='btn btn-dark post-buttons'>
                        <Link to = {{
                            pathname: `/posts/${id}/edit`
                        }}
                        >Edit Post
                        </Link>
                    </button>
                    <button className='btn btn-info post-buttons' onClick={this.changePage}>Back to Home</button>

                </div>
            </div>
    )
    }
}
