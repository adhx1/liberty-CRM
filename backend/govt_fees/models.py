from django.db import models
from jobs.models import Job

class GovtFee(models.Model):
    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name='govt_fees'
    )
    department = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    paid_date = models.DateField()
    reference_no = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.department} - {self.amount}"