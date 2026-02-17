# PaySlip Generator - TwinStars Group

A modern, user-friendly web application for generating employee payslips with Firebase integration for data management.

## Features

- **Employee Management**: Support for up to 15 employees with unique Employee IDs
- **Comprehensive Payslip Details**: 
  - Employee Information (ID, Name, Position, Date of Joining, Account Number, Company Name)
  - Earnings breakdown (Basic Salary, HRA, Allowances, Bonus, etc.)
  - Deductions breakdown (PF, Professional Tax, Income Tax, ESI, Loans, etc.)
  - Automatic Net Salary calculation
- **Beautiful UI**: Modern, responsive design with gradient themes
- **Firebase Integration**: Cloud-based data storage for employee information
- **Print & Download**: Generate printable payslips with PDF download capability
- **Mobile Responsive**: Works seamlessly on all devices

## Quick Start

### Option 1: Local Demo (Without Firebase)

1. Open `index.html` in any modern web browser
2. The application will automatically use sample employee data stored locally
3. Try these sample Employee IDs: EMP001 through EMP015

### Option 2: Firebase Setup (Production)

See [SETUP.md](SETUP.md) for detailed Firebase configuration instructions.

## Usage Guide

### For Users (HR/Payroll Staff)

1. **Generate a Payslip**:
   - Enter Employee ID (e.g., EMP001)
   - Click "Search Employee"
   - Review employee details
   - Select pay period
   - Enter earnings amounts
   - Enter deduction amounts
   - Net salary is calculated automatically
   - Click "Generate Payslip"

2. **Print or Download**:
   - Click "Print Payslip" to print directly
   - Click "Download PDF" and use browser's "Print to PDF" option

## Sample Employee IDs

The application comes with 15 pre-configured employees:

- EMP001 - John Doe (Senior Software Engineer)
- EMP002 - Jane Smith (Product Manager)
- EMP003 - Mike Johnson (UI/UX Designer)
- EMP004 - Sarah Williams (HR Manager)
- EMP005 - David Brown (DevOps Engineer)
- EMP006 - Emily Davis (Marketing Manager)
- EMP007 - Robert Miller (Data Analyst)
- EMP008 - Lisa Anderson (Finance Manager)
- EMP009 - James Wilson (Backend Developer)
- EMP010 - Patricia Taylor (QA Engineer)
- EMP011 - Christopher Moore (Sales Executive)
- EMP012 - Jennifer Garcia (Content Writer)
- EMP013 - Daniel Martinez (System Administrator)
- EMP014 - Nancy Rodriguez (Business Analyst)
- EMP015 - Kevin Lee (Technical Lead)

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase Realtime Database
- **Styling**: Custom CSS with modern gradients and animations
- **Fonts**: Google Fonts (Inter)

## File Structure

```
payslipgen/
├── index.html          # Main HTML file
├── styles.css          # All styling and responsive design
├── app.js             # Application logic and calculations
├── firebase-config.js  # Firebase configuration
├── logo.svg           # Company logo (SVG format)
├── logo.png           # Company logo (PNG format)
├── README.md          # This file
└── SETUP.md           # Detailed setup instructions
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Documentation

- [SETUP.md](SETUP.md) - Detailed setup and deployment instructions

## License

© 2026 TwinStars Group. All rights reserved.
