import {ExceptionFilter, Catch, ArgumentsHost, HttpException} from "@nestjs/common";

type ExceptionResponse = { message?: string | string[]; [key: string]: any } | string;

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        // const exceptionResponse = exception.getResponse();
        const exceptionResponse = exception.getResponse() as ExceptionResponse;


      const getCode = (status:number):string => {
          switch (status) {
            case 400:
              return 'BAD_REQUEST';
            case 401:
              return 'UNAUTHORIZED';
            case 403:
              return 'FORBIDDEN';
            case 404:
              return 'NOT_FOUND';
            default:
              return 'INTERNAL_ERROR';
          }
        };

        const getErrorMessage = (exceptionResponse: ExceptionResponse): string => {
          switch (typeof exceptionResponse) {
            case 'object':
              if (Array.isArray(exceptionResponse.message)) return 'Validation failed';
              return exceptionResponse.message ?? 'Une erreur est survenue';
            case 'string':
              return exceptionResponse;
            default:
              return 'Une erreur est survenue';
          }
        };

      const getDetails = (exceptionResponse: ExceptionResponse) => {
          if (typeof exceptionResponse === 'object' && Array.isArray(exceptionResponse.message)){
            return exceptionResponse.message;
          }
          return null;
        }

        response
          .status(status)
          .json({
            success: false,
            statusCode: status,
            code: getCode(status),
            message: getErrorMessage(exceptionResponse),
            path: request.url,
            timestamp: new Date().toISOString(),
            details: getDetails(exceptionResponse)
          })
    }
}