from django.db import models
from jobs.models import Job

class Payment(models.Model):
    CASH = 'CASH'
    CARD = 'CARD'
    ONLINE = 'ONLINE'

    PAYMENT_MODE_CHOICES = [
        (CASH, 'Cash'),
        (CARD, 'Card'),
        (ONLINE, 'Online'),
    ]

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name='payments'
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_mode = models.CharField(
        max_length=10,
        choices=PAYMENT_MODE_CHOICES
    )

    # Important for card-based business
    is_settled = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.job} - {self.amount}"