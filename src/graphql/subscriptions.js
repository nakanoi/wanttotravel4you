/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTourist = /* GraphQL */ `
  subscription OnCreateTourist {
    onCreateTourist {
      type
      id
      owner
      timestamp
    }
  }
`;
export const onDeleteTourist = /* GraphQL */ `
  subscription OnDeleteTourist {
    onDeleteTourist {
      type
      id
      owner
      timestamp
    }
  }
`;
export const onCreateAgent = /* GraphQL */ `
  subscription OnCreateAgent {
    onCreateAgent {
      type
      id
      business
      area
      owner
      timestamp
    }
  }
`;
export const onUpdateAgent = /* GraphQL */ `
  subscription OnUpdateAgent {
    onUpdateAgent {
      type
      id
      business
      area
      owner
      timestamp
    }
  }
`;
export const onDeleteAgent = /* GraphQL */ `
  subscription OnDeleteAgent {
    onDeleteAgent {
      type
      id
      business
      area
      owner
      timestamp
    }
  }
`;
export const onCreateRequest = /* GraphQL */ `
  subscription OnCreateRequest {
    onCreateRequest {
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
export const onDeleteRequest = /* GraphQL */ `
  subscription OnDeleteRequest {
    onDeleteRequest {
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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag {
    onCreateTag {
      type
      id
      postID
      tag
      owner
      timestamp
    }
  }
`;
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag {
    onDeleteTag {
      type
      id
      postID
      tag
      owner
      timestamp
    }
  }
`;
