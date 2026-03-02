from django.db.models import Sum
from rest_framework import serializers
from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    total_amount = serializers.DecimalField(
        source="job.total_amount",
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    balance = serializers.SerializerMethodField()

    class Meta:
        model = Payment
        fields = [
            "id",
            "job",
            "job_name",
            "customer_name",
            "total_amount",
            "amount",
            "payment_mode",
            "balance",
            "created_at"
        ]

    def get_balance(self, obj):
        job = obj.job

        total_paid = job.payments.aggregate(
            total=Sum("amount")
        )["total"] or 0

        return job.total_amount - total_paid