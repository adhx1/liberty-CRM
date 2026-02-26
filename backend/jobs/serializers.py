from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.name', read_only=True)

    class Meta:
        model = Job
        fields = '__all__'

        