'use server';
import { cookies } from 'next/headers';

export const getUserWithToken = async (customerToken) => {
  // const customerData = await getCustomerData(customerToken);
  
};



export const handleSetCookie = async (data)=>{
    cookies().set({
      name: 'accessToken',
      value: data,
      httpOnly: true,
      // path: '/',
    })
   
}


export const handleGetCookie = async ()=>{
  const getAccessToken =  cookies().get('accessToken')?.value ?? null;
  return getAccessToken

}




export const handleRemoveCookie = async ()=>{
   cookies().delete('accessToken')
}




// export const createUser = async (data) => {
//   try {
//     const response = await axios.post(`https://2no444qa0h.execute-api.us-east-1.amazonaws.com/signup`, data);
//     // console.log('Signup successful:', response.data);
//     return response.data
//   } catch (error) {
//     console.error('Error during signup:', error.response ? error.response.data : error.message);
//     return error.response ? error.response.data : error.message
//   }
// }