# Setup Instructions for PaySlip Generator

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Internet connection (for Firebase and CDN resources)
- A Firebase account (for production deployment)

## Step-by-Step Setup

### 1. Local Development Setup (No Firebase Required)

This is the quickest way to test the application:

```bash
# Clone the repository
git clone https://github.com/TwinstarsGroup/payslipgen.git
cd payslipgen

# Open in browser
# Simply open index.html in your web browser
```

The application will automatically use sample data stored in localStorage.

### 2. Firebase Setup for Production

#### Step 2.1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: "payslipgen" (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

#### Step 2.2: Enable Realtime Database

1. In Firebase Console, click "Realtime Database" in the left sidebar
2. Click "Create Database"
3. Choose a location closest to your users
4. Start in "Test mode" for development (or "Locked mode" for production)
5. Click "Enable"

#### Step 2.3: Configure Database Security Rules

For development/testing, use these rules:
```json
{
  "rules": {
    "employees": {
      ".read": true,
      ".write": false,
      "$employeeId": {
        ".read": true,
        ".write": false
      }
    }
  }
}
```

For production, you should add authentication:
```json
{
  "rules": {
    "employees": {
      ".read": "auth != null",
      ".write": "auth != null && auth.token.admin === true"
    }
  }
}
```

#### Step 2.4: Get Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon `</>` to add a web app
5. Register app with a nickname (e.g., "PaySlip Web App")
6. Copy the Firebase configuration object

#### Step 2.5: Update firebase-config.js

Open `firebase-config.js` and replace the placeholder configuration:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "payslipgen-xxxxx.firebaseapp.com",
    databaseURL: "https://payslipgen-xxxxx-default-rtdb.firebaseio.com",
    projectId: "payslipgen-xxxxx",
    storageBucket: "payslipgen-xxxxx.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};
```

#### Step 2.6: Add Employee Data to Firebase

In Firebase Realtime Database, add employee data:

1. Click on "Realtime Database" in Firebase Console
2. Click the "+" icon next to your database URL
3. Add the following structure:

```json
{
  "employees": {
    "EMP001": {
      "name": "John Doe",
      "position": "Senior Software Engineer",
      "dateOfJoining": "2020-01-15",
      "accountNumber": "1234567890",
      "companyName": "TwinStars Group"
    },
    "EMP002": {
      "name": "Jane Smith",
      "position": "Product Manager",
      "dateOfJoining": "2019-06-20",
      "accountNumber": "2345678901",
      "companyName": "TwinStars Group"
    }
  }
}
```

Or import the sample data JSON file (create one with all 15 employees).

### 3. Customize the Application

#### Replace Company Logo

1. Create or obtain your company logo
2. Save it as `logo.png` (PNG format, recommended 200x200 pixels)
3. Optionally also save as `logo.svg` for better quality
4. Replace the existing logo files

#### Update Company Name

Update the company name in:
- Firebase employee data (companyName field)
- `index.html` (header section if needed)

#### Customize Colors and Styling

Edit `styles.css` to change:
- Primary colors (currently purple/blue gradient)
- Font family
- Button styles
- Layout spacing

Example: To change the primary gradient:
```css
background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
```

### 4. Deployment Options

#### Option A: Firebase Hosting (Recommended)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting

# Select your project
# Choose 'public' directory or current directory
# Configure as single-page app: No

# Deploy
firebase deploy --only hosting
```

Your app will be available at: `https://your-project-id.web.app`

#### Option B: GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings
3. Navigate to "Pages"
4. Select branch (usually `main`) and folder (`/root`)
5. Click "Save"
6. Access at: `https://yourusername.github.io/payslipgen`

#### Option C: Any Web Server

Upload all files to your web server:
- index.html
- styles.css
- app.js
- firebase-config.js
- logo.png
- logo.svg

Ensure your server supports HTTPS for security.

### 5. Testing the Application

#### Test Employee Lookup

1. Open the application
2. Enter "EMP001" in the Employee ID field
3. Click "Search Employee"
4. Verify employee details are displayed

