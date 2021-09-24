/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTourist = /* GraphQL */ `
  query GetTourist($id: ID!) {
    getTourist(id: $id) {
      type
      id
      owner
      timestamp
    }
  }
`;
export const listTourists = /* GraphQL */ `
  query ListTourists(
    $filter: ModelTouristFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTourists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        id
        owner
        timestamp
      }
      nextToken
    }
  }
`;
export const getRequest = /* GraphQL */ `
  query GetRequest($id: ID!) {
    getRequest(id: $id) {
      type
      id
      area
      cost
      number
      date
      days
      genre
      range
      context
      status
      owner
      timestamp
    }
  }
`;
export const listRequests = /* GraphQL */ `
  query ListRequests(
    $filter: ModelRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        id
        area
        cost
        number
        date
        days
        genre
        range
        context
        status
        owner
        timestamp
      }
      nextToken
    }
  }
`;
export const getTag = /* GraphQL */ `
  query GetTag($id: ID!) {
    getTag(id: $id) {
      type
      id
      postID
      tag
      owner
      timestamp
    }
  }
`;
export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        id
        postID
        tag
        owner
        timestamp
      }
      nextToken
    }
  }
`;
export const listTouristByTimestamp = /* GraphQL */ `
  query ListTouristByTimestamp(
    $type: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTouristFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTouristByTimestamp(
      type: $type
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        id
        owner
        timestamp
      }
      nextToken
    }
  }
`;
export const listTouristBySpecificOwner = /* GraphQL */ `
  query ListTouristBySpecificOwner(
    $owner: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTouristFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTouristBySpecificOwner(
      owner: $owner
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        id
        owner
        timestamp
      }
      nextToken
    }
  }
`;
