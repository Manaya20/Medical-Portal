from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import UserSignupForm
from .models import CustomUser

def home(request):
    """Home page view"""
    return render(request, 'users/home.html')

def signup(request):
    """User signup view"""
    if request.method == 'POST':
        form = UserSignupForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}! You can now log in.')
            return redirect('login')
    else:
        form = UserSignupForm()
    return render(request, 'users/signup.html', {'form': form})

@login_required
def role_redirect(request):
    """Redirect users based on their role"""
    if request.user.role == CustomUser.Role.PATIENT:
        return redirect('patient_dashboard')
    elif request.user.role == CustomUser.Role.DOCTOR:
        return redirect('doctor_dashboard')
    else:
        return redirect('home')
