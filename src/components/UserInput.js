import React from "react";

const UserInput = (props) => {

	return (
		<div className="user-input">
			<textarea 
				type="text"
				rows="4" 
				autoFocus="autofocus"
				maxLength="500"
				placeholder="Enter your text here"
			/>
		</div>
	)
}

export default UserInput;