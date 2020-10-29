import React, {
  useState,
  useCallback,
  useRef,
} from 'react';
import PropTypes from 'prop-types';

import { Container, StyledInput } from './styles';

const Input = ({ name, icon: Icon, error, ...rest }) => {
  const inputRef = useRef(null);
  const [hasFocus, setHasFocus] = useState(false);
  const [hasText, setHasText] = useState(false);

  const handleFocus = useCallback(() => {
    setHasFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setHasFocus(false);

    setHasText(!!inputRef.current.value);
  }, []);

  return (
    <Container hasFocus={ hasFocus } hasText={ hasText } hasError={ error }>
      {Icon && <Icon size={ 24 } />}

      <StyledInput
        ref={ inputRef }
        name={ name }
        onFocus={ handleFocus }
        onBlur={ handleBlur }
        { ...rest }
      />
    </Container>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  error: PropTypes.bool.isRequired,
};

export default Input;
