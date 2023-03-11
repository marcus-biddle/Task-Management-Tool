import React from "react";
// export const requireAllFormValidator = (values) => {

//     const errors = {};
  
//     Object.entries(values).map(([key, value]) => {
//       if(!value && value !== false) {errors[key] = 'This field is required';}
//     });
  
//     return errors;
//   };
  
//   export const addressFormValidator = (values: AddressFormValues) => {
//     const {
//       firstname,
//       lastname,
//       country_id: { value: country_id },
//       street1,
//       city,
//       region_id,
//       postcode,
//       telephone
//     } = values;