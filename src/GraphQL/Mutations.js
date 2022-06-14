import { gql } from "@apollo/client"

export const CREATE_EVENT = gql`
mutation CreateEvent(
  $eventName: String, 
  $venueId: ObjectId!, 
  $eventinfo: String, 
  $eventnote: String, 
  $tickets_capacity: Int, 
  $tickets_sold: Int, 
  $tickets_limit: Int, 
  $age_restriction: String,
  $eventend: DateTime, $eventstart:DateTime, $eventspan: Int, $evententry: DateTime){
    insertOneEvent(
      data: {
        name:$eventName, 
        venue:{link:$venueId},
        dates:{end: $eventend, start:$eventstart, span: $eventspan, entry: $evententry},
        info:$eventinfo,
        note:$eventnote,
        tickets_capacity:$tickets_capacity,
        tickets_limit:$tickets_limit,
        tickets_sold:$tickets_sold,
        age_restriction:$age_restriction
      }) {
    _id
    name
  }
}`

export const DELETE_EVENT = gql`
mutation test($eventId:ObjectId){
    deleteOneEvent(query: {_id: $eventId}) {
    _id
  }
}
`

export const UPDATE_EVENT = gql`
mutation updateEvent(
  $eventId: ObjectId!, 
  $age_restriction: String, 
  $info: String, 
  $name: String, 
  $note: String,
  $tickets_capacity: Int,
  $tickets_sold: Int,
  $tickets_limit: Int,
  $timestamp: DateTime,
  $venueId: ObjectId!
  ){
  updateOneEvent(
    query: {_id: $eventId}, 
    set:{
      name:$name, 
      age_restriction:$age_restriction, 
      tickets_capacity:$tickets_capacity, 
      info: $info, 
      note: $note,
      tickets_sold: $tickets_sold,
      tickets_limit: $tickets_limit,
      timestamp: $timestamp,
      venue: { link:$venueId }
    } 
  ){
    _id
    name
    age_restriction
    info
    tickets_capacity
    tickets_sold
    tickets_limit
    timestamp
    venue{
      _id
    }
}}
`

export const UPDATE_USER = gql`
mutation updateUser(
  $userId: ObjectId!, 
  $firstName: String!,
  $lastName: String!){
    updateOneUser(
      query:{_id:$userId}, 
      set:{
        first_name:$firstName,
        last_name:$lastName
      }){
  _id
  first_name
  last_name
}}
`

export const DELETE_USER = gql`
mutation deleteUser($userId:ObjectId){
  deleteOneUser(query: {_id: $userId}) {
    _id
  }
}
`
export const CREATE_VENUE = gql`
mutation createVenue($venuename:String, $city:String, $country:String, $address:String, $zip_code:String, $note:String, $url:String) {
  insertOneVenue(data: {
    name:$venuename,
    city:$city,
    address:$address,
    country:$country,
    zip_code:$zip_code,
    note:$note,
    url:$url
  }){
    _id
  }}
`

export const UPDATE_VENUE = gql`
mutation updateVenue($venueId:ObjectId,
  $venuename:String, $city:String, 
  $country:String, $address:String, 
  $zip_code:String, $note:String, $url:String){
  updateOneVenue(
    query:{_id:$venueId},
    set:{
      name:$venuename,
      city:$city,
      address:$address,
      country:$country,
      zip_code:$zip_code,
      note:$note,
      url:$url
    }
  ){
    _id
  }
}
`

export const DELETE_VENUE = gql`
mutation deleteVenue($venueId:ObjectId!){
  deleteOneVenue(query: {_id: $venueId}){
    _id
  }
}
`

export const CREATE_ORDER = gql`
mutation CreateOrder($eventId:ObjectId, $tickets:[TicketInsertInput], $status:String, $userId: ObjectId){
  insertOneOrder(data:{
    tickets:{create:$tickets},
    event: {link:$eventId},
    user: {link:$userId},
    status: $status
}){
  _id
}}
`

export const DELETE_ORDER = gql`
mutation deleteOrder($saleId:ObjectId!){
  deleteOneOrder(query: {_id: $saleId}){
    _id
  }
}
`