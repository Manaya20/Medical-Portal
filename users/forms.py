from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError
from .models import CustomUser, UserProfile

class UserSignupForm(UserCreationForm):
    """Form for user signup"""
    first_name = forms.CharField(max_length=30, required=True)
    last_name = forms.CharField(max_length=30, required=True)
    email = forms.EmailField(required=True)
    role = forms.ChoiceField(choices=CustomUser.Role.choices, required=True)
    
    # Profile fields
    address_line1 = forms.CharField(max_length=255, required=True)
    city = forms.CharField(max_length=100, required=True)
    state = forms.CharField(max_length=100, required=True)
    pincode = forms.CharField(max_length=10, required=True)
    profile_picture = forms.ImageField(required=False)
    
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'username', 'email', 'password1', 'password2', 
                  'role', 'address_line1', 'city', 'state', 'pincode', 'profile_picture']
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if CustomUser.objects.filter(email=email).exists():
            raise ValidationError("Email already exists")
        return email
    
    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.role = self.cleaned_data['role']
        
        if commit:
            user.save()
            # Check if a profile already exists before creating a new one
            try:
                profile = user.profile
            except:
                # Create user profile only if it doesn't exist
                profile = UserProfile(
                    user=user,
                    address_line1=self.cleaned_data['address_line1'],
                    city=self.cleaned_data['city'],
                    state=self.cleaned_data['state'],
                    pincode=self.cleaned_data['pincode']
                )
            
        # Update profile fields
        profile.address_line1 = self.cleaned_data['address_line1']
        profile.city = self.cleaned_data['city']
        profile.state = self.cleaned_data['state']
        profile.pincode = self.cleaned_data['pincode']
        
        if self.cleaned_data['profile_picture']:
            profile.profile_picture = self.cleaned_data['profile_picture']
            
        profile.save()
        
    return user
