import { request, gql } from 'graphql-request'

const MASTER_URL = "https://api-ap-south-1.hygraph.com/v2/clulqhjmc06ql07tb65lenw45/master"


const getSlider = async () => {
  const query = gql`
query GetSliders {
    sliders {
      id
      name
      image {
        url
      }
    }
  }
`
  const result = await request(MASTER_URL, query);
  return result;
}


const getCategories = async () => {
  const query = gql`
query GetCategories {
    categories {
      id
      name
      icon {
        url
      }
    }
  }
`
  const result = await request(MASTER_URL, query);
  return result;

}

const getBusinessList = async () => {
  const query = gql`
    query GetBusinessList {
      businessLists {
        id
        name
        email
        address
        about
        images {
          url
        }
        contactPerson
        category {
          name
        }
      }
    }
`
  const result = await request(MASTER_URL, query);
  return result;

}




const getBusinessListByCategory = async (category) => {
  const query = gql`
  query getBusinessList {
    businessLists(where: {name: "`+ category + `"}) {
      id
      name
      email
      address
      about
      images {
        url
      }
      contactPerson
      category {
        name
      }
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const createBooking = async (data) => {
  const mutationQuery = gql`
  mutation createBooking {
    createBooking(
      data: {
        progressStatus: Booked,
         businessList: {
          connect: {id: "`+ data.businessId + `"}},
          date: "`+ data.date + `", 
          time: "`+ data.time + `", 
          userEmail: "`+ data.userEmail + `", 
          userName: "`+ data.userName + `"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
  `
  const result = await request(MASTER_URL, mutationQuery);
  return result;
}


const getUserBookings = async(userEmail)=>{
  const query = gql `
  query GetUserBookins {
    bookings(orderBy: publishedAt_ASC, where: {userEmail: "`+userEmail+`"}) {
      time
      userEmail
      userName
      progressStatus
      date
      id
      businessList {
        id
        images {
          url
        }
        name
        address
        contactPerson
        email
        about
      }
    }
  }
  
  `
  const result = await request(MASTER_URL, query);
  return result;
}




export default {
  getSlider,
  getCategories,
  getBusinessList,
  getBusinessListByCategory,
  createBooking, 
  getUserBookings
}

