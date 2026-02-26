from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
       job_name = serializers.CharField(source="job.service_name", read_only=True)
       customer_name = serializers.CharField(source="job.customer.name", read_only=True)

   
       class Meta:
           model = Payment
           fields = '__all__'