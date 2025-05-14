from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class CustomUser(AbstractUser):
    """Custom User model with role field"""
    
    class Role(models.TextChoices):
        PATIENT = 'patient', _('Patient')
        DOCTOR = 'doctor', _('Doctor')
    
    role = models.CharField(
        max_length=10,
        choices=Role.choices,
        default=Role.PATIENT,
    )
    
    def __str__(self):
        return self.username

class UserProfile(models.Model):
    """User profile model with additional fields"""
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile')
    profile_picture = models.ImageField(upload_to='profile_pics', default='default.jpg')
    address_line1 = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    
    def __str__(self):
        return f"{self.user.username}'s Profile"
