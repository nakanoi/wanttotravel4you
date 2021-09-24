import React, { useState, useEffect, useReducer } from 'react';
import {API, graphqlOperation } from 'aws-amplify';
import { useParams } from 'react-router';
import { listPostsBySpecificOwner } from '../graphql/queries';


const reducer = (state, action) => {
  switch (action.type) {
    case INITIAL_QUERY:
      return action.posts;
    case ADDITIONAL_QUERY:
      return [...state, ...action.posts]
    case SUBSCRIPTION:
      return [action.post, ...state]
    default:
      return state;
  }
};

const AllRequest = () => {
  const { userID } = useParams();

  const [requests, dispatch] = useReducer(reducer, []);
  const [nextToken, setNextToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getRequest = async (type, nextToken = null) => {
    const res = await API.graphql(graphqlOperation(listPostsBySpecificOwner, {
      owner: userID,
      sortDirection: 'DESC',
      limit: 10,
      nextToken: nextToken,
    }));
    console.log(res);
    dispatch({ type: type, posts: res.data.listPostsBySpecificOwner.items })
    setNextToken(res.data.listPostsBySpecificOwner.nextToken);
    setIsLoading(false);
  }

  const getAdditionalPosts = () => {
    if (nextToken === null) return; //Reached the last page
    getRequest(ADDITIONAL_QUERY, nextToken);
  }


  useEffect(() => {
    getRequest(INITIAL_QUERY);

    const subscription = API.graphql(graphqlOperation(
        onCreatePost
      )
    ).subscribe({
      next: (msg) => {
        const post = msg.value.data.onCreatePost;
        if (post.owner !== userID) return;
        dispatch({ type: SUBSCRIPTION, post: post });
      }
    });
    return () => subscription.unsubscribe();
  }, []);


  return (
    <React.Fragment>
      <Sidebar 
        activeListItem='profile'
      />
      <PostList
        isLoading={isLoading}
        posts={posts}
        getAdditionalPosts={getAdditionalPosts}
        listHeaderTitle={userId}
      />
    </React.Fragment>
  )
}

export default AllRequest;
