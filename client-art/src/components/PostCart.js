import React from 'react'
import { Icon ,Label ,Button, Card, Image } from 'semantic-ui-react'

// pour le temps conversion des string createAt en temps
import moment from 'moment'

//! il recevrat un post en parametres
function PostCard({ post: { id, body, username ,createdAt, updateAt, numberOfLikes, numberOfComments ,likes }}){

    return (
     <Card>
    <Card.Content>
      <Image
        floated='right'
        size='mini'
        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
      />
      <Card.Header>{username}</Card.Header>
      {/* donne nous la date de creation depuis maintenant */}
      <Card.Meta> {moment(createdAt).fromNow()} </Card.Meta>
      <Card.Description>{body}</Card.Description>
    </Card.Content>
    <Card.Content extra>
     
    </Card.Content>
  </Card>
    )

}


export default PostCard;