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
