import express from 'express';
import jwt from 'jsonwebtoken';
import { createUser, findUser, findUserByEmail } from '../../mock/users';
import type { ExpressRequest, ExpressResponse } from '../../types/global';

const JWT = process.env.JWT_SECRET_KEY || 'backend_jwt';

const checkAuth = (request: ExpressRequest, response: ExpressResponse, next: express.NextFunction) => {
	const accessToken = request.cookies.accessToken;

	if (!accessToken) {
		return response.status(401).json({ error: 'Unauthorized' });
	}

	try {
		const decoded = jwt.verify(accessToken, JWT, (error: unknown) => {
			console.log(error);

			if (error) {
				return response.sendStatus(403); // not valid - forbidden
			}

			// A middleware 이후에, 다음 middleware에서도 현재 검증된 유저정보를 활용하도록 req.user 프로퍼티에 user 데이터를 담아준다.
			next(); // 다음 middleware로 통과
		});

		console.log('✅ 사용자 인증 성공', decoded);
		response.status(200).send({ auth: 'success' });
	} catch (error) {
		console.error('🚫 사용자 인증 실패...', error);
		response.send(401).send({ auth: 'fail' });
	}
};

const signIn = (request: ExpressRequest, response: ExpressResponse) => {
	const { email, password } = request.body;
	console.log(email, password);

	if (!email || !password) {
		return response.status(401).send({ error: '사용자 아이디 또는 패스워드가 전달되지 않았습니다.' });
	}

	const user = findUser({ email, password });

	if (!user) {
		return response.status(401).send({ error: '등록되지 않은 사용자입니다.' });
	}

	const accessToken = jwt.sign({ email }, JWT, { expiresIn: '1d' });

	response.cookie('accessToken', accessToken, {
		maxAge: 1000 * 60 * 60 * 24 * 1,
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
	});

	response.status(200).send({ email, username: user.name });
};

const signUp = (request: ExpressRequest, response: ExpressResponse) => {
	const { email, password, name } = request.body;

	if (findUserByEmail(email)) {
		return response.status(401).send({ error: '이미 등록된 사용자입니다.' });
	}

	createUser({ email, password, name });
	response.send({ message: '회원가입에 성공하였습니다.' });
};

const signOut = (request: ExpressRequest, response: ExpressResponse) => {
	const accessToken = request.cookies.accessToken;

	if (!accessToken) {
		return response.status(401).send({ message: 'no existing access' });
	}

	response.clearCookie('accessToken');
	response.status(200).send({ message: '정상적으로 로그아웃 되었습니다.' });
};

export { checkAuth, signIn, signUp, signOut };
