
from rest_framework.viewsets import ModelViewSet
from .models import Job
from .serializers import JobSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum


class JobViewSet(ModelViewSet):
    queryset = Job.objects.select_related('customer').order_by('-created_at')
    serializer_class = JobSerializer


class JobBillAPIView(APIView):
    def get(self, request, job_id):
        job = Job.objects.select_related('customer').get(id=job_id)

        total_paid = job.payments.aggregate(
            total=Sum('amount')
        )['total'] or 0

        balance = job.total_amount - total_paid

        bill_data = {
            "invoice_no": f"INV-{job.id:06d}",
            "customer_type": job.customer.customer_type,
            "customer_name": job.customer.name,
            "customer_phone": job.customer.phone,
            "customer_email": job.customer.email,
            "service": job.service_name,
            "job_date": job.created_at.date(),
            "total_amount": job.total_amount,
            "paid_amount": total_paid,
            "balance_amount": balance,
        }

        return Response(bill_data) 

from django.core.mail import send_mail

class SendBillEmailAPIView(APIView):
    def post(self, request, job_id):
        job = Job.objects.select_related('customer').get(id=job_id)

        total_paid = job.payments.aggregate(
            total=Sum('amount')
        )['total'] or 0

        balance = job.total_amount - total_paid

        message = f"""
        Invoice: INV-{job.id:06d}
        Customer: {job.customer.name}
        Service: {job.service_name}
        Total: {job.total_amount}
        Paid: {total_paid}
        Balance: {balance}
        """

        send_mail(
            subject='Your Bill',
            message=message,
            from_email=None,
            recipient_list=[job.customer.email],
            fail_silently=False,
        )

        return Response({"status": "Email sent"})