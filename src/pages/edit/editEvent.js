import { PageHeader } from 'antd';
import React from 'react';
import { useQuery, gql } from "@apollo/client"
import { useNavigate } from 'react-router-dom';

const GET_EVENT = gql`
query {
    event {
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

const EditEvent = () =>  {
  const navigate = useNavigate();
  const {error, data, loading} = useQuery(GET_EVENT);

  if(loading){
    return(
      <>
      <PageHeader className='site-page-header' title="{Event Title}" onBack={() => navigate(-1)}/>
      </>
  )
  }
  if(error) return 'Error....'
  if(data){
    return(
      <>
      <PageHeader className='site-page-header' title="{Event Title}" onBack={() => navigate(-1)}/>
      </>
  )

  }
}

export default EditEvent;