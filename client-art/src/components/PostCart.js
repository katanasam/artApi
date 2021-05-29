import React from 'react'
import { Icon ,Label ,Button, Card, Image } from 'semantic-ui-react'

// pour le temps conversion des string createAt en temps
import moment from 'moment'
//import { left } from '@popperjs/core';

//! il recevrat un post en parametres
function PostCard({ post: { id, body, username ,createdAt, updateAt, numberOfLikes, numberOfComments ,likes }}){

  function likePost(){
    console.log('like post !!')
  }

  function CommentOnPost(){
    console.log('comment post !!')
  }

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
        <Button as="div" labelposition='right' basic onClick={likePost}>
          <Button size='mini' color="teal" basic >
            <Icon name='heart' /> like
          </Button>

          <Label basic color="teal" pointing="left">
            {numberOfLikes}
          </Label>

        </Button>

          <Button  as="div" labelposition='right' basic onClick={CommentOnPost}>
            <Button clas="bkg-btn " size='mini' color="blue" basic>
              <Icon name="comments"/> Coms
            </Button>

            <Label basic color='blue' basic pointing='left'>
              {numberOfComments}
            </Label>

          </Button>

      </Card.Content>
    </Card>
  )

}

export default PostCard;