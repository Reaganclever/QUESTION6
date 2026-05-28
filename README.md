# QUESTION6
1. XML:
o Use XML to store user credentials (username and password). Example:
xml
Copy code
<users>
<user>
<username>admin</username>
<password>admin123</password>
</user>
<user>
<username>john_doe</username>
<password>password123</password>
</user>
</users>

2. JavaScript:
o Validate the entered credentials against the XML database.
o If the credentials match, display a success message. Otherwise, show an error.

Expected Output:
1. Login Form: A form with fields for username and password, styled with CSS for a
professional appearance.
2. Validation:
o If any field is left blank, a red error message appears below the form:
"Please enter both username and password."
o If credentials are incorrect, a red error message appears:
"Invalid username or password."
o If credentials are correct, a green success message appears:
"Login successful!"
3. XML Database: The user credentials are stored in a structured XML file, and the login
system dynamically checks input against this data.
