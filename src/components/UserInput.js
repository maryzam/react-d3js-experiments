import React from "react";

const UserInput = (props) => {

	return (
		<div className="user-input">
			<p>Напиши или скопируй небольшой текст в окошко ввода и получи информацию о его структуре</p>
			<textarea 
				type="text"
				rows="4" 
				cols="50"
				autoFocus="autofocus"
				maxLength="500"
			/>
		</div>
	)
}

export default UserInput;