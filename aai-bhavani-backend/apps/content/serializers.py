from rest_framework import serializers
from apps.content.models import Testimonial, TeamMember, FAQ


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Testimonial
        fields = ['id', 'client_name', 'photo', 'rating', 'review', 'location', 'order']


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model  = TeamMember
        fields = ['id', 'photo', 'name', 'designation', 'description',
                  'facebook', 'instagram', 'linkedin', 'order']


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model  = FAQ
        fields = ['id', 'question', 'answer', 'order']


# Admin serializers — include all fields
class TestimonialAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Testimonial
        fields = '__all__'

class TeamMemberAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model  = TeamMember
        fields = '__all__'

class FAQAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model  = FAQ
        fields = '__all__'
