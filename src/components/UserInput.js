import React from "react";
import PropTypes from "prop-types"; 

const UserInput = (props) => {

	const phLabel = `Enter your text here (from ${props.minLength} to ${props.maxLength} signs)`;

	return (
		<div className="user-input">
			<textarea 
				type="text"
				rows="4" 
				autoFocus="autofocus"
				value= { props.text }
				maxLength= { props.maxLength }
				placeholder= { phLabel }
				onChange= { props.onChange }
			/>
		</div>
	)
};

UserInput.propTypes = {
  text: PropTypes.string.isRequired,
  minLength: PropTypes.number.isRequired,
  maxLength: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default UserInput;