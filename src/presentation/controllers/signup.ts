import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFiles = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFiles) {
      if (httpRequest.body[field] === undefined) {
        return badRequest(new MissingParamError(field))
      }
    }

    return { statusCode: 200, body: {} }
  }
}
