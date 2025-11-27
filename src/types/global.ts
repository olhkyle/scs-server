import express from 'express';

type ExpressRequest = express.Request;
type ExpressResponse = express.Response;

interface MongoError extends Error {
	code?: number;
	keyPattern?: Record<string, unknown>;
	keyValue?: Record<string, unknown>;
}

export type { ExpressRequest, ExpressResponse, MongoError };
