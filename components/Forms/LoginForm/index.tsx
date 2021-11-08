import React, { useRef, useEffect } from 'react';

import Wrapper from '../styled';
import { Input } from '@components/shared';
import { emailValidation, passwordValidation } from '@utils/validations';

const LoginForm: React.FC = () => {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

	return (
		<Wrapper>
			<Input
				type="text"
				id="Email"
				inputRef={emailRef}
				inputValidation={emailValidation}
				placeholder="Email"
			/>
			<Input
				type="password"
				id="Senha"
				inputRef={passwordRef}
				inputValidation={passwordValidation}
				placeholder="Senha"
			/>
		</Wrapper>
	);
};

export default LoginForm;
