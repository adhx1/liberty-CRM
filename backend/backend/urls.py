from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/', include('customers.urls')),
    path('api/', include('jobs.urls')),
    path('api/', include('payments.urls')),
    path('api/', include('dashboard.urls')),
    path('api/', include('govt_fees.urls')),
    path('api/', include('expenses.urls')),

]