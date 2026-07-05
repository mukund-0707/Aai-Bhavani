from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.services.models import Service, ReferralProgram
from apps.services.serializers import ServiceSerializer, ReferralProgramSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    serializer_class   = ServiceSerializer
    lookup_field       = 'slug'

    def get_queryset(self):
        # Public: sirf active services
        if not self.request.user.is_authenticated:
            return Service.objects.filter(is_active=True)
        return Service.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class ReferralProgramView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        program = ReferralProgram.objects.filter(is_active=True).first()
        if not program:
            return Response({})
        return Response(ReferralProgramSerializer(program).data)
