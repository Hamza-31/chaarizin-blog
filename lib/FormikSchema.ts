import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const registerSchema = yup.object().shape({
	username: yup
		.string()
		.matches(/^[a-zA-Z0-9_\-]+$/, "Please enter a valid username")
		.min(3, "Please enter a username that is at least 3 characters long and uses only a-z, A-Z, 0-9 or _ characters.")
		.max(40)
		.required("*"),
	email: yup.string().email("Invalid email address.").required("*"),
	password: yup
		.string()
		.min(
			8,
			"The password requires at least 8 characters that includes upper and lower case letters, numbers and symbols [@$!%*#?&-_]."
		)
		.matches(passwordRules, {
			message: `The password requires at least 8 characters that includes upper and lower case letters, numbers and symbols [@$!%*#?&-_].`,
		})
		.required("*"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Password doesn't match.")
		.required("*"),
	terms: yup.boolean().required("*"),
},

);
export const loginSchema = yup.object().shape({
	email: yup.string().email("Invalid email address.").required("*"),
	password: yup.string().required("*"),
});

export const newsletterSchema = yup.object().shape({
	email: yup.string().email("Invalid email address.").required("*"),
});


export const contactSchema = yup.object().shape({
	username: yup
		.string()
		.matches(/^[a-zA-Z0-9_\-]+$/, "Please enter a valid username")
		.min(3, "Please enter a username that is at least 3 characters long and uses only a-z, A-Z, 0-9 or _ characters.")
		.max(40)
		.required("*"),
	email: yup.string().email("Invalid email address.").required("*"),
	message: yup
		.string()
		.min(50, "Type at least 50 characters before you submit.")
		.max(1000, "Your message should have at maximum 1000 characters")
		.required("*"),

});

export const addCommentSchema = yup.object().shape({
	comment: yup
		.string()
		.min(10, "Type at least 10 characters before you submit.")
		.max(100, "Your message should have at maximum 100 characters")
		.required("*"),
});

export const addJournalSchema = yup.object().shape({
	title: yup
		.string()
		.min(5, "Type at least 5 characters for the title.")
		.max(70, "Please keep it short.")
		.required("*"),
	content: yup
		.string()
		// change it to 300
		.min(10, "Type at least 300 characters before you submit.")
		.max(3000, "Please keep it short.")
		.required("*"),

});

export const forgotPasswordSchema = yup.object().shape({
	email: yup.string().email("Invalid email address.").required("*"),
});

export const resetPasswordSchema = yup.object().shape({
	password: yup
		.string()
		.min(
			8,
			"The password requires at least 8 characters that includes upper and lower case letters, numbers and symbols [@$!%*#?&-_]."
		)
		.matches(passwordRules, {
			message: `The password requires at least 8 characters that includes upper and lower case letters, numbers and symbols [@$!%*#?&-_].`,
		})
		.required("*"),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref("password")], "Password doesn't match.")
		.required("*"),
});


