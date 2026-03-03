from rest_framework.viewsets import ModelViewSet
from .models import Payment
from .serializers import PaymentSerializer

class PaymentViewSet(ModelViewSet):
    queryset = queryset = Payment.objects.select_related("job", "job__customer")
    serializer_class = PaymentSerializer