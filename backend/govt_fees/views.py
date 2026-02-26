from rest_framework.viewsets import ModelViewSet
from .models import GovtFee
from .serializers import GovtFeeSerializer

class GovtFeeViewSet(ModelViewSet):
    queryset = GovtFee.objects.all()
    serializer_class = GovtFeeSerializer