from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomUser, UserProfile

@receiver(post_save, sender=CustomUser)
def create_profile(sender, instance, created, **kwargs):
    """Create a UserProfile for new users if one doesn't exist"""
    if created:
        # Only create if it doesn't already exist
        UserProfile.objects.get_or_create(
            user=instance,
            defaults={
                'address_line1': '',
                'city': '',
                'state': '',
                'pincode': ''
            }
        )

@receiver(post_save, sender=CustomUser)
def save_profile(sender, instance, **kwargs):
    """Save the user's profile when the user is saved"""
    instance.profile.save()
