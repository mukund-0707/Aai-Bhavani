from rest_framework import viewsets, permissions
from apps.team.models import TeamMember
from apps.team.serializers import TeamMemberSerializer

class TeamMemberViewSet(viewsets.ModelViewSet):
    serializer_class = TeamMemberSerializer

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return TeamMember.objects.filter(is_active=True)
        return TeamMember.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