#### Test Payslip Generation

1. After searching for an employee
2. Select current month in "Pay Period"
3. Enter sample data:
   - Basic Salary: 50000
   - HRA: 15000
   - Conveyance: 2000
   - PF: 6000
   - Professional Tax: 200
4. Verify Net Salary is calculated correctly (60800)
5. Click "Generate Payslip"
6. Review the payslip display

#### Test Print Functionality

1. After generating a payslip
2. Click "Print Payslip"
3. Verify print preview looks correct
4. Test "Print to PDF" option

### 6. Adding More Employees

#### Via Firebase Console

1. Go to Firebase Realtime Database
2. Navigate to `employees` node
3. Click the "+" icon
4. Add new employee with structure:
   - Employee ID (e.g., "EMP016")
   - name: "Employee Name"
   - position: "Job Title"
   - dateOfJoining: "YYYY-MM-DD"
   - accountNumber: "1234567890"
   - companyName: "TwinStars Group"

#### Via Firebase Admin SDK (for bulk import)

```javascript
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.database();

const employees = {
  EMP016: { /* employee data */ },
  EMP017: { /* employee data */ },
  // ... more employees
};

db.ref('employees').set(employees)
  .then(() => console.log('Employees added'))
  .catch(error => console.error(error));
```

### 7. Troubleshooting

#### Issue: Employee not found

- Verify Employee ID is correct (case-sensitive)
- Check if employee exists in Firebase or localStorage
- Check browser console for errors

#### Issue: Firebase not connecting

- Verify firebase-config.js has correct credentials
- Check if Firebase URLs are accessible
- Verify Database Rules allow read access
- Check browser console for Firebase errors

#### Issue: Calculations not working

- Ensure all input fields accept numbers
- Check browser console for JavaScript errors
- Verify oninput event handlers are attached

#### Issue: Print not working

- Some browsers block print dialog
- Try using keyboard shortcut: Ctrl+P (Windows) or Cmd+P (Mac)
- Check if popup blockers are interfering

### 8. Security Recommendations

For production deployment:

1. **Enable Authentication**:
   - Add Firebase Authentication
   - Require login before accessing payslip data

2. **Secure Database Rules**:
   - Restrict read/write access to authenticated users
   - Implement role-based access control

3. **Use Environment Variables**:
   - Store Firebase config in environment variables
   - Don't commit credentials to version control

4. **Enable HTTPS**:
   - Always serve the application over HTTPS
   - Firebase Hosting provides this automatically

5. **Input Validation**:
   - Validate all user inputs on both client and server
   - Sanitize data before storing in Firebase

6. **Rate Limiting**:
   - Implement rate limiting for API calls
   - Use Firebase security rules to prevent abuse

### 9. Backup and Maintenance

#### Backup Firebase Data

```bash
# Using Firebase CLI
firebase database:get / > backup.json
```

#### Regular Maintenance Tasks

- Review Firebase usage and costs monthly
- Update employee data as needed
- Check for security updates in dependencies
- Test application on new browser versions
- Review and update security rules

### 10. Getting Help

If you encounter issues:

1. Check browser console for error messages
2. Review Firebase Console for database issues
3. Verify all files are uploaded correctly
4. Test with sample data first
5. Contact support or create an issue on GitHub

## Quick Reference

### Sample Employee IDs
- EMP001 through EMP015 (pre-configured)

### Important Files
- `index.html` - Main application interface
- `app.js` - Application logic
- `firebase-config.js` - Firebase configuration
- `styles.css` - Styling and layout

### Firebase Structure
```
/employees
  /EMP001
    - name
    - position
    - dateOfJoining
    - accountNumber
    - companyName
```

### Useful Commands
```bash
# Test locally
python -m http.server 8000
# Or
npx serve

# Deploy to Firebase
firebase deploy

# View Firebase logs
firebase database:get /employees
```

## Conclusion

Your PaySlip Generator application is now ready to use! Start with the local development setup to test the application, then move to Firebase for production deployment.

For any questions or issues, refer to the troubleshooting section or contact the development team.
