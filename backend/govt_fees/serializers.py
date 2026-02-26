from rest_framework import serializers
from .models import GovtFee

class GovtFeeSerializer(serializers.ModelSerializer):
    job_name = serializers.CharField(
        source="job.service_name",
        read_only=True
    )
    customer_name = serializers.CharField(
        source="job.customer.name",
        read_only=True
    )

    class Meta:
        model = GovtFee
        fields = "__all__"