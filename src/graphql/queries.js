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
export const getAgent = /* GraphQL */ `
  query GetAgent($id: ID!) {
    getAgent(id: $id) {
      type
      id
      business
      area
      owner
      timestamp
    }
  }
`;
export const listAgents = /* GraphQL */ `
  query ListAgents(
    $filter: ModelAgentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAgents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        id
        business
        area
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
      title
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
        title
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
export const getRoom = /* GraphQL */ `
  query GetRoom($id: ID!) {
    getRoom(id: $id) {
      type
      id
      requestID
      requestUser
      roomTitle
      timestamp
      owner
    }
  }
`;
export const listRooms = /* GraphQL */ `
  query ListRooms(
    $filter: ModelRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        id
        requestID
        requestUser
        roomTitle
        timestamp
        owner
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      type
      id
      roomID
      userID
      context
      timestamp
      owner
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        id
        roomID
        userID
        context
        timestamp
        owner
      }
      nextToken
    }
  }
`;
export const getMember = /* GraphQL */ `
  query GetMember($id: ID!) {
    getMember(id: $id) {
      type
      id
      roomID
      roomTitle
      userID
      timestamp
      owner
    }
  }
`;
export const listMembers = /* GraphQL */ `
  query ListMembers(
    $filter: ModelMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        id
        roomID
        roomTitle
        userID
        timestamp
        owner
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
export const listAgentByTimestamp = /* GraphQL */ `
  query ListAgentByTimestamp(
    $type: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAgentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAgentByTimestamp(
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
        business
        area
        owner
        timestamp
      }
      nextToken
    }
  }
`;
export const listAgentBySpecificOwner = /* GraphQL */ `
  query ListAgentBySpecificOwner(
    $owner: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAgentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAgentBySpecificOwner(
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
        business
        area
        owner
        timestamp
      }
      nextToken
    }
  }
`;
export const listAgentBySpecificArea = /* GraphQL */ `
  query ListAgentBySpecificArea(
    $area: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAgentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAgentBySpecificArea(
      area: $area
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        id
        business
        area
        owner
        timestamp
      }
      nextToken
    }
  }
`;
export const listRequestByTimestamp = /* GraphQL */ `
  query ListRequestByTimestamp(
    $type: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequestByTimestamp(
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
        title
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
export const listRequestBySpecificOwner = /* GraphQL */ `
  query ListRequestBySpecificOwner(
    $owner: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequestBySpecificOwner(
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
        title
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
export const listRequestBySpecificArea = /* GraphQL */ `
  query ListRequestBySpecificArea(
    $area: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequestBySpecificArea(
      area: $area
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        id
        title
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
export const listRoomByID = /* GraphQL */ `
  query ListRoomByID(
    $id: ID
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoomByID(
      id: $id
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        id
        requestID
        requestUser
        roomTitle
        timestamp
        owner
      }
      nextToken
    }
  }
`;
export const listRoomByRequestID = /* GraphQL */ `
  query ListRoomByRequestID(
    $requestID: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoomByRequestID(
      requestID: $requestID
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        id
        requestID
        requestUser
        roomTitle
        timestamp
        owner
      }
      nextToken
    }
  }
`;
export const listRoomByUser = /* GraphQL */ `
  query ListRoomByUser(
    $requestUser: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoomByUser(
      requestUser: $requestUser
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        id
        requestID
        requestUser
        roomTitle
        timestamp
        owner
      }
      nextToken
    }
  }
`;
export const listMessageByRoomIDinTimestamp = /* GraphQL */ `
  query ListMessageByRoomIDinTimestamp(
    $roomID: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessageByRoomIDinTimestamp(
      roomID: $roomID
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        id
        roomID
        userID
        context
        timestamp
        owner
      }
      nextToken
    }
  }
`;
export const listMemberByRoomIDinTimestamp = /* GraphQL */ `
  query ListMemberByRoomIDinTimestamp(
    $roomID: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMemberByRoomIDinTimestamp(
      roomID: $roomID
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        id
        roomID
        roomTitle
        userID
        timestamp
        owner
      }
      nextToken
    }
  }
`;
export const listMemberByUserIDinTimestamp = /* GraphQL */ `
  query ListMemberByUserIDinTimestamp(
    $userID: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMemberByUserIDinTimestamp(
      userID: $userID
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        id
        roomID
        roomTitle
        userID
        timestamp
        owner
      }
      nextToken
    }
  }
`;
