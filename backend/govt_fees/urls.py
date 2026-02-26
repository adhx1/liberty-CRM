from rest_framework.routers import DefaultRouter
from .views import GovtFeeViewSet

router = DefaultRouter()
router.register('govt-fees', GovtFeeViewSet)

urlpatterns = router.urls