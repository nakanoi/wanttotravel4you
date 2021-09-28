/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTourist = /* GraphQL */ `
  mutation CreateTourist(
    $input: CreateTouristInput!
    $condition: ModelTouristConditionInput
  ) {
    createTourist(input: $input, condition: $condition) {
      type
      id
      owner
      timestamp
    }
  }
`;
export const deleteTourist = /* GraphQL */ `
  mutation DeleteTourist(
    $input: DeleteTouristInput!
    $condition: ModelTouristConditionInput
  ) {
    deleteTourist(input: $input, condition: $condition) {
      type
      id
      owner
      timestamp
    }
  }
`;
export const createAgent = /* GraphQL */ `
  mutation CreateAgent(
    $input: CreateAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    createAgent(input: $input, condition: $condition) {
      type
      id
      business
      area
      owner
      timestamp
    }
  }
`;
export const updateAgent = /* GraphQL */ `
  mutation UpdateAgent(
    $input: UpdateAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    updateAgent(input: $input, condition: $condition) {
      type
      id
      business
      area
      owner
      timestamp
    }
  }
`;
export const deleteAgent = /* GraphQL */ `
  mutation DeleteAgent(
    $input: DeleteAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    deleteAgent(input: $input, condition: $condition) {
      type
      id
      business
      area
      owner
      timestamp
    }
  }
`;
export const createRequest = /* GraphQL */ `
  mutation CreateRequest(
    $input: CreateRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    createRequest(input: $input, condition: $condition) {
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
export const updateRequest = /* GraphQL */ `
  mutation UpdateRequest(
    $input: UpdateRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    updateRequest(input: $input, condition: $condition) {
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
export const deleteRequest = /* GraphQL */ `
  mutation DeleteRequest(
    $input: DeleteRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    deleteRequest(input: $input, condition: $condition) {
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
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
      type
      id
      postID
      tag
      owner
      timestamp
    }
  }
`;
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
      type
      id
      postID
      tag
      owner
      timestamp
    }
  }
`;
export const createRoom = /* GraphQL */ `
  mutation CreateRoom(
    $input: CreateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    createRoom(input: $input, condition: $condition) {
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
export const deleteRoom = /* GraphQL */ `
  mutation DeleteRoom(
    $input: DeleteRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    deleteRoom(input: $input, condition: $condition) {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
export const createMember = /* GraphQL */ `
  mutation CreateMember(
    $input: CreateMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    createMember(input: $input, condition: $condition) {
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
export const deleteMember = /* GraphQL */ `
  mutation DeleteMember(
    $input: DeleteMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    deleteMember(input: $input, condition: $condition) {
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
