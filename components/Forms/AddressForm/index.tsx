import React, { useRef } from 'react';

import Wrapper from '../styled';
import { Input } from '@components/shared';
import { passwordValidation } from '@utils/validations';

const AddressForm: React.FC = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const logradouroRef = useRef<HTMLInputElement>(null);
  const numeroEndRef = useRef<HTMLInputElement>(null);
  const bairroRef = useRef<HTMLInputElement>(null);

	return (
		<Wrapper>
			<Input
				type="text"
				id="Logradouro"
				inputRef={logradouroRef}
				inputValidation={passwordValidation}
				placeholder="Logradouro"
			/>
			<Input
				type="text"
				id="Numero"
				inputRef={numeroEndRef}
				inputValidation={passwordValidation}
				placeholder="Número"
			/>
			<Input
				type="text"
				id="Bairro"
				inputRef={bairroRef}
				inputValidation={passwordValidation}
				placeholder="Bairro"
			/>
			<Input
				type="text"
				id="Complemento"
				inputRef={passwordRef}
				inputValidation={passwordValidation}
				placeholder="Complemento"
			/>
		</Wrapper>
	);
};

export default AddressForm;
