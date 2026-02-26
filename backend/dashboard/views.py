from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.timezone import now
from django.db.models import Sum

from jobs.models import Job
from payments.models import Payment
from govt_fees.models import GovtFee
from expenses.models import Expense
from django.db.models import Sum, Count
from django.db.models.functions import TruncMonth
from datetime import datetime

class DashboardAPIView(APIView):
    def get(self, request):
        today = now().date()

        # ======================
        # INCOME
        # ======================
        today_income = Payment.objects.filter(
            created_at__date=today
        ).aggregate(total=Sum('amount'))['total'] or 0

        monthly_income = Payment.objects.filter(
            created_at__month=today.month,
            created_at__year=today.year
        ).aggregate(total=Sum('amount'))['total'] or 0

        cash_total = Payment.objects.filter(
            payment_mode='CASH'
        ).aggregate(total=Sum('amount'))['total'] or 0

        card_total = Payment.objects.filter(
            payment_mode='CARD'
        ).aggregate(total=Sum('amount'))['total'] or 0

        online_total = Payment.objects.filter(
            payment_mode='ONLINE'
        ).aggregate(total=Sum('amount'))['total'] or 0

        card_unsettled = Payment.objects.filter(
            payment_mode='CARD',
            is_settled=False
        ).aggregate(total=Sum('amount'))['total'] or 0

        # ======================
        # JOB STATUS
        # ======================
        pending_jobs = Job.objects.filter(status='PENDING').count()

        overdue_jobs = Job.objects.filter(
            due_date__lt=today
        ).exclude(status='COMPLETED').count()

        # ======================
        # EXPENSES & COSTS
        # ======================
        govt_fees_total = GovtFee.objects.aggregate(
            total=Sum('amount')
        )['total'] or 0

        expenses_total = Expense.objects.aggregate(
            total=Sum('amount')
        )['total'] or 0

        # ======================
        # PROFIT
        # ======================
        net_profit = monthly_income - govt_fees_total - expenses_total

        monthly_data = (
                Payment.objects
                .annotate(month=TruncMonth("created_at"))
                .values("month")
                .annotate(income=Sum("amount"))
                .order_by("month")
               )

        monthly_breakdown = [
            {
                "month": item["month"].strftime("%b"),
                "income": item["income"] or 0
            }
            for item in monthly_data
                 ]

        job_status_data = (
            Job.objects
            .values("status")
            .annotate(count=Count("id"))
                )

        job_status_counts = [
            {
                "status": item["status"],
                "count": item["count"]
            }
            for item in job_status_data
                ]


        return Response({
            # Income
            "today_income": today_income,
            "monthly_income": monthly_income,
            "cash_total": cash_total,
            "card_total": card_total,
            "online_total": online_total,
            "card_unsettled": card_unsettled,

            # Jobs
            "pending_jobs": pending_jobs,
            "overdue_jobs": overdue_jobs,

            # Costs
            "govt_fees_total": govt_fees_total,
            "expenses_total": expenses_total,

            # Profit
            "net_profit": net_profit,
            
            "monthly_breakdown": monthly_breakdown,
            "job_status_counts": job_status_counts,
         })