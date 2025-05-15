# Medical Portal - Django Web Application

A comprehensive web application built with Django that provides role-based authentication and dashboards for patients and doctors. This portal allows users to sign up, log in, and access personalized dashboards based on their roles.

## Features

- **User Authentication**
  - Custom user model with role-based authentication (Patient/Doctor)
  - Secure signup and login functionality
  - Password validation and confirmation

- **User Profiles**
  - Comprehensive user profiles with personal details
  - Profile picture upload
  - Address information (line1, city, state, pincode)

- **Role-Based Access Control**
  - Different dashboards for Patients and Doctors
  - Automatic redirection based on user role
  - Protected views that verify user roles

- **Responsive Design**
  - Bootstrap-based responsive layout
  - Mobile-friendly interface
  - Clean and intuitive user experience

## Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/medical-portal.git
   cd medical-portal
   ```

2. **Create and activate a virtual environment (recommended)**

   ```bash
   # On Windows
   python -m venv venv
   venv\Scripts\activate

   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Apply migrations**

   ```bash
   python manage.py makemigrations users
   python manage.py migrate
   ```

5. **Create a superuser (admin)**

   ```bash
   python manage.py createsuperuser
   ```

6. **Run the development server**

   ```bash
   python manage.py runserver
   ```

7. **Access the application**

   Open your browser and navigate to http://127.0.0.1:8000/


## Usage

### User Registration

1. Navigate to the signup page at `/signup/`
2. Fill in all required fields:
   - First Name, Last Name
   - Username, Email
   - Password (with confirmation)
   - Role (Patient or Doctor)
   - Address information
   - Profile picture (optional)
3. Submit the form to create your account

### User Login

1. Navigate to the login page at `/login/`
2. Enter your username and password
3. Upon successful login, you'll be redirected to your role-specific dashboard

### Dashboards

- **Patient Dashboard**: Displays user profile information and placeholders for appointments and medical records
- **Doctor Dashboard**: Displays user profile information and placeholders for appointments and patient lists

### Admin Interface

1. Navigate to the admin interface at `/admin/`
2. Log in with your superuser credentials
3. Manage users, profiles, and other application data


