/*
@author :abdelhamid.belgacem
*/

'use strict';

class AppError extends Error {
  constructor (message, status) {
    super(message);
    
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.status = status || 500;  
  }

  addError(error) {
    this.errorList = this.errorList  || [];
    this.errorList.push(error);
  }
}

class UnauthorizedError extends AppError {
  constructor () {
    super("Unauthorized", 401);  
  }
}

class NotFoundError extends AppError {
  constructor () {
    super("Not Found", 404);  
  }
}

class NotAcceptableError extends AppError {
  constructor () {
    super("Not Acceptable", 406);  
  }
}


module.exports = {
  AppError : AppError,
  UnauthorizedError : UnauthorizedError,
  NotFoundError : NotFoundError,
  NotAcceptableError : NotAcceptableError
};