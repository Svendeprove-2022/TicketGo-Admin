import { gql } from "@apollo/client"


export const GET_EVENT = gql`
query getEvent($eventId: ObjectId!){
  event(query: {_id:$eventId}) {
      _id
		  age_restriction
		  images
		  info
		  name
		  note
		  rank
		  status
		  tickets_capacity
		  tickets_limit
		  tickets_sold
		  timestamp
		  url
      venue{
        _id
        name
      }
    }
  }
`

export const GET_EVENTS = gql`
query {
    events {
      _id
      name
      venue {
        _id
        name
      }
      tickets_sold
    }
  }
`

export const GET_VENUES = gql`
query getVenues {
  venues {
    _id
    name
    address
    city
    country
    name
    note
    url
    zip_code
  }
}
`

export const GET_USERS = gql`
query getUsers{users {
    _id
    address
    city
    country
    email
    first_name
    last_name
    mobile
    zip_code
  }}
`


export const GET_VENUE = gql`
query getVenue($venueId: ObjectId!){
  venue(query:{_id:$venueId}){
    _id
    name
    address
    city
    country
    zip_code
    note
    url
  }
}
`

export const GET_USER = gql`
query getUser($userId: ObjectId!){
    user(query:{_id:$userId}) {
    _id
    address
    city
    country
    email
    first_name
    last_name
    mobile
    zip_code
  }}
`
