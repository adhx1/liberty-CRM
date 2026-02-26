from rest_framework.viewsets import ModelViewSet
from .models import Payment
from .serializers import PaymentSerializer

class PaymentViewSet(ModelViewSet):
    queryset = Payment.objects.select_related('job').order_by('-created_at')
    serializer_class = PaymentSerializer