import React from "react";

const UserInput = (props) => {

	return (
		<div className="user-input">
			<textarea 
				type="text"
				rows="4" 
				cols="50"
				autoFocus="autofocus"
				maxLength="500"
				placeholder="Напиши или скопируй сюда текст для анализа"
			/>
		</div>
	)
}

export default UserInput;