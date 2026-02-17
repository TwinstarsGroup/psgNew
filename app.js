// Global variables
let currentEmployee = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set default pay period to current month
    const today = new Date();
    const currentMonth = today.toISOString().substring(0, 7);
    document.getElementById('payPeriod').value = currentMonth;
    
    // Initialize sample data if Firebase is not configured
    if (typeof firebase === 'undefined' || !firebase.apps || !firebase.apps.length) {
        console.warn("Firebase not properly configured. Using local storage for demo.");
        initializeSampleData();
    }
    
    // Handle Enter key in employee ID input
    const employeeIdInput = document.getElementById('employeeId');
    if (employeeIdInput) {
        employeeIdInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                searchEmployee();
            }
        });
    }
});

// Initialize sample employee data for demonstration
function initializeSampleData() {
    const sampleEmployees = {
        "EMP001": {
            name: "John Doe",
            position: "Senior Software Engineer",
            dateOfJoining: "2020-01-15",
            accountNumber: "1234567890",
            companyName: "TwinStars Group"
        },
        "EMP002": {
            name: "Jane Smith",
            position: "Product Manager",
            dateOfJoining: "2019-06-20",
            accountNumber: "2345678901",
            companyName: "TwinStars Group"
        },
        "EMP003": {
            name: "Mike Johnson",
            position: "UI/UX Designer",
            dateOfJoining: "2021-03-10",
            accountNumber: "3456789012",
            companyName: "TwinStars Group"
        },
        "EMP004": {
            name: "Sarah Williams",
            position: "HR Manager",
            dateOfJoining: "2018-09-05",
            accountNumber: "4567890123",
            companyName: "TwinStars Group"
        },
        "EMP005": {
            name: "David Brown",
            position: "DevOps Engineer",
            dateOfJoining: "2020-11-25",
            accountNumber: "5678901234",
            companyName: "TwinStars Group"
        },
        "EMP006": {
            name: "Emily Davis",
            position: "Marketing Manager",
            dateOfJoining: "2019-02-14",
            accountNumber: "6789012345",
            companyName: "TwinStars Group"
        },
        "EMP007": {
            name: "Robert Miller",
            position: "Data Analyst",
            dateOfJoining: "2021-07-30",
            accountNumber: "7890123456",
            companyName: "TwinStars Group"
        },
        "EMP008": {
            name: "Lisa Anderson",
            position: "Finance Manager",
            dateOfJoining: "2017-12-01",
            accountNumber: "8901234567",
            companyName: "TwinStars Group"
        },
        "EMP009": {
            name: "James Wilson",
            position: "Backend Developer",
            dateOfJoining: "2020-05-18",
            accountNumber: "9012345678",
            companyName: "TwinStars Group"
        },
        "EMP010": {
            name: "Patricia Taylor",
            position: "QA Engineer",
            dateOfJoining: "2021-01-22",
            accountNumber: "0123456789",
            companyName: "TwinStars Group"
        },
        "EMP011": {
            name: "Christopher Moore",
            position: "Sales Executive",
            dateOfJoining: "2019-08-15",
            accountNumber: "1234509876",
            companyName: "TwinStars Group"
        },
        "EMP012": {
            name: "Jennifer Garcia",
            position: "Content Writer",
            dateOfJoining: "2020-10-05",
            accountNumber: "2345610987",
            companyName: "TwinStars Group"
        },
        "EMP013": {
            name: "Daniel Martinez",
            position: "System Administrator",
            dateOfJoining: "2018-04-12",
            accountNumber: "3456721098",
            companyName: "TwinStars Group"
        },
        "EMP014": {
            name: "Nancy Rodriguez",
            position: "Business Analyst",
            dateOfJoining: "2021-06-08",
            accountNumber: "4567832109",
            companyName: "TwinStars Group"
        },
        "EMP015": {
            name: "Kevin Lee",
            position: "Technical Lead",
            dateOfJoining: "2017-11-20",
            accountNumber: "5678943210",
            companyName: "TwinStars Group"
        }
    };
    
    // Store in localStorage for demo purposes
    localStorage.setItem('employees', JSON.stringify(sampleEmployees));
}

