from rest_framework.routers import DefaultRouter
from .views import JobViewSet
from django.urls import path
from .views import JobBillAPIView
from .views import SendBillEmailAPIView
router = DefaultRouter()
router.register('jobs', JobViewSet, basename='jobs')

urlpatterns = router.urls


urlpatterns += [
    path('jobs/<int:job_id>/bill/', JobBillAPIView.as_view()),
    path('jobs/<int:job_id>/send-bill/', SendBillEmailAPIView.as_view()),

]