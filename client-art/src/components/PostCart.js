import React from 'react'
import { Icon ,Label ,Button, Card, Image } from 'semantic-ui-react'

// pour les line import link
import {Link} from 'react-router-dom'


// pour le temps conversion des string createAt en temps
import moment from 'moment'

//! il recevrat un post en parametres
function PostCard({ post: { id, body, username ,createdAt, updateAt, numberOfLikes, numberOfComments ,likes }}){

function likePost(){
console.log('object')
}

function commentOnPost(){
  console.log('object')
  }
  
  

    return (
     <Card fluid>
    <Card.Content>
      <Image
        floated='right'
        size='mini'
        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
      />
      <Card.Header>{username}</Card.Header>
      {/* donne nous la date de creation depuis maintenant */}
      <Card.Meta as={Link} to={`/posts/${id}`}> {moment(createdAt).fromNow()} </Card.Meta>
      <Card.Description>{body}</Card.Description>
    </Card.Content>
    <Card.Content extra>
    <Button  as='div' labelPosition='right' basic onClick={likePost}>
      <Button size='mini' color='teal'>
        <Icon name='heart' />
        Like
      </Button>
      <Label  size='mini' basic color='teal' pointing='left'>
        {numberOfLikes}
      </Label>
    </Button>

    <Button  as='div' labelPosition='right' basic onClick={commentOnPost}>
      <Button size='mini' color='blue'>
        <Icon name='comments' />
        Coms
      </Button>
      <Label  size='mini' basic color='blue' pointing='left'>
        {numberOfComments}
      </Label>
    </Button>

    </Card.Content>
  </Card>
    )

}


export default PostCard;