// Search for employee by ID
async function searchEmployee() {
    const employeeId = document.getElementById('employeeId').value.trim().toUpperCase();
    const errorMessage = document.getElementById('errorMessage');
    
    if (!employeeId) {
        showError("Please enter an Employee ID");
        return;
    }
    
    try {
        let employeeData = null;
        
        // Try to fetch from Firebase first
        if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length) {
            const snapshot = await database.ref('employees/' + employeeId).once('value');
            employeeData = snapshot.val();
        }
        
        // If not found in Firebase or Firebase not configured, check localStorage
        if (!employeeData) {
            const employees = JSON.parse(localStorage.getItem('employees') || '{}');
            employeeData = employees[employeeId];
        }
        
        if (employeeData) {
            currentEmployee = { id: employeeId, ...employeeData };
            displayEmployeeDetails(currentEmployee);
            hideError();
        } else {
            showError("Employee not found. Please check the Employee ID.");
            currentEmployee = null;
        }
    } catch (error) {
        console.error("Error fetching employee data:", error);
        showError("Error retrieving employee data. Please try again.");
    }
}

// Display employee details
function displayEmployeeDetails(employee) {
    document.getElementById('displayEmployeeId').textContent = employee.id;
    document.getElementById('displayName').textContent = employee.name;
    document.getElementById('displayPosition').textContent = employee.position;
    document.getElementById('displayDOJ').textContent = formatDate(employee.dateOfJoining);
    document.getElementById('displayAccount').textContent = employee.accountNumber;
    document.getElementById('displayCompany').textContent = employee.companyName;
    
    // Show employee section
    document.getElementById('employeeSection').style.display = 'block';
    
    // Scroll to employee section
    document.getElementById('employeeSection').scrollIntoView({ behavior: 'smooth' });
    
    // Reset salary fields
    resetSalaryFields();
}

// Calculate net salary
function calculateNetSalary() {
    // Get all earning values
    const basicSalary = parseFloat(document.getElementById('basicSalary').value) || 0;
    const hra = parseFloat(document.getElementById('hra').value) || 0;
    const conveyance = parseFloat(document.getElementById('conveyance').value) || 0;
    const specialAllowance = parseFloat(document.getElementById('specialAllowance').value) || 0;
    const bonus = parseFloat(document.getElementById('bonus').value) || 0;
    const otherEarnings = parseFloat(document.getElementById('otherEarnings').value) || 0;
    
    // Calculate total earnings
    const totalEarnings = basicSalary + hra + conveyance + specialAllowance + bonus + otherEarnings;
    
    // Get all deduction values
    const providentFund = parseFloat(document.getElementById('providentFund').value) || 0;
    const professionalTax = parseFloat(document.getElementById('professionalTax').value) || 0;
    const incomeTax = parseFloat(document.getElementById('incomeTax').value) || 0;
    const esi = parseFloat(document.getElementById('esi').value) || 0;
    const loan = parseFloat(document.getElementById('loan').value) || 0;
    const otherDeductions = parseFloat(document.getElementById('otherDeductions').value) || 0;
    
    // Calculate total deductions
    const totalDeductions = providentFund + professionalTax + incomeTax + esi + loan + otherDeductions;
    
    // Calculate net salary
    const netSalary = totalEarnings - totalDeductions;
    
    // Update display
    document.getElementById('totalEarnings').textContent = formatCurrency(totalEarnings);
    document.getElementById('totalDeductions').textContent = formatCurrency(totalDeductions);
    document.getElementById('netSalary').textContent = formatCurrency(netSalary);
}

