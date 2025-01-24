import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationError } from 'joi';

const maxLines = Number(process.env.MAX_TICKET_LINES) | 300;
//console.log(`max lines = ${maxLines}, ${typeof(maxLines)}`)

export class ValidationService {

  validatePostRequest(req: Request){

    try{
    const response = this.postSchema.validate(req.query);
    //console.log(`Joi Response = ${JSON.stringify(response)}`)
    if (response.error) {
      //console.log(`Joi Error is: ${response.error}`)
      //const v = new ValidationError(message:error.details[0].message,details:"",origin:"")
      throw ({ message: response.error.details[0].message,isValidationError:true });
    }

  } catch(error:unknown){
    //console.log(`Error is: ${error}`)
      throw error;
  }

  };

   postSchema = Joi.object().keys({
    lines:Joi.number().min(1).max(maxLines).required()
   })

}


 