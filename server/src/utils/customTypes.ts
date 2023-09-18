import { Request as ExpressRequest } from 'express';
import { iUserDocument } from '../models/user';

export interface Request extends ExpressRequest {
    user?: iUserDocument;
    token?: string
}
