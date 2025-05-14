from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from users.models import CustomUser

@login_required
def patient_dashboard(request):
    """Patient dashboard view"""
    if request.user.role != CustomUser.Role.PATIENT:
        return redirect('role_redirect')
    
    context = {
        'user': request.user,
        'profile': request.user.profile
    }
    return render(request, 'dashboard/patient_dashboard.html', context)

@login_required
def doctor_dashboard(request):
    """Doctor dashboard view"""
    if request.user.role != CustomUser.Role.DOCTOR:
        return redirect('role_redirect')
    
    context = {
        'user': request.user,
        'profile': request.user.profile
    }
    return render(request, 'dashboard/doctor_dashboard.html', context)
