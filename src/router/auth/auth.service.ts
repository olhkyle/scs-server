import express from 'express';
import jwt from 'jsonwebtoken';
import { createUser, findUser, findUserByEmail } from '../../mock/users';

const JWT = process.env.JWT_SECRET_KEY || 'backend_jwt';

const checkAuth = (request: express.Request, response: express.Response) => {
	const accessToken = request.cookies.accessToken;

	try {
		const decoded = jwt.verify(accessToken, JWT);

		console.log('✅ 사용자 인증 성공', decoded);
		response.status(200).send({ auth: 'success' });
	} catch (error) {
		console.error('🚫 사용자 인증 실패...', error);
		response.send(401).send({ auth: 'fail' });
	}
};

const signIn = (request: express.Request, response: express.Response) => {
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
		maxAge: 1000 * 60 * 60 * 24 * 7,
		httpOnly: true,
	});

	response.status(200).send({ email, username: user.name });
};

const signUp = (request: express.Request, response: express.Response) => {
	const { email, password, name } = request.body;

	if (findUserByEmail(email)) {
		return response.status(401).send({ error: '이미 등록된 사용자입니다.' });
	}

	createUser({ email, password, name });
	response.send({ message: '회원가입에 성공하였습니다.' });
};

export { checkAuth, signIn, signUp };
