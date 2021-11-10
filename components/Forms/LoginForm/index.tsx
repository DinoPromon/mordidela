import React from 'react';

import Wrapper from '../styled';
import LoginFormActions from './LoginFormActions';
import { Input } from '@components/shared';
import { emailValidation, passwordValidation } from '@utils/validations';

const LoginForm: React.FC = () => {
	return (
		<Wrapper>
			<Input
				type="text"
				id="Email"
				inputValidation={emailValidation}
				placeholder="Email"
			/>
			<Input
				type="password"
				id="Senha"
				inputValidation={passwordValidation}
				placeholder="Senha"
			/>
			<LoginFormActions />
		</Wrapper>
	);
};

export default LoginForm;
