import React from 'react';

import Wrapper from '../styled';
import AddressFormActions from './AddressFormActions';
import { Input } from '@components/shared';
import { passwordValidation } from '@utils/validations';

type Props = {
  onBack: () => void,
  onNext: () => void
}

const AddressForm: React.FC<Props> = (props) => {

	return (
		<Wrapper>
			<Input
				type="text"
				id="Logradouro"
				inputValidation={passwordValidation}
				placeholder="Logradouro"
			/>
			<Input
				type="text"
				id="Numero"
				inputValidation={passwordValidation}
				placeholder="Número"
			/>
			<Input
				type="text"
				id="Bairro"
				inputValidation={passwordValidation}
				placeholder="Bairro"
			/>
			<Input
				type="text"
				id="Complemento"
				inputValidation={passwordValidation}
				placeholder="Complemento"
			/>
			<AddressFormActions onBack={props.onBack} onNext={props.onNext}/>
		</Wrapper>
	);
};

export default AddressForm;
