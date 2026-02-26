from django.db import models

class Customer(models.Model):
    INDIVIDUAL = 'IND'
    COMPANY = 'COM'

    CUSTOMER_TYPE_CHOICES = [
        (INDIVIDUAL, 'Individual'),
        (COMPANY, 'Company'),
    ]

    name = models.CharField(max_length=150)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    customer_type = models.CharField(
        max_length=3,
        choices=CUSTOMER_TYPE_CHOICES,
        default=INDIVIDUAL
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.get_customer_type_display()})"