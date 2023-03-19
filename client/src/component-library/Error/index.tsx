import React from 'react';
import { checkIfTrue, showIfOrElse } from '../../helpers/conditionals';
import { Error } from '../Forms';

export const ErrorMessage = ({errors}: any) => {
    return (
        <>
        {showIfOrElse(checkIfTrue(errors))(
            <Error>
            <>
              { errors}
            </>
          </Error>
          )(
            <Error />
          )}
        </>
    )
}