// Generate payslip
function generatePayslip() {
    if (!currentEmployee) {
        alert("Please search for an employee first.");
        return;
    }
    
    const payPeriod = document.getElementById('payPeriod').value;
    if (!payPeriod) {
        alert("Please select a pay period.");
        return;
    }
    
    // Get all values
    const earnings = {
        "Basic Salary": parseFloat(document.getElementById('basicSalary').value) || 0,
        "HRA": parseFloat(document.getElementById('hra').value) || 0,
        "Conveyance Allowance": parseFloat(document.getElementById('conveyance').value) || 0,
        "Special Allowance": parseFloat(document.getElementById('specialAllowance').value) || 0,
        "Bonus": parseFloat(document.getElementById('bonus').value) || 0,
        "Other Earnings": parseFloat(document.getElementById('otherEarnings').value) || 0
    };
    
    const deductions = {
        "Provident Fund": parseFloat(document.getElementById('providentFund').value) || 0,
        "Professional Tax": parseFloat(document.getElementById('professionalTax').value) || 0,
        "Income Tax": parseFloat(document.getElementById('incomeTax').value) || 0,
        "ESI": parseFloat(document.getElementById('esi').value) || 0,
        "Loan Deduction": parseFloat(document.getElementById('loan').value) || 0,
        "Other Deductions": parseFloat(document.getElementById('otherDeductions').value) || 0
    };
    
    const totalEarnings = Object.values(earnings).reduce((a, b) => a + b, 0);
    const totalDeductions = Object.values(deductions).reduce((a, b) => a + b, 0);
    const netSalary = totalEarnings - totalDeductions;
    
    if (totalEarnings === 0) {
        alert("Please enter salary details before generating payslip.");
        return;
    }
    
    // Populate payslip
    document.getElementById('payslipCompanyName').textContent = currentEmployee.companyName;
    document.getElementById('payslipPeriod').textContent = formatPayPeriod(payPeriod);
    document.getElementById('payslipEmpId').textContent = currentEmployee.id;
    document.getElementById('payslipName').textContent = currentEmployee.name;
    document.getElementById('payslipPosition').textContent = currentEmployee.position;
    document.getElementById('payslipDOJ').textContent = formatDate(currentEmployee.dateOfJoining);
    document.getElementById('payslipAccount').textContent = currentEmployee.accountNumber;
    document.getElementById('payslipPayPeriod').textContent = formatPayPeriod(payPeriod);
    
    // Populate earnings table
    const earningsTable = document.getElementById('earningsTable');
    earningsTable.innerHTML = '';
    for (const [key, value] of Object.entries(earnings)) {
        if (value > 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${key}</td><td>${formatCurrency(value)}</td>`;
            earningsTable.appendChild(row);
        }
    }
    document.getElementById('payslipTotalEarnings').textContent = formatCurrency(totalEarnings);
    
    // Populate deductions table
    const deductionsTable = document.getElementById('deductionsTable');
    deductionsTable.innerHTML = '';
    for (const [key, value] of Object.entries(deductions)) {
        if (value > 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${key}</td><td>${formatCurrency(value)}</td>`;
            deductionsTable.appendChild(row);
        }
    }
    document.getElementById('payslipTotalDeductions').textContent = formatCurrency(totalDeductions);
    
    // Display net salary
    document.getElementById('payslipNetSalary').textContent = formatCurrency(netSalary);
    
    // Hide employee section and show payslip
    document.getElementById('employeeSection').style.display = 'none';
    document.getElementById('payslipSection').style.display = 'block';
    
    // Scroll to payslip
    document.getElementById('payslipSection').scrollIntoView({ behavior: 'smooth' });
}

// Print payslip
function printPayslip() {
    window.print();
}

// Download payslip as PDF
function downloadPayslip() {
    // For a production app, you would integrate a library like jsPDF or html2pdf
    // For now, we'll just trigger the print dialog
    alert("Use 'Print to PDF' option in the print dialog to save as PDF");
    window.print();
}

// Back to form
function backToForm() {
    document.getElementById('payslipSection').style.display = 'none';
    document.getElementById('employeeSection').style.display = 'block';
    document.getElementById('employeeSection').scrollIntoView({ behavior: 'smooth' });
}

// Reset form
function resetForm() {
    if (confirm("Are you sure you want to reset all fields?")) {
        currentEmployee = null;
        document.getElementById('employeeId').value = '';
        document.getElementById('employeeSection').style.display = 'none';
        document.getElementById('payslipSection').style.display = 'none';
        resetSalaryFields();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Reset salary fields
function resetSalaryFields() {
    const salaryFields = [
        'basicSalary', 'hra', 'conveyance', 'specialAllowance', 'bonus', 'otherEarnings',
        'providentFund', 'professionalTax', 'incomeTax', 'esi', 'loan', 'otherDeductions'
    ];
    
    salaryFields.forEach(field => {
        document.getElementById(field).value = '';
    });
    
    calculateNetSalary();
}

// Show error message
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Hide error message
function hideError() {
    const errorElement = document.getElementById('errorMessage');
    errorElement.classList.remove('show');
}

// Format currency
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Format pay period
function formatPayPeriod(period) {
    const [year, month] = period.split('-');
    const date = new Date(year, month - 1);
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
